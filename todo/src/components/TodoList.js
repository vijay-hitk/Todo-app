import React, { useEffect, useState } from "react";

import { ToastContainer , toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import Todo from "./Todo";
import TodoForm from "./TodoForm";

import Spinner from './ReactSpinner';






function TodoList(){
    //state variables 
    const [todos ,setTodos] = useState([]);
    const [filter , setFilter] = useState('All');
    const [loading , setLoading] = useState(true);

    //fetch todos from the api on component mounting 

    useEffect(() =>{
        fetchTodos();
    },[]);

    //fetch todos from api 
const fetchTodos = () => {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
            .then(data => {
                setTodos(data);
                setLoading(false);
            })
            .catch(error=>{
                alert('An error occurred' + error);
                setLoading(false);
            })

}

//Add a new todo list 
const addTodo = async (todo) => {
    // test whether a string val is empty or only contains space
    if(!todo.text || /^\s*$/.test(todo.text)){
        return;
    }


const newTodo = {
    title : todo.text,
    completed : false 
}
try{
    //send a POST request to the api to add a todo
    const response = await fetch('https://jsonplaceholder.typicode.com/todos',{
        method : 'POST',
        headers : {
            'content-type' : 'application/json'
        },
        body : JSON.stringify(newTodo)
    });
    const data = await response.json();

    //update the todos state with new todos and show a success toast
    setTodos((prevTodos) => [data , ...prevTodos]);
    toast.success("Todo added successfully");
}catch(error){
    console.log(error);
}

};

//Update an existing Todo
const updateTodo = async (todoId,newValue) => {
    //validate the updated todo
    if(!newValue.text || /^\s*$/.test(newValue.text)){ return;}

    const updatedTodo = {
        title : newValue.text,
        completed : newValue.isComplete 
    }

    try{
        //send a PUT request to update the todo
        await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`,{
            method: 'PUT',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify(updatedTodo)
        })
        //update the todo state with updated state
        setTodos((prevTodos) => 
               prevTodos.map((todo) =>
                  todo.id === todoId ? {...todo , ...updatedTodo} : todo ));
        toast.info('todo updated successfully');

    } catch(error){
        console.log(error);
    }
};


//delete a tod0s
const removeTodo = async (id) => {
    try{
     await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
        method : 'DELETE',
       
     });
     //Update the todo state by filtering the removed todo
     setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
     toast.error("Todo removed successfully");  //.error for showing in red 

    }catch(error){
        console.log(error);

    }
}

//Mark a todo as complete or Incomplete

    const completeTodo = async id => {
        const todoToUpdate = todos.find(todo => todo.id === id);
        const updatedTodo = {
          ...todoToUpdate,
          completed: !todoToUpdate.completed
        };
    try{
        //send a PUT request to the API to update the completion status
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
            method:'PUT',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(updatedTodo)
        });

        //update the todos state with the updated completion status
        setTodos(prevTodos =>
            prevTodos.map(todo => (todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo))
          );


    }catch(error){
         console.log(error);
         }

}

//filter todo based upon selected options
const filterTodos = () => {
    switch(filter){
        case 'Complete' : 
            return todos.filter((todo) => todo.completed);
        case 'Incomplete' : 
            return todos.filter((todo) => !todo.completed);
        default :
            return todos;
    }
};

//handle filter option change 
const handleFilterChange = (e) => {
    setFilter(e.target.value);
}
//clear all todos
const clearAllTodos = (e) => {
    setTodos([]);
    toast.warning("All todos cleared");
}



    return(
        <div className="todo-app">
            <h1 className='h1-heading'>Write Your today's task here.</h1>
            <ToastContainer position="top-right" />
            <TodoForm onSubmit={addTodo}/>
            <div className="filter-container">
                <select onChange={handleFilterChange} className="filter-select" id="filter" value={filter}> 
                    <option value="All">All</option>
                    <option value="Complete">Complete</option>
                    <option value="Incomplete">Incomplete</option>
                </select>
                <button onClick={clearAllTodos} className="clear-all-button">
                    clear All
                </button>
            </div>

            {loading ? (<Spinner />) : (
                <div className="todoList-Container">
                    <Todo
                        todos = {filterTodos()}
                        completeTodo = {completeTodo}
                        removeTodo = {removeTodo}
                        updateTodo = {updateTodo}
                    />
                </div>
                
                
                
                )}


        
        
        
        </div>
    );
}

export default TodoList;