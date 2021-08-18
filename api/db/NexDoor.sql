--*********************************************************************
-- DATABASE
--*********************************************************************
-- Database: postgres
-- DROP DATABASE postgres;
CREATE DATABASE postgres
    WITH
    OWNER = blueboolean
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
COMMENT ON DATABASE postgres
    IS 'default administrative connection database';
--*********************************************************************
-- SCHEMA
--*********************************************************************
-- SCHEMA: nexdoor
-- DROP SCHEMA nexdoor ;
CREATE SCHEMA nexdoor
    AUTHORIZATION blueboolean;
--*********************************************************************
-- EXTENSIONS
--*********************************************************************
CREATE EXTENSION CUBE;
CREATE EXTENSION EARTHDISTANCE;
--*********************************************************************
-- ADDRESS TABLE
--*********************************************************************
-- Table: nexdoor.address
-- DROP TABLE nexdoor.address;
CREATE TABLE nexdoor.address (
  address_id SERIAL,
  street_address VARCHAR(75) NOT NULL,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(2) NOT NULL,
  zipcode INT NOT NULL,
  neighborhood VARCHAR(50),
  coordinate POINT NOT NULL,
  CONSTRAINT address_pkey PRIMARY KEY (address_id)
)
TABLESPACE pg_default;
ALTER TABLE nexdoor.address
    OWNER to blueboolean;
-- Index: address_id_idx
-- DROP INDEX nexdoor.address_id_idx;
CREATE INDEX address_id_idx
    ON nexdoor.address USING btree
    (address_id ASC NULLS LAST)
    TABLESPACE pg_default;
--*********************************************************************
-- USERS TABLE
--*********************************************************************
CREATE TABLE nexdoor.users (
  user_id SERIAL,
  firstname VARCHAR(20) NOT NULL,
  lastname VARCHAR(20) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  address_id INT NOT NULL,
  karma INT NOT NULL,
  task_count INT NOT NULL,
  average_rating DOUBLE PRECISION,
  profile_picture_url VARCHAR(250),
  acct_created_timestamp TIMESTAMP WITHOUT TIME ZONE,
  CONSTRAINT users_pkey PRIMARY KEY (user_id),
  CONSTRAINT fk_users_address_id FOREIGN KEY (address_id)
    REFERENCES nexdoor.address (address_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
)
TABLESPACE pg_default;
ALTER TABLE nexdoor.users
    OWNER to blueboolean;
-- Index: user_id_idx
-- DROP INDEX nexdoor.user_id_idx;
CREATE INDEX user_id_idx
    ON nexdoor.users USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fk_users_address_id
-- DROP INDEX nexdoor.fki_fk_users_address_id;
CREATE INDEX fki_fk_users_address_id
    ON nexdoor.users USING btree
    (address_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: user_avg_rating_idx
-- DROP INDEX nexdoor.user_avg_rating_idx;
CREATE INDEX user_avg_rating_idx
    ON nexdoor.users USING btree
    (avg_rating ASC NULLS LAST)
    TABLESPACE pg_default;
--*********************************************************************
-- ANNOUNCEMENTS TABLE
--*********************************************************************
-- Table: nexdoor.announcements
-- DROP TABLE nexdoor.announcements;
CREATE TABLE nexdoor.announcements (
  announcement_id SERIAL,
  user_id INT,
  message_body VARCHAR(500) NOT NULL,
  "date" DATE,
  "time" TIME WITHOUT TIME ZONE,
  CONSTRAINT announcements_pkey PRIMARY KEY (announcement_id),
  CONSTRAINT fk_announcements_user_id FOREIGN KEY (user_id)
    REFERENCES nexdoor.users (user_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
)
TABLESPACE pg_default;
ALTER TABLE nexdoor.announcements
    OWNER to blueboolean;
-- Index: announcement_id_idx
-- DROP INDEX nexdoor.announcement_id_idx;
CREATE INDEX announcement_id_idx
    ON nexdoor.announcements USING btree
    (announcement_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fk_announcements_user
-- DROP INDEX nexdoor.fki_fk_announcements_user;
CREATE INDEX fki_fk_announcements_user
    ON nexdoor.announcements USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;
--*********************************************************************
-- SESSIONS TABLE
--*********************************************************************
-- Table: nexdoor.sessions
-- DROP TABLE nexdoor.sessions;
CREATE TABLE nexdoor.sessions (
  session_id SERIAL,
  session_hash VARCHAR(255) NOT NULL,
  user_id INTEGER NOT NULL,
  expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
  CONSTRAINT sessions_pkey PRIMARY KEY (session_id),
  CONSTRAINT sessions_user_id_fk FOREIGN KEY (user_id)
    REFERENCES nexdoor.users (user_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
)
TABLESPACE pg_default;
ALTER TABLE nexdoor.sessions
    OWNER to blueboolean;
-- Index: session_id_idx
-- DROP INDEX nexdoor.session_id_idx;
CREATE INDEX session_id_idx
    ON nexdoor.sessions USING btree
    (session_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_sessions_user_id_fk
-- DROP INDEX nexdoor.fki_sessions_user_id_fk;
CREATE INDEX fki_sessions_user_id_fk
    ON nexdoor.sessions USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Trigger: sessions_expiry_date_delete_trigger
-- DROP TRIGGER sessions_expiry_date_delete_trigger ON nexdoor.sessions;
CREATE TRIGGER sessions_expiry_date_delete_trigger
    AFTER INSERT
    ON nexdoor.sessions
    FOR EACH ROW
    EXECUTE FUNCTION nexdoor.sessions_expiry_date_delete();
--*********************************************************************
-- TASKS TABLE
--*********************************************************************
CREATE TABLE nexdoor.tasks (
  task_id SERIAL,
  requester_id INT NOT NULL,
  helper_id INT,
  address_id INT NOT NULL,
  description VARCHAR(1000) NOT NULL,
  car_required BOOLEAN,
  physical_labor_required VARCHAR(50),
  status VARCHAR(50) NOT NULL,
  category VARCHAR (50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TIME WITHOUT TIME ZONE,
  duration DOUBLE PRECISION,
  timestamp_requested TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  CONSTRAINT tasks_pkey PRIMARY KEY (task_id),
  CONSTRAINT fk_task_requester_id FOREIGN KEY (requester_id)
    REFERENCES nexdoor.users (user_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_task_helper_id FOREIGN KEY (helper_id)
    REFERENCES nexdoor.users (user_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_task_address_id FOREIGN KEY (address_id)
    REFERENCES nexdoor.address (address_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
)
TABLESPACE pg_default;
ALTER TABLE nexdoor.tasks
    OWNER to blueboolean;
-- Index: task_id_idx
-- DROP INDEX nexdoor.task_id_idx;
CREATE INDEX task_id_idx
    ON nexdoor.tasks USING btree
    (task_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_requester_id_fk
-- DROP INDEX nexdoor.fki_requester_id_fk;
CREATE INDEX fki_requester_id_fk
    ON nexdoor.tasks USING btree
    (requester_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fk_task_helper_id
-- DROP INDEX nexdoor.fki_fk_task_helper_id;
CREATE INDEX fki_fk_task_helper_id
    ON nexdoor.tasks USING btree
    (helper_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fk_task_address_id
-- DROP INDEX nexdoor.fki_fk_task_address_id;
CREATE INDEX fki_fk_task_address_id
    ON nexdoor.tasks USING btree
    (address_id ASC NULLS LAST)
    TABLESPACE pg_default;
--*********************************************************************
-- MESSAGES TABLE
--*********************************************************************
-- Table: nexdoor.messages
-- DROP TABLE nexdoor.messages;
CREATE TABLE nexdoor.messages (
  message_id SERIAL,
  task_id INT NOT NULL,
  user_id INT NOT NULL,
  message_body VARCHAR(500),
  "date" DATE NOT NULL,
  "time" TIME WITHOUT TIME ZONE NOT NULL,
  photo_url VARCHAR(255),
  CONSTRAINT messages_pkey PRIMARY KEY (message_id),
  CONSTRAINT fk_messages_task_id FOREIGN KEY (task_id)
    REFERENCES nexdoor.tasks (task_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_messages_user_id FOREIGN KEY (user_id)
    REFERENCES nexdoor.users (user_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
)
TABLESPACE pg_default;
ALTER TABLE nexdoor.messages
    OWNER to blueboolean;
-- Index: message_id_idx
-- DROP INDEX nexdoor.message_id_idx;
CREATE INDEX message_id_idx
    ON nexdoor.messages USING btree
    (message_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fk_messages_task_id
-- DROP INDEX nexdoor.fki_fk_messages_task_id;
CREATE INDEX fki_fk_messages_task_id
    ON nexdoor.messages USING btree
    (task_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fk_messages_user_id
-- DROP INDEX nexdoor.fki_fk_messages_user_id;
CREATE INDEX fki_fk_messages_user_id
    ON nexdoor.messages USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;
--*********************************************************************
-- PHOTOS TABLE
--*********************************************************************
-- Table: nexdoor.photos
-- DROP TABLE nexdoor.photos;
CREATE TABLE nexdoor.photos (
  photo_id SERIAL,
  photo_url VARCHAR(250) NOT NULL,
  task_id INT,
  user_id INT,
  message_id INT,
  announcement_id INT,
  CONSTRAINT photos_pkey PRIMARY KEY (photo_id),
  CONSTRAINT fk_photos_task_id FOREIGN KEY (task_id)
    REFERENCES nexdoor.tasks (task_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_photos_user_id FOREIGN KEY (user_id)
    REFERENCES nexdoor.users (user_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_photos_message_id FOREIGN KEY (message_id)
    REFERENCES nexdoor.messages (message_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_photos_announcement_id FOREIGN KEY (announcement_id)
    REFERENCES nexdoor.announcements (announcement_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE,
)
TABLESPACE pg_default;
ALTER TABLE nexdoor.photos
    OWNER to blueboolean;
-- Index: photo_id_idx
-- DROP INDEX nexdoor.photo_id_idx;
CREATE INDEX photo_id_idx
    ON nexdoor.photos USING btree
    (photo_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fk_photos_task_id
-- DROP INDEX nexdoor.fki_fk_photos_task_id;
CREATE INDEX fki_fk_photos_task_id
    ON nexdoor.photos USING btree
    (task_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fk_photos_user_id
-- DROP INDEX nexdoor.fki_fk_photos_user_id;
CREATE INDEX fki_fk_photos_user_id
    ON nexdoor.photos USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fk_photos_message_id
-- DROP INDEX nexdoor.fki_fk_photos_message_id;
CREATE INDEX fki_fk_photos_message_id
    ON nexdoor.photos USING btree
    (message_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fk_photos_announcement_id
-- DROP INDEX nexdoor.fki_fk_photos_announcement_id;
CREATE INDEX fki_fk_photos_announcement_id
    ON nexdoor.photos USING btree
    (announcement_id ASC NULLS LAST)
    TABLESPACE pg_default;
--*********************************************************************
--REVIEWS TABLE
--*********************************************************************
CREATE TABLE nexdoor.reviews (
  review_id SERIAL,
  rating DOUBLE PRECISION NOT NULL,
  review VARCHAR(1000),
  requester_id INT NOT NULL,
  helper_id INT NOT NULL,
  CONSTRAINT reviews_pkey PRIMARY KEY (review_id),
  CONSTRAINT fk_reviews_helper_id FOREIGN KEY (helper_id)
    REFERENCES nexdoor.users (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
  CONSTRAINT fk_reviews_requester_id FOREIGN KEY (requester_id)
    REFERENCES nexdoor.users (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE nexdoor.reviews
    OWNER to blueboolean;
-- Index: review_id_idx
-- DROP INDEX nexdoor.review_id_idx;
CREATE INDEX review_id_idx
    ON nexdoor.reviews USING btree
    (review_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fk_reviews_requester_id
-- DROP INDEX nexdoor.fki_fk_reviews_requester_id;
CREATE INDEX fki_fk_reviews_requester_id
    ON nexdoor.reviews USING btree
    (requester_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fk_reviews_helper_id
-- DROP INDEX nexdoor.fki_fk_reviews_helper_id;
CREATE INDEX fki_fk_reviews_helper_id
    ON nexdoor.reviews USING btree
    (helper_id ASC NULLS LAST)
    TABLESPACE pg_default;
--*********************************************************************
--TRIGGER FUNCTIONS
--*********************************************************************
-- FUNCTION: nexdoor.sessions_expiry_date_delete()
-- DROP FUNCTION nexdoor.sessions_expiry_date_delete();
CREATE FUNCTION nexdoor.sessions_expiry_date_delete()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
  DELETE FROM nexdoor.sessions WHERE expiry_date < NOW();
  RETURN NEW;
END;
$BODY$;

ALTER FUNCTION nexdoor.sessions_expiry_date_delete()
    OWNER TO blueboolean;
--*********************************************************************
