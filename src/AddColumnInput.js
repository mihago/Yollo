import './App.css';
import Button from './Button';
import {useState} from 'react';
import done from './done_green.svg';
import plus from './plus.svg';
import cancel from './cancel_red.svg';
function AddColumnInput(props){
    const [value, setValue] = useState("");
return <div className = "AddColumnInput">
    <input className='AddColumnInput__field' autoFocus = {true} value={value} onChange={(e)=>{setValue(e.target.value)}}/>
    <div className='AddColumnInput__icon-wrapper' onClick = {()=>{props.handleColumnAdding(value)}}><img src={done} alt=""/></div>
    <div className='AddColumnInput__icon-wrapper' onClick = {props.handleCancelAdding}><img src={cancel} alt=""/></div>
</div>
}
export default AddColumnInput;