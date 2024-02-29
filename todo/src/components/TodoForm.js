import React , {useEffect , useRef , useState} from "react";

export default function TodoForm(props){

    // state variable to store the input value 
    const [input , setInput] = useState(props.edit ? props.edit.value : '');

    //create a reference to input element
    const inputRef = useRef(null);

    //focus on the input element when the compoenent mounts or updates.
    useEffect(()=>{
        inputRef.current.focus();
    })

    //handle changes in the input field and saving it to the input 
    const handleChange = (e) => {
        setInput(e.target.value);
    };


    //handle changes on submit
    const handleSubmit = (e) => {
        e.preventDefault();

        props.onSubmit({ // passing {text : input} as parameter to this function (TodoList.js-parent)
            text : input
        });

        setInput('');

    }

    return(
        <>
        <form  onSubmit={handleSubmit} className="todo-form">
            {props.edit ? (
                <>
                <input
                    placeholder="update your todo"
                    value = {input}
                    name ='text'
                    onChange={handleChange}
                    ref={inputRef}
                    className="todo-input edit"
                />
                <button onClick={handleSubmit} className="todo-button edit ">Update</button>
                
                
                </>
            ):(
                <>
                <input 
                  placeholder="Type your todo"
                  value={input}
                  ref={inputRef}
                  onChange={handleChange}
                  className="todo-input "
                  
                />
                <button onClick={handleSubmit} className="todo-button">Add todo</button>
                
                </>
                )
                
            }
        </form>
        </>
    )
}