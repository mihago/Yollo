import { useState } from "react";
import DraggableCard from "./DraggableCard";
import Header from "./Header";
import AddCard from "./AddCard";
import AddCardInput from "./AddCardInput";
import "use-context-menu/styles.css";
import { useContextMenu, ContextMenuItem } from "use-context-menu";
function Column(props) {
  let [isAdding, setIsAdding] = useState(false);

  const { contextMenu, onContextMenu, onKeyDown } = useContextMenu(
    <>
      <ContextMenuItem onSelect={props.handleColumnDeleting}>
        Удалить Столбец
      </ContextMenuItem>
    </>
  );

  let cards = [];

  
  for (let i of props.items.keys()) {
    try {
      cards.push(
        <DraggableCard
          name={props.items.get(i).name}
          handleCompleting={() => {
            props.handleCompleting(i);
          }}
          handleDeleting={() => {
            props.handleCardDeleting(i);
          }}
          completed={props.items.get(i).completed}
          id={i + "," + props.id}
          key={i}
        />
      );
    } catch (e) {
      console.log(i.toString());
      console.log(props.items);
    }
  }

  return (
    <>
      <div className="column">
        <Header
          handleClick={() => {
            setIsAdding(!isAdding);
          }}
          onMenu={onContextMenu}
          onKeyDown={onKeyDown}
        >
          {props.header} {contextMenu}
        </Header>
        {cards}

        {isAdding ? (
          <AddCardInput
            handleCancelling={() => {
              setIsAdding(!isAdding);
            }}
            handleCardAdding={(value) => {
              if (!value) {
                alert("Введите что-нибудь");
              } else {
                props.handleCardAdding(value);
                setIsAdding(!isAdding);
              }
            }}
          />
        ) : (
          <AddCard
            handleClick={() => {
              setIsAdding(!isAdding);
            }}
          />
        )}
      </div>
    </>
  );
}
export default Column;
