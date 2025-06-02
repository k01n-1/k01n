document.getElementById('calculator-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Получаем данные из формы
    const siteType = document.getElementById('site-type').value;
    const pages = parseInt(document.getElementById('pages').value);
    const design = document.getElementById('design').value;
    const seo = document.getElementById('seo').checked;
    
    // Базовая цена
    let price = 0;
    
    // Расчёт по типу сайта
    switch (siteType) {
        case 'landing':
            price = 7000 + (pages * 500);
            break;
        case 'business':
            price = 13000 + (pages * 800);
            break;
        case 'shop':
            price = 35000 + (pages * 1000);
            break;
    }
    
    // Умножаем на коэффициент дизайна
    if (design === 'premium') price *= 1.5;
    
    // Добавляем SEO
    if (seo) price += 5000;
    
    // Выводим результат
    document.getElementById('total-price').textContent = price.toLocaleString();
    
    // Сохраняем данные (опционально)
    localStorage.setItem('lastCalculation', JSON.stringify({ siteType, pages, design, seo, price }));
});

