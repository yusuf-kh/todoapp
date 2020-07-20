/**
 * Created by aashit.s on 27/06/20.
 */
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    const sql = 'CREATE TABLE IF NOT EXISTS todos (id integer primary key, title, completed integer)';
    db.run(sql);
    db.run('INSERT INTO todos(title, completed) VALUES(?, ?)', 'buy the milk', 0);
    db.run('INSERT INTO todos(title, completed) VALUES(?, ?)', 'rent a car', 1);
    db.run('INSERT INTO todos(title, completed) VALUES(?, ?)', 'feed the cat', 0);
});

class Todo {
    constructor(id, title, completed) {
        this.id = id;
        this.title = title;
        this.completed = 0;
    }

    static all(callback) {
        db.all('SELECT * FROM todos', callback);
    };

    static add(todo) {
        todo.completed = todo.completed ? 1 : 0;
        const sql = 'INSERT INTO todos(title, completed) VALUES(?, ?)';
        db.run(sql, todo.title, todo.completed);
    };

    static update(todo, callback) {
        todo.completed = todo.completed ? 1 : 0;
        const sql = 'UPDATE todos SET title = ?, completed = ? WHERE id = ?';
        db.run(sql, todo.title, todo.completed, todo.id, callback);
    };

    static delete(id, callback) {
        const sql = 'DELETE FROM todos where id = ?';
        db.run(sql, id, callback);
    };
}

module.exports = Todo;
