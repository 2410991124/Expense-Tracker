document.getElementById('transactionForm').addEventListener('submit', function(event) {

    event.preventDefault();


    const receiverName = document.getElementById('receiverName').value;

    const accountNumber = document.getElementById('accountNumber').value;

    const amount = parseFloat(document.getElementById('amount').value).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });

    const transactionType = document.getElementById('transactionType').value.toUpperCase();

    const transactionDate = new Date(document.getElementById('transactionDate').value).toLocaleDateString();

    const smsAlertText = `

        UBA Bank Alert: ${transactionType} Transaction

        Account Holder: ${receiverName}

        Account No: ${accountNumber}

        ${transactionType}: ${amount}

        Date: ${transactionDate}

        Balance: ₦##,###,###

        This is a simulated transaction alert.

    `;

    const smsAlertBox = document.getElementById('smsAlertBox');

    smsAlertBox.classList.remove('hidden');

    document.getElementById('smsAlertText').textContent = smsAlertText;

});