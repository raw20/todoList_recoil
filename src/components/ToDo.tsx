import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atom";

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);

  /*  const onClick = (newCategor: IToDo["category"]) => {
    console.log("c", newCategor);
  }; */
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    //값을 즉시 변경하거나 현재값을 인자로 주는 함수
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const onDelete = () => {
    setToDos((oldToDos) => {
      return oldToDos.filter((toDo) => toDo.id !== id);
    });
  };
  return (
    <li>
      {text}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button> //button name = {Categories.DOING => enum때문에 number로 취급하는데 name은 string이어야 하기때문에 뒤에 + ""를 붙여줌}
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

export default ToDo;
