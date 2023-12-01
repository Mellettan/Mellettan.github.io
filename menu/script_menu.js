const basket = document.querySelector('#basket');
const orderButton = basket.querySelector('.basket__order-button');
const itemElements = document.querySelectorAll('.itemT');
const clearButton = basket.querySelector('.basket__clear-button');
const total = basket.querySelector('.basket__total');
const sortAscButton = basket.querySelector('.basket__sort-asc');
const sortDescButton = basket.querySelector('.basket__sort-desc');
const filterButton = basket.querySelector('.basket__filter');

const items = [];

// Метод установки элементов массива, необходимый для удаления и сортировки
function setItems(newItems) {
    for (const item of [...items]) {
        removeItem(item);
    }

    for (const item of newItems) {
        basket.insertBefore(item, basket.firstElementChild.nextElementSibling);
        items.push(item);
    }

    updateTotal();
}

// Расширение класса Array методом remove 
Array.prototype.remove = function (value) {
    const index = this.indexOf(value);
    if (index !== -1) {
        this.splice(index, 1);
    }
}

function removeItem(item) {
    items.remove(item);
    item.remove();
}

// Функция добавления нового элемента. ПРИМЕР:
/*
<div class="item"><span class="item__title">asd</span><span class="item__price">123₽</span>
	<div class="item__controls">
		<button class="item__change-quantity-add">+</button><span class="item__quantity-current">1</span>
		<button class="item__change-quantity-sub">-</button>
		<button class="item__delete-button"><i class="fa-regular fa-trash-can icons"></i></button>
	</div>
</div>
*/

function addItem(title, price) {
    const item = document.createElement('div');
    item.className = 'item';
    basket.insertBefore(item, basket.firstElementChild.nextElementSibling);

    const item_t = document.createElement('span');
    item_t.className = 'item__title';
    item_t.textContent = `${title}`
    item.appendChild(item_t);
	
	const item_p = document.createElement('span');
    item_p.className = 'item__price';
    item_p.textContent = `${price}₽`
    item.appendChild(item_p);

    const controls = document.createElement('div');
    controls.className = 'item__controls';
    item.appendChild(controls);

	const add = document.createElement('button');
    add.className = 'item__change-quantity-add';
    add.textContent = '+';
    controls.appendChild(add);
    add.addEventListener('click', () => changeItemQuantity(item, price, +1));
	
    const current = document.createElement('span');
    current.className = 'item__quantity-current';
    current.textContent = 1;
    controls.appendChild(current);

    const sub = document.createElement('button');
    sub.className = 'item__change-quantity-sub';
    sub.textContent = '-';
    controls.appendChild(sub);
    sub.addEventListener('click', () => {
        if (parseInt(current.textContent) > 1) {
            changeItemQuantity(item, price, -1);
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'item__delete-button';
    const del = document.createElement('i');
    del.className = 'fa-regular fa-trash-can icons';
    deleteButton.appendChild(del);
    controls.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        removeItem(item);
        updateTotal();
    });

    items.push(item);
}

// Функция изменения кол-ва товара
function changeItemQuantity(item, price, delta) {
    const current = item.querySelector('.' + 'item__quantity-current');
    current.textContent = parseInt(current.textContent) + delta;

    const itemPrice = item.querySelector('.' + 'item__price');
    itemPrice.textContent = `${getItemPrice(item) + price * delta}₽`;
    updateTotal();
}

// Функция, возвращающая стоимость товара
function getItemPrice(item) {
    const price = item.querySelector('.' + 'item__price');
    return parseFloat(price.textContent.substring(0, price.textContent.length - 1));
}

function updateTotal() {
    let sum = 0;
    for (const child of basket.querySelectorAll('.' + 'item')) {
        sum += parseFloat(child.querySelector('.' + 'item__price').textContent);
    }

    total.textContent = `Общая сумма: ${sum}₽`;
}

orderButton.addEventListener('click', () => {
    alert(`Ваш заказ на сумму ${total.textContent.slice(13)} успешно произведён!`);
});

// Функция для проверки, содержится ли товар уже в корзине
function isInCart(title) {
    return items.some(item => item.querySelector('.item__title').textContent === title);
}
// Функция поиска элемента по названию
function findItemByTitle(title) {
    return items.find(item => item.querySelector('.item__title').textContent === title);
}

// Проходимся по каждому элементу и добавляем обработчик события при клике
itemElements.forEach(itemElement => {
    itemElement.addEventListener('click', () => {
        // Получаем данные из элемента
        const title = itemElement.querySelector('.item_text').textContent;
        const price = parseFloat(itemElement.querySelector('.item_cost').textContent);

        // Проверяем данные на валидность
        if (!title || isNaN(price)) {
            return;
        }

        if (isInCart(title)) {
            changeItemQuantity(findItemByTitle(title), price, 1)
        }
        else{
        // Вызываем вашу функцию с полученными данными
        addItem(title, price);
        updateTotal();
        }
    });
});




// Обработчик полного очищения корзины
clearButton.addEventListener('click', () => setItems([]));

// Обработчики сортировки
sortAscButton.addEventListener('click', () => {
    setItems([...items.sort((item1, item2) => getItemPrice(item1) - getItemPrice(item2))]);
});

sortDescButton.addEventListener('click', () => {
    setItems([...items.sort((item1, item2) => getItemPrice(item2) - getItemPrice(item1))]);
});

// Обработчик фильтра
let unfiltered = [];
filterButton.addEventListener('click', () => {
    if (unfiltered.length) {
		// выводим неотфильтрованное
		filterButton.innerHTML = '<i class="fa-solid fa-filter icons"></i>'
        setItems([...unfiltered]);
        unfiltered = [];
    } else {
		//сохраняем текущее состояние
        unfiltered = [...items];

        const lower = parseFloat(basket.querySelector('.start').value);
        if (isNaN(lower)) {
            return;
        }

        const upper = parseFloat(basket.querySelector('.end').value);
        if (isNaN(upper)) {
            return;
        }
		
		filterButton.innerHTML = '<i class="fa-solid fa-filter icons" style = "color: orange;"></i>'
		
		// выводим отфильтрованное
        setItems([...items.filter((item) => {
            const price = getItemPrice(item);
            return price >= lower && price <= upper;
        })]);
    }
});
