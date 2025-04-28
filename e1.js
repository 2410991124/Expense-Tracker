const expenseForm = document.getElementById("expenseForm");
const expenseTable = document.getElementById("expenseTable").querySelector("tbody");
const summaryTable = document.getElementById("summaryTable").querySelector("tbody");

const monthlySummaryBtn = document.getElementById("monthlySummary");
const yearlySummaryBtn = document.getElementById("yearlySummary");

let expenses = [];

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value).toFixed(2);

  const expense = { date, category, description, amount: parseFloat(amount) };
  expenses.push(expense);

  renderExpenses();
  expenseForm.reset();
});

function renderExpenses() {
  expenseTable.innerHTML = "";
  expenses.forEach(expense => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.category}</td>
      <td>${expense.description}</td>
      <td>$${expense.amount.toFixed(2)}</td>
    `;

    expenseTable.appendChild(row);
  });
}

monthlySummaryBtn.addEventListener("click", () => {
  const monthlyTotals = {};

  expenses.forEach(expense => {
    const [year, month] = expense.date.split("-");
    const key = `${year}-${month}`;

    if (!monthlyTotals[key]) monthlyTotals[key] = 0;
    monthlyTotals[key] += expense.amount;
  });

  renderSummary(monthlyTotals, "Month");
});

yearlySummaryBtn.addEventListener("click", () => {
  const yearlyTotals = {};

  expenses.forEach(expense => {
    const year = expense.date.split("-")[0];

    if (!yearlyTotals[year]) yearlyTotals[year] = 0;
    yearlyTotals[year] += expense.amount;
  });

  renderSummary(yearlyTotals, "Year");
});

function renderSummary(totals, label) {
  summaryTable.innerHTML = "";

  for (const period in totals) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${label === "Month" ? formatMonth(period) : period}</td>
      <td>$${totals[period].toFixed(2)}</td>
    `;

    summaryTable.appendChild(row);
  }
}

function formatMonth(period) {
  const [year, month] = period.split("-");
  const monthName = new Date(year, month - 1).toLocaleString("default", { month: "long" });
  return `${monthName} ${year}`;
}