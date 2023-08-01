import AddBoard from "./AddBoard";
import AddBoardInput from "./AddBoardInput";
import BoardCard from "./BoardCard";
import { useState } from "react";
import { Link } from "react-router-dom";

function HomePage(props) {
  let [isAdding, setIsAdding] = useState(false);
  let colors = [
    "rgb(250,155,100,0.3)",
    "rgb(81, 219, 81,0.3)",
    "rgba(81,81,219,0.3)",
    "rgb(200,81,150,0.3)",
  ];
  let boards = props.boards;

  return (
    <div className="Main">
      <div className="Main__header">
        <h1 className="Main__header__brand">Yollo</h1>твой помощник для работы в
        стиле канбан
      </div>
      <section className="Boards">
        <h2 className="Boards__header"> Ваши доски</h2>

        <div className="Boards__items">
          {boards.map((item, index) => (
            <Link key={item} to={`/boards/${item}`}>
              <BoardCard
                handleDeleting={() => {
                  props.handleDeleting(item);
                }}
                key={item}
                bgColor={colors[index % 4]}
                onClick={() => {}}
              >
                {item}{" "}
              </BoardCard>
            </Link>
          ))}
          {isAdding ? (
            <AddBoardInput
              handleAdding={(value) => {
                props.handleAdding(value);
                setIsAdding(!isAdding);
              }}
              handleCancelAdding={() => {
                setIsAdding(!isAdding);
              }}
              bgColor={colors[boards.length % 4]}
            ></AddBoardInput>
          ) : (
            <AddBoard
              handleClick={() => {
                setIsAdding(!isAdding);
              }}
            ></AddBoard>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
