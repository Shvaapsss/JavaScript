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
        id: transactions.length + 1, // Увеличиваем ID на 1 относительно предыдущей транзакции
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
        document.getElementById('transactionTable').deleteRow(index);
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
}

document.getElementById('transactionForm').addEventListener('submit', addTransaction);

window.addEventListener('DOMContentLoaded', () => {
    transactions.forEach(transaction => displayTransaction(transaction));
    calculateTotal();
});
