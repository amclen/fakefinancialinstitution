CREATE schema meow;

--- Create a table for the meow DB ---
CREATE TABLE meow.users
(
    user_id SERIAL NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_login TIMESTAMPTZ,
    PRIMARY KEY (user_id)
);

CREATE TABLE meow.accounts
(
    account_id SERIAL NOT NULL,
    balance BIGINT NOT NULL DEFAULT 0,
    display_name VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    user_id INTEGER REFERENCES meow.users,
    PRIMARY KEY (account_id)
);
    
CREATE TABLE meow.transfers
(
    transfer_id SERIAL NOT NULL,
    amount BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    from_account_id INTEGER REFERENCES meow.accounts,
    to_account_id INTEGER REFERENCES meow.accounts,
    memo TEXT,
    PRIMARY KEY (transfer_id)
);

