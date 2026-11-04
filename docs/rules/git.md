---
id: RULE-003
title: "Git"
type: rule
status: actual
owner: architect
date: 2026-11-05
---

# Git

## 1. Основная ветка

Основная ветка: `main`. Рабочие ветки: `feat/<slug>`, `fix/<slug>`, `docs/<slug>`, `chore/<slug>`. Долгих веток нет. PR и merge пока не используются: работа идёт коммитами в `main`, ветки зарезервированы на будущее.

## 2. Коммиты

Формат: Conventional Commits, `<type>(<scope>)!: <subject>`.

- `type` обязателен: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `ci`.
- `scope` опционален. Если указан, только из списка: `core`, `dbt`, `airflow`, `docker`, `docs`, `tools`.
- `!` ставится при ломающем изменении.
- Subject на английском, императив, до 72 символов, без точки в конце.

Примеры:

```text
feat(core): add player extractor
feat(dbt): add roster staging model
fix(airflow): retry comlink timeout
docs(spec): define local probe
chore: scaffold dlh structure
chore(release): 0.0.4
feat(core)!: change raw envelope
```

## 3. Origin

Origin создан: `https://github.com/deusart/swgoh-dlh.git`. Push ещё не выполнялся; push и push тегов выполняются только по отдельному запросу. Подготовка описана в [SPEC-002](../specs/SPEC-002-origin-and-secrets.md).

## 4. Версии и теги

Версионность описана в [versioning.md](versioning.md). Релизный коммит: `chore(release): X.Y.Z`, затем annotated tag `vX.Y.Z`. Теги пока локальные.

## 5. Запреты

- Force-push в `main`.
- Перезапись истории.
- Удаление чужих веток.
- Коммит секретов, ключей и `.env`.
- Push и push тегов без запроса.
