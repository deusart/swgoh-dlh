---
id: RULE-002
title: "Структура репозитория"
type: rule
status: actual
owner: architect
date: 2026-11-05
---

# Структура репозитория

## 1. Принципы

- Один корень решения: `dlh/`.
- `dlh/` — корень решения; `dlh/core/` — Python-пакет `core`.
- Внутри `dlh/` только шесть папок: `core`, `airflow`, `dbt`, `docker`, `tests`, `scripts`.
- Одна папка имеет одну ответственность.
- Окружения различаются compose и `.env`, а не копиями кода.
- Секреты и данные не попадают в git.
- Пустые папки «на будущее» не создаются.
- Глубина внутри `dlh/` не больше трёх уровней.

## 2. Папки корня

| Папка | Назначение | Что внутри | Владелец |
|---|---|---|---|
| `.obsidian/` | Конфигурация Obsidian | app, appearance, core-plugins, community-plugins, themes | architect |
| `docs/` | Документация проекта | concept, rules, specs, tasks, index | architect |
| `tools/` | Проверки и обслуживание | check-docs.mjs | architect |
| `dlh/` | Решение | core, airflow, dbt, docker, tests, scripts | architect |

## 3. Папки внутри `dlh/`

| Папка | Назначение | Что внутри | Владелец |
|---|---|---|---|
| `dlh/core/` | Python-пакет `core` | `etl` и `ops` | backend |
| `dlh/airflow/` | Оркестрация | `dags/` | data |
| `dlh/dbt/` | SQL-преобразования | models, macros, tests, profiles | analytics |
| `dlh/docker/` | Запуск инфраструктуры | compose, clickhouse, airflow, comlink | architect |
| `dlh/tests/` | Python-тесты | core, integration, fixtures | qa |
| `dlh/scripts/` | Операторские скрипты | bootstrap, backup, restore | ops |

Детализация `core/etl` и `core/ops` появится вместе с первым кодом. Пустые подпапки заранее не создаются.

Папка без строки в этих таблицах считается ошибкой структуры.
