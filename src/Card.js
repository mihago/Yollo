import done from './done.svg';
import cancel from './cancel.svg';
import './App.css';
function Card(props){

return  (<div className = {(props.completed)?"card card_done":"card"}>
{props.name}
<div  onClick = {props.handleCompleting} className  = "card__icon-wrapper"> <img  src = {done} className ="card__icon" alt = ""/></div>
<div  className="card__fixed-icon-wrapper" onClick = {props.handleDeleting}> </div>
</div>);

}
export default Card;