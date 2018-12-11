const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const itemsList = document.querySelector('.itemsList');
const removeAllItemsBtn = document.querySelector('#deleteAll');
const list = JSON.parse(localStorage.getItem('list')) || [];

// TODO:
// Przekreślenie item na todo/liscie zakupów i aktualizacja w list array oraz localStorage
// popracować nad kolorystyką

function appendToList() {
    itemsList.innerHTML = list.map((item, i) => `
        <div class="item ${(item.done ? 'checked' : '')}" data-index="${i}">
            <div class="itemName">${item.text}</div>
            <button type="button" class="deleteItem">${item.icon}</button>
        </div>
    `).join('');
}

function addItemToList(e) {
    e.preventDefault();
    if (itemInput.value === "") {    // checks if input is empty, if true stop function else do nothing
        itemInput.setAttribute('placeholder', "Podaj nazwę");
        return;
    }

    const item = {
        text: itemInput.value,
        done: false,
        icon: '<i class="far fa-trash-alt"></i>'
    }

    list.push(item);
    appendToList();
    // saves items to localStorage
    localStorage.setItem("list", JSON.stringify(list));
    // sets input filed to empty
    itemInput.value = "";
}

function removeItem(e) {
    let button;
    if (e.target && e.target.classList.contains('deleteItem')) {
        button = e.target;
    } else if (e.target && e.target.classList.contains('fa-trash-alt')) {
        button = e.target.parentNode;
    } else {
        return;
    }

    const itemElement = button.parentNode;
    const items = itemElement.parentNode;
    const { index } = itemElement.dataset;

    list.splice(index, 1);

    // get list from localStorage to remove item by index
    // sets item back in localStorage

    localStorage.setItem('list', JSON.stringify(list));

    items.removeChild(itemElement);

    const itemsIndex = document.querySelectorAll('.item');
    itemsIndex.forEach((item, i) => {
        item.setAttribute('data-index', `${i}`);
    });
}

function markAsChecked(e) {
    let item;
    if (e.target.classList.contains('itemName')) {
        item = e.target.parentNode;
    } else if (e.target.classList.contains('item')) {
        item = e.target;
    } else {
        return;
    }

    item.classList.toggle('checked');

    const { index } = item.dataset;
    list[index].done = !list[index].done;

    localStorage.setItem('list', JSON.stringify(list));
}

function removeAllItems() {
    localStorage.removeItem('list');
    list.length = 0;
    itemsList.innerHTML = "";
}




// events 
appendToList();
addItemBtn.addEventListener('click', addItemToList);
itemsList.addEventListener('click', markAsChecked);
itemsList.addEventListener('click', removeItem);
removeAllItemsBtn.addEventListener('click', removeAllItems);