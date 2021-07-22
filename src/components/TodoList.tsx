import * as React from 'react';
import { Button, Input, Flex, Checkbox, Heading } from '@chakra-ui/react';
import useStore from '../store';
import { nanoid } from 'nanoid';

function TodoListItems() {
  const store = useStore();

  function handleToggle(id: string) {
    store.toggle(id);
  }

  return (
    <>
      {store.todos.map(todo => (
        <Flex pt={2} key={nanoid()}>
          <Checkbox
            onChange={() => handleToggle(todo.id)}
            isChecked={todo.done}
          />
          <Input
            mx={2}
            value={todo.text}
            onChange={e => store.update(todo.id, e.target.value)}
          />
          <Button onClick={() => store.deleteTodo(todo.id)}>Delete</Button>
        </Flex>
      ))}
    </>
  );
}

function TodoList() {
  return (
    <>
      <Heading>Todo List</Heading>
      <TodoListItems />
    </>
  );
}

export default TodoList;
