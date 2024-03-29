BEGIN;

-- Creation of the database
CREATE DATABASE cohabit;

-- Creation of the 'users' table
CREATE TABLE IF NOT EXISTS "users" (
    "user_id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "color" VARCHAR(7) NOT NULL
);

-- Creation of the 'colocs' table
CREATE TABLE IF NOT EXISTS "colocs" (
    "coloc_id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "groupe_code_valid" TEXT UNIQUE,
    "date_creation" DATE NOT NULL,
    "lien_coloc" TEXT NOT NULL
);

-- Creation of the 'tasks' table
CREATE TABLE IF NOT EXISTS "tasks" (
    "tasks_id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "description" TEXT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_predefined" BOOLEAN NOT NULL,
    "is_done" BOOLEAN NOT NULL,
    "frequency" INTERVAL NOT NULL,
    "due_date" DATE NOT NULL,
    "user_id" INTEGER REFERENCES "users"("user_id")
);

COMMIT