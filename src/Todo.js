import React, { Component } from 'react';
import './Todo.css';

export default class Todo extends Component {

    handleTodoClick = () => {
        // console.log(this.props)
        this.props.toggleTodo(this.props.todo.id)
    }

    render() {
        return (
            
            <div className="m-4">

                <div id={ this.props.todo.id } className="d-flex mb-3 child__note">
                        <div className="p-2">
                            <input 
                                className="child__note__checkbox mt-1"
                                type="checkbox" 
                                checked={ this.props.todo.complete }
                                onChange={ this.handleTodoClick } 
                            />
                        </div>
                        <div className="p-2">
                            <p className={this.props.todo.complete ? 'completed' : ''}>
                                {this.props.todo.name}
                            </p>
                        </div>
                        <div className="ml-auto p-2">
                            <button data-toggle="tooltip" title="Delete!" className="btn btn-danger child__delete__note">
                                <i className="far fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>

            </div>

            
        )
    }
}
