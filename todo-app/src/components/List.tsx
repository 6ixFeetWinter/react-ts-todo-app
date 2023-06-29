import React, { useState, Dispatch, SetStateAction } from "react";
import { useTodoList } from "../hooks/TodoList";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ClearIcon from "@mui/icons-material/Clear";

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
  gap: 10px;
  width: 600px;
  height: 100px;
  margin: 10px auto;
  padding: 0 10px;
  border-radius: 10px;
`;
const buttonArea = css`
  display: flex;
  gap: 20px;
  list-style-type: none;
`;
const selectorStyle = css`
  padding: 5px 8px;
  border: none;
  border-radius: 3px;
  background-color: transparent;
  color: gray;
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
            <select
              name="state"
              id="state-selector"
              css={selectorStyle}
              onChange={(e) => stateUpdate(e, index)}
            >
              <option value="undone">未達成</option>
              <option value="completed">達成</option>
            </select>
          </label>
          <p style={{ fontSize: "24px" }}>{todo.title}</p>
          <div>
            {edit === index ? (
              <>
                <input
                  type="text"
                  value={changeText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChangeText(e.target.value)
                  }
                />
                <button onClick={() => stateCheck(index)}>
                  <EditIcon />
                </button>
                <button onClick={() => setEdit(null)}>
                  <ClearIcon />
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
          <ul css={buttonArea}>
            <li>
              <button type="button" onClick={() => setEdit(index)}>
                <EditIcon />
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onDelete(index)}>
                <DeleteForeverIcon />
              </button>
            </li>
          </ul>
        </li>
      ))}
    </ul>
  );
};
