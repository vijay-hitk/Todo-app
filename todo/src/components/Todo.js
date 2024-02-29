import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { TiEdit } from 'react-icons/ti';
import { RiCloseCircleLine } from 'react-icons/ri';

export default function Todo({todos , completeTodo , removeTodo , updateTodo}){
    //state to track the todo being edited 
    const [edit , setEdit] = useState({
        id:null,
        value : ''
    });

    //function to handle the submission of updated todo
    const submitUpdate = (value) => {
        updateTodo(edit.id , value); //call this function from parent component to update
        setEdit({id : null , value :''}); //reset the edit state after updating 

    };

    // if there is todo being edited , render update form to edit 
    if(edit.id){
        return <TodoForm edit ={edit} onSubmit={submitUpdate}/>;
    }




    return(<>
        {/* //render each to do item */}
        {todos.map((todo,index) => (
            <div 
             className={todo.completed ? 'todo-row complete' : 'todo-row'}
             key={index}
             >
            <div className="todo-checkbox">
                <input type="checkbox"
                       checked ={todo.completed}
                       id = {`todo-checkbox-${todo.id}`}
                       onChange={() => completeTodo(todo.id)} //call this function from parent component to toggle completion status.

                />
                <label htmlFor={`todo-checkbox-${todo.id}`}></label>

            </div>
            <div className="todo-text"> 
                {todo.title}
            </div>
            <div className="icons">
                {/* Edit icon : click on this icon to edit todo  */}
                <TiEdit 
                  onClick = {() => setEdit({id : todo.id , value : todo.title})}
                  className='edit-icon'
                 />
                 {/* Delete icon : click on this icon remove todo  */}
                 <RiCloseCircleLine 
                 onClick= {() => removeTodo(todo.id)} //call this function to remove the todo
                 className="delete-icon"
                 />
            </div>
        </div>

        )
     )}

 </>)
}