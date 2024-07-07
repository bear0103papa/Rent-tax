document.addEventListener('DOMContentLoaded', function() {
    const rentAmountInput = document.getElementById('rentAmount');
    const taxToggle = document.querySelector('.tax-toggle');
    const generateImageBtn = document.getElementById('generateImage');
    const downloadLink = document.getElementById('downloadLink');
    const imageContainer = document.getElementById('imageContainer');

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
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 1000;

        // 設置背景
        ctx.fillStyle = '#000033';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 設置文字樣式
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';

        // 繪製標題
        ctx.fillText('廖美倫工商記帳士事務所 租金扣繳計算結果', canvas.width / 2, 70);

        // 繪製計算結果
        ctx.font = '24px Arial';
        ctx.textAlign = 'left';
        const results = [
            `合約租金金額: ${document.getElementById('contractRent').textContent}`,
            `是否含稅: ${document.getElementById('taxIncluded').checked ? '是' : '否'}`,
            `租金扣繳金額: ${document.getElementById('withholdingAmount').textContent}`,
            `二代健保補充保費金額(2.11%): ${document.getElementById('healthInsurance').textContent}`,
            `實際租金金額: ${document.getElementById('actualRent').textContent}`
        ];
        results.forEach((result, index) => {
            ctx.fillText(result, 50, 140 + index * 40);
        });

        // 繪製聯繫信息
        ctx.font = '20px Arial';
        const contactInfo = [
            '我們是一家擁有逾27年豐富經驗，由經過專業執照認證記帳士事務所，',
            '專注於提供高品質的稅務諮詢服務。',
            '無論您計畫成立新公司，或是尋求穩定可信賴的記帳服務，',
            '我們誠摯歡迎您在工作日致電我們進行諮詢。',
            '如需進一步了解我們，請隨時聯繫：',
            '名稱：廖美倫工商記帳士事務所',
            '電話：(03)4596769'
        ];
        contactInfo.forEach((line, index) => {
            ctx.fillText(line, 50, 400 + index * 30);
        });

        // 顯示圖片
        const img = new Image();
        img.src = canvas.toDataURL('image/png');
        imageContainer.innerHTML = '';
        imageContainer.appendChild(img);

        // 更新下載連結
        downloadLink.href = img.src;
        downloadLink.style.display = 'inline-block';
    });
});
