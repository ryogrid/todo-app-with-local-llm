import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, theme }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim() !== '') {
      // In a real app with proper state management, we would update the todo here
      // For now, we'll just switch back to display mode
      setIsEditing(false);
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'work': return '#ff6b6b';
      case 'personal': return '#4ecdc4';
      case 'shopping': return '#45b7d1';
      case 'health': return '#96ceb4';
      case 'learning': return '#feca57';
      default: return '#a29bfe';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${getPriorityClass(todo.priority)} ${theme}`}>
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
        />
      ) : (
        <>
          <div className="todo-content">
            <span className="todo-text" onClick={handleEdit}>
              {todo.text}
            </span>
            
            {(todo.category || todo.dueDate || todo.priority) && (
              <div className="todo-meta">
                {todo.category && (
                  <span 
                    className="category-tag"
                    style={{ backgroundColor: getCategoryColor(todo.category) }}
                  >
                    {todo.category}
                  </span>
                )}
                
                {todo.priority && (
                  <span className={`priority-tag ${getPriorityClass(todo.priority)}`}>
                    {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                  </span>
                )}
                
                {todo.dueDate && (
                  <span className="due-date">
                    Due: {formatDate(todo.dueDate)}
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="todo-actions">
            <button 
              className="toggle-btn"
              onClick={() => onToggle(todo.id)}
            >
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button 
              className="delete-btn"
              onClick={() => onDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;