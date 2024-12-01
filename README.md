## Парсинг данных

1. Положите файлы `usages.csv` и `costs.csv` в папку `data/raw`.
2. Запустите один из скриптов:
   - Ручной парсинг:
     ```bash
     npm run parse
     ```
   - Запуск в дев моде (парсинг будет автоматически):
     ```bash
     npm start
     ```
   - Билд (парсинг будет автоматически):
     ```bash
     npm run build
     ```
3. Готовые JSON-файлы будут сохранены в `src/data`, а исходные CSV удалены.
