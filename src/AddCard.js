import './App.css';
import plus from './plus.png';
function AddCard(props){
return <div className = "AddCard"><div className='AddCard__text'>Добавить карточку</div><div className='AddCard__icon-wrapper'> <img src = {plus} alt=""/></div> </div>
}
export default AddCard;