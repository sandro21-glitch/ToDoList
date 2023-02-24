import { getStorageItem, setStorageItem } from "./utils.js"

const form = document.getElementById('form')
const formInput = document.getElementById('form-input')
const listsContainer = document.getElementById('lists-container')
const clearAllBtn = document.getElementById('clear--btn')



let listArr = getStorageItem('list')

window.addEventListener('load', () => {
    const storedListArr = [...listArr]
    storedListArr.forEach((list) => {
        renderList(list)
    })
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = formInput.value;
    if(inputValue == null || inputValue === '')return;
    const listRender = listObj(inputValue);
    listArr.push(listRender);
    renderList(listRender);
    setStorageItem('list', listArr)
    console.log(listArr)
    formInput.value = null;

})


function listObj(list) {
    return {
        id: Date.now().toString(),
        completed: false,
        name: list, 
    }
}

function renderList(list) {
    const ul = document.createElement("ul")
    ul.classList.add('w-full')
    ul.innerHTML = `
            <li class="flex items-center justify-between">
            <span id="list-name" class="text-lg ${
                list.completed ? "decoration-green-500 line-through decoration-2" : ""} id="list-name">${list.name}</span>
            <ul class="flex items-center space-x-3 text-lg">
                <li class="cursor-pointer text-green-400 hover:opacity-75"><i id="${list.id}" class="complete fa-solid fa-circle-check"></i></li>
                <li class="cursor-pointer text-blue-700 hover:opacity-75"><i id="${list.id}" class="edit fa-solid fa-pen"></i></li>
                <li class="cursor-pointer text-red-400 hover:opacity-75"><i id="${list.id}" class="remove fa-sharp fa-solid fa-circle-xmark"></i></li>
            </ul>
        </li>
    `
    listsContainer.appendChild(ul)
}


listsContainer.addEventListener("click", (e) => {
    const targetId = e.target.id
    const targetEl = e.target.parentElement.parentElement.parentElement.parentElement
    if(e.target.classList.contains('remove')){
        targetEl.remove()
        listArr = listArr.filter((list) => list.id !== targetId)
        setStorageItem('list', listArr)
        console.log(listArr)
        return listArr
    }
    if(e.target.classList.contains('complete')) {
        const element = targetEl.querySelector('#list-name')
        const findEl = listArr.find((list) => {
            if(list.id === targetId) {
                if(list.completed = true) {
                    element.classList.add('decoration-green-500', 'line-through', 'decoration-2')
                    setStorageItem('list', listArr)
                }
            }
        })
        return findEl
    }
    if(e.target.classList.contains('edit')) {
        let editText = targetEl.innerText
        formInput.value = editText
        targetEl.remove()
        listArr = listArr.filter((list) => list.id !== targetId)
        setStorageItem('list', listArr)
        console.log(listArr)
        return listArr
    }
})

// clear all list
clearAllBtn.addEventListener('click', clearAll)

function clearAll() {
    listsContainer.innerHTML = ''
    const clear = listArr.length = 0;
    setStorageItem('list', listArr)
    return clear
}
  
