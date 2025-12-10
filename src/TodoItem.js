import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
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

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
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
          <span className="todo-text" onClick={handleEdit}>
            {todo.text}
          </span>
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