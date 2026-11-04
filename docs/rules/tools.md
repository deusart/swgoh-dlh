---
id: RULE-004
title: "Инструменты"
type: rule
status: actual
owner: architect
date: 2026-11-04
---

# Инструменты

## 1. Obsidian

Vault открывается от корня проекта. Заметки живут в `docs/`, конфигурация в `.obsidian/` рядом с `README.md`.

В репозитории хранятся:

- `.obsidian/app.json`
- `.obsidian/appearance.json`
- `.obsidian/core-plugins.json`
- `.obsidian/community-plugins.json`
- `.obsidian/themes/*`

Не коммитятся: `workspace.json`, `workspace-mobile.json`, `cache/` и `plugins/` с кодом плагинов.

`app.json` задаёт `newFileFolderPath: "docs"` и `userIgnoreFilters` для кода и служебных папок.

## 2. Плагины

Набор проекта:

| Плагин | ID | Назначение |
|---|---|---|
| Kanban | `obsidian-kanban` | Доска `docs/tasks/board.md` |
| Dataview | `dataview` | Запросы по frontmatter |
| Minimal Theme Settings | `obsidian-minimal-settings` | Настройки темы Minimal |

Тема: Minimal. В `appearance.json` это `"theme": "obsidian"` и `"cssTheme": "Minimal"`. Тема лежит в репозитории, поэтому вид восстанавливается сразу.

## 3. Восстановление

1. Открыть корень проекта как vault в Obsidian.
2. Settings, Community plugins, включить community plugins.
3. Browse, установить `obsidian-kanban`, `dataview`, `obsidian-minimal-settings`.
4. Включить установленные плагины.
5. Settings, Appearance, Themes, выбрать Minimal.
6. Проверить, что `docs/tasks/board.md` открывается как Kanban-доска.
7. Не добавлять в git `workspace.json`, `cache/` и `plugins/`.

## 4. Проверка

```bash
node tools/check-docs.mjs --strict
```

Код 0 означает, что документы и доска соответствуют правилам.
