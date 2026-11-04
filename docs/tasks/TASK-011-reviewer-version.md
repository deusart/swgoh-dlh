---
id: TASK-011
title: "Reviewer на границе версии"
type: task
status: done
owner: architect
date: 2026-11-05
related: [RULE-007, RULE-006]
---

# Reviewer на границе версии

## 1. Что сделано

- В роли добавлен `owner` как родительская роль.
- Reviewer вызывается при смене версии, а не на каждый коммит.
- PR и merge отмечены как неиспользуемые.
- Reviewer проверяет код, DAG, документы и ссылки.
- Тесты остаются за `data-engineer`, reviewer их проверяет.
- Handoff обновлён: `owner → исполнитель → reviewer → owner → тег`.

## 2. Проверка

```bash
node tools/check-docs.mjs --strict
```

Код 0 означает, что документы соответствуют правилам.
