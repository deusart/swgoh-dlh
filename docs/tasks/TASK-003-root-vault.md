---
id: TASK-003
title: "Vault от корня проекта"
type: task
status: done
owner: architect
date: 2026-11-04
related: [SPEC-001, RULE-004, TASK-002]
---

# Vault от корня проекта

## 1. Что сделано

- Конфигурация Obsidian перенесена из `docs/.obsidian` в `.obsidian` рядом с `README.md`.
- `app.json` получил `newFileFolderPath: "docs"` и `userIgnoreFilters` для кода и служебных папок.
- Тема `Minimal` теперь коммитится: `themes/*` исключены из `.gitignore`.
- Обновлены `docs/rules/tools.md`, `docs/rules/structure.md`, `README.md` и `SPEC-001`.

## 2. Проверка

```bash
node tools/check-docs.mjs --strict
```

Код 0 означает, что документы и доска соответствуют правилам.
