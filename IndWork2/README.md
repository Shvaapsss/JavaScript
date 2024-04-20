# Отчёт о проделанной работе: Разработка мини-приложения Activity for Captain Smith на JavaScript

## Введение:

Целью данной работы было разработать мини-приложение на языке JavaScript для капитана Смита, которое будет предлагать новые занятия при каждом обновлении страницы. Приложение должно использовать продвинутые функции JavaScript, включая асинхронный JavaScript, модули и обработку ошибок.

### Процесс разработки

#### Создание структуры проекта
Проект был организован в соответствии с требованиями:

- Создан основной файл HTML `index.html`.
- Создан файл стилей `index.css`.
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
