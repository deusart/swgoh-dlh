---
id: SPEC-001
title: "Структура репозитория DLH"
type: spec
status: implemented
owner: architect
date: 2026-11-05
related: [RULE-001, RULE-002, RULE-003, RULE-004, RULE-005, RULE-006]
---

# Структура репозитория DLH

## 1. Контекст

DLH: data lakehouse для данных игры SWGOH. `dlh/` это корень решения, `dlh/core/` это Python-пакет `core`. dbt отвечает за преобразования, Airflow за оркестрацию, Comlink работает как внешний сервис. Окружения и референс: [environment](../rules/environment.md).

Имена баз, таблиц и слоёв пока не зафиксированы: это отдельное решение.

## 2. Требование

### 2.1. Целевое дерево

```text
swgoh-dlh/
├── README.md
├── AGENTS.md
├── CHANGELOG.md
├── .env.example
├── .gitignore
├── .deus-architect.yaml
├── pyproject.toml
├── .obsidian/
├── docs/
│   ├── index.md
│   ├── concept/
│   │   └── CONCEPT.md
│   ├── rules/
│   │   ├── naming-convention.md
│   │   ├── structure.md
│   │   ├── git.md
│   │   ├── tools.md
│   │   ├── environment.md
│   │   ├── versioning.md
│   │   └── agents.md
│   ├── specs/
│   │   ├── SPEC-001-repository-structure.md
│   │   └── SPEC-002-origin-and-secrets.md
│   └── tasks/
│       ├── board.md
│       ├── TASK-001-repository-reorganization.md
│       ├── TASK-002-obsidian-plugins.md
│       ├── TASK-003-root-vault.md
│       ├── TASK-004-dlh-structure.md
│       ├── TASK-005-core-package.md
│       ├── TASK-006-spec-simplification.md
│       ├── TASK-007-execute-spec.md
│       ├── TASK-008-versioning.md
│       ├── TASK-009-origin-secrets.md
│       ├── TASK-010-agent-roles.md
│       └── TASK-011-reviewer-version.md
├── tools/
│   └── check-docs.mjs
└── dlh/
    ├── core/
    │   ├── __init__.py
    │   ├── __main__.py
    │   ├── config.py
    │   ├── etl/
    │   │   └── __init__.py
    │   └── ops/
    │       └── __init__.py
    ├── airflow/
    │   └── dags/
    ├── dbt/
    │   ├── dbt_project.yml
    │   ├── profiles.yml
    │   ├── models/
    │   │   ├── staging/
    │   │   └── marts/
    │   ├── macros/
    │   └── tests/
    ├── docker/
    │   ├── compose/
    │   ├── clickhouse/
    │   │   └── init/
    │   │       └── 001_schema.sql
    │   ├── airflow/
    │   └── comlink/
    ├── tests/
    └── scripts/
```

### 2.2. Границы папок

| Папка | Ответственность | Не делает |
|---|---|---|
| `dlh/core/etl` | Запросы к Comlink и запись raw | Не строит витрины, не парсит JSON в модель |
| `dlh/core/ops` | run_id, статусы, health, quality | Не оркестрирует, не делает HTTP за данными |
| `dlh/airflow` | Расписание, порядок задач, ретраи | Не содержит HTTP и SQL |
| `dlh/dbt` | JSON в staging, staging в marts | Не ходит в Comlink |
| `dlh/docker` | Compose, конфиги сервисов, init-SQL | Не содержит Python-кода |
| `dlh/tests` | Python-тесты `core` | Не заменяет dbt-тесты |
| `dlh/scripts` | bootstrap, backup, restore, smoke | Не импортируется кодом |
| `docs/` | Концепт, правила, спеки, задачи | Не содержит код |
| `tools/` | Проверки репозитория | Не содержит runtime-код |

### 2.3. Пакет `core`

`dlh/` не является Python-пакетом. Пакет называется `core`: `__init__.py` есть только у `core`, `core.etl` и `core.ops`; импорт: `from core.etl import ...`.

`pyproject.toml` указывает `package-dir = {"" = "dlh"}` и пакеты `core`, `core.etl`, `core.ops`.

## 3. Критерии

- [x] В корне репозитория есть `dlh/`, `docs/`, `tools/` и `.obsidian/`.
- [x] Внутри `dlh/` есть только `core`, `airflow`, `dbt`, `docker`, `tests`, `scripts`.
- [x] `dlh/` не является Python-пакетом: `__init__.py` начинается с `dlh/core/`.
- [x] `core` содержит `etl` и `ops`; отдельного `transform` нет.
- [x] `dbt` содержит staging и marts; JSON-разбор находится в dbt.
- [x] `airflow` содержит только DAG и не содержит HTTP или SQL.
- [x] `docker/clickhouse/init/001_schema.sql` существует до первого запуска.
- [x] `node tools/check-docs.mjs --strict` возвращает 0.

## 4. Что не входит

- Архитектура и поток данных сверх границ папок.
- Модель данных и правила нормализации.
- Имена баз, таблиц и слоёв.
- Состав DAG, расписания и окружения.
- Выбор версий ClickHouse, Airflow и dbt.
- Юридические ограничения.
