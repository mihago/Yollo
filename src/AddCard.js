import "./App.css";
import plus from "./static/plus.png";
function AddCard(props) {
  return (
    <div className="AddCard" onClick={props.handleClick}>
      <div className="AddCard__text">Добавить карточку</div>
      <div className="AddCard__icon-wrapper">
        {" "}
        <img src={plus} alt="" />
      </div>{" "}
    </div>
  );
}

export default AddCard;
