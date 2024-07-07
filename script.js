document.addEventListener('DOMContentLoaded', function() {
    const rentAmountInput = document.getElementById('rentAmount');
    const taxToggle = document.querySelector('.tax-toggle');
    const results = document.getElementById('results');
    const generateImageBtn = document.getElementById('generateImage');
    const downloadLink = document.getElementById('downloadLink');

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function unformatNumber(str) {
        return parseFloat(str.replace(/,/g, ''));
    }

    rentAmountInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/,/g, '');
        value = value.replace(/\D/g, '');
        if (value) {
            value = parseInt(value, 10);
            e.target.value = formatNumber(value);
        } else {
            e.target.value = '';
        }
        calculateRent();
    });

    taxToggle.addEventListener('change', calculateRent);

    function calculateRent() {
        const rentAmount = unformatNumber(rentAmountInput.value);
        if (!rentAmount) {
            clearResults();
            return;
        }

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
        
        document.getElementById('contractRent').textContent = formatNumber(rentAmount);
        document.getElementById('withholdingAmount').textContent = formatNumber(withholdingAmount);
        document.getElementById('healthInsurance').textContent = formatNumber(healthInsurance);
        document.getElementById('actualRent').textContent = formatNumber(actualRent);
    }

    function clearResults() {
        document.getElementById('contractRent').textContent = '';
        document.getElementById('withholdingAmount').textContent = '';
        document.getElementById('healthInsurance').textContent = '';
        document.getElementById('actualRent').textContent = '';
    }

    generateImageBtn.addEventListener('click', function() {
        html2canvas(document.querySelector('.container')).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            downloadLink.href = imgData;
            downloadLink.style.display = 'inline-block';
        });
    });
});
