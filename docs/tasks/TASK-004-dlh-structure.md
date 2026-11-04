---
id: TASK-004
title: "Структура dlh"
type: task
status: done
owner: architect
date: 2026-11-05
related: [SPEC-001, RULE-002]
---

# Структура dlh

## 1. Что сделано

- Зафиксирован единый корень решения `dlh/`.
- Внутри `dlh/` оставлены только `runtime`, `airflow`, `dbt`, `docker`, `tests`, `scripts`.
- `extract` и `load` объединены в `runtime/etl`.
- `ops` перенесён в `runtime/ops`.
- Отдельные `src`, `transform`, `clickhouse`, `infra`, `dags` и `dbt` верхнего уровня убраны.
- `dbt` оставлен единственным слоем преобразований.
- Init-SQL закреплён за `docker/clickhouse/init`.
- Переписаны `SPEC-001`, `docs/rules/structure.md` и `README.md`.
- `runtime` заменён на `core` в [TASK-005](TASK-005-core-package.md).

## 2. Проверка

```bash
node tools/check-docs.mjs --strict
```

Код 0 означает, что документы соответствуют правилам.
