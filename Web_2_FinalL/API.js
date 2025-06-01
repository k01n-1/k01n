// Загрузка книг
async function loadBooks() {
    const container = document.getElementById('books-container');
    try {
      // Показываем индикатор загрузки
      container.innerHTML = '<div class="loading-spinner"></div>';
      
      // Делаем запрос к OpenLibrary API
      const response = await fetch('https://openlibrary.org/search.json?q=web+development&limit=3');
      if (!response.ok) throw new Error('Ошибка загрузки');
      
      const data = await response.json();
      const books = data.docs;
      
      // Очищаем контейнер
      container.innerHTML = '';
      
      // Создаём карточки книг
      books.forEach(book => {
        const coverId = book.cover_i;
        const coverUrl = coverId 
          ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` 
          : 'images/no-cover.jpg';
        
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
          <img src="${coverUrl}" alt="${book.title}" loading="lazy">
          <div class="book-card-content">
            <h4>${book.title}</h4>
            <p>${book.author_name?.join(', ') || 'Автор неизвестен'}</p>
            <small>Год: ${book.first_publish_year || 'н/д'}</small>
          </div>
        `;
        container.appendChild(card);
      });
    } catch (error) {
      container.innerHTML = '<div class="error-message">⚠️ Не удалось загрузить книги</div>';
    }
  }
  
  // Инициализация
  document.addEventListener('DOMContentLoaded', loadBooks);
  
  // Кнопка "Показать ещё"
  document.getElementById('load-more-books').addEventListener('click', loadBooks);