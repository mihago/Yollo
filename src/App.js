import { useEffect, useLayoutEffect, useState } from "react";
import AddColumn from "./AddColumn";
import "./App.css";
import Column from "./Column";
import AddColumnInput from "./AddColumnInput";

function App() {
  let [data, setData] = useState({
    
  });
  useLayoutEffect(() => {
    async function fetchData() {
      fetch("http://localhost:3333/data")
        .then((value) => {
          console.log(value);
          return value.json();
        })
        .then((value) => {
          let newData = value;
          for (let i of Object.values(value)) {
            i.cards = new Map(Object.entries(i.cards));
          }
          setData(newData);
          console.log(newData);
        });
    }
    fetchData();

  }, []);
 
  let [isEditing, setIsEditing] = useState(false);
  let [isColumnAdding, setIsColumAdding] = useState(false);
  function postData(datai){
    let postData = structuredClone(datai);
    for (let i of Object.values(postData)) {
      i.cards = Object.fromEntries(i.cards.entries());
    }
    fetch("http://localhost:3333/data", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        // Добавляем необходимые заголовки
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
  function handleCardAdding(index, value) {
    // let newData = data.map((column) => {
    //   if (column. === index) {
    //     column.cards.set(Date.now(), { name: value, completed: false });
    //     return column;
    //   } else {
    //     return column;
    //   }
    // });
    let newData = structuredClone(data);
    newData[index].cards.set(Date.now(), {
      name: value,
      completed: false,
    });

    setData(newData);
    postData(newData);
    
  }
  function handleCardDeleting(index, key) {
    // let newData = data.map((column) => {
    //   if (column.id === index) {
    //     column.cards.delete(key);
    //     return column;
    //   } else {
    //     return column;
    //   }
    // });
    // setData(newData);
    let newData = structuredClone(data);
    newData[index].cards.delete(key);
    setData(newData);
    postData(newData);
  }
  function handleColumnDeleting(index) {
    ////ПЕРЕДЕЛАТЬ
    // let newData = data.slice(0);
    // for(let i=0;i<newData.length;i++){
    //   if(newData[i].id===index){
    //     newData.splice(index,1);
    //   }
    // };
    // setData(newData);
    let newData = structuredClone(data);
    delete newData[index];
    setData(newData);
    postData(newData);
  }

  function handleCompleting(column, key) {
    // let newData = data.slice(0);
    // let elem = data[column].cards.get(key);
    // newData[column].cards.set(key, {
    //   name: elem.name,
    //   completed: !elem.completed,
    // });
    // setData(newData);
    let newData = structuredClone(data);
    let elem = newData[column].cards.get(key);
    newData[column].cards.set(key, {
      name: elem.name,
      completed: !elem.completed,
    });
    setData(newData);
    postData(newData);
  }

  function handleColumnAdding(value) {
    // let newData = data.slice(0);
    // newData.push({ header: value, cards: new Map() });
    // setData(newData);
    let newData = structuredClone(data);
    newData[Date.now().toString()] = { header: value, cards: new Map() };
    setData(newData);
    postData(newData);
  }
  let columns = [];
  for (let [ColumnKey, ColumnData] of Object.entries(data)) {
    let elem = (
      <Column
        items={ColumnData.cards}
        key={ColumnKey}
        handleCardAdding={(value) => {
          handleCardAdding(ColumnKey, value);
        }}
        handleCardDeleting={(key) => {
          handleCardDeleting(ColumnKey, key);
        }}
        handleCompleting={(key) => {
          handleCompleting(ColumnKey, key);
          console.log("ggggg");
        }}
        handleColumnDeleting={() => {
          handleColumnDeleting(ColumnKey);
        }}
        header={ColumnData.header}
      />
    );
    columns.push(elem);
  }
  return (
    //TODO:Handle adding
    <div className="App">
      {
        columns
        /* {data.map((column, index) => {
        return (
          <Column
            items={column.cards}
            key={column.id}
            handleCardAdding={(value) => {
              handleCardAdding(column.id, value);
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
            handleColumnDeleting={()=>{handleColumnDeleting(index)}}
            header={column.header}
          />
        );
      })} */
      }
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
              setIsColumAdding(!isColumnAdding);
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
