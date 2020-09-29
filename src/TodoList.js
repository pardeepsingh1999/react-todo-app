import React, { Component } from 'react';
import Todo from './Todo';

export default class TodoList extends Component {
    
    render() {
        return (
            this.props.todos.map(todo => {
                return <Todo key={todo.id} toggleTodo={this.props.toggleTodo} todo={todo} />
            })
        )
    }
}
