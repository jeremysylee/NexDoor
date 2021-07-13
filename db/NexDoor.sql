CREATE TABLE tasks (
  tasks_id SERIAL PRIMARY KEY,
  requester_id INT REFERENCES users (user_id),
  helper_id INT REFERENCES users (user_id),
  address_id INT REFERENCES address (address_id),
  description VARCHAR(1000),
  car_required BOOLEAN,
  labor_required VARCHAR(50),
  status VARCHAR(50),
  category VARCHAR (50),
  date DATE,
  time TIME,
  date_requested DATE,
  duration INT,
)

CREATE TABLE users (
  users_id SERIAL PRIMARY KEY,
  firstname VARCHAR(20),
  lastname VARCHAR(20),
  password VARCHAR(100),
  email VARCHAR(100),
  address_id INT REFERENCES address (address_id),
  karma INT,
  response_count INT,
  average_rating INT,
  profile_picture VARCHAR(250)
)

CREATE TABLE address (
  address_id SERIAL PRIMARY KEY,
  street_address VARCHAR(75),
  city VARCHAR(50),
  state VARCHAR(2),
  zip_code INT,
  neighborhood VARCHAR(50)
)

CREATE TABLE messages (
  messages_id SERIAL PRIMARY KEY,
  task_id INT REFERENCES tasks (task_id),
  user_id INT REFERENCES users (user_id),
  message_body VARCHAR(500),
  date DATE
)

CREATE TABLE photos (
  photos_id SERIAL PRIMARY KEY,
  photo_url VARCHAR(100),
  task_id INT REFERENCES tasks (task_id),
  user_id INT REFERENCES users (user_id),
  message_id INT REFERENCES messages (message_id)
)

CREATE TABLE announcements (
  announcements_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users (user_id),
  message_body VARCHAR(200),
  date
)

CREATE TABLE sessions (
  sessions_id SERIAL PRIMARY KEY,
  session_hash VARCHAR(100)
)