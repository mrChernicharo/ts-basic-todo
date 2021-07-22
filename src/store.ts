import create from 'zustand';
import cookie from 'js-cookie';
import { nanoid } from 'nanoid';

// Standard interface and functions
export interface Todo {
  id: string;
  text: string;
  done: boolean;
}

const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: nanoid(),
    text,
    done: false,
  },
];

const updateTodo = (todos: Todo[], id: string, text: string): Todo[] =>
  todos.map(todo => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

const toggleTodo = (todos: Todo[], id: string): Todo[] =>
  todos.map(todo => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

const removeTodo = (todos: Todo[], id: string): Todo[] =>
  todos.filter(todo => todo.id !== id);

// Zustand implementation
type Store = {
  todos: Todo[];
  newTodo: string;
  addTodo: () => void;
  setNewTodo: (text: string) => void;
  update: (id: string, text: string) => void;
  toggle: (id: string) => void;
  deleteTodo: (id: string) => void;
  load: (todos: Todo[]) => void;
};

const useStore = create<Store>((set, get) => ({
  todos: cookie.getJSON('todos') || [],
  newTodo: '',
  load(todos: Todo[]) {
    set(state => ({
      ...state,
      todos: [...state.todos, ...todos],
    }));
  },
  addTodo() {
    set(state => ({
      ...state,
      todos: addTodo(state.todos, state.newTodo),
      newTodo: '',
    }));
  },
  setNewTodo(text: string) {
    set(state => ({
      ...state,
      newTodo: text,
    }));
  },
  update(id: string, text: string) {
    set(state => ({
      ...state,
      todos: updateTodo(state.todos, id, text),
    }));
  },
  toggle(id: string) {
    set(state => ({ ...state, todos: toggleTodo(state.todos, id) }));
  },
  deleteTodo(id: string) {
    set(state => ({ ...state, todos: removeTodo(state.todos, id) }));
  },
}));

export default useStore;
