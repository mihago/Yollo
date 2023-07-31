import { Link } from "react-router-dom";

function Menu(props){

return<div className="Menu">
    <div className="Menu__brand">Yollo</div>
    <Link to="/"><div className="Menu__home-button"> Вернуться к списку досок</div></Link>
    <div className="Menu__header">{props.page.toString()} </div>
    </div>



}
export default Menu;