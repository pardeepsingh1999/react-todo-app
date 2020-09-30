import React, { Component } from 'react';
import Todo from './Todo';

export default class TodoList extends Component {
    
    render() {
        return (
            this.props.filterTodoList.map(todo => {
                return <Todo key={todo.id} 
                        updateTodo={this.props.updateTodo}
                        toggleTodo={this.props.toggleTodo} 
                        deleteOneTodo={this.props.deleteOneTodo} 
                        todo={todo} />
            })
        )
    }
}
