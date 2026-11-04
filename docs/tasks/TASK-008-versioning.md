---
id: TASK-008
title: "Версионность и коммиты"
type: task
status: done
owner: architect
date: 2026-11-05
related: [RULE-006, RULE-003, RULE-001]
---

# Версионность и коммиты

## 1. Что сделано

- Добавлено правило версионности с SemVer и роадмапом.
- Scope коммитов сделан опциональным с allowlist.
- Правила коммитов сведены в `docs/rules/git.md`.
- `pyproject.toml` и `dbt_project.yml` выровнены на `0.0.4`.
- Добавлен `CHANGELOG.md`.
- Поставлен локальный тег `v0.0.4`.

## 2. Проверка

```bash
node tools/check-docs.mjs --strict
```

Код 0 означает, что документы соответствуют правилам.
