import { useId } from "react";
import Card from "./Card";
import Header from "./Header";
import AddCard from "./AddCard";
function Column(props) {
  return <><div className="column"><Header>{props.header}</Header>{props.items.map((element) => <Card name={element.name} key = {element.id}/>)}<AddCard/></div></>;
}
export default Column;
