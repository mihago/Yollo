import { useLayoutEffect, useState ,useReducer} from "react";
import AddColumn from "./AddColumn";
import { DndContext } from "@dnd-kit/core";
import "./App.css";
import Column from "./Column";
import AddColumnInput from "./AddColumnInput";
import Droppable from "./Droppable";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import Board from "./Board";

function App(props) {
  let [boards, setBoards] = useState(["js"]);
  useLayoutEffect(() => {
    async function fetchData() {
      console.log("tttt");
      fetch("http://localhost:3333/data/boards")
        .then((value) => {
          console.log(value);
          return value.json();
        })
        .then((value) => {
          setBoards(value);
        });
    }
    fetchData();
  }, []);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }
  function postData(boards) {
    async function fetchData() {
      fetch("http://localhost:3333/data/boards", {
        method: "POST",
        body: JSON.stringify(boards),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).catch(() => {
        console.log("here");
      });
    }
    fetchData();
  }

  function handleAdding(value) {
    if (value==="") {
      alert("Вы ничего не ввели");
    } else if (boards.indexOf(value) !== -1) {
      alert("Уже есть доска с таким именем");
    } else {
      let newBoards = boards;
      newBoards.push(value);
      
      setBoards(newBoards);
      postData(newBoards);
      handleClick();
    }
  }
  function handleDeleting(value) {
      let newBoards = boards;
      let i =newBoards.indexOf(value);
      newBoards.splice(i,1);
      
      setBoards(newBoards);
      postData(newBoards);
      handleClick();
  }
  return (
    <BrowserRouter>
      <Routes>
        {boards.map((item) => (
          <Route
            path={`/boards/${item}`}
            element={<Board id={item} />}
            key={item}
          />
        ))}
        <Route
          path="*"
          key={boards}
          element={
            <HomePage
              handleAdding={(value) => {
                handleAdding(value);
              }}
              handleDeleting={(value) => {
                handleDeleting(value);
              }}
              boards={boards}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
