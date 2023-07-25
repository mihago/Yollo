import plus from "./plus.svg";
function Header(props){
return <div className = "Header">{props.children}<img onClick={props.handleClick} src = {plus} alt = "" className="Header__img"/></div>
}
export default Header;