import { atom, selector } from "recoil";

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedToDos = localStorage.getItem(key);
    if (savedToDos !== null) {
      setSelf(JSON.parse(savedToDos));
    }
    onSet((toDos: any, _: any, isReSet: boolean) => {
      isReSet
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(toDos));
    });
  };

export enum Categories {
  "TO_DO" = "TO_DO", //default value =0
  "DOING" = "DOING", //default value=1
  "DONE" = "DONE", //default value=2
} //enum은 일련의 숫자를 문자로 표현해준다.
export interface IToDo {
  text: string;
  id: number;
  category: Categories; // 아무 string을 간주하지않음
}
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects: [localStorageEffect("toDos")],
});
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoSelector = selector({
  //selector => state를 변형해주는 함수
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState); //atom
    const category = get(categoryState); //atom
    return toDos.filter((toDo) => toDo.category === category);
  }, //get이 있어야 atom 변형 가능 ==> selector 내부로 atom을 가지고 온다는 말, get 함수는 selector가 어떤걸 반환할지 결정
});
