import { useState } from "react";
import AddColumn from "./AddColumn";
import "./App.css";
import Column from "./Column";
import AddColumnInput from "./AddColumnInput";
function App() {
  let [data, setData] = useState([
    {
      header: "JS",
      cards: new Map(),
    },
    {
      header: "JS",
      cards: new Map(),
    },
    {
      header: "JS",
      cards: new Map(),
    },
  ]);
  let [isEditing, setIsEditing] = useState(false);
  let [isColumnAdding, setIsColumAdding] = useState(false);
  function handleCardAdding(index, value) {
    let newData = data.map((column, column_index) => {
      if (column_index === index) {
        column.cards.set(Date.now(), { name: value, completed: false });
        return column;
      } else {
        return column;
      }
    });
    setData(newData);
  }
  function handleCardDeleting(index,key){
    let newData = data.map((column, column_index) => {
      if (column_index === index) {
        column.cards.delete(key);
        return column;
      } else {
        return column;
      }
    });
    setData(newData);

  }

  function handleCompleting(column, key) {
    let newData = data.slice(0);
    let elem = data[column].cards.get(key);
    newData[column].cards.set(key, {
      name: elem.name,
      completed: !elem.completed,
    });
    setData(newData);
  }

  function handleColumnAdding(value) {
    let newData = data.slice(0);
    newData.push({ header: value, cards: new Map() });
    setData(newData);
  }
  return (
    //TODO:Handle adding
    <div className="App">
      {data.map((column, index) => {
        return (
          <Column
            items={column.cards}
            key={index}
            handleCardAdding={(value) => {
              handleCardAdding(index, value);
            }}
            handleCardDeleting ={
              (key)=>{
                handleCardDeleting(index,key);
              }
            }
            handleCompleting={(key) => {
              handleCompleting(index, key);
              console.log("ggggg");
            }}
            header={column.header}
          />
        );
      })}
      {isColumnAdding ? (
        <AddColumnInput
          handleCancelAdding={() => {
            setIsColumAdding(!isColumnAdding);
          }}
          handleColumnAdding={(value) => {
            if (!value) {
              alert("Введите название");
            } else {
              handleColumnAdding(value);
            }
          }}
        />
      ) : (
        <AddColumn
          handleClick={() => {
            setIsColumAdding(!isColumnAdding);
          }}
        />
      )}
    </div>
  );
}

export default App;
