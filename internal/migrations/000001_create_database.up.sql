CREATE TABLE user (
    id_user INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    hashed_password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vault_items (
    id_item INTEGER PRIMARY KEY AUTOINCREMENT,
    id_user INTEGER NOT NULL,
    description TEXT NOT NULL,
    username TEXT,
    url TEXT,
    encrypted_value TEXT NOT NULL,
    nonce TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE CASCADE
);

CREATE TABLE refresh_tokens (
    id_token INTEGER PRIMARY KEY AUTOINCREMENT,
    id_user INTEGER NOT NULL,
    token_hash TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    revoked_at DATETIME,
    FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE CASCADE
);

CREATE TRIGGER trigger_update_user
AFTER UPDATE ON user
FOR EACH ROW
BEGIN
    UPDATE user SET updated_at = CURRENT_TIMESTAMP WHERE id_user = OLD.id_user;
END;

CREATE TRIGGER trigger_update_vault_items
AFTER UPDATE ON vault_items
FOR EACH ROW
BEGIN
    UPDATE vault_items SET updated_at = CURRENT_TIMESTAMP WHERE id_item = OLD.id_item;
END;
