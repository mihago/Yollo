import "./App.css";
import { useState } from "react";
import done from "./static/done_green.svg";
import cancel from "./static/cancel_red.svg";
function AddBoardInput(props) {
  let [value, setValue] = useState("");
  return (
    <div className="AddBoardInput" style={{ backgroundColor: props.bgColor }}>
      <input
        className="AddColumnInput__field"
        autoFocus={true}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          console.log(value);
        }}
      />
      <div
        className="AddColumnInput__icon-wrapper"
        onClick={() => {
          props.handleAdding(value);
          setValue("");
        }}
      >
        <img src={done} alt="" />
      </div>
      <div
        className="AddColumnInput__icon-wrapper"
        onClick={props.handleCancelAdding}
      >
        <img src={cancel} alt="" />
      </div>
    </div>
  );
}
export default AddBoardInput;
