import done from './done.svg';
import './App.css';
import { useId } from 'react';
function Card(props){

return  (<div className = "card">
{props.name}
<div className  = "card__icon-wrapper"> <img src = {done} className ="card__icon" alt = ""/></div>
</div>);

}
export default Card;