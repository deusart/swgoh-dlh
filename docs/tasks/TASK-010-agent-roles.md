---
id: TASK-010
title: "Роли субагентов"
type: task
status: done
owner: architect
date: 2026-11-05
related: [RULE-007, RULE-003]
---

# Роли субагентов

## 1. Что сделано

- Добавлено правило `docs/rules/agents.md`.
- Зафиксированы роли `architect`, `data-engineer`, `devops`, `reviewer`.
- Описаны границы, вход, выход и handoff.
- Обновлён `AGENTS.md`: origin, `dlh/core` и ссылка на роли.

## 2. Проверка

```bash
node tools/check-docs.mjs --strict
```

Код 0 означает, что документы соответствуют правилам.
