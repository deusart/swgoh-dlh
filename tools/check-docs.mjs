#!/usr/bin/env node
// deus-architect: проверка структуры документации проекта.
// Копируется в проект как tools/check-docs.mjs и запускается из корня проекта.
//
//   node tools/check-docs.mjs
//   node tools/check-docs.mjs --root . --level medium --strict
//   node tools/check-docs.mjs --json
//
// Код выхода: 0 чисто, 1 есть ошибки, 2 ошибка запуска.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve, relative, sep, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));

const SKIP_DIRS = new Set([
  '.git', '.obsidian', 'node_modules', 'archive', 'dist', 'build', 'bin', 'obj', '.venv', 'venv',
]);

const TYPES = {
  spec: ['draft', 'approved', 'implemented'],
  adr: ['proposed', 'accepted', 'superseded'],
  rule: ['actual', 'outdated'],
  review: ['new', 'triaged'],
  task: ['backlog', 'ready', 'doing', 'done'],
  concept: ['frozen'],
  glossary: ['actual'],
};

const SECTIONS = {
  spec: ['Контекст', 'Требование', 'Критерии', 'Что не входит'],
  adr: ['Контекст', 'Решение', 'Следствия', 'Альтернативы'],
  review: ['Что проверялось', 'Сводка', 'Замечания', 'Что не проверялось'],
};

const REQUIRED_FIELDS = ['id', 'title', 'type', 'status', 'owner'];
const LEVELS = ['small', 'medium', 'large'];

const errors = [];
const warnings = [];
let advisory = false;
const fail = (file, msg) => errors.push({ file, msg });
const warn = (file, msg) => warnings.push({ file, msg });

function parseArgs(argv) {
  const out = { root: null, level: null, strict: false, json: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--root') out.root = argv[++i];
    else if (a.startsWith('--root=')) out.root = a.slice(7);
    else if (a === '--level') out.level = argv[++i];
    else if (a.startsWith('--level=')) out.level = a.slice(8);
    else if (a === '--strict') out.strict = true;
    else if (a === '--json') out.json = true;
    else if (a === '--help' || a === '-h') out.help = true;
    else {
      console.error(`неизвестный аргумент: ${a}`);
      process.exit(2);
    }
  }
  return out;
}

const readText = (p) => readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
const toPosix = (p) => p.split(sep).join('/');

function walk(dir, acc = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(full, acc);
    } else if (e.isFile()) {
      acc.push(full);
    }
  }
  return acc;
}

const unquote = (v) => {
  const s = v.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) return s.slice(1, -1);
  return s;
};

function parseYamlLines(lines) {
  const data = {};
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    const val = m[2].trim();

    if (val === '>' || val === '|' || val === '>-' || val === '|-') {
      const buf = [];
      let j = i + 1;
      while (j < lines.length && (lines[j].trim() === '' || /^\s+\S/.test(lines[j]))) {
        buf.push(lines[j].trim());
        j++;
      }
      data[key] = buf.join(' ').trim();
      i = j - 1;
      continue;
    }
    if (val === '') {
      const items = [];
      let j = i + 1;
      while (j < lines.length && /^\s*-\s+/.test(lines[j])) {
        items.push(unquote(lines[j].replace(/^\s*-\s+/, '')));
        j++;
      }
      if (items.length) {
        data[key] = items;
        i = j - 1;
      } else {
        data[key] = '';
      }
      continue;
    }
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val
        .slice(1, -1)
        .split(',')
        .map((s) => unquote(s))
        .filter(Boolean);
      continue;
    }
    data[key] = unquote(val);
  }
  return data;
}

function parseFrontmatter(text) {
  const lines = text.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') return { data: null, body: text };
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      end = i;
      break;
    }
  }
  if (end === -1) return { data: null, body: text };
  return { data: parseYamlLines(lines.slice(1, end)), body: lines.slice(end + 1).join('\n') };
}

function headings(body) {
  const h1 = [];
  const h2 = [];
  let fence = false;
  for (const line of body.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) {
      fence = !fence;
      continue;
    }
    if (fence) continue;
    const one = line.match(/^#\s+(.+?)\s*$/);
    if (one) {
      h1.push(one[1].trim());
      continue;
    }
    const two = line.match(/^##\s+(.+?)\s*$/);
    if (two) h2.push(two[1].trim());
  }
  return { h1, h2 };
}

const normalizeHeading = (h) => h.replace(/^\d+\.\s*/, '').trim().toLowerCase();
const hasSection = (h2, name) =>
  h2.some((h) => normalizeHeading(h).startsWith(name.toLowerCase()));

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log('node check-docs.mjs [--root .] [--level small|medium|large] [--strict] [--json]');
    return 0;
  }

  const root = resolve(args.root || join(SCRIPT_DIR, '..'));
  if (!existsSync(root)) {
    console.error(`корень не найден: ${root}`);
    return 2;
  }

  let marker = null;
  const markerPath = join(root, '.deus-architect.yaml');
  if (existsSync(markerPath)) {
    marker = parseYamlLines(readText(markerPath).split(/\r?\n/));
    if (!marker.level) warn('.deus-architect.yaml', 'нет поля level');
  } else if (args.strict) {
    fail('.deus-architect.yaml', 'маркер отсутствует: репозиторий ещё не проверялся');
  } else {
    warn('.deus-architect.yaml', 'маркер отсутствует: репозиторий ещё не проверялся');
  }

  // Первый контакт с незнакомым репозиторием не блокирует: ошибки идут в отчёт.
  advisory = !marker && !args.strict;

  const level = args.level || (typeof marker?.level === 'string' ? marker.level : null) || 'medium';
  if (!LEVELS.includes(level)) fail('.deus-architect.yaml', `неизвестный level: ${level}`);

  const docsDir = join(root, 'docs');
  const docsExists = existsSync(docsDir);
  if (level !== 'small' && !docsExists) {
    fail('docs/', `каталог docs отсутствует, уровень ${level} его требует`);
  }

  const ids = new Map();
  let docCount = 0;

  if (docsExists) {
    const files = walk(docsDir).filter((f) => f.endsWith('.md'));
    docCount = files.length;

    for (const file of files) {
      const rel = toPosix(relative(docsDir, file));
      const name = basename(file);

      const nameRule = /^(?:[A-Z]{2,}(?:-\d{2,4})?(?:-[a-z0-9][a-z0-9._-]*)?|[a-z0-9][a-z0-9._-]*)\.md$/;
      if (!nameRule.test(name)) {
        fail(rel, 'имя файла: ID заглавными плюс kebab-case slug, либо латиница в нижнем регистре');
      }

      const text = readText(file);
      if (/будет дополнено позже/i.test(text)) fail(rel, 'заглушка "будет дополнено позже"');
      if (/^\s*TBD\b/m.test(text)) fail(rel, 'заглушка TBD');

      const isIndex = rel === 'index.md';
      const isConcept = rel.startsWith('concept/');
      const isBoard = rel === 'tasks/board.md';
      const { data, body } = parseFrontmatter(text);

      if (!data) {
        if (!isIndex && !isConcept && !isBoard && level !== 'small') fail(rel, 'нет паспорта: frontmatter отсутствует');
        continue;
      }
      if (isIndex || isConcept || isBoard) continue;

      for (const field of REQUIRED_FIELDS) {
        if (!data[field]) fail(rel, `паспорт: нет поля ${field}`);
      }

      if (data.id) {
        if (ids.has(data.id)) fail(rel, `дубликат id: ${data.id} (уже в ${ids.get(data.id)})`);
        else ids.set(data.id, rel);
      }

      if (data.type) {
        if (!TYPES[data.type]) {
          fail(rel, `неизвестный type: ${data.type}`);
        } else {
          if (data.status && !TYPES[data.type].includes(data.status)) {
            fail(rel, `статус ${data.status} не разрешён для type ${data.type}`);
          }
          for (const section of SECTIONS[data.type] || []) {
            if (!hasSection(headings(body).h2, section)) {
              fail(rel, `нет обязательного раздела "${section}"`);
            }
          }
        }
      }

      const { h1 } = headings(body);
      if (h1.length !== 1) fail(rel, `ожидается ровно один H1, найдено ${h1.length}`);
      else if (data.title && h1[0] !== String(data.title)) {
        fail(rel, `title "${data.title}" не совпадает с H1 "${h1[0]}"`);
      }
    }

    const indexPath = join(docsDir, 'index.md');
    if (level !== 'small' && !existsSync(indexPath)) {
      fail('docs/index.md', 'индекс отсутствует');
    } else if (level !== 'small') {
      const indexText = readText(indexPath);
      for (const m of indexText.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
        const target = m[1];
        if (/^(https?:|mailto:|#)/.test(target)) continue;
        const clean = decodeURI(target.split('#')[0]);
        if (!existsSync(resolve(docsDir, clean))) fail('docs/index.md', `битая ссылка: ${target}`);
      }
      for (const file of walk(docsDir).filter((f) => f.endsWith('.md'))) {
        const rel = toPosix(relative(docsDir, file));
        if (rel === 'index.md' || rel === 'tasks/board.md') continue;
        const name = basename(file);
        if (!indexText.includes(rel) && !indexText.includes(name)) {
          fail(rel, 'нет строки в docs/index.md');
        }
      }
    }
  }

  if (level !== 'small') {
    for (const f of ['AGENTS.md', 'docs/rules/naming-convention.md']) {
      if (!existsSync(join(root, f))) fail(f, 'обязательный артефакт отсутствует');
    }
    if (!['docs/tasks/board.base', 'docs/tasks/board.md'].some((p) => existsSync(join(root, p)))) {
      if (level === 'large') fail('docs/tasks/board', 'нет доски: board.base или board.md');
      else warn('docs/tasks/board', 'доски нет: появится с первой задачей');
    }
  }

  const skillsDir = join(root, 'skills');
  let skillCount = 0;
  if (existsSync(skillsDir)) {
    for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const skillFile = join(skillsDir, entry.name, 'SKILL.md');
      const rel = `skills/${entry.name}/SKILL.md`;
      if (!existsSync(skillFile)) {
        warn(rel, 'нет SKILL.md');
        continue;
      }
      skillCount++;
      const { data } = parseFrontmatter(readText(skillFile));
      if (!data) {
        fail(rel, 'нет frontmatter');
        continue;
      }
      if (data.name !== entry.name) fail(rel, `name "${data.name}" не равен имени папки`);
      if (!data.description) fail(rel, 'нет description');
      else if (String(data.description).length > 1200) {
        warn(rel, 'description длиннее 1200 символов');
      }
    }
  }

  if (args.json) {
    console.log(JSON.stringify({ root, level, docs: docCount, skills: skillCount, errors, warnings }, null, 2));
  } else {
    console.log(`deus-architect check`);
    console.log(`root:  ${root}`);
    console.log(`level: ${level}`);
    console.log(`документов: ${docCount}, скиллов: ${skillCount}`);
    for (const e of errors) console.log(`ERROR ${e.file}: ${e.msg}`);
    for (const w of warnings) console.log(`WARN  ${w.file}: ${w.msg}`);
    console.log(`итог: ${errors.length} ошибок, ${warnings.length} предупреждений`);
    if (advisory && errors.length) {
      console.log('РЕЖИМ ЗНАКОМСТВА: первый прогон не блокирует, код 0. Список выше это долг.');
    }
  }

  return errors.length && !advisory ? 1 : 0;
}

process.exit(main());
