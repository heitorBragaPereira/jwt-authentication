export interface UserStore {
  idUser: number;
  username: string;
  name: string;
}

export interface Store {
  user: UserStore | null;
  setUser: (user: UserStore | null) => void;
}
