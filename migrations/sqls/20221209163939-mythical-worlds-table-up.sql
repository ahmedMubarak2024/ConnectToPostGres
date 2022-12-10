/* Replace with your SQL commands */
CREATE TABLE mytical_wepon (
id SERIAL PRIMARY KEY,
name VARCHAR(50),
count integer
);

INSERT INTO mytical_wepon (name, count) VALUES('Nuc',3) RETURNING *;
