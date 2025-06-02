// Класс для работы с API книг
class BookAPI {
  constructor() {
    this.baseUrl = 'https://openlibrary.org/search.json';
    this.books = [];
    this.page = 1;
    this.isLoading = false;
  }

  // Загрузка книг с API
  async fetchBooks(query = 'web development') {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.showLoader();
    
    try {
      const response = await fetch(`${this.baseUrl}?q=${query}&page=${this.page}&limit=3`);
      if (!response.ok) throw new Error('Ошибка сети');
      
      const data = await response.json();
      this.books = [...this.books, ...data.docs];
      this.page++;
      this.renderBooks();
      
    } catch (error) {
      console.error('Ошибка:', error);
      this.showError();
    } finally {
      this.isLoading = false;
      this.hideLoader();
    }
  }

  // Отрисовка книг
  renderBooks() {
    const container = document.getElementById('books-container');
    container.innerHTML = this.books.map(book => `
      <div class="book-card">
        <img src="${this.getCoverUrl(book)}" alt="${book.title}" loading="lazy">
        <div class="book-info">
          <h4>${book.title}</h4>
          <p>${book.author_name?.join(', ') || 'Автор неизвестен'}</p>
          <small>Год: ${book.first_publish_year || 'н/д'}</small>
        </div>
      </div>
    `).join('');
  }

  // Получение URL обложки
  getCoverUrl(book) {
    return book.cover_i 
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : 'images/no-cover.jpg';
  }

  // Показать индикатор загрузки
  showLoader() {
    const container = document.getElementById('books-container');
    if (!container.querySelector('.loading-spinner')) {
      container.innerHTML = '<div class="loading-spinner"></div>';
    }
  }

  // Скрыть индикатор
  hideLoader() {
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) spinner.remove();
  }

  // Показать ошибку
  showError() {
    const container = document.getElementById('books-container');
    container.innerHTML = `
      <div class="error-message">
        <p>⚠️ Не удалось загрузить книги</p>
        <button id="retry-loading">Повторить попытку</button>
      </div>
    `;
    document.getElementById('retry-loading').addEventListener('click', () => this.fetchBooks());
  }
}

// Инициализация
const bookApi = new BookAPI();

// Загрузка при старте и обработка кнопки
document.addEventListener('DOMContentLoaded', () => {
  // Первая загрузка
  bookApi.fetchBooks();

  // Кнопка "Показать ещё"
  document.getElementById('load-more-books')?.addEventListener('click', () => {
    bookApi.fetchBooks();
  });
});