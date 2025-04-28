document.getElementById("budget-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const category = document.getElementById("category").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const period = document.getElementById("period").value;

    createCategory(category, amount, period);
    
    document.getElementById("category").value = "";
    document.getElementById("amount").value = "";
});

function createCategory(category, amount, period) {
    const categoriesList = document.getElementById("categories-list");
    const categoryItem = document.createElement("div");
    categoryItem.classList.add("category-item");

    const categoryName = document.createElement("div");
    categoryName.innerText = `${category} (${period})`;

    const progressBarContainer = document.createElement("div");
    progressBarContainer.classList.add("progress-bar-container");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.style.width = "0%"; 

    progressBarContainer.appendChild(progressBar);

    categoryItem.appendChild(categoryName);
    categoryItem.appendChild(progressBarContainer);

    const expenseInput = document.createElement("input");
    expenseInput.type = "number";
    expenseInput.placeholder = "Enter Expense";
    expenseInput.addEventListener("input", function() {
        updateProgressBar(expenseInput, amount, progressBar);
    });

    categoryItem.appendChild(expenseInput);

    categoriesList.appendChild(categoryItem);
}

function updateProgressBar(expenseInput, budgetAmount, progressBar) {
    const expenseAmount = parseFloat(expenseInput.value);
    const percentageSpent = (expenseAmount / budgetAmount) * 100;
    
    progressBar.style.width = `${Math.min(percentageSpent, 100)}%`;

    if (percentageSpent >= 100) {
        let alert = document.createElement("div");
        alert.classList.add("alert");
        alert.innerText = "You have exceeded your budget!";
        expenseInput.parentElement.appendChild(alert);
    } else {
        const existingAlert = expenseInput.parentElement.querySelector(".alert");
        if (existingAlert) {
            existingAlert.remove();
        }
    }
}