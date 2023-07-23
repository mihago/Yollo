import './App.css';
import plus from './plus.png';
function AddColumn(props){
return <div className = "AddColumn"><div className='AddColumn__icon-wrapper'> <img src = {plus} alt=""/></div><div className='AddColumn__text'>Add column</div> </div>
}
export default AddColumn;