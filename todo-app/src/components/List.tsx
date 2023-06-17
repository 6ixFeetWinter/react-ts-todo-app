import React from 'react'

type Todo = {
  title: string,
  completed: boolean
}

type Props = {
  todos: Array<Todo>;
}

export const List: React.FC<Props> = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo) => (
      <li style={{display: "flex", alignItems: "center",}}>
        <p>{todo.completed ? 'Completed' : 'Incomplete' }</p>
        <p style={{ marginLeft: "8px"}}>{todo.title}</p>
      </li>
      ))}
    </ul>
  )
}
