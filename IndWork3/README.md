# Отчёт о проделанной работе: Лабораторная работа №3 - Разработка веб-приложения для учета личных финансов на JavaScript

## Цель работы
Освоение основ взаимодействия JavaScript с DOM-деревом, разработка веб-приложения для учета личных финансов.

## Настройка и структурирование проекта
- Созданы файлы: `index.html`, `script.js`, `style.css`.
- Подключены файлы стилей и JavaScript к HTML странице.

### index.html:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transaction Management</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<h1>Transaction Management</h1>
<div id="transactionDetails"></div>
<form id="transactionForm">
    <label for="date">Date:</label>
    <input type="datetime-local" id="date" name="date" required><br>
    <label for="amount">Amount:</label>
    <input type="number" id="amount" name="amount" required><br>
    <label for="category">Category:</label>
    <select id="category" name="category" required>
        <option value="Food">Food</option>
        <option value="Shopping">Shopping</option>
        <option value="Entertainment">Entertainment</option>
        <!-- Add more options as needed -->
    </select><br>
    <label for="description">Description:</label>
    <input type="text" id="description" name="description" required><br>
    <button type="submit">Add Transaction</button>
</form>
<div id="totalAmount"></div>
<table id="transactionTable">
    <thead>
    <tr>
        <th>ID</th>
        <th>Date & Time</th>
        <th>Category</th>
        <th>Description</th>
        <th>Action</th>
    </tr>
    </thead>
    <tbody></tbody>
</table>
<script src="script.js"></script>
</body>
</html>
```
### script.js:
```
/**
 * Represents a transaction.
 * @typedef {Object} Transaction
 * @property {number} id - The unique identifier of the transaction.
 * @property {string} date - The date and time of the transaction.
 * @property {number} amount - The amount of the transaction.
 * @property {string} category - The category of the transaction.
 * @property {string} description - The description of the transaction.
 */

/**
 * Array to store transactions.
 * @type {Transaction[]}
 */
const transactions = [];

/**
 * Function to add a transaction to the table and the transactions array.
 * @param {Event} event - The submit event.
 */
function addTransaction(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    const transaction = {
        id: Date.now(), // Уникальный идентификатор на основе временной метки
        date,
        amount,
        category,
        description
    };

    transactions.push(transaction);
    displayTransaction(transaction);
    calculateTotal();
    event.target.reset();
}

/**
 * Function to delete a transaction.
 * @param {number} id - The ID of the transaction to delete.
 */
function deleteTransaction(id) {
    const index = transactions.findIndex(transaction => transaction.id === id);
    if (index !== -1) {
        transactions.splice(index, 1);
        document.getElementById('transactionTable').deleteRow(index + 1); // Используем index + 1 для удаления строки таблицы
        calculateTotal();
    }
}

/**
 * Function to calculate the total amount of transactions and display it.
 */
function calculateTotal() {
    const total = transactions.reduce((acc, curr) => acc + curr.amount, 0);
    document.getElementById('totalAmount').textContent = `Total Amount: ${total}`;
}

/**
 * Function to display detailed information about a transaction.
 * @param {Transaction} transaction - The transaction to display details of.
 */
function showTransactionDetails(transaction) {
    const detailsDiv = document.getElementById('transactionDetails');
    detailsDiv.innerHTML = `
        <h2>Transaction Details</h2>
        <p><strong>ID:</strong> ${transaction.id}</p>
        <p><strong>Date:</strong> ${transaction.date}</p>
        <p><strong>Amount:</strong> ${transaction.amount}</p>
        <p><strong>Category:</strong> ${transaction.category}</p>
        <p><strong>Description:</strong> ${transaction.description}</p>
    `;
}

/**
 * Function to display a transaction in the table.
 * @param {Transaction} transaction - The transaction to display.
 */
function displayTransaction(transaction) {
    const tableBody = document.querySelector('#transactionTable tbody');
    const row = tableBody.insertRow();

    row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description}</td>
        <td><button onclick="deleteTransaction(${transaction.id})">Delete</button></td>
    `;

    if (transaction.amount >= 0) {
        row.style.backgroundColor = 'green';
    } else {
        row.style.backgroundColor = 'red';
    }

    row.addEventListener('click', () => {
        showTransactionDetails(transaction);
    });
}

document.getElementById('transactionForm').addEventListener('submit', addTransaction);

window.addEventListener('DOMContentLoaded', () => {
    transactions.forEach(transaction => displayTransaction(transaction));
    calculateTotal();
});

```

### style.css:
```
body {
    font-family: Arial, sans-serif;
    margin: 20px;
}

h1 {
    text-align: center;
}

form {
    margin-bottom: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

button {
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 3px;
}

button:hover {
    background-color: #45a049;
}

```
## Представление транзакций
- Создан массив `transactions` для хранения транзакций.
- Каждая транзакция представлена объектом с полями: `id`, `date`, `amount`, `category`, `description`.

## Отображение транзакций
- Создана пустая таблица для отображения транзакций.
- Таблица содержит столбцы: ID, Дата и Время, Категория транзакции, Краткое описание транзакции, Действие (кнопка удаления транзакции).

## Добавление транзакций
- Реализована функция `addTransaction()`, добавляющая новую транзакцию в массив и отображающая её на странице.
- Строка таблицы окрашивается в зеленый или красный цвет в зависимости от суммы транзакции.
- В колонке описания отображается краткое описание транзакции.

## Управление транзакциями
- Добавлена кнопка удаления для каждой строки таблицы.
- При клике на кнопку происходит удаление соответствующей транзакции из массива и из таблицы.

## Подсчет суммы транзакций
- Реализована функция `calculateTotal()`, вызываемая после добавления или удаления транзакции.
- Общая сумма транзакций отображается на странице.

## Отображение полной информации о транзакции
- Создан блок для отображения подробного описания транзакции.
- При нажатии на строку с транзакцией в таблице, подробная информация о транзакции отображается в указанном блоке.

## Добавление формы для добавления транзакций
- Добавлена форма на страницу для добавления новых транзакций в таблицу.

## Документирование кода
- Код документирован с использованием стандарта JSDoc для улучшения его читаемости и понимания.

## Контрольные вопросы

1. **Каким образом можно получить доступ к элементу на веб-странице с помощью JavaScript?**
   - Доступ к элементам можно получить с помощью методов `document.getElementById()`, `document.querySelector()`, `document.getElementsByClassName()`.

2. **Что такое делегирование событий и как оно используется для эффективного управления событиями на элементах DOM?**
   - Делегирование событий - это метод обработки событий, при котором обработчик событий назначается родительскому элементу, и события внутри него обрабатываются для его дочерних элементов. Это позволяет эффективно управлять событиями на элементах DOM, особенно при работе с динамически создаваемыми элементами.

3. **Как можно изменить содержимое элемента DOM с помощью JavaScript после его выборки?**
   - Содержимое элемента DOM можно изменить с помощью свойств и методов, таких как `innerHTML`, `textContent`, `setAttribute()`.

4. **Как можно добавить новый элемент в DOM дерево с помощью JavaScript?**
   - Новый элемент можно добавить в DOM дерево с помощью методов `createElement()`, `appendChild()`, `insertBefore()`.
