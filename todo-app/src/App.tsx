import React, { useState, useEffect } from "react";
import "./App.css";
import { useTodoList } from "./hooks/TodoList";
import { List } from "./components/List";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { Typography } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
type Todo = {
  title: string;
  state: boolean;
};

const inputArea = css`
  width: 100%;
  height: 100px;
  margin: 20px 0;
`;
const inputAreaInner = css`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function App() {
  const { todoList, setTodoList } = useTodoList();
  const { state, setState } = useTodoList();
  const [text, setText] = useState<string>("");
  useEffect(() => {
    const listString = localStorage.getItem("key");
    if (listString) {
      setTodoList(JSON.parse(listString));
    }
  }, []);
  const handleSubmit = () => {
    if (!text) {
      alert("テキストを入力してください");
      return;
    }
    const todo: Todo = {
      title: text,
      state: state,
    };
    setTodoList([...todoList, todo]);
    setText("");
    localStorage.setItem("key", JSON.stringify(todoList));
  };
  return (
    <div>
      <Typography
        style={{ textAlign: "center", fontSize: "42px", marginTop: "40px" }}
        variant="h1"
      >
        TODO LIST
      </Typography>
      <div css={inputArea}>
        <div css={inputAreaInner}>
          <TextField
            id="standard-basic"
            label="Add memo"
            variant="standard"
            value={text}
            style={{ width: "40%" }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setText(e.target.value);
            }}
          />
          <Button
            style={{ marginLeft: "18px" }}
            variant="contained"
            onClick={handleSubmit}
          >
            ADD
          </Button>
        </div>
      </div>
      <List todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

export default App;
