---
id: SPEC-003
title: "Локальная проба Comlink"
type: spec
status: approved
owner: architect
date: 2026-11-05
related: [SPEC-002, RULE-005]
---

# Локальная проба Comlink

## 1. Контекст

Версия `0.0.6` посвящена Comlink. Цель — поднять сервис локально и получить реальный ответ `/player` по ally code. ClickHouse, dbt и Airflow в этот блок не входят.

## 2. Требование

### 2.1. Compose

Файл:

```text
dlh/docker/compose/compose.dev.yml
```

Требования:

- только сервис `comlink`;
- образ `ghcr.io/swgoh-utils/swgoh-comlink:latest` допустим только для dev;
- перед SERVER тег фиксируется;
- `APP_NAME=dlh`;
- порт `3000:3000`;
- `restart: unless-stopped`;
- реальные ключи не попадают в compose;
- `.env` лежит в корне и не коммитится.

ClickHouse, Airflow и Postgres в compose не добавляются.

### 2.2. Проба

1. Поднять compose.
2. Выполнить `POST /metadata`.
3. Выполнить `POST /player` с ally code из `.env`.
4. Проверить, что `rosterUnit` не пустой.
5. Сохранить ответ во временный файл, который исключён из git.

### 2.3. Ограничения

- Не создавать таблицы ClickHouse.
- Не писать dbt-модели.
- Не добавлять Airflow.
- Не фиксировать raw-формат.
- Не коммитить реальные креды.

## 3. Критерии

- [ ] `docker compose -f dlh/docker/compose/compose.dev.yml config` проходит.
- [ ] Контейнер Comlink запускается.
- [ ] `POST /metadata` возвращает версию.
- [ ] `POST /player` возвращает непустой `rosterUnit`.
- [ ] В git нет `.env` и реальных ключей.
- [ ] `node tools/check-docs.mjs --strict` возвращает 0.

## 4. Что не входит

- ClickHouse и схема хранения.
- dbt staging и marts.
- Airflow.
- Raw-формат.
- SERVER и продакшен-теги.
