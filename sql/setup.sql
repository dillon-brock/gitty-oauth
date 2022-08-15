-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS github_posts;
DROP TABLE IF EXISTS github_users;

CREATE TABLE github_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT,
  avatar TEXT
);

INSERT INTO github_users (username, email, avatar) VALUES
('ada_lovelace', 'ada.lovelace@gmail.com', 'https://images.computerhistory.org/babbage/5-7-1.jpg'),
('alanturing', 'alanturing@earthlink.net', 'https://cdn.britannica.com/81/191581-050-8C0A8CD3/Alan-Turing.jpg');

CREATE TABLE github_posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  content VARCHAR(255) NOT NULL,
  user_id BIGINT,
  FOREIGN KEY (user_id) REFERENCES github_users(id)
);

INSERT INTO github_posts (content, user_id) VALUES 
('The more I study, the more insatiable do I feel my genius for it to be.', 1),
('Sometimes it is the people no one can imagine anything of who do the things no one can imagine.', 2),
('We can only see a short distance ahead, but we can see plenty there that needs to be done.', 2);





