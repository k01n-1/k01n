document.addEventListener('DOMContentLoaded', function() {
    const vacanciesList = document.getElementById('vacancies-list');
    const filterDepartment = document.getElementById('filter-department');
    const addVacancyBtn = document.getElementById('add-vacancy-btn');
    const vacancyForm = document.getElementById('vacancy-form');
    const submitVacancy = document.getElementById('submit-vacancy');
    const cancelVacancy = document.getElementById('cancel-vacancy');

    // Пример начальных данных (можно заменить на загрузку из API)
    let vacancies = [
        { id: 1, title: "Веб-дизайнер", department: "design", description: "Опыт работы от 2 лет. Знание Figma, Photoshop." },
        { id: 2, title: "Frontend-разработчик", department: "development", description: "Требуются навыки React, Vue или Angular." },
        { id: 3, title: "SMM-менеджер", department: "marketing", description: "Ведение соцсетей, создание контента." }
    ];

    // Отображение вакансий
    function renderVacancies(filter = 'all') {
        vacanciesList.innerHTML = '';
        const filtered = filter === 'all' 
            ? vacancies 
            : vacancies.filter(v => v.department === filter);

        filtered.forEach(vacancy => {
            const vacancyCard = document.createElement('div');
            vacancyCard.className = 'vacancy-card';
            vacancyCard.innerHTML = `
                <h4>${vacancy.title}</h4>
                <span class="department">${getDepartmentName(vacancy.department)}</span>
                <div class="description">${vacancy.description}</div>
                <button class="delete-vacancy" data-id="${vacancy.id}">Удалить</button>
            `;
            vacanciesList.appendChild(vacancyCard);

            // Клик по вакансии (раскрытие описания)
            vacancyCard.addEventListener('click', function(e) {
                if (!e.target.classList.contains('delete-vacancy')) {
                    this.classList.toggle('active');
                }
            });

            // Удаление вакансии
            vacancyCard.querySelector('.delete-vacancy').addEventListener('click', function(e) {
                e.stopPropagation();
                if (confirm('Удалить вакансию?')) {
                    vacancies = vacancies.filter(v => v.id !== vacancy.id);
                    renderVacancies(filterDepartment.value);
                }
            });
        });
    }

    // Названия отделов
    function getDepartmentName(key) {
        const departments = {
            design: "Дизайн",
            development: "Разработка",
            marketing: "Маркетинг"
        };
        return departments[key];
    }

    // Фильтрация вакансий
    filterDepartment.addEventListener('change', function() {
        renderVacancies(this.value);
    });

    // Показать/скрыть форму добавления
    addVacancyBtn.addEventListener('click', function() {
        vacancyForm.classList.remove('hidden');
    });

    cancelVacancy.addEventListener('click', function() {
        vacancyForm.classList.add('hidden');
    });

    // Добавление новой вакансии
    submitVacancy.addEventListener('click', function() {
        const title = document.getElementById('vacancy-title').value;
        const department = document.getElementById('vacancy-department').value;
        const description = document.getElementById('vacancy-description').value;

        if (!title) {
            alert('Укажите должность!');
            return;
        }

        const newVacancy = {
            id: Date.now(), // Уникальный ID
            title,
            department,
            description
        };

        vacancies.push(newVacancy);
        renderVacancies(filterDepartment.value);
        vacancyForm.classList.add('hidden');
        
        // Очистка формы
        document.getElementById('vacancy-title').value = '';
        document.getElementById('vacancy-description').value = '';
    });

    // Первая загрузка
    renderVacancies();
});