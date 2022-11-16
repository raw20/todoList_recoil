import { useRecoilValue } from "recoil";
import { toDoState } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoList = () => {
  const toDos = useRecoilValue(toDoState);
  console.log(toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} /> // 밑의 것과 같다
          //<ToDo text={toDo.text} category={toDo.category} id={toDo.id} />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
