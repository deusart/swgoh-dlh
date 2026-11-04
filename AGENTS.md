# AGENTS

## 1. Как запускать

- Проверка документации: `node tools/check-docs.mjs`.
- Сборка и тесты: кода пока нет; команды появятся вместе с `dlh/core/`.
- Git: локальный репозиторий, ветка `main`, origin `https://github.com/deusart/swgoh-dlh.git`; push только по запросу.

## 2. Правила

- Имена файлов и документов: `docs/rules/naming-convention.md`.
- Структура папок: `docs/rules/structure.md`.
- Git и коммиты: `docs/rules/git.md`.
- Версионность: `docs/rules/versioning.md`.
- Инструменты и Obsidian: `docs/rules/tools.md`.
- Роли субагентов: `docs/rules/agents.md`.
- Концепт: `docs/concept/CONCEPT.md`; текст не редактируется.
- Секреты, `.env` и данные не коммитить.
- Спека структуры: `docs/specs/SPEC-001-repository-structure.md`.
- Origin и секреты: `docs/specs/SPEC-002-origin-and-secrets.md`.

## 3. Как проверять

Запустить `node tools/check-docs.mjs --strict`. Код 0 означает, что работа готова. Ошибки чинить, предупреждения разбирать.
