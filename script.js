function togglePlan() {
  const toggleSwitch = document.getElementById('toggle-switch');
  const toggleText = document.getElementById('toggle-text');
  if (toggleSwitch.checked) {
    toggleText.innerText = 'Yearly';
    updatePrices('yearly');
  } else {
    toggleText.innerText = 'Monthly';
    updatePrices('monthly');
  }
}

function updatePrices(planType) {
  const prices = document.querySelectorAll('.price');
  prices.forEach(price => {
    const value = parseFloat(price.dataset[planType]);
    price.innerText = `$${value}/${planType === 'monthly' ? 'month' : 'year'}`;
  });
}

function getPrice(planType, defaultValue) {
  const toggleSwitch = document.getElementById('toggle-switch');
  const priceElement = document.querySelector(`.price[data-${planType}]`);
  return parseFloat(priceElement.dataset[toggleSwitch.checked ? 'yearly' : planType]);
}

async function fetchExchangeRate(baseCurrency, targetCurrency) {
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
  const data = await response.json();
  return data.rates[targetCurrency];
}

async function convertCurrency() {
  const amount = document.getElementById('conversion-amount').value;
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;

  if (!amount) {
    alert('Please enter an amount.');
    return;
  }

  const exchangeRate = await fetchExchangeRate(fromCurrency, toCurrency);
  const convertedAmount = amount * exchangeRate;
  document.getElementById('converted-price').innerText = `Converted amount: ${convertedAmount.toFixed(2)} ${toCurrency}`;
}
