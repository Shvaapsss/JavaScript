# Отчёт о проделанной работе: Разработка мини-приложения Activity for Captain Smith на `JavaScript`

## Введение:

Целью данной работы было разработать мини-приложение на языке `JavaScript` для капитана Смита, которое будет предлагать новые занятия при каждом обновлении страницы. Приложение должно использовать продвинутые функции `JavaScript`, включая асинхронный `JavaScript`, модули и обработку ошибок.

### Процесс разработки

#### Создание структуры проекта
Проект был организован в соответствии с требованиями:

- Создан основной файл HTML `index.html`.
- В директории `/src` созданы файлы JavaScript: `index.js` и `activity.js`.

#### Реализация функционала
Основной функционал был реализован в файлах `index.js` и `activity.js`.

### index.js
```javascript
import { getRandomActivity } from './activity.js';

// Function to update activity on the webpage
function updateActivity(activity) {
    document.getElementById('activity').textContent = activity;
}

// Function to fetch random activity and update on the webpage
async function fetchAndDisplayActivity() {
    try {
        // Fetch a random activity
        const activity = await getRandomActivity();
        // Update the activity on the webpage
        updateActivity(activity);
    } catch (error) {
        // Handle errors by displaying an error message on the webpage
        updateActivity("К сожалению, произошла ошибка");
    }
}

// Initial call to fetch and display activity when the page loads
fetchAndDisplayActivity();

// Update activity every minute
setInterval(fetchAndDisplayActivity, 60000);
```

### index.html
```html
<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Activity for Captain Smith</title>
</head>
<body>
<h1>Hey, Captain Smith, you can:</h1>
<!-- Placeholder for displaying activity -->
<p id="activity"></p>
<!-- Script to load the JavaScript module -->
<script type="module" src="index.js"></script>
</body>
</html>
```

### activity.js
```javascript
/**
 * Fetches a random activity from the external API.
 * @returns {Promise<string>} A promise that resolves with a random activity.
 */
export async function getRandomActivity() {
    try {
        // Fetch data from the API
        const response = await fetch('https://www.boredapi.com/api/activity/');
        // Parse the JSON response
        const data = await response.json();
        // Return the random activity
        return data.activity;
    } catch (error) {
        // If an error occurs during fetching, throw an error
        throw new Error("Failed to fetch activity");
    }
}

```
### Документирование кода

Код был документирован с использованием комментариев в стиле JSDoc, описывающих назначение каждой функции и метода.

## Заключение

В результате выполнения данной работы было успешно разработано мини-приложение "Activity for Captain Smith" на языке JavaScript. Приложение предоставляет капитану Смиту новые занятия при каждом обновлении страницы, используя продвинутые функции JavaScript, такие как асинхронные запросы, модули и обработка ошибок.

В процессе разработки была реализована структура проекта, где основная логика была вынесена в отдельный модуль `activity.js`, который отвечает за получение случайных активностей с внешнего ресурса. Кроме того, был разработан модуль `index.js`, который обновляет активность на веб-странице каждую минуту.

Важным аспектом работы стало документирование кода с использованием комментариев в стиле JSDoc, что обеспечило понятность и читаемость кода для других разработчиков.

Понимание работы с промисами и асинхронным JavaScript, а также умение эффективно использовать их в разработке веб-приложений, является важным навыком для современного веб-разработчика. Реализация этого проекта позволила закрепить и применить эти знания на практике.


### Контрольные вопросы:

1. **Что возвращает функция fetch?**
   - Функция fetch возвращает объект Promise.

2. **Что представляет собой Promise?**
   - Promise представляет асинхронную операцию, которая может завершиться успешно или с ошибкой.

3. **Какие методы доступны у объекта Promise?**
   - У объекта Promise доступны методы then() и catch() для обработки успешного выполнения и ошибок соответственно.

4. **Каковы основные различия между использованием async/await и Promise?**
   - async/await - это синтаксический сахар над промисами, делающий код более читаемым и понятным. async позволяет определить асинхронную функцию, а await ожидает выполнения промиса внутри асинхронной функции.
