export interface UserStore {
  id: string;
  username: string;
  name: string;
}

export interface Store {
  user: UserStore | null;
  setUser: (user: UserStore | null) => void;
}
