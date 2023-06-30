import React, { useState, Dispatch, SetStateAction } from "react";
import { useTodoList } from "../hooks/TodoList";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ClearIcon from "@mui/icons-material/Clear";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { OutlinedInput } from "@mui/material";

type Todo = {
  title: string;
  state: boolean;
};
type ListProps = {
  todoList: Array<Todo>;
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
};
const listItem = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 700px;
  height: 100px;
  margin: 10px auto;
  padding: 0 10px;
  border-radius: 10px;
`;
const editArea = css`
  display: flex;
  align-items: center;
`;
const buttonArea = css`
  display: flex;
  list-style-type: none;
`;

const buttonStyle = css`
  border: none;
  padding: 5px;
  margin-left: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const List: React.FC<ListProps> = ({ todoList, setTodoList }) => {
  const [edit, setEdit] = useState<number | null>(null);
  const [changeText, setChangeText] = useState("");
  const [changeState, setChangeState] = useState(false);
  const stateCheck = (index: number) => {
    const newList = todoList.map((prev, prevIndex) => {
      if (prevIndex === index) {
        return {
          title: changeText,
          state: false,
        };
      }
      return prev;
    });
    setTodoList([...newList]);
    setEdit(null);
    setChangeText("");
    localStorage.setItem("key", JSON.stringify(todoList));
  };
  const onDelete = (index: number) => {
    const newList = [...todoList];
    newList.splice(index, 1);
    setTodoList([...newList]);
    localStorage.setItem("key", JSON.stringify(todoList));
  };
  const stateUpdate = (e: any, index: number) => {
    const newChangeState = e.target.value === "completed";
    setChangeState(newChangeState);
    const newList = todoList.map((prev, prevIndex) => {
      if (prevIndex === index) {
        return {
          title: prev.title,
          state: newChangeState,
        };
      }
      return prev;
    });
    setTodoList([...newList]);
    setEdit(null);
    localStorage.setItem("key", JSON.stringify(todoList));
  };
  return (
    <ul>
      {todoList.map((todo, index) => (
        <li
          key={index}
          css={listItem}
          style={
            todo.state
              ? { backgroundColor: "#0164C9", opacity: ".5" }
              : { backgroundColor: "#D1DAFE", color: "gray" }
          }
        >
          <label htmlFor="state-selector">
            <Select
              defaultValue={"undone"}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => stateUpdate(e, index)}
            >
              <MenuItem value={"undone"}>未達成</MenuItem>
              <MenuItem value={"completed"}>達成</MenuItem>
            </Select>
          </label>
          <p style={{ fontSize: "24px" }}>{todo.title}</p>
          <div>
            {edit === index ? (
              <div css={editArea}>
                <OutlinedInput
                  placeholder="Please enter text"
                  value={changeText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChangeText(e.target.value)
                  }
                />
                <button
                  style={{ backgroundColor: "#69D173" }}
                  css={buttonStyle}
                  onClick={() => stateCheck(index)}
                >
                  <EditIcon />
                </button>
                <button
                  style={{ backgroundColor: "#D71313" }}
                  css={buttonStyle}
                  onClick={() => setEdit(null)}
                >
                  <ClearIcon />
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
          <ul css={buttonArea}>
            <li>
              <button
                style={{ backgroundColor: "#69D173" }}
                css={buttonStyle}
                type="button"
                onClick={() => setEdit(index)}
              >
                <EditIcon />
              </button>
            </li>
            <li>
              <button
                style={{ backgroundColor: "#D71313" }}
                css={buttonStyle}
                type="button"
                onClick={() => onDelete(index)}
              >
                <DeleteForeverIcon />
              </button>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  );
};
