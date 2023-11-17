let balance = 0;
    let transactions = [];
    let receiveAddress = generateRandomAddress(); // Генеруємо адресу при завантаженні сторінки
    let qrCodeGenerated = false;

    // Function to generate random balance
    function generateRandomBalance() {
        if (balance === 0) {
            balance = (Math.random() * 100).toFixed(2);
            document.getElementById("userBalance").innerText = balance + ' ETH';
        }
    }

    // Function to generate random address
    function generateRandomAddress() {
        const characters = '0123456789ABCDEF';
        let address = '0x';
        for (let i = 0; i < 40; i++) {
            address += characters[Math.floor(Math.random() * characters.length)];
        }
        return address;
    }

    // Function to show content based on menu selection
    function showContent(option) {
    document.getElementById("content").style.display = "none";
    document.getElementById("balanceContainer").style.display = "none";
    document.getElementById("sendContainer").style.display = "none";
    document.getElementById("receiveContainer").style.display = "none";
    document.getElementById("historyContainer").style.display = "none";

    switch (option) {
        case 'Home':
            document.getElementById("content").style.display = "block";
            break;
        case 'Balance':
            generateRandomBalance();
            document.getElementById("balanceContainer").style.display = "block";
            document.getElementById("userBalance").innerText = balance + ' ETH'; // Оновлено рядок
            break;
        case 'Send':
            document.getElementById("sendContainer").style.display = "block";
            break;
        case 'Receive':
            document.getElementById("receiveContainer").style.display = "block";
            document.getElementById("receiveAddress").innerText = receiveAddress;
            break;
        case 'History':
            displayTransactionHistory();
            document.getElementById("historyContainer").style.display = "block";
            break;
        default:
            document.getElementById("content").style.display = "block";
    }
}

    // Function to send funds
    function sendFunds() {
        const sendAmount = parseFloat(document.getElementById("sendAmount").value);
        const recipientAddress = document.getElementById("recipientAddress").value;
        if (!isNaN(sendAmount) && sendAmount > 0 && sendAmount <= balance && recipientAddress) {
            // Виконати транзакцію
            balance -= sendAmount;

            // Генерувати унікальний хеш для транзакції (простий приклад, насправді потрібно використовувати безпечні методи)
            const transactionHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

            // Записати транзакцію в історію
            const transaction = {
                sender: receiveAddress,
                recipient: recipientAddress,
                amount: sendAmount,
                hash: transactionHash
            };

            transactions.push(transaction);
            displayTransactionHistory();
            generateRandomBalance();
        } else {
            alert("Invalid amount, insufficient balance, or missing recipient address.");
        }
    }
    // Function to confirm sending funds

 function confirmSend() {
    // Показати стилізоване підтвердження
    document.getElementById("confirmationModal").style.display = "block";
}

function sendConfirmedFunds() {
    // Викликати вашу функцію sendFunds() тут
    sendFunds();

    // Закрити стилізоване підтвердження
    closeConfirmation();
}

function closeConfirmation() {
    // Закрити стилізоване підтвердження
    document.getElementById("confirmationModal").style.display = "none";
}



    // Функція для відображення історії транзакцій
    function displayTransactionHistory() {
        const transactionList = document.getElementById("transactionList");
        transactionList.innerHTML = "";
        transactions.forEach(transaction => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>From:</strong> ${transaction.sender}, <strong>To:</strong> ${transaction.recipient}, <strong>Amount:</strong> ${transaction.amount} ETH, <strong>Hash:</strong> ${transaction.hash}`;
            transactionList.appendChild(listItem);
        });
    }

    // Function to generate QR code
    function generateQRCode() {
        if (!qrCodeGenerated) {
            const qrcode = new QRCode(document.getElementById("qrcode"), {
                text: receiveAddress,
                width: 128,
                height: 128
            });
            qrCodeGenerated = true;
        }
    }
     // Function to fetch cryptocurrency data and create charts
    async function loadCryptoCharts() {
        const bitcoinData = await fetchCryptoData('bitcoin');
        const ethereumData = await fetchCryptoData('ethereum');
        const solanaData = await fetchCryptoData('solana');
        const avalancheData = await fetchCryptoData('avalanche');

        createChart('bitcoinChart', 'Bitcoin Price', bitcoinData);
        createChart('ethereumChart', 'Ethereum Price', ethereumData);
        createChart('solanaChart', 'Solana Price', solanaData);
        createChart('avalancheChart', 'Avalanche Price', avalancheData);
    }

    // Function to fetch cryptocurrency data from an API
     // JavaScript-код
    async function loadCryptoCharts() {
        const bitcoinData = await fetchCryptoData('bitcoin');
        const ethereumData = await fetchCryptoData('ethereum');
        const solanaData = await fetchCryptoData('solana');
        const avalancheData = await fetchCryptoData('avalanche');

        createChart('bitcoinChart', 'Bitcoin Price', bitcoinData);
        createChart('ethereumChart', 'Ethereum Price', ethereumData);
        createChart('solanaChart', 'Solana Price', solanaData);
        createChart('avalancheChart', 'Avalanche Price', avalancheData);
    }

    // Function to fetch cryptocurrency data from an API
async function fetchCryptoData(crypto) {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
    const data = await response.json();
    return data[crypto].usd;
}


    function createChart(canvasId, label, data) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1D', '1W', '1M', '3M', '1Y'],
                datasets: [{
                    label: label,
                    data: [data, data * 1.2, data * 1.5, data * 0.8, data * 2],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    async function fetchCryptoData(crypto) {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        const data = await response.json();
        return data[crypto].usd;
    }

    loadCryptoCharts();