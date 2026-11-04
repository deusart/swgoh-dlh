---
id: RULE-001
title: "Соглашение об именах"
type: rule
status: actual
owner: architect
date: 2026-11-05
---

# Соглашение об именах

## 1. Файлы и папки

- Английский язык, kebab-case, без транслита и пробелов.
- Имя описывает содержимое: `repository-structure.md`, а не `doc1.md`.
- Документы имеют расширение `.md`, скрипты `.mjs` или `.py`.
- Папки: `docs/rules`, `docs/specs`, `docs/tasks`, `docs/concept`, `tools`, `skills`, `agents`.

## 2. Документы и идентификаторы

| Тип | Формат ID | Папка |
|---|---|---|
| spec | `SPEC-001` | `docs/specs` |
| adr | `ADR-0001` | `docs/adr` |
| rule | `RULE-001` | `docs/rules` |
| review | `REV-001` | `docs/reviews` |
| task | `TASK-001` | `docs/tasks` |
| concept | `CONCEPT` | `docs/concept` |

Имя файла: `<ID>-<slug>.md`, например `SPEC-001-repository-structure.md`. У spec и rule номер из трёх цифр, у adr из четырёх. Пропусков в нумерации нет.

Для правил допускаются фиксированные имена `naming-convention.md`, `structure.md`, `git.md`, `tools.md`, `environment.md`, `versioning.md`; ID правила хранится в паспорте.

## 3. Ветки и коммиты

Ветки и коммиты описаны в [git.md](git.md). Здесь остаются только имена файлов и документов.

## 4. Язык

Текст документов на русском. Идентификаторы, имена файлов, код и коммиты на английском. Смешение внутри одного имени не допускается.
