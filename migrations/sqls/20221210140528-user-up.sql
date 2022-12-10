/* Replace with your SQL commands */
CREATE TABLE user_identity (
id SERIAL PRIMARY KEY,
name VARCHAR,
password VARCHAR
);

INSERT INTO user_identity (name, password) VALUES('testUser','password');