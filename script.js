const balance = document.getElementById("balance-amount");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions =
  JSON.parse(localStorage.getItem("transactions")) || [];

function saveTransactions() {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "minus" : "plus";

  const li = document.createElement("li");
  li.classList.add(sign);

  li.innerHTML = `
    ${transaction.text}
    <span>
      ${transaction.amount < 0 ? "-" : "+"}
      ₦${Math.abs(transaction.amount).toFixed(2)}
    </span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
      X
    </button>
  `;

  list.appendChild(li);
}

function updateValues() {
  const amounts = transactions.map(item => item.amount);

  const total = amounts
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const incomeTotal = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const expenseTotal = (
    amounts
      .filter(item => item < 0)
      .reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  balance.innerText = `₦${total}`;
  income.innerText = `+₦${incomeTotal}`;
  expense.innerText = `-₦${expenseTotal}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(
    transaction => transaction.id !== id
  );

  saveTransactions();
  init();
}

function addTransaction(e) {
  e.preventDefault();

  if (
    text.value.trim() === "" ||
    amount.value.trim() === ""
  ) {
    return;
  }

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);

  saveTransactions();
  init();

  text.value = "";
  amount.value = "";
}

function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);

  updateValues();
}

form.addEventListener("submit", addTransaction);

init();