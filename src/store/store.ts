export interface UserData {
  username: string;
  age: number;
  hobbies: string[];
}

export interface User extends UserData {
  id: string;
}

type Store = User[];

export const store: Store = [];
