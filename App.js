import React, { Component } from 'react';
import './App.css';


const Title = ({todoCount}) => {
  return (<div>
       <div>
          <h2 className="heading">To-Do ({todoCount})</h2>
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
        <input onChange={onChangeText} className="form-control col-md-12 input-color" ref={node => {
          input = node;
        }} />
      </div>
      <br />
    </form>
  );
};

const Todo = ({todo, remove, MouseOut, MouseOver, style}) => {
  // Each Todo
  return (<div className="row spacing1" >
    <div className="col-xs-9">
      <div className="blocking1"
      onMouseOver={() => {MouseOver(todo.id)}}
      onMouseOut={() => {MouseOut(todo.id)}}
      style={style(todo.id)}
      >{todo.text}
      </div></div><div className="col-xs-2 spacing2"> <button className="btn btn-default" onClick={() => {remove(todo.id)}} style={style(todo.id)}>X</button>
  </div></div>);
}

const TodoList = ({todos, remove, MouseOut, MouseOver, style}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove} MouseOut={MouseOut} MouseOver={MouseOver} style={style}/>)
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
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.style = this.style.bind(this);

    // Set initial state
    this.state = {
      hoverId:'',
      todos: [{ text: 'Test', id: 0}], idCounter: 1
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
  style(id) {
      // this.state.hovered
      if(this.state.hoverId!==id)
      {
        return { fontSize: '12px' }
      }else {
        return { fontSize: '14px' }
      }

    }
    onMouseOver(id) {
        this.setState({hoverId:id});

    }

    onMouseOut(id) {
        this.setState({hoverId:''});
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
          MouseOver={this.onMouseOver}
          MouseOut={this.onMouseOut}
          style={this.style}
        />
      </div>
    );
  }
}

export default TodoApp;
