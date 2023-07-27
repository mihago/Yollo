import './App.css';
import Button from './Button';
import {useState} from 'react';
import done from './done_black.svg';
import plus from './plus_black.svg';
function AddCardInput(props){
    const [value, setValue] = useState("");
return <div className = "AddCardInput">
    <input className='AddCardInput__field' autoFocus={true} value={value} onChange={(e)=>{setValue(e.target.value)}}/>
    <div className='AddCardInput__container'>
    <Button bgColor=" rgb(224, 224, 224)" color="rgb(235,100,100)" onClick = {props.handleCancelling}>Отменить</Button>
    <Button bgColor="rgb(115, 235, 115)" color="black" onClick = {()=>{props.handleCardAdding(value)}}>Добавить</Button>

    </div>
    

</div>
}
export default AddCardInput;