import { useState } from "react";
import Card from "./Card";
import Header from "./Header";
import AddCard from "./AddCard";
import AddCardInput from "./AddCardInput";
function Column(props) {
  let [isAdding, setIsAdding] = useState(false);

  let cards = [];
  for (let i of props.items.keys())
    cards.push(<Card key={i} name={props.items.get(i).name} handleCompleting ={()=>{props.handleCompleting(i)}} handleDeleting = {()=>{props.handleCardDeleting(i)}} completed ={props.items.get(i).completed} />);

  return (
    <>
      <div className="column">
        <Header handleClick={() => {
              setIsAdding(!isAdding);
            }}>{props.header}</Header>
        {cards}

        {isAdding ? (
          <AddCardInput
            handleCancelling={() => {
              setIsAdding(!isAdding);
            }}
            handleCardAdding={(value) => {
              if(!value){
                alert("Введите что-нибудь");
              }
              else{
                props.handleCardAdding(value);
                setIsAdding(!isAdding)
              }
              ;
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
