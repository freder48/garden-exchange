
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL, 
    "first_name"VARCHAR (255) NOT NULL, 
    "last_name"VARCHAR (255) NOT NULL, 
    "email"  VARCHAR(500) NOT NULL,
    "administrator" boolean DEFAULT false
);

CREATE TABLE "forum" (
    "id" SERIAL PRIMARY KEY,
    "have" VARCHAR (2000) NOT NULL,
    "want" VARCHAR (2000) NOT NULL,
    "location" VARCHAR(500) NOT NULL,
    "date" date default CURRENT_DATE,
    "user_id" INT REFERENCES "user"
);


CREATE TABLE "message" (
    "id" SERIAL PRIMARY KEY,
    "sent_to_user_id" INT REFERENCES "user",
    "sent_from_user_id" INT REFERENCES "user",
    "forum_id" INT REFERENCES "forum" ON DELETE CASCADE,
    "message" TEXT NOT NULL, 
    "mail_sent" boolean DEFAULT false,
    "time_received" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "message" (sent_to_user_id, sent_from_user_id, forum_id, message)
VALUES (1, 5, 1, 'hey would you like to trade turnips');


INSERT INTO "forum" (have, want, location, user_id)
VALUES ('carrots, parsnip', 'dill, cucumbers', 'St. Paul', 1),
('eggs, honey', 'basil starts, watermelon', 'Minneapolis', 2),
('zucchini', 'tomatoes', 'Minneapolis', 3);