import './App.css';
import plus from './static/plus_black.svg';
function AddColumn(props){
return <div className = "AddColumn" onClick={props.handleClick}><div className='AddColumn__text' >Добавить столбец</div> <div className='AddColumn__icon-wrapper'> <img src = {plus} alt=""/></div></div>
}
export default AddColumn;