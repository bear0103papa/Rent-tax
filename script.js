document.getElementById('rentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateRent();
});

function calculateRent() {
    const rentAmount = parseFloat(document.getElementById('rentAmount').value);
    const includeTax = document.getElementById('includeTax').value === 'yes';
    
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
    
    document.getElementById('contractRent').textContent = Math.round(rentAmount);
    document.getElementById('withholdingAmount').textContent = withholdingAmount;
    document.getElementById('healthInsurance').textContent = healthInsurance;
    document.getElementById('actualRent').textContent = actualRent;
    
    document.getElementById('results').classList.remove('hidden');
}
