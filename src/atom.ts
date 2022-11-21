import { atom, selector } from "recoil";
export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE"; // 아무 string을 간주하지않음
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    if (category === "TO_DO")
      return toDos.filter((toDo) => toDo.category === "TO_DO");
    if (category === "DOING")
      return toDos.filter((toDo) => toDo.category === "DOING");
    if (category === "DONE")
      return toDos.filter((toDo) => toDo.category === "DONE");
  }, //get이 있어야 atom 변형 가능 ==> selector 내부로 atom을 가지고 온다는 말
});
