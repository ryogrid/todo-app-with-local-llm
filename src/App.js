import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('light');
  const [showStats, setShowStats] = useState(false);

  // Load todos from localStorage on component mount
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (e) {
      console.error("Failed to load todos from localStorage", e);
      setTodos([]);
    }
    
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (e) {
      console.error("Failed to load theme from localStorage", e);
      setTheme('light');
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (e) {
      console.error("Failed to save todos to localStorage", e);
    }
  }, [todos]);

  // Save theme preference
  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
      document.body.className = theme;
    } catch (e) {
      console.error("Failed to save theme to localStorage", e);
    }
  }, [theme]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        category: 'personal',
        priority: 'medium',
        dueDate: null,
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const filteredTodos = todos.filter(todo => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && !todo.completed) || 
                         (filter === 'completed' && todo.completed);
    
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  // Statistics calculation
  const getStats = () => {
    const total = todos.length;
    const completed = completedCount;
    const active = activeCount;
    
    const categories = {};
    const priorities = { high: 0, medium: 0, low: 0 };
    
    todos.forEach(todo => {
      if (todo.category) {
        categories[todo.category] = (categories[todo.category] || 0) + 1;
      }
      
      if (todo.priority) {
        priorities[todo.priority] = (priorities[todo.priority] || 0) + 1;
      }
    });
    
    return { total, completed, active, categories, priorities };
  };

  const stats = getStats();

  return (
    <div className={`App ${theme}`}>
      <div className="todo-app">
        <h1>Advanced Todo App</h1>
        
        <div className="app-controls">
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search todos..."
              className="search-input"
            />
          </div>
          
          <div className="theme-toggle">
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="theme-btn"
            >
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </div>
          
          <div className="stats-toggle">
            <button 
              onClick={() => setShowStats(!showStats)}
              className="stats-btn"
            >
              {showStats ? 'Hide Stats' : 'Show Stats'}
            </button>
          </div>
        </div>

        <div className="input-container">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new todo..."
          />
          <button onClick={addTodo}>Add</button>
        </div>

        {showStats && (
          <div className="stats-panel">
            <h3>Statistics</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-value">{stats.total}</span>
                <span className="stat-label">Total Tasks</span>
              </div>
              <div className="stat-card completed">
                <span className="stat-value">{stats.completed}</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-card active">
                <span className="stat-value">{stats.active}</span>
                <span className="stat-label">Active</span>
              </div>
            </div>
            
            {Object.keys(stats.categories).length > 0 && (
              <div className="category-stats">
                <h4>By Category</h4>
                {Object.entries(stats.categories).map(([category, count]) => (
                  <div key={category} className="category-item">
                    <span>{category}</span>
                    <span className="category-count">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <TodoList 
          todos={filteredTodos} 
          toggleTodo={toggleTodo} 
          deleteTodo={deleteTodo} 
          theme={theme}
        />
        
        <div className="todo-footer">
          <span className="items-left">{activeCount} items left</span>
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={filter === 'active' ? 'active' : ''} 
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={filter === 'completed' ? 'active' : ''} 
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          {completedCount > 0 && (
            <button className="clear-completed" onClick={clearCompleted}>
              Clear completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
