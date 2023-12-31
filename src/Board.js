import { useEffect, useState } from "react";
import AddColumn from "./AddColumn";
import { DndContext } from "@dnd-kit/core";
import "./App.css";
import Column from "./Column";
import AddColumnInput from "./AddColumnInput";
import Droppable from "./Droppable";
import Loader from "./Loader";
import Menu from "./Menu";
import { Oval } from "react-loader-spinner";
import {useParams} from 'react-router-dom';


function Board() {


  let [data, setData] = useState({});
  let [draggableId, setDraggableId] = useState(null);
  let [isColumnAdding, setIsColumAdding] = useState(false);
  const { item } = useParams();


  useEffect(() => {
    async function fetchData() {
      fetch("http://localhost:3333/data", {
        method:"POST",
        body: JSON.stringify({type:"read",id:item}),
        headers: {
          // Добавляем необходимые заголовки
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((value) => {
          return value.json();
        })
        .then((value) => {
          let newData = value;
          for (let i of Object.values(value)) {
            i.cards = new Map(Object.entries(i.cards));
          }
          setData(newData);
        }).catch((e)=>{
          console.log("Error in getting data to display one board");
        });
    }
    fetchData();
  }, []);


  function postData(datai) {
    let postData = structuredClone(datai);
    for (let i of Object.values(postData)) {
      i.cards = Object.fromEntries(i.cards.entries());
    }
    
    fetch("http://localhost:3333/data", {
      method: "POST",
      body: JSON.stringify({id:item,data:postData,type:"write"}),
      headers: {
        // Добавляем необходимые заголовки
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((e)=>{
      console.log(e);
      console.log("Ошибка при получении данных с сервера")
    });
  }


  function handleCardAdding(index, value) {
    let newData = structuredClone(data);
    newData[index.toString()].cards.set(Date.now().toString(), {
      name: value,
      completed: false,
    });
    setData(newData);
    postData(newData);
  }


  function handleCardDeleting(index, key) {
    let newData = structuredClone(data);
    newData[index].cards.delete(key);
    setData(newData);
    postData(newData);
  }


  function handleColumnDeleting(index) {
    let newData = structuredClone(data);
    delete newData[index];
    setData(newData);
    postData(newData);
  }


  function handleCompleting(column, key) {
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
    let newData = structuredClone(data);
    newData[Date.now().toString()] = { header: value, cards: new Map() };
    setData(newData);
    postData(newData);
  }


  function handleMoving(oldColumn, newColumn, card) {
    let newData = structuredClone(data);
    if (oldColumn !== newColumn) {
      newData[newColumn.toString()].cards.set(
        card.toString(),
        structuredClone(data[oldColumn.toString()].cards.get(card.toString()))
      );
      newData[oldColumn.toString()].cards.delete(card.toString());
      setData(newData);
      postData(newData);
    }
  }
  function handleDragEnd(event) {
    if (event.over) {
      handleMoving(
        draggableId.split(",")[1],
        event.over.id,
        draggableId.split(",")[0]
      );
    }
  }


  function handleDragStart(event) {
    setDraggableId(event.active.id);
  }


  let columns = [];
  for (let [ColumnKey, ColumnData] of Object.entries(data)) {
    let elem;
      elem = (
        <Droppable key={ColumnKey} id={ColumnKey}>
          <Column
            id={ColumnKey}
            items={ColumnData.cards}
            handleCardAdding={(value) => {
              handleCardAdding(ColumnKey, value);
            }}
            handleCardDeleting={(key) => {
              handleCardDeleting(ColumnKey, key);
            }}
            handleCompleting={(key) => {
              handleCompleting(ColumnKey, key);
            }}
            handleColumnDeleting={() => {
              handleColumnDeleting(ColumnKey);
            }}
            header={ColumnData.header}
          />
        </Droppable>
      );
    columns.push(elem);
  }
  if(Object.keys(data).length!==0){
    return (
      //TODO:Handle adding
      
        <><Menu page = {item}></Menu>
        <div
        className="Board"
        style={{
          width: Math.max(columns.length * 340 + 360),
          height: "inherit",
          overflow: "hidden",
        }}
      >
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          {
            columns
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
        </DndContext>
      </div></>
    );

  }else{
    return <div class="Loader"><Oval
    height={80}
    width={80}
    color="#4fa94d"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel='oval-loading'
    secondaryColor="#4fa94d"
    strokeWidth={4}
    strokeWidthSecondary={4}
  
  />
  </div>
  }
  
}

export default Board;
