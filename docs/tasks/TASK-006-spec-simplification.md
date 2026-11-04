---
id: TASK-006
title: "Упрощение SPEC-001"
type: task
status: done
owner: architect
date: 2026-11-05
related: [SPEC-001, RULE-005]
---

# Упрощение SPEC-001

## 1. Что сделано

- Из `SPEC-001` убраны два сервера, референс и список файлов минимального старта.
- Два сервера и референс вынесены в `docs/rules/environment.md`.
- В `SPEC-001` остались дерево, границы папок, пакет `core` и критерии.
- Обновлены `docs/index.md`, `README.md` и доска задач.

## 2. Проверка

```bash
node tools/check-docs.mjs --strict
```

Код 0 означает, что документы соответствуют правилам.
