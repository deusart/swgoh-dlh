---
id: TASK-001
title: "Реорганизация репозитория"
type: task
status: done
owner: architect
date: 2026-11-04
related: [SPEC-001]
---

# Реорганизация репозитория

## 1. Что сделано

- Создан docs-vault: `docs/concept`, `docs/rules`, `docs/specs`, `docs/tasks`.
- Концепт перенесён в `docs/concept/CONCEPT.md` без правки текста.
- Спека структуры перенесена в `docs/specs/SPEC-001-repository-structure.md` и получила паспорт.
- Добавлены `README.md`, `AGENTS.md`, `.gitignore`, `.deus-architect.yaml`.
- Добавлены правила структуры, имён и git.
- Добавлен `tools/check-docs.mjs`.
- Инициализирован локальный git без origin.

## 2. Проверка

```bash
node tools/check-docs.mjs --strict
```

Код 0 означает, что документация соответствует правилам.
