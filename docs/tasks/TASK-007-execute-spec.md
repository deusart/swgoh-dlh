---
id: TASK-007
title: "Выполнение SPEC-001"
type: task
status: done
owner: architect
date: 2026-11-05
related: [SPEC-001]
---

# Выполнение SPEC-001

## 1. Что сделано

- Создан каталог `dlh/` с папками `core`, `airflow`, `dbt`, `docker`, `tests`, `scripts`.
- Создан Python-пакет `core` с `etl`, `ops`, `__main__.py` и `config.py`.
- Добавлены `pyproject.toml`, `dbt_project.yml`, `profiles.yml`.
- Создан `docker/clickhouse/init/001_schema.sql` как место для будущего DDL.
- Добавлены `.env.example` и служебные `.gitkeep` для пустых папок.
- Структура зафиксирована коммитом.

## 2. Проверка

```bash
node tools/check-docs.mjs --strict
```

Код 0 означает, что документы соответствуют правилам.
