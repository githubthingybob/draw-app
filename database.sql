
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

--BELOW THIS IS THE NEW SQL CODE FOR OUR DBs
CREATE TYPE auth AS ENUM
('user', 'admin', 'superAdmin');
CREATE EXTENSION
IF NOT EXISTS citext;

CREATE TABLE "user"
(
  "id" SERIAL PRIMARY KEY,
  "username" citext UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "auth_level" auth DEFAULT 'user' NOT NULL
);

CREATE TABLE "events"
(
  "id" SERIAL PRIMARY KEY,
  "place" varchar,
  "timestamp" varchar
);

CREATE TABLE "requests"
(
  "id" SERIAL PRIMARY KEY,
  "table_number" varchar,
  "artist_count" numeric,
  "event_id" INT
);

CREATE TABLE "drawings"
(
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "email_address" citext NOT NULL,
  "instagram" varchar,
  "description" varchar,
  "image_url" varchar,
  "timestamp" timestamp DEFAULT Now(),
  "approved" BOOLEAN DEFAULT NULL
);

--Sample Data inserts 
INSERT INTO "events"
  ("place", "timestamp")
VALUES
  ('Surly Brewing', '1970-01-01 00:00:01');
INSERT INTO "requests"
  ("table_number", "artist_count", "event_id")
VALUES
  ('1', '4', '1');
INSERT INTO "drawings"
  ("name", "email_address", "instagram", "description", "image_url")
VALUES
  ('John', 'john@drunkdrawing.com', 'myinstagram', 'This is a picture of this thing', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTJEIMIbQgXJfvdXkcm8YzC8sbgizJf74_VGg&usqp=CAU' );