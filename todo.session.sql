


CREATE TABLE tasks (
  tasks_id SERIAL PRIMARY KEY,
  task_name VARCHAR(25) NOT NULL,
  task_status VARCHAR(10) DEFAULT 'Pending' NOT NULL);


