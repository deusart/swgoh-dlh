---
id: TASK-009
title: "Origin и секреты"
type: task
status: done
owner: architect
date: 2026-11-05
related: [SPEC-002, RULE-003, RULE-006]
---

# Origin и секреты

## 1. Что сделано

- Добавлена спецификация `SPEC-002`.
- Подготовлен `.env.example` без реальных значений.
- Версия решения поднята до `0.0.5`.
- Проверено, что `.env` исключён из git.
- Origin добавлен: `https://github.com/deusart/swgoh-dlh.git`.
- `main` и теги `v0.0.4`, `v0.0.5` отправлены в origin.

## 2. Что осталось

- Нет. Origin создан, push выполнен.

## 3. Проверка

```bash
node tools/check-docs.mjs --strict
```

Код 0 означает, что документы соответствуют правилам.
