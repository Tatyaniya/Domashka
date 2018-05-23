/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    createCookie(addNameInput.value, addValueInput.value);
    makeTable();
});

listTable.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        DeleteCookie(e.target.getAttribute('cookie'));
    }
})

// создать куки
function createCookie() {
    let name = addNameInput.value,
        value = addValueInput.value;

    if (name === '' || value === '') {
        return;
    }

    return document.cookie = `${name} = ${value}`;
}

// получение кук
function getCookies() {
    return document.cookie
        .split('; ')
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;

            return obj;
        }, {});
}

// записать куку
function WriteCookie(name, value) {
    let tr = document.createElement('TR'),
        tdName = document.createElement('TD'),
        tdValue = document.createElement('TD'),
        tdDel = document.createElement('TD'),
        buttonDel = document.createElement('button');

    listTable.appendChild(tr);
    tr.appendChild(tdName);
    tr.appendChild(tdValue);
    tr.appendChild(tdDel);
    tdDel.appendChild(buttonDel);

    tdName.innerHTML = name;
    tdValue.innerHTML = value;
    buttonDel.innerHTML = 'удалить';
    buttonDel.setAttribute('cookie', name);

    return tr;
}

// удаление куки
function DeleteCookie() {
    document.cookie = `${name}="";expires=${new Date(0).toUTCString()}`;
}

// фильтрация. Встречается ли подстрока chunk в строке full
function isMatching(full, chunk) {
    if (full.toLowerCase().includes(chunk.toLowerCase())) {
        return true;
    }

    return false;    
}

// записать в таблицу
function makeTable() {
    let chunk = filterNameInput.value,
        cookies = getCookies();// положить сюда все куки

    if (cookies) {
        for (let name in cookies) {
            if (isMatching(name, chunk) || isMatching(cookies[name], chunk)) {
                WriteCookie(name, cookies[name]);
            }
        }
    }

}
