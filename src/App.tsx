import React, { useEffect } from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import TopBar from './components/TopBar';
import TodoList from './components/TodoList';
import TodoAdd from './components/TodoAdd';
import useStore from './store';
import cookie from 'js-cookie';

export function App() {
  const store = useStore();

  useEffect(() => {
    cookie.set('todos', JSON.stringify(store.todos));

    console.log(store.todos);
  }, [store.todos]);

  return (
    <ChakraProvider theme={theme}>
      <Box maxWidth="8xl" margin="auto" p={5}>
        <TopBar />
        <TodoList />
        <TodoAdd />
      </Box>
    </ChakraProvider>
  );
}
