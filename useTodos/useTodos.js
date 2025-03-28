import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

// ! Valor inicial de los 'todos' en localStorage
const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodos = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init);

    useEffect(() => {
        // ! localStorage solo admite strings
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleNewTodo = (newTodo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: newTodo,
        };
        dispatch(action);
    };

    const handleDeleteTodo = (id) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: id,
        };
        dispatch(action);
    };

    const handleToggleTodo = (id) => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id,
        };
        dispatch(action);
    };

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}
