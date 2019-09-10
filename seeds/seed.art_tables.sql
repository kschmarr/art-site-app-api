BEGIN;

TRUNCATE
  art,
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users (username, token, bio)
VALUES
  ('kris', 'a3JpczpsdWNreQ==', 'Art makes me happy, hopefully it makes you happy too! I am a Colorado based artist specializing in depicting landscapes on found pieces of sandstone and granite, as well as on traditional canvas. I do commission work as well upon request. Happy adventures! -Grace'
          )
  ;


INSERT INTO art (title, description, price, height, width, image)
VALUES
  ('Sunshine Stained Mountains', 'Acrylic paint, lacquer coating, on Sandstone', 49, 4, 6, 'https://i.imgur.com/GObAvVv.jpg' ),
  ('Conundrum Hike', 'Oil paint, on Sandstone', 90, 10, 10, 'https://i.imgur.com/m9AT9nd.jpg' ),
  ('Flatirons', 'Flatirons - Boulder, CO. Acrylic paint with varnish, on Sandstone.', 90, 9, 12, 'https://i.imgur.com/QAw7mKV.jpg' ),
  ('Desert Season', 'Priests Rock formation - UT. Acrylic paint with varnish.', 90, 9, 12, 'https://i.imgur.com/cuJKeCa.jpg' ),
  ('Even Bears Need Coffee', 'Acrylic with varnish', 90, 11, 18,'https://i.imgur.com/ffitq55.jpg' );


COMMIT;