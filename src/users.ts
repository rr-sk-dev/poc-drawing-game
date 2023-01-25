export interface User {
  id: number;
  username: string;
  avatar: string;
  points: number;
  isDrawing: boolean;
}

export const users: User[] = [
  {
    id: 1,
    username: 'rtsr',
    avatar: '<i class="fa-solid fa-face-awesome"></i>', // NAO FUNCIONA
    points: 0,
    isDrawing: false,
  },
  // {
  //   id: 2,
  //   username: 'jojo',
  //   avatar: '<i class="fa-solid fa-face-smile"></i>',
  //   points: 0,
  //   isDrawing: false,
  // },
  // {
  //   id: 3,
  //   username: 'bago',
  //   avatar: '<i class="fa-solid fa-face-vomit"></i>', // NAO FUNCIONA
  //   points: 0,
  //   isDrawing: false,
  // },
];
