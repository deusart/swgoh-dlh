---
id: RULE-003
title: "Git"
type: rule
status: actual
owner: architect
date: 2026-11-04
---

# Git

## 1. Основная ветка

Основная ветка: `main`. Рабочие ветки: `feat/<slug>`, `fix/<slug>`, `docs/<slug>`, `chore/<slug>`. Долгих веток нет, тема живёт до merge.

## 2. Коммиты

Формат: Conventional Commits, `<type>(<scope>): <subject>`. Типы: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `ci`. Subject на английском, императив, до 72 символов.

## 3. Origin

Origin не создан. Remote добавляется только по явному согласию пользователя. Push и теги без запроса не выполняются.

## 4. Запреты

- Force-push в `main`.
- Перезапись истории.
- Удаление чужих веток.
- Коммит секретов, ключей и `.env`.
- Push тегов без запроса.
