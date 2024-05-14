import Navbar from './components/Navbar'
import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
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
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
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
                    <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> <span className='mx-2'>Show Finished Todos</span>
                </div>
                <div className="todos">
                    {todos.length === 0 && (
                        <div className="p-5">
                            No Todos to display
                        </div>
                    )}
                    {todos.map((item) => {
                        return (showFinished || !item.isCompleted) &&
                            <div className="max-w-md space-y-1 text-gray-500 list-item list-decimal m-7">
                                <div className="flex flex-col gap-5 m-5 sm:flex-row justify-between">
                                    <input
                                        name={item.id}
                                        onChange={(e) => handleCheckbox(e)}
                                        id="default-checkbox"
                                        type="checkbox"
                                        checked={item.isCompleted}
                                        className="text-blue-600 bg-gray-100 border-gray-300 rounded mt-1.5"
                                    />
                                    <div
                                        key={item.id}
                                        className={item.isCompleted ? 'line-through' : ''}
                                    >{item.todo}</div>
                                    <div className="flex items-center">
                                        <button
                                            onClick={(e) => handleEdit(e, item.id)}
                                            type="button"
                                            className="text-white bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-5"
                                        >
                                            <FaRegEdit />
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(item.id)}
                                            type="button"
                                            className="text-white bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5"
                                        >
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