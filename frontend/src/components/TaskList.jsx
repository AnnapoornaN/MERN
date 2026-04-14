import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Task from './Task';

const TaskList = ({ todos, onToggleCompleted, onDeleteTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state text-center py-4">
        <p className="mb-1 fw-semibold">No tasks yet</p>
        <p className="mb-0 text-secondary">Create your first todo to test the live database connection.</p>
      </div>
    );
  }

  return (
    <ListGroup variant="flush">
      {todos.map((todo) => (
        <ListGroup.Item key={todo._id} className="px-0 py-3 border-bottom">
          <Task todo={todo} onToggleCompleted={onToggleCompleted} onDeleteTodo={onDeleteTodo} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TaskList;
