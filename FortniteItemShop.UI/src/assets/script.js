// Отримуємо всі елементи з класом entry
var flexContainers = document.querySelectorAll(".entry");

// Проходимося по кожному контейнеру
flexContainers.forEach(function (container) {
  // Отримуємо всі дочірні елементи контейнера
  var childElements = container.children;

  // Перевіряємо кількість дочірніх елементів
  if (childElements.length <= 5) {
    // Якщо елементів 5 або менше, встановлюємо flex-wrap: nowrap
    container.style.flexWrap = "nowrap";
  } else {
    // Якщо елементів 6 або більше, встановлюємо flex-wrap: wrap
    container.style.flexWrap = "wrap";

    for (var i = 0; i < childElements.length; i++) {
      childElements[i].style.width = "250px"; // Максимальна ширина елемента не більше 300px
    }
  }
});
