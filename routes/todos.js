let express = require('express');
let router = express.Router();
let Todo = require('./../models/todo');

router.get('/', function (request, response) {
    Todo.all((err, todos) => response.status(STATUS_CODE.OK).json(todos));
});

router.post('/', (request, response) => {
    let newTodo = request.body;
    Todo.add(newTodo);
    response.status(STATUS_CODE.CREATED).send();
});

router.put('/:id', (request, response) => {
    let id = request.params.id;
    let updatedTodo = request.body;
    updatedTodo.id = parseInt(id);
    Todo.update(updatedTodo, (err, data) => {
        if (err) {
            response.status(STATUS_CODE.NOT_FOUND, 'The task is not found').send();
        } else {
            response.status(STATUS_CODE.NO_CONTENT).send(data);
        }
    });
});

router.delete('/:id', (request, response) => {
    let id = parseInt(request.params.id);
    Todo.delete(id, (err) => {
        if (err) {
            response.status(STATUS_CODE.NOT_FOUND).send();
        } else {
            response.status(STATUS_CODE.OK).send();
        }
    });
});

module.exports = router;
