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
        withholdingAmount = actualRent * 0.1;
        healthInsurance = actualRent * 0.0211;
    } else {
        actualRent = rentAmount / (1 - 0.1 - 0.0211);
        withholdingAmount = actualRent * 0.1;
        healthInsurance = actualRent * 0.0211;
    }
    
    document.getElementById('contractRent').textContent = rentAmount.toFixed(2);
    document.getElementById('withholdingAmount').textContent = withholdingAmount.toFixed(2);
    document.getElementById('healthInsurance').textContent = healthInsurance.toFixed(2);
    document.getElementById('actualRent').textContent = actualRent.toFixed(2);
    
    document.getElementById('results').classList.remove('hidden');
}
