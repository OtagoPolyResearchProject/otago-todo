import React, { Component } from 'react';
import './App.css';


const Title = ({todoCount}) => {
  return (<div>
       <div>
          <h1>to-do ({todoCount})</h1>
       </div>
    </div>);
};

const TodoForm = ({addTodo}) => {
  // Input Tracker
  let input;
  // Return JSX
  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        addTodo(input.value);
        input.value = '';
      }}>
      <input className="form-control col-md-12" ref={node => {
        input = node;
      }} />
      <br />
    </form>
  );
};

const Todo = ({todo, remove}) => {
  // Each Todo
  return (<div href="#" className="list-group-item" >
    {todo.text}<button onClick={() => {remove(todo.id)}}>Delete</button>
  </div>);
}

const TodoList = ({todos, remove}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/>)
  });
  return (<div className="list-group" style={{marginTop:'30px'}}>{todoNode}</div>);
}

// Contaner Component
// Todo Id
window.id = 0;
class TodoApp extends Component {
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      todos: [{ text: 'Test', id: 0 }], idCounter: 1
    }
  }

  // Add todo handler
  addTodo(val){
    // Assemble data
    const todo = { text: val, id: this.state.idCounter }
    const newTodos = this.state.todos;
    newTodos.push(todo);
    // Update data
    this.setState({ todos: newTodos, idCounter: this.state.idCounter + 1 });
  }
  // Handle remove
  handleRemove(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.todos.filter((todo) => {
     return (todo.id !== id);
    });

    this.setState({ todos: remainder });
  }

  render(){
    // Render JSX
    return (
      <div>
        <Title todoCount={this.state.todos.length}/>
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList
          todos={ this.state.todos }
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}

export default TodoApp;
