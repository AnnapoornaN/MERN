import React from 'react';
import { Button, Form } from 'react-bootstrap';

const Task = ({ todo, onToggleCompleted, onDeleteTodo }) => {
  return (
    <div className="task-item d-flex align-items-center justify-content-between gap-3">
      <div className="d-flex align-items-center gap-3 flex-grow-1">
        <Form.Check
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleCompleted(todo._id)}
          aria-label={`Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
        <span className={todo.completed ? 'task-text completed' : 'task-text'}>
          {todo.text}
        </span>
      </div>
      <Button variant="outline-danger" size="sm" onClick={() => onDeleteTodo(todo._id)}>
        Delete
      </Button>
    </div>
  );
};

export default Task;
