document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector('.switch input');
  const html = document.documentElement;
  
  // Проверяем сохранённую тему (по умолчанию светлая)
  const savedTheme = localStorage.getItem('theme');
  
  // Если в localStorage есть 'dark' - применяем тёмную тему
  if (savedTheme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      themeToggle.checked = true;
  }
  
  // Обработчик переключения темы
  themeToggle.addEventListener('change', function() {
      if (this.checked) {
          html.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
      } else {
          html.removeAttribute('data-theme');
          localStorage.setItem('theme', 'light');
      }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const menuTrigger = document.querySelector('.primary-nav-trigger');
  const header = document.querySelector('.header');
  
  if (menuTrigger) {
    menuTrigger.addEventListener('click', function(e) {
      e.preventDefault();
      header.classList.toggle('mobile-menu-open');
    });
  }
});