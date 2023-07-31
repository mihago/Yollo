import dots from "./static/dots.svg";
import "use-context-menu/styles.css";
import "./App.css";
import "use-context-menu/styles.css";
import { useContextMenu, ContextMenuItem } from "use-context-menu";

function BoardCard(props) {
  const { contextMenu, onContextMenu, onKeyDown } = useContextMenu(
    <>
      <ContextMenuItem onSelect={props.handleDeleting}>
        Удалить доску
      </ContextMenuItem>
    </>
  );
  return (
    <div className="BoardCard" style={{ backgroundColor: props.bgColor }}>
      <div className="BoardCard__name">{props.children}</div>
      <img
        onClick={onContextMenu}
        onKeyDown={onKeyDown}
        src={dots}
        alt=""
        className="BoardCard__menu"
      />
      {contextMenu}
    </div>
  );
}
export default BoardCard;
