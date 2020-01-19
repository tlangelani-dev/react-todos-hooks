import React, { useState } from 'react';
import './App.css';

function Todo({todo, index, completeTodo, deleteTodo}) {
    return (
        <div className="todo" style={{textDecoration: todo.isComplete ? 'line-through' : ''}}>
            {todo.text}
            <div>
                <button onClick={() => completeTodo(index)}>Complete</button>
                <button onClick={() => deleteTodo(index)}>X</button>
            </div>
        </div>
    )
}

function TodoForm({addTodo}) {
    const [value, setValue] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="input" value={value} placeholder="Add Todo..." onChange={e => setValue(e.target.value)} />
        </form>
    )
}

// lets create a functional component shall we
function App() {
    const [todos, setTodos] = useState([
        {
            text: 'Learn about React',
            isComplete: false
        },
        {
            text: 'Buy a House',
            isComplete: true
        },
        {
            text: 'Buy a Car',
            isComplete: false
        },
        {
            text: 'Meet some friends',
            isComplete: false
        }
    ]);

    const addTodo = text => {
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
    };

    const completeTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isComplete = true;
        setTodos(newTodos);
    };

    const deleteTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
        <div className="app">
            <div className="todo-list">
                {todos.map((todo, idx) => (
                    <Todo key={idx} index={idx} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
                ))}
                <TodoForm addTodo={addTodo} />
            </div>
        </div>
    )
}

export default App;
