import dots from "./dots.svg";
function Header(props){
return <div className = "Header">{props.children}<img onClick = {props.onMenu} onKeyDown = {props.onKeyDown}  src = {dots} alt = "" className="Header__img"/>{props.ContextMenu}</div>
}
export default Header;