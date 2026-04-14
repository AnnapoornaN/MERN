import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TaskList from './components/TaskList';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5050/api/todos';

  // Fetch todos from backend on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(backendUrl);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [backendUrl]);

  const handleInputChange = (event) => {
    setNewTodoText(event.target.value);
  };

  const handleAddTodo = async () => {
    if (!newTodoText.trim()) return; // Prevent adding empty todos

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTodoText }),
      });

      const newTodo = await response.json();
      setTodos([...todos, newTodo]); // Add new todo to state
      setNewTodoText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleCompleted = async (id) => {
    try {
      const updatedTodo = { ...todos.find((todo) => todo._id === id) };
      updatedTodo.completed = !updatedTodo.completed;

      const response = await fetch(`${backendUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });

      if (response.ok) {
        setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      }
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="app-shell">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={7}>
            <Card className="todo-card shadow-lg border-0">
              <Card.Body className="p-4 p-md-5">
                <div className="mb-4 text-center">
                  <p className="eyebrow mb-2">MongoDB + React Todo</p>
                  <h1 className="display-6 fw-bold mb-2">Todo List</h1>
                  <p className="text-secondary mb-0">
                    Add tasks, mark them complete, and keep everything synced with your live database.
                  </p>
                </div>

                <InputGroup className="mb-4">
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="What do you need to get done?"
                    value={newTodoText}
                    onChange={handleInputChange}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleAddTodo();
                      }
                    }}
                  />
                  <Button variant="primary" size="lg" onClick={handleAddTodo}>
                    Add Task
                  </Button>
                </InputGroup>

                <TaskList
                  todos={todos}
                  onToggleCompleted={handleToggleCompleted}
                  onDeleteTodo={handleDeleteTodo}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
