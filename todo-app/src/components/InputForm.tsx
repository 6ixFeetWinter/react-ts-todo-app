import React,{ useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { List } from './List';

type Todo = {
  title: string,
  completed: boolean
}

export const InputForm = () => {

  const [todoText,setTodoText] = useState<string>('');
  const [state,setState] = useState<boolean>(false);
  const [todos, setTodos] = useState<Array<Todo>>([]);

  const pushText = () => {
    if(!todoText){
      alert('Please enter text');
      return;
    }
    const todo:Todo = {
      title: todoText,
      completed: state
    }
    setTodos([...todos,todo]);
    setTodoText('');
  }

  return (
    <>
    <div style={{ display: "flex",}}>
      <TextField id="outlined-basic" label="Add todo" variant="outlined" style={{width:"40vw"}}
      onChange={ (e:React.ChangeEvent<HTMLInputElement>) => { setTodoText(e.target.value) } } />
      <Button style={{marginLeft: "8px"}} variant="contained" disableElevation onClick={pushText}> Add </Button>
    </div>
      <List todos={todos} />
    </>
  )
}
