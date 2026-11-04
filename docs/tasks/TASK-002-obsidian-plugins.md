---
id: TASK-002
title: "Реконфигурация Obsidian"
type: task
status: done
owner: architect
date: 2026-11-04
related: [SPEC-001, RULE-004]
---

# Реконфигурация Obsidian

## 1. Что сделано

- Доска переведена с Bases `board.base` на Kanban `docs/tasks/board.md`.
- Зафиксирован набор плагинов: Kanban, Dataview, Minimal Theme Settings.
- В `appearance.json` включена тема Minimal.
- `core-plugins.json` сокращён до используемых плагинов.
- `community-plugins.json` добавлен в репозиторий.
- `workspace.json`, `cache/` и `plugins/` исключены из git; тема Minimal закоммичена.

## 2. Проверка

```bash
node tools/check-docs.mjs --strict
```

Код 0 означает, что документация и доска соответствуют правилам.
