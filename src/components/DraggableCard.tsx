import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
padding: 10px;
margin-bottom: 10px;
border-radius: 5px;
background-color: ${props => props.theme.cardColor};
box-shadow: ${props => props.isDragging ? "2px 2px 6px rgba(0,0,0,0.2)" : "none"};
&:last-child {
  margin-bottom: 0;
}
`;

interface IDraggableState {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableState) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, info) =>
        <Card
          isDragging={info.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
      }
    </Draggable>
  );
}

export default React.memo(DraggableCard);