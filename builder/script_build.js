const dropzone = document.getElementById('dropzone');
const mixBtn = document.getElementById('mixBtn');
const restartBtn = document.getElementById('restartBtn')
let draggedCount = 0;

document.querySelectorAll('.flavor').forEach(flavor => {
    flavor.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
    });
    flavor.addEventListener('click', function(event) {
        if (!flavor.classList.contains('dropped') && draggedCount < 3) {
            draggedCount++;
            flavor.classList.add('dropped');
            dropzone.appendChild(flavor);
    
            if (draggedCount === 3) {
                mixBtn.style.display = 'block';
            }
        }
    });
});

dropzone.addEventListener('dragover', function(event) {
    event.preventDefault();
});

dropzone.addEventListener('drop', function(event) {
    event.preventDefault();
    const flavorId = event.dataTransfer.getData('text/plain');
    const flavor = document.getElementById(flavorId);
    
    if (!flavor.classList.contains('dropped') && draggedCount < 3) {
        draggedCount++;
        flavor.classList.add('dropped');
        dropzone.appendChild(flavor);

        if (draggedCount === 3) {
            mixBtn.style.display = 'block';
        }
    }
});

mixBtn.addEventListener('click', function() {
    const droppedFlavors = document.querySelectorAll('.flavor.dropped');
    let flavors = '';
    droppedFlavors.forEach((flavor, index) => {
        flavors += flavor.alt;
    });
    document.getElementById('result').textContent = `Ваш промокод на скидку: ${flavors.charAt(0).toUpperCase() + flavors.slice(1)}`;
    restartBtn.style.display = 'block';
});

// Перенаправление на страницу сборки своего вкуса
function redirectToBuildPage() {
    window.location.href = '../builder/build.html';
}
