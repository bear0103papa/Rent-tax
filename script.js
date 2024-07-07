document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rentForm');
    const taxToggle = document.querySelector('.tax-toggle');
    const results = document.getElementById('results');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateRent();
    });

    taxToggle.addEventListener('change', function(e) {
        if (e.target.type === 'radio') {
            if (!results.classList.contains('hidden')) {
                calculateRent();
            }
        }
    });

    function calculateRent() {
        const rentAmount = parseFloat(document.getElementById('rentAmount').value);
        const includeTax = document.getElementById('taxIncluded').checked;
        
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
        
        results.classList.remove('hidden');
    }

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});
