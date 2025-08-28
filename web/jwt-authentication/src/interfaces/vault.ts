export interface VaultItem {
  idUser: number | null | undefined;
  username: string | undefined;
  url: string;
  description: string;
  hashedPassword: string;
}

export interface VaultItems {
  description: string;
  username: string;
  url: string;
  encryptedValue: string;
  nonce: string;
  createdAt: string;
  updatedAt: string;
}

export interface Store {
  vaultItems: VaultItems[] | null;
  setVaultItems: (items: VaultItems[] | null) => void;
}
