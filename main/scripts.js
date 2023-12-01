// Настраиваем карусель
$('.carousel').slick({
    centerMode: true,
    slidesToShow: 1,
    variableWidth: true
  });

// Получаем текущую дату
const currentDate = new Date();
const day = currentDate.getDate(); 
const month = currentDate.getMonth() + 1; 


const ElementOffer3 = document.querySelector('.req_day');
ElementOffer3.textContent = "Только " + (`${day}.${month}`);

// Перенаправление на страницу сборки своего вкуса
function redirectToBuildPage() {
    window.location.href = '../builder/build.html';
}
