import { createContext, useContext, useEffect, useReducer } from "react";
import { getTodos, addTodo, deleteTodo, updateTodoStatus } from "../service/todoService";

const TodoContext = createContext();

const todoReducer = (state, action) => {
    switch (action.type) {
        case "SET_TODOS":
            return { ...state, todos: action.payload };
        case "ADD_TODO":
            return { ...state, todos: [action.payload, ...state.todos] };
        case "DELETE_TODO":
            return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
        case "UPDATE_TODO_STATUS":
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? { ...todo, status: action.payload.status } : todo
                ),
            };
        case "SET_PAGE":
            return { ...state, page: action.payload };
        default:
            return state;
    }
};

export const TodoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, { todos: [], page: 1, limit: 5, totalCount: 100 });

    // useEffect(() => {
    //     fetchTodos();
    // }, [state.page]);

    const fetchTodos = async () => {
        const data = await getTodos(state.page, state.limit);
        dispatch({ type: "SET_TODOS", payload: data });
    };

    const handleAddTodo = async (title) => {
        const newTodo = await addTodo({ title, status: "pending" });
        dispatch({ type: "ADD_TODO", payload: newTodo });
    };

    const handleDeleteTodo = async (id) => {
        await deleteTodo(id);
        dispatch({ type: "DELETE_TODO", payload: id });
    };

    const handleUpdateTodoStatus = async (id, todoUpdated) => {
        await updateTodoStatus(id, todoUpdated);
        dispatch({ type: "UPDATE_TODO_STATUS", payload: { id, ...todoUpdated } });
    };

    const handleSetPage = (newPage) => {
        dispatch({ type: "SET_PAGE", payload: newPage });
    };

    return (
        <TodoContext.Provider value={{ ...state, handleAddTodo, handleDeleteTodo, handleUpdateTodoStatus, handleSetPage }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = () => {
    return useContext(TodoContext);
};
