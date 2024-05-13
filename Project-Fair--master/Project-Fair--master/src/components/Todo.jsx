import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTodo, setModalTodo] = useState({});

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        id: Date.now(),
        description: newTodo,
        date: new Date().toLocaleDateString(),
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleRemoveTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (todo) => {
    setModalTodo(todo);
    setShowModal(true);
  };

  const handleUpdateTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === modalTodo.id ? modalTodo : todo
      )
    );
    setShowModal(false);
  };

  return (
    <Container className='bg-dark' style={{height:"100vh"}}>
      <Row className="mt-4">
        <Col>
          <h1>Todo App</h1>
          <Form>
            <Form.Group controlId="formTodo">
              <Form.Control
                type="text"
                placeholder="Enter your todo"
                value={newTodo}
                onChange={handleChange} style={{width:"70%",marginLeft:"200px"}}
              />
            </Form.Group >
            <Button variant="primary" style={{marginLeft:"600px",width:"150px",marginTop:"50px"}}  onClick={handleAddTodo}>
              Add Todo
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2>Pending Todos</h2>
          <ListGroup>
            {todos
              .filter((todo) => !todo.completed)
              .map((todo) => (
                <ListGroup.Item key={todo.id}>
                  <Form.Check
                    type="checkbox"
                    label={`${todo.description} - ${todo.date}`}
                    onChange={() => handleToggleComplete(todo.id)}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleRemoveTodo(todo.id)}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleEditTodo(todo)}
                  >
                    Edit
                  </Button>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
        <Col>
          <h2>Completed Todos</h2>
          <ListGroup>
            {todos
              .filter((todo) => todo.completed)
              .map((todo) => (
                <ListGroup.Item key={todo.id}>
                  <Form.Check
                    type="checkbox"
                    label={`${todo.description} - ${todo.date}`}
                    checked
                    onChange={() => handleToggleComplete(todo.id)}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleRemoveTodo(todo.id)}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleEditTodo(todo)}
                  >
                    Edit
                  </Button>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={modalTodo.description}
                onChange={(e) => setModalTodo({ ...modalTodo, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                value={modalTodo.date}
                onChange={(e) => setModalTodo({ ...modalTodo, date: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateTodo}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;
