# AGENTS

## 1. Как запускать

- Проверка документации: `node tools/check-docs.mjs`.
- Сборка и тесты: кода пока нет; команды появятся вместе с `src/`.
- Git: локальный репозиторий, основная ветка `main`, origin не создан.

## 2. Правила

- Имена файлов, веток и коммитов: `docs/rules/naming-convention.md`.
- Структура папок: `docs/rules/structure.md`.
- Git: `docs/rules/git.md`.
- Инструменты и Obsidian: `docs/rules/tools.md`.
- Концепт: `docs/concept/CONCEPT.md`; текст не редактируется.
- Секреты, `.env` и данные не коммитить.
- Спека структуры: `docs/specs/SPEC-001-repository-structure.md`.

## 3. Как проверять

Запустить `node tools/check-docs.mjs --strict`. Код 0 означает, что работа готова. Ошибки чинить, предупреждения разбирать.
