import React, { Component } from 'react';
import './Todo.css';

export default class Todo extends Component {

    constructor() {
        super();
    
        this.handleDoubleClickEditTodo = this.handleDoubleClickEditTodo.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    state = {
        isEdit: false,
        editName: ''
    }

    handleTodoClick = () => {
        // console.log(this.props)
        this.props.toggleTodo(this.props.todo.id)
    }

    handleDeleteTodo = () => {
        this.props.deleteOneTodo(this.props.todo.id)
    }

    handleOutsideClick(e) {
        // ignore clicks on the component itself
        console.log(e.keycode)
        if(e.target.type === 'text') return;
        
        this.handleDoubleClickEditTodo()
    }

    handleDoubleClickEditTodo = (e) => {
        if (!this.state.isEdit) {
            document.addEventListener('click', this.handleOutsideClick, false);
            this.setState({editName:this.props.todo.name})
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
            if(this.state.editName.length > 0 ) {
                this.props.updateTodo(this.props.todo.id, this.state.editName)
            } else {
                alert('Empty list not acceptable')
                console.log(this.props.todo.name)
            }
        }
        console.log(this.state.isEdit)

        this.setState({isEdit: !this.state.isEdit})
    }

    handleEditOnChange = (e) => {
        this.setState({editName:e.target.value})
    }

    handleEditKeyDown = (e) => {
        // console.log(todoNameRef.current.value)
    
        if(e.keyCode === 13 && this.props.todo.name.length !== 0) {
          
            this.handleDoubleClickEditTodo()
            if(this.state.editName.length > 0 ) {
                this.props.updateTodo(this.props.todo.id, this.state.editName)
            } else {
                console.log(this.props.todo.name)
            }
        }
    
      };

    render() {

        return (
            
            <div className="m-4 main__child__box">

                <div id={ this.props.todo.id } className="d-flex mb-3 child__note">
                        <div className="p-2">
                            <input 
                                className="child__note__checkbox mt-1"
                                type="checkbox" 
                                checked={ this.props.todo.complete }
                                onChange={ this.handleTodoClick } 
                            />
                        </div>
                        <div className="p-2 todo__data__block">
                            <p onDoubleClick={this.handleDoubleClickEditTodo} 
                            className={`${this.state.isEdit ? 'hide' : 'show'} ${this.props.todo.complete ? 'completed' : ''}`}> 
                                {this.props.todo.name} 
                            </p>
                            <input className={this.state.isEdit ? 'show' : 'hide'} 
                            type="text" value={this.state.editName} 
                            onKeyDown={this.handleEditKeyDown}
                            onChange={this.handleEditOnChange} />                            
                        </div>
                        <div className="ml-auto p-2">
                            <button data-toggle="tooltip" title="Delete!" onClick={this.handleDeleteTodo}
                                    className="btn btn-danger child__delete__note">
                                <i className="far fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>

            </div>

            
        )
    }
}
