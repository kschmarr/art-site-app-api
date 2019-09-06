BEGIN;

TRUNCATE
  art,
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users (username, token, bio)
VALUES
  ('kris', 'a3JpczpsdWNreQ==', 'Born in Cincy')
  ;


INSERT INTO art (title, description, price, height, width, image)
VALUES
  ('Sunshine Stained Mountains', 'Acrylic paint, lacquer coating, on Sandstone', 49, 4, 6, 'https://imgur.com/GObAvVv' ),
  ('Conundrum Hike', 'Oil paint, on Sandstone', 90, 10, 10, 'https://imgur.com/m9AT9nd' ),
  ('Flatirons', 'Flatirons - Boulder, CO. Acrylic paint with varnish, on Sandstone.', 90, 9, 12, 'https://imgur.com/QAw7mKV' ),
  ('Desert Season', 'Priests Rock formation - UT. Acrylic paint with varnish.', 90, 9, 12, 'https://imgur.com/cuJKeCa' ),
  ('Even Bears Need Coffee', 'Acrylic with varnish', 90, 11, 18,'https://imgur.com/ffitq55' );


COMMIT;