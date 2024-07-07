document.getElementById('rentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateRent();
});

function calculateRent() {
    const rentAmount = parseFloat(document.getElementById('rentAmount').value);
    const includeTax = document.querySelector('input[name="includeTax"]:checked').value === 'yes';
    
    let actualRent, withholdingAmount, healthInsurance;
    
    if (includeTax) {
        actualRent = rentAmount;
        withholdingAmount = Math.round(actualRent * 0.1);
        healthInsurance = Math.round(actualRent * 0.0211);
    } else {
        actualRent = Math.round(rentAmount / (1 - 0.1 - 0.0211));
        withholdingAmount = Math.round(actualRent * 0.1);
        healthInsurance = Math.round(actualRent * 0.0211);
    }
    
    document.getElementById('contractRent').textContent = formatNumber(Math.round(rentAmount));
    document.getElementById('withholdingAmount').textContent = formatNumber(withholdingAmount);
    document.getElementById('healthInsurance').textContent = formatNumber(healthInsurance);
    document.getElementById('actualRent').textContent = formatNumber(actualRent);
    
    document.getElementById('results').classList.remove('hidden');
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

document.querySelectorAll('.tax-toggle input').forEach(input => {
    input.addEventListener('change', function() {
        // 當切換時，如果已經顯示了結果，則重新計算
        if (!document.getElementById('results').classList.contains('hidden')) {
            calculateRent();
        }
    });
});
