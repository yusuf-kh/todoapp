const API_ROOT = 'http://localhost:3000/api/todos';

const todoList = document.querySelector('#todo-list');
const addButton = document.getElementById('add-btn');
const tabs = document.querySelector('#tabs');

// Data store and API integration
const todoDataStore = (function () {
    const store = {
        loading: '',
        error: false,
        errorMessage: '',
        data: [],
        activeTab: "all",
    };

    async function fetchTodos() {
        const data = await fetch(API_ROOT);
        const todoArr = await data.json();
        store.data = todoArr;
        return todoArr;
    }

    function getTodo(todoId = '') {
        if (!todoId) {
            return store.data;
        }
        return store.data.filter(({id}) => +id === +todoId)[0];
    }

    function addTodo(newTodo, callback = () => {
    }) {
        fetch(`${API_ROOT}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newTodo)
        })
            .then(() => {
                const newRow = {
                    id: store.data.length + 1,
                    completed: false,
                    ...newTodo
                }
                store.data = [...store.data, newRow];
                callback(newRow);
                console.log('ADD Success:', newTodo);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function updateTodo(todo, callback = () => {
    }) {
        fetch(`${API_ROOT}/${todo.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(todo)
        })
            .then(() => {
                store.data = store.data.map((item) => todo.id === item.id ? todo : item);
                callback();
                console.log('UPDATE Success:', todo);
            })
            .catch((error) => {
                console.error('Error:', error);
                return false;
            });
    }

    function deleteTodo(todo, callback = () => {
    }) {
        fetch(`${API_ROOT}/${todo.id}/`, {
            method: 'DELETE'
        })
            .then(() => {
                store.data = store.data.filter((item) => todo.id !== item.id);
                callback();
                console.log('DELETE Success:', todo);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function setActiveTab(tab = "all") {
        store.activeTab = tab;
    }

    return {
        getTodo,
        addTodo,
        fetchTodos,
        deleteTodo,
        updateTodo,
        setActiveTab
    };

})();

// DOM Manipulation
const actions = (function () {
    function clearInputField() {
        document.getElementById("todo-input").value = "";
    }

    async function addTodosFromStorage() {
        todoList.innerHTML = "";
        const todos = await todoDataStore.fetchTodos();
        for (let todo of todos) {
            addNewRow(todo);
        }
    }

    function addCloseButtonToElement(element) {
        const span = document.createElement("SPAN");
        const txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.onclick = events.onCloseBtnClick;
        span.appendChild(txt);
        element.appendChild(span);
    }

    function addNewRow({title, completed, id}) {
        const li = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.className = "todovalue";
        const t = document.createTextNode(title);
        if (completed) {
            li.className = "checked";
        }
        li.setAttribute('data-id', id);
        textSpan.appendChild(t);
        li.appendChild(textSpan);
        document.getElementById("todo-list").appendChild(li);
        clearInputField();
        addCloseButtonToElement(li);
    }

    function selectTab(tab) {
        tabs.childNodes.forEach(function (tab) {
            tab.className = "";
        });
        tab.className = "active";
    }

    function showSelectedTabList(tab) {
        let tabList = todoDataStore.getTodo()

        switch (tab) {
            case 'completed': {
                tabList = tabList.filter((item) => !!item.completed);
                break;
            }
            case 'pending': {
                tabList = tabList.filter((item) => !item.completed);
                break;
            }
            default: {
            }
        }

        todoList.innerHTML = "";
        tabList.forEach(function (todo) {
            addNewRow(todo);
        });
    }

    return {
        addTodosFromStorage,
        addNewRow,
        selectTab,
        showSelectedTabList,
    };
})();

// Event Listeners
const events = (function () {
    function addClickListenerOnListItems() {
        todoList.addEventListener('click', function (ev) {
            if (ev.target.tagName === 'LI') {
                const id = ev.target.getAttribute('data-id');
                const data = todoDataStore.getTodo(id);
                todoDataStore.updateTodo({...data, completed: data.completed ? 0 : 1}, function () {
                    ev.target.classList.toggle('checked');
                });
            }
        }, false);
    }

    function addClickListenerOnTabs() {
        tabs.addEventListener('click', function (event) {
            if (event.target.tagName === 'LI') {
                const tab = event.target;
                const activeTab = tab.getAttribute('data-type');
                actions.selectTab(tab);
                todoDataStore.setActiveTab(activeTab);
                actions.showSelectedTabList(activeTab);
            }
        }, false);
    }

    function addClickListenerOnAddButton() {
        addButton.addEventListener('click', function () {
            const inputValue = getInputValue();
            if (inputValue === '') {
                alert("You must write something!");
                return;
            }
            todoDataStore.addTodo({
                title: inputValue
            }, function (row) {
                actions.addNewRow(row);
            });
        }, false);
    }

    function onCloseBtnClick() {
        const li = this.parentElement;
        const id = parseInt(li.getAttribute('data-id'));
        todoDataStore.deleteTodo({id}, function () {
            actions.addTodosFromStorage()
        });
    }

    function getInputValue() {
        return document.getElementById("todo-input").value;
    }

    function addListeners() {
        document.addEventListener('DOMContentLoaded', function () {
            addClickListenerOnListItems();
            addClickListenerOnAddButton();
            addClickListenerOnTabs();
        });
    }

    return {
        addListeners,
        onCloseBtnClick
    };
})();

const init = function () {
    events.addListeners();
    actions.addTodosFromStorage();
    window.getTodoItems = todoDataStore.getTodo;
};

init();
