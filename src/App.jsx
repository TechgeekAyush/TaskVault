import Navbar from './components/Navbar'
import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [todo, setTodo] = useState('');
    const [showFinished, setshowFinished] = useState(true);
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });

    const saveToLS = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const handleAdd = () => {
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
        setTodo('');
        saveToLS();
    };

    const handleEdit = (e, id) => {
        let filteredTodo = todos.filter((item) => item.id === id);
        let todo = filteredTodo.length > 0 ? filteredTodo[0].todo : '';
        setTodo(todo);
        let newTodos = todos.filter((item) => item.id !== id);
        setTodos(newTodos);
        saveToLS();
    };

    const handleDelete = (id) => {
        let newTodos = todos.filter((item) => item.id !== id);
        setTodos(newTodos);
        saveToLS();
    };

    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = todos.findIndex(item => {
            return item.id === id;
        })
        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos)
        saveToLS()
    };

    const toggleFinished = (e) => {
        setshowFinished(!showFinished)
    }

    useEffect(() => {
        saveToLS();
    }, [todos]);

    return (
        <>
            <Navbar />
            <>
                <div className="p-5">
                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        Add a Todo
                    </h3>
                    <div className="flex flex-col gap-5 sm:flex-row">
                        <input
                            type="text"
                            onKeyDown={(e) => {
                                if (e.key === "Enter")
                                    handleAdd();
                            }}
                            onChange={(e) => setTodo(e.target.value)}
                            value={todo}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                        />
                        <button
                            onClick={handleAdd}
                            type="button"
                            className="text-white bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 mx-10"
                            disabled={todo.length == 0}
                        >
                            Save
                        </button>
                    </div>
                </div>
                <div className="p-5">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                        Your Todos
                    </h3>
                    <div className="flex items-center">
                        <input onChange={toggleFinished} type="checkbox" checked={showFinished} className='checkbox rounded-lg' />
                        <span className='mx-2'>Show Finished Todos</span>
                    </div>
                </div>
                <div className="todos">
                    {todos.length === 0 && (
                        <div className="p-5">
                            No Todos to display
                        </div>
                    )}
                    {todos.map((item) => {
                        return (showFinished || !item.isCompleted) &&
                            <div className="card lg:card-side bg-base-100 shadow-xl my-6">
                                <div className="card-body">
                                    <input name={item.id} onChange={(e) => handleCheckbox(e)} id="default-checkbox" type="checkbox" checked={item.isCompleted} className="checkbox rounded-lg" />
                                    <h2 key={item.id} className={`card-title text-wrap ${item.isCompleted ? 'line-through' : ''}`}>{item.todo}</h2>
                                    <div className="card-actions justify-end">
                                        <button onClick={(e) => handleEdit(e, item.id)} type="button" className="text-white bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-5">
                                            <FaRegEdit />
                                        </button>
                                        <button onClick={(e) => handleDelete(item.id)} type="button" className="text-white bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5">
                                            <MdOutlineDelete />
                                        </button>
                                    </div>
                                </div>
                            </div>
                    })}
                </div>
            </>
        </>
    )
}
export default App