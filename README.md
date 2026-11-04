# DLH

DLH: data lakehouse для данных игры SWGOH. Источник данных: `swgoh-comlink`. Хранилище: ClickHouse. Оркестрация: Airflow. Трансформации: dbt и Python.

Статус: создан каркас структуры `dlh/`; бизнес-логики пока нет. Версия `0.0.5`. Vault открывается от корня проекта, заметки лежат в `docs/`.

## 1. Документы

- [Концепт](docs/concept/CONCEPT.md): подтверждённые компоненты и два сервера.
- [Спека структуры](docs/specs/SPEC-001-repository-structure.md): дерево, правила размещения, критерии.
- [Origin и секреты](docs/specs/SPEC-002-origin-and-secrets.md): remote, `.env`, проверка перед push.
- [Локальная проба Comlink](docs/specs/SPEC-003-comlink-probe.md): compose и первый запрос.
- [Правила структуры](docs/rules/structure.md): назначение папок.
- [Правила имён](docs/rules/naming-convention.md): файлы и документы.
- [Правила git](docs/rules/git.md): ветка, коммиты, origin.
- [Версионность](docs/rules/versioning.md): SemVer, теги, роадмап.
- [Инструменты](docs/rules/tools.md): Obsidian, плагины, восстановление vault.
- [Окружения и референс](docs/rules/environment.md): DEV/SERVER и ориентир.
- [Роли субагентов](docs/rules/agents.md): architect, data-engineer, devops, reviewer.
- [Changelog](CHANGELOG.md).
- [Доска задач](docs/tasks/board.md).
- [Индекс документации](docs/index.md).

## 2. Дерево

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
├── tools/
└── dlh/
    ├── core/
    ├── airflow/
    ├── dbt/
    ├── docker/
    ├── tests/
    └── scripts/
```

`dlh/` — корень решения, а `dlh/core/` — Python-пакет, который импортируется как `core`. Внутри `dlh` нет `src` и нет отдельных `dags`, `dbt`, `clickhouse`, `scripts` верхнего уровня: всё сгруппировано в шести папках.

Полное дерево с файлами и назначением папок: [SPEC-001](docs/specs/SPEC-001-repository-structure.md).

## 3. Проверка

```bash
node tools/check-docs.mjs
```

Код 0 означает, что документация соответствует правилам. Для строгой проверки: `node tools/check-docs.mjs --strict`.
