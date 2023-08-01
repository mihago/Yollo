import "./App.css";
import plus from "./static/plus_black.svg";
function AddBoard(props) {
  return (
    <div className="AddBoard" onClick={props.handleClick}>
      <div className="AddColumn__text">Создать доску</div>{" "}
      <div className="AddColumn__icon-wrapper">
        {" "}
        <img src={plus} alt="" />
      </div>
    </div>
  );
}
export default AddBoard;
