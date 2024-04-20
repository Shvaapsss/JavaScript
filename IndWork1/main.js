const fs = require('fs');

/**
 * Класс для анализа транзакций.
 */
class TransactionAnalyzer {
    /**
     * Создает экземпляр класса TransactionAnalyzer.
     * @param {Array} transactions - Массив объектов, представляющих транзакции.
     */
    constructor(transactions) {
        this.transactions = transactions;
    }

    /**
     * Метод для добавления новой транзакции.
     * @param {Object} transaction - Объект, представляющий новую транзакцию.
     */
    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    /**
     * Метод для получения всех транзакций.
     * @returns {Array} - Массив объектов, представляющих все транзакции.
     */
    getAllTransaction() {
        return this.transactions;
    }

    /**
     * Метод для получения уникальных типов транзакций.
     * @returns {Array} - Массив строк, представляющих уникальные типы транзакций.
     */
    getUniqueTransactionType() {
        const typesSet = new Set();
        this.transactions.forEach(transaction => {
            typesSet.add(transaction.transaction_type);
        });
        return Array.from(typesSet);
    }

    /**
     * Метод для вычисления общей суммы всех транзакций.
     * @returns {number} - Общая сумма всех транзакций.
     */
    calculateTotalAmount() {
        return this.transactions.reduce((total, transaction) => {
            return total + parseFloat(transaction.transaction_amount);
        }, 0);
    }

    /**
     * Метод для вычисления общей суммы транзакций за указанный день.
     * @param {number} year - Год.
     * @param {number} month - Месяц (JavaScriptLab1-12).
     * @param {number} day - День месяца.
     * @returns {number} - Общая сумма транзакций за указанный день.
     */
    calculateTotalAmountByDate(year, month, day) {
        return this.transactions.reduce((total, transaction) => {
            const transactionDate = new Date(transaction.transaction_date);
            if ((!year || transactionDate.getFullYear() === year) &&
                (!month || transactionDate.getMonth() + 1 === month) &&
                (!day || transactionDate.getDate() === day)) {
                return total + parseFloat(transaction.transaction_amount);
            } else {
                return total;
            }
        }, 0);
    }

    /**
     * Метод для получения транзакций указанного типа.
     * @param {string} type - Тип транзакции ('debit' или 'credit').
     * @returns {Array} - Массив объектов, представляющих транзакции указанного типа.
     */
    getTransactionByType(type) {
        return this.transactions.filter(transaction => transaction.transaction_type === type);
    }

    /**
     * Метод для получения транзакций в указанном диапазоне сумм.
     * @param {number} minAmount - Минимальная сумма.
     * @param {number} maxAmount - Максимальная сумма.
     * @returns {Array} - Массив объектов, представляющих транзакции в указанном диапазоне сумм.
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter(transaction => {
            const amount = parseFloat(transaction.transaction_amount);
            return amount >= minAmount && amount <= maxAmount;
        });
    }

    /**
     * Метод для вычисления общей суммы дебетовых транзакций.
     * @returns {number} - Общая сумма дебетовых транзакций.
     */
    calculateTotalDebitAmount() {
        return this.transactions
            .filter(transaction => transaction.transaction_type === 'debit')
            .reduce((total, transaction) => {
                return total + parseFloat(transaction.transaction_amount);
            }, 0);
    }

    /**
     * Метод для поиска месяца с наибольшим количеством транзакций.
     * @returns {string} - Месяц с наибольшим количеством транзакций.
     */
    findMostTransactionsMonth() {
        const transactionsPerMonth = {};
        this.transactions.forEach(transaction => {
            const monthYear = transaction.transaction_date.slice(0, 7); // YYYY-MM
            transactionsPerMonth[monthYear] = (transactionsPerMonth[monthYear] || 0) + 1;
        });
        const maxMonthYear = Object.keys(transactionsPerMonth).reduce((a, b) => transactionsPerMonth[a] > transactionsPerMonth[b] ? a : b);
        return maxMonthYear.slice(5); // Возвращает только месяц
    }

    /**
     * Метод для поиска месяца с наибольшим количеством дебетовых транзакций.
     * @returns {string} - Месяц с наибольшим количеством дебетовых транзакций.
     */
    findMostDebitTransactionMonth() {
        const debitTransactionsPerMonth = {};
        this.transactions.forEach(transaction => {
            if (transaction.transaction_type === 'debit') {
                const monthYear = transaction.transaction_date.slice(0, 7); // YYYY-MM
                debitTransactionsPerMonth[monthYear] = (debitTransactionsPerMonth[monthYear] || 0) + 1;
            }
        });
        const maxMonthYear = Object.keys(debitTransactionsPerMonth).reduce((a, b) => debitTransactionsPerMonth[a] > debitTransactionsPerMonth[b] ? a : b);
        return maxMonthYear.slice(5); // Возвращает только месяц
    }

    /**
     * Метод для определения наиболее распространенного типа транзакций.
     * @returns {string} - Наиболее распространенный тип транзакций ('debit', 'credit' или 'equal').
     */
    mostTransactionTypes() {
        const debitCount = this.transactions.filter(transaction => transaction.transaction_type === 'debit').length;
        const creditCount = this.transactions.filter(transaction => transaction.transaction_type === 'credit').length;
        if (debitCount > creditCount) {
            return 'debit';
        } else if (creditCount > debitCount) {
            return 'credit';
        } else {
            return 'equal';
        }
    }

    /**
     * Метод для получения транзакций, совершенных до указанной даты.
     * @param {string} date - Дата в формате 'YYYY-MM-DD'.
     * @returns {Array} - Массив объектов, представляющих транзакции, совершенные до указанной даты.
     */
    getTransactionsBeforeDate(date) {
        return this.transactions.filter(transaction => new Date(transaction.transaction_date) < new Date(date));
    }

    /**
     * Метод для поиска транзакции по ее уникальному идентификатору.
     * @param {string} id - Уникальный идентификатор транзакции.
     * @returns {Object|null} - Объект, представляющий найденную транзакцию или null, если транзакция не найдена.
     */
    findTransactionById(id) {
        return this.transactions.find(transaction => transaction.transaction_id === id);
    }

    /**
     * Метод для получения массива описаний транзакций.
     * @returns {Array} - Массив строк, представляющих описания транзакций.
     */
    mapTransactionDescriptions() {
        return this.transactions.map(transaction => transaction.transaction_description);
    }
    /**
     * Метод для получения транзакций в указанном диапазоне дат.
     * @param {string} startDate - Начальная дата диапазона в формате 'YYYY-MM-DD'.
     * @param {string} endDate - Конечная дата диапазона в формате 'YYYY-MM-DD'.
     * @returns {Array} - Массив объектов, представляющих транзакции, проведенные в указанном диапазоне дат.
     */
    getTransactionsInDateRange(startDate, endDate) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        return this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate >= startDate && transactionDate <= endDate;
        });
    }

    /**
     * Метод для получения транзакций с указанным торговым местом или компанией.
     * @param {string} merchantName - Название торгового места или компании.
     * @returns {Array} - Массив объектов, представляющих транзакции, совершенные с указанным торговым местом или компанией.
     */
    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(transaction => transaction.merchant_name === merchantName);
    }

    /**
     * Метод для вычисления среднего значения транзакций.
     * @returns {number} - Среднее значение транзакций.
     */
    calculateAverageTransactionAmount() {
        const totalAmount = this.calculateTotalAmount();
        return totalAmount / this.transactions.length;
    }

}

// Пример использования:
const transactions = require('./transactions.json');

const analyzer = new TransactionAnalyzer(transactions);

// Вывод результатов анализа в консоль
console.log('Unique Transaction Types:', analyzer.getUniqueTransactionType());
console.log('Total Amount:', analyzer.calculateTotalAmount());
console.log('Total Amount in 2019 January 1st:', analyzer.calculateTotalAmountByDate(2019, 1, 1));
console.log('Transactions with type "debit":', analyzer.getTransactionByType('debit'));
console.log('Transactions in Amount Range:', analyzer.getTransactionsByAmountRange(50, 150));
console.log('Total Debit Amount:', analyzer.calculateTotalDebitAmount());
console.log('Month with Most Transactions:', analyzer.findMostTransactionsMonth());
console.log('Month with Most Debit Transactions:', analyzer.findMostDebitTransactionMonth());
console.log('Most Common Transaction Type:', analyzer.mostTransactionTypes());
console.log('Transactions Before Date:', analyzer.getTransactionsBeforeDate('2019-01-03'));
console.log('Find Transaction by ID:', analyzer.findTransactionById('2'));
console.log('Transaction Descriptions:', analyzer.mapTransactionDescriptions());
console.log('Transactions between 2019-01-01 and 2019-01-03:', analyzer.getTransactionsInDateRange('2019-01-01', '2019-01-03'));
console.log('Transactions by Merchant "SuperMart":', analyzer.getTransactionsByMerchant('SuperMart'));
console.log('Average Transaction Amount:', analyzer.calculateAverageTransactionAmount());