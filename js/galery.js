// document.addEventListener("DOMContentLoaded", () => {
  let slideIndex = 1;

  function openModal() {
    document.getElementById("myModal").style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    document.getElementById("myModal").style.display = "none";
    document.body.style.overflow = "auto";
  }

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "flex";
  }

  window.onclick = function (event) {
    // Проверяем, является ли целевой элемент изображением
    if (event.target.tagName !== "IMG") {
      // Если нет, закрываем модальное окно
      closeModal();
    }
  };

  // Функция для остановки всплытия события
  function stopPropagation(event) {
    event.stopPropagation();
  }

  // Обработчик клавиатурных событий
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      // Если нажата клавиша влево, переключаемся на предыдущий слайд
      plusSlides(-1);
    } else if (event.key === "ArrowRight") {
      // Если нажата клавиша вправо, переключаемся на следующий слайд
      plusSlides(1);
    }
  });

  // Обработчик клавиатурных событий
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      // Если нажата клавиша Escape, закрываем модальное окно
      closeModal();
    }
  });
  // 
// });
