function toggle(media) {
  if (media.matches) { // Если медиа запрос совпадает
    menuBtn.classList.remove('open');
    navList.classList.add('hide');
    menuOpen=false;
  }
}

const media = window.matchMedia("(min-width: 480px)");
toggle(media); // Вызов функции прослушивателя во время выполнения
media.addListener(toggle); // Присоединить функцию прослушивателя при изменении состояния
