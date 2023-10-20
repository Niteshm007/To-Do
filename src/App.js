import React, { Component } from 'react';
import './App.css'; 

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: '',
    };
  }
  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.setState({ tasks });
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }


  handleChange = (event) => {
    this.setState({ newTask: event.target.value });
  };

  addTask = () => {
    const { newTask } = this.state;
    if (newTask.trim() !== '') {
      const newTasks = [...this.state.tasks, newTask];
      this.setState({ tasks: newTasks, newTask: '' });
    }
  };

  deleteTask = (index) => {
    const newTasks = [...this.state.tasks];
    newTasks.splice(index, 1);
    this.setState({ tasks: newTasks });
  };

  editTask = (index, newValue) => {
    const newTasks = [...this.state.tasks];
    newTasks[index] = newValue;
    this.setState({ tasks: newTasks });
  };

  render() {
    const { tasks, newTask } = this.state;

    return (
      <div className="todo-list">
        <h1 align='center'>To-Do List</h1>
        <div className="task-input">
          <input 
            type="text"
            value={newTask}
            onChange={this.handleChange}
            placeholder="Enter a new task"
          />
          <button onClick={this.addTask}>Add Task</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task}</span>
              <div className="task-actions">
                <button onClick={() => this.editTask(index, prompt('Edit the task:', task))}>
                  Edit 🛠️ </button>
                <button onClick={() => this.deleteTask(index)}>Delete ❌</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
