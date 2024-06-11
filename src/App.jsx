import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={handleFormSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={newTodo}
              onChange={handleInputChange}
            />
          </form>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" onChange={() => {
            const allCompleted = todos.every(todo => todo.completed);
            setTodos(todos.map(todo => ({ ...todo, completed: !allCompleted })));
          }} />
          <label>
            Mark all as complete
          </label>

          <ul className="todo-list">
            {filteredTodos.map((todo, index) => (
              <li key={index} className={todo.completed ? "completed" : ""}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(index)}
                  />
                  <label>{todo.text}</label>
                  <button className="destroy" onClick={() => handleDelete(index)}></button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{todos.filter(todo => !todo.completed).length}</strong>
            items left
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className={filter === "all" ? "selected" : ""} onClick={() => handleFilterChange("all")}>All</a>
            </li>
            <li>
              <a href="#/" className={filter === "active" ? "selected" : ""} onClick={() => handleFilterChange("active")}>Active</a>
            </li>
            <li>
              <a href="#/" className={filter === "completed" ? "selected" : ""} onClick={() => handleFilterChange("completed")}>Completed</a>
            </li>
          </ul>

          <button className="clear-completed" onClick={handleClearCompleted}>
            Clear completed
          </button>
        </footer>
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </>
  );
}

export default App;
