CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SET TIMEZONE = 'America/Caracas';

CREATE TABLE lnk_profile(
	id_profile serial NOT NULL unique primary key,
	name_profile VARCHAR(40) NOT NULL unique
);

CREATE TABLE profile_role(
	id_profile_rol serial unique primary key,
	name_role VARCHAR(40) NOT NULL,
	id_profile INTEGER,
	CONSTRAINT fk_profile FOREIGN KEY(id_profile) REFERENCES lnk_profile(id_profile)
);

CREATE TABLE ms_users_list (
	id_user serial NOT NULL unique ,
	uuid uuid NOT NULL DEFAULT uuid_generate_v4() unique,
	name_user varchar(40) NOT NULL,
	lastname varchar(40) NOT NULL,
	phone varchar(20) NOT NULL,
	gender varchar(10),
	email varchar(100) NOT NULL unique,
	creation_date TIMESTAMP NOT NULL DEFAULT now() ,
	update_date TIMESTAMP NOT NULL DEFAULT now() ,
	id_profile INTEGER NOT NULL,
	department varchar(50) NOT NULL,
	check(gender in ('Male', 'Female')),
	CONSTRAINT fk_profile FOREIGN KEY(id_profile) REFERENCES lnk_profile(id_profile),
	PRIMARY KEY(id_user,uuid,email)
);

-- TRIGGER --
CREATE OR REPLACE FUNCTION user_update_proc() RETURNS trigger AS $user_update_trigger$
BEGIN
	NEW.update_date = CURRENT_TIMESTAMP;
	RETURN NEW;
	END;
	$user_update_trigger$ LANGUAGE plpgsql;

CREATE TRIGGER user_update_trigger BEFORE UPDATE ON ms_users_list
FOR EACH ROW EXECUTE PROCEDURE user_update_proc();
-- END trigger --

