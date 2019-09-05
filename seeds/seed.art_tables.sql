BEGIN;

TRUNCATE
  art,
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users (username, token, bio)
VALUES
  ('kris', 'a3JpczpsdWNreQ==', 'Born in Cincy')
  ;


INSERT INTO art (title, description, price, dims, image)
VALUES
  ('Sunshine Stained Mountains', 'Acrylic paint, lacquer coating, on Sandstone', 49, '4 x 6 x 0.5 (inches)', 'https://imgur.com/GObAvVv' ),
  ('Conundrum Hike', 'Oil paint, on Sandstone', 90, '10 x 10 (inches)', 'https://imgur.com/m9AT9nd' ),
  ('Flatirons', 'This is a handpainted sandstone depiction of the Boulder Flatirons. Rock collected from surrounding BLM land. Great for a personalized gift or memento of the Boulder area! Acrylic paint with varnish.', 90, '9 x 12 (inches)', 'https://imgur.com/QAw7mKV' ),
  ('Desert Season', 'Original painting of the Priests rock formation, UT. Acrylic paint with varnish.', 90, 'Height: 9 Inches; Width: 12 Inches', 'https://imgur.com/cuJKeCa' ),
  ('Even Bears Need Coffee', 'Acrylic with varnish', 90, 'Height 11 inches Width: 18 inches','https://imgur.com/ffitq55' );


COMMIT;