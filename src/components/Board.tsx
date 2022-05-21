import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../Atom";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 200px;
  padding: 20px 15px 10px;
  border-radius: 5px;
  background-color: ${props => props.theme.boardColor};
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  flex-grow: 1;
  margin-top: 10px;
  background-color: ${props => props.isDraggingOver ? "#dcedc8" : props.isDraggingFromThis ? "#eeeeee" : props.theme.boardColor};
  transition: background-color .2s ease-in;
`;

const Title = styled.h2`
  margin-bottom: 15px;
  font-size: 22px;
  text-align: center;
  font-weight: bold;
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

const Form = styled.form`
  margin: 0 auto;
`;

const Input = styled.input`
  all: unset;
  padding: 5px;
  border-radius: 5px;
  background-color: #dcedc8;
`;

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    }
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  }
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("toDo")} placeholder="Write a to do" />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) =>
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) =>
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            )}
            {magic.placeholder}
          </Area>
        }
      </Droppable>
    </Wrapper>
  );
}

export default Board;