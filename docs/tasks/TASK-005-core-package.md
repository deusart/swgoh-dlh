---
id: TASK-005
title: "Пакет core"
type: task
status: done
owner: architect
date: 2026-11-05
related: [SPEC-001, RULE-002, TASK-004]
---

# Пакет core

## 1. Что сделано

- `runtime` переименован в `core`.
- `dlh/` больше не является Python-пакетом: это корень решения.
- Python-пакет называется `core` и лежит в `dlh/core/`.
- `core` содержит `etl` и `ops`.
- `__init__.py` появляется только в `core`, `core.etl` и `core.ops`.
- В `pyproject.toml` зафиксированы `package-dir = {"" = "dlh"}` и пакеты `core`, `core.etl`, `core.ops`.
- Обновлены `SPEC-001`, `docs/rules/structure.md` и `README.md`.

## 2. Проверка

```bash
node tools/check-docs.mjs --strict
```

Код 0 означает, что документы соответствуют правилам.
