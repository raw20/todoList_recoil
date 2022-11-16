import { atom } from "recoil";
export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE"; // 아무 string을 간주하지않음
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
