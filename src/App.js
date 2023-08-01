import { useLayoutEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Board from "./Board";

function App() {
  let [boards, setBoards] = useState(["js"]);


  useLayoutEffect(() => {
    async function fetchData() {
      console.log("tttt");
      fetch("http://localhost:3333/data/boards")
        .then((value) => {
          return value.json();
        })
        .then((value) => {
          setBoards(value);
        }).catch((e)=>{
          console.log("Error in getting data to display all boards",e);

        });
    }
    fetchData();
  }, []);


  function postData(boards) {
    async function fetchData() {
      fetch("http://localhost:3333/data/boards", {
        method: "POST",
        body: JSON.stringify(boards),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).catch((e) => {
        console.log("Error in posting data about all boards",e);
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
    }
  }


  function handleDeleting(value) {
      let newBoards = boards;
      let i =newBoards.indexOf(value);
      newBoards.splice(i,1);
      setBoards(newBoards);
      postData(newBoards);
  }


  return (
    <BrowserRouter>
      <Routes>
        {boards.map((item) => (
          <Route
            path={`/boards/:item`}
            element={<Board />}
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
