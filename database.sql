
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(80) UNIQUE NOT NULL,
    "password" VARCHAR(1000) NOT NULL, 
    "first_name" VARCHAR(255) NOT NULL, 
    "last_name" VARCHAR(255) NOT NULL, 
    "email" VARCHAR(500) NOT NULL,
    "email_messages" boolean DEFAULT false,
    "administrator" boolean DEFAULT false
);

CREATE TABLE "forum" (
    "id" SERIAL PRIMARY KEY,
    "have" VARCHAR (2000) NOT NULL,
    "want" VARCHAR (2000) NOT NULL,
    "location" VARCHAR(500) NOT NULL,
    "date"TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "user_id" INT REFERENCES "user"
);

CREATE TABLE "message" (
    "id" SERIAL PRIMARY KEY,
    "sent_to_user_id" INT REFERENCES "user",
    "sent_from_user_id" INT REFERENCES "user",
     "forum_id" INT REFERENCES "forum" ON DELETE CASCADE,
    "subject" VARCHAR(500),
    "message" TEXT NOT NULL, 
    "mail_sent" boolean DEFAULT false,
    "time_sent" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    "sent_from_username" VARCHAR(500)
);

CREATE TABLE "gallery" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (80) NOT NULL,
    "url" VARCHAR (2083),
    "user_id" INT REFERENCES "user");


INSERT INTO forum (have, want, location, user_id)
VALUES ('cucumbers, dill', 'lettuce', 'Minneapolis', 3), 
('tomato starts(12)', 'peppers, onions, asparagus', 'Minneapolis', 3),
('blueberries(5 cases), raspberries(3 cases)', 'pesto, salsa', 'Minneapolis', 3),
('radishes(tons!), kale, chard', 'raspberries, cucumbers', 'St. Paul', 5),
('cherry tomatoes, sweet corn', 'eggs', 'St. Paul', 5),
('acorn squash, pumpkins', 'brussel sprouts, honeydew', 'St. Paul', 5),
('lettuce', 'cucumbers, basil, tomatoes', 'Minneapolis', 6), 
('strawberries, honeydew', 'watermelon, watermelon seeds', 'Minneapolis', 6),
('eggs(2 dozen), red peppers(12), onions(30)', 'squash, horseradish, cauliflower', 'Minneapolis', 6),
('broccoli(7 bunches), red cabbage(9)', 'kale, eggplant, radishes', 'Minneapolis', 6),
('chard, homemade salsa(8 jars), potatoes(5 bags)', 'spinach', 'St. Paul', 7),
('dilly beans(7 jars), cerleriac(5)', 'collards, fennel, ginger' ,'St. Paul', 7), 
('kohlrabi(17), leeks(35)', 'mustard greens, okra', 'St. Paul', 7),  
('shallots(50+), zucchini(~15)', 'turnips, sweet potatoes, tomatillo', 'St. Paul', 7);
;

