export interface VaultItem {
  idUser: number | null | undefined;
  username: string | undefined;
  url: string;
  description: string;
  hashedPassword: string;
}
