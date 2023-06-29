import React, { useState } from "react";
type Todo = {
  title: string;
  state: boolean;
};
export const useTodoList = () => {
  const [todoList, setTodoList] = useState<Array<Todo>>([]);
  const [state, setState] = useState<boolean>(false);
  return { todoList, setTodoList, state, setState };
};
