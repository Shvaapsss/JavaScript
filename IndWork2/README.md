# Отчёт о лабораторной работе №2

## Цель работы
Целью данной лабораторной работы является ознакомление с продвинутыми функциями JavaScript, включая асинхронный JavaScript, модули и обработку ошибок.

## Описание проекта
Проект представляет собой мини-приложение, разработанное для капитана Смита, чтобы помочь ему находить занятия во время поездок. Приложение получает случайные активности с внешнего ресурса и отображает их на веб-странице.

## Структура проекта
- `index.html`: основная HTML-страница
- `index.css`: файл стилей
- `src/`: директория с JavaScript файлами
  - `index.js`: основной код JavaScript
  - `activity.js`: логика получения данных со стороннего ресурса

## Реализация
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

## Проверочные вопросы
1. **Что возвращает функция `fetch`?**
   - Функция `fetch` возвращает объект `Promise`.
2. **Что представляет собой Promise?**
   - Promise представляет асинхронную операцию, которая может завершиться успешно или с ошибкой.
3. **Какие методы доступны у объекта Promise?**
   - У объекта Promise доступны методы `then()` и `catch()` для обработки успешного выполнения и ошибок соответственно.
4. **Каковы основные различия между использованием async/await и Promise?**
   - async/await - это синтаксический сахар над промисами, делающий код более читаемым и понятным. async позволяет определить асинхронную функцию, а await ожидает выполнения промиса внутри асинхронной функции.

## Запуск проекта
Проект не требует дополнительной настройки. Достаточно открыть файл `index.html` в браузере.

## Результаты
Проект успешно реализует функциональность получения случайной активности и её отображение на веб-странице. Обновление активности происходит каждую минуту без перезагрузки страницы.

