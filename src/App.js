import React, { Component } from 'react';
import './App.css';


const Title = ({todoCount}) => {
  return (<div>
       <div>
          <h1>to-do ({todoCount})</h1>
       </div>
    </div>);
};

const TodoForm = ({addTodo, invalidInput, onChangeText}) => {
  // Input Tracker
  let input;
  // Return JSX
  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        addTodo(input.value);
        input.value = '';
      }}>
      <div className={invalidInput ? "has-error" : ""}>
        <input onChange={onChangeText} className="form-control col-md-4 input-color" ref={node => {
          input = node;
        }} />
      </div>
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
    this.addTodo = this.addTodo.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    // Set initial state
    this.state = {
      todos: [{ text: 'Test', id: 0 }], idCounter: 1
    }
  }

  // Add todo handler
  addTodo(val){
    if (!val) {
      this.setState({ invalidInput: true });
      return;
    }

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

  onChangeText(text){
    this.setState({invalidInput: false})
  }

  render(){
    // Render JSX
    return (
      <div>
        <Title todoCount={this.state.todos.length}/>
        <TodoForm
          invalidInput={this.state.invalidInput}
          addTodo={this.addTodo}
          onChangeText={this.onChangeText}
        />
        <TodoList
          todos={ this.state.todos }
          remove={this.handleRemove}
        />
      </div>
    );
  }
}

export default TodoApp;
