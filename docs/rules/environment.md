---
id: RULE-005
title: "Окружения и референс"
type: rule
status: actual
owner: architect
date: 2026-11-05
---

# Окружения и референс

## 1. DEV и SERVER

| | DEV: текущий ПК | SERVER: второй ПК |
|---|---|---|
| Роль | Проба, разработка, анализ | Постоянная работа сервиса |
| Compose | `dlh/docker/compose/compose.dev.yml` | `dlh/docker/compose/compose.server.yml` |
| Стек | Comlink и ClickHouse; Airflow опционально | Comlink, ClickHouse, Airflow, Postgres |
| Данные | Локальный volume, вне git | Volume на сервере, источник истины |
| Секреты | `.env` локально | `.env` на сервере |
| Доступ | Локальный | ClickHouse и Airflow только LAN или VPN |

Правила:

- Код один; различия только в compose и `.env`.
- `compose.dev.yml` содержит минимальный стек; Airflow подключается профилем, когда нужен.
- `compose.server.yml` содержит полный стек для постоянной работы.
- SERVER является источником истины по данным и расписаниям.
- Данные не синхронизируются через git.

## 2. Референс

`E:\Development\swgoh` используется как ориентир по предметным именам и границам данных. Инфраструктуру не копируем: в референсе SQL Server и `pyodbc`, в DLH ClickHouse, Airflow и dbt.

| Референс | DLH | Что переносим |
|---|---|---|
| `engine/` | `dlh/core/etl/` | Клиенты внешних API |
| `load/` | `dlh/core/etl/` | Загрузка и сохранение raw |
| `sql/` | `dlh/dbt/` | SQL-слой |
| `swgohdb/stage`, `swgohdb/history` | `dlh/dbt/models/staging`, `marts` | Слои преобразований |
| `config/` | `dlh/core/config.py`, `.env` | Настройки |
| `source/` | raw на volume | Сырьё; отдельную папку не заводим |
| `test/` | `dlh/tests/` | Тесты |

Не переносим: `_swgoh/` (дубль), `swgohdb/.vs`, `.dbeaver`, `__pycache__`. Статические JSON из `source/` не становятся форматом хранения: источник DLH это Comlink, raw лежит на volume.
