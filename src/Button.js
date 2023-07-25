function Button(props) {
    return <button style={{backgroundColor:props.bgColor,color:props.color}} onClick = {props.onClick}className="Button">{props.children}</button>;
}
export default Button;