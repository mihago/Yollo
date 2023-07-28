import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import done from './done.svg';
import {useState} from 'react';
import cancel from './cancel.svg';
import "use-context-menu/styles.css";
import './App.css';
function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;


  
  return (
    
    <><div style={{...style, zIndex:(transform)?2:1}}  className = {(props.completed)?"card card_done":"card"}>
        <div  {...listeners} {...attributes } ref={setNodeRef} className='card__dragger'></div>
    <div {...listeners} {...attributes }>{props.name}</div>
    <div  onClick = {props.handleCompleting} className  = "card__icon-wrapper"> <img  src = {done} className ="card__icon" alt = ""/></div>
    <div     className="card__fixed-icon-wrapper" onClick = {props.handleDeleting}> </div>
    
    </div>
    
    </>
  );
}
export default Draggable;