---
id: TASK-012
title: "Локальная проба Comlink"
type: task
status: doing
owner: architect
date: 2026-11-05
related: [SPEC-003]
---

# Локальная проба Comlink

## 1. Что сделать

- Создать `dlh/docker/compose/compose.dev.yml`.
- Поднять Comlink.
- Проверить `/metadata` и `/player`.
- Зафиксировать результат пробы.

## 2. Проверка

```bash
docker compose -f dlh/docker/compose/compose.dev.yml config
node tools/check-docs.mjs --strict
```

Код 0 означает, что документы и compose валидны.
