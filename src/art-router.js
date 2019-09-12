const express = require("express");
const xss = require("xss");
const logger = require("./logger");
const ArtService = require("./art-service");
const jsonParser = express.json();
const Router = express.Router();

const serializeUser = user => ({
  username: xss(user.username),
  userid: user.userid,
  bio: xss(user.bio)
});

const serializeArt = art => ({
  artid: art.artid,
  title: xss(art.title),
  description: xss(art.description),
  availability: xss(art.availability),
  price: xss(art.price),
  height: xss(art.height),
  width: xss(art.width),
  image: xss(art.image)
});

Router.route("/art")
  .get((req, res, next) => {
    ArtService.getAllArt(req.app.get("db"))
      .then(art => {
        console.log(art);
        res.json(art.map(serializeArt)).status(200);
      })
      .catch(err => {
        logger.error(err);
        next();
      });
  })
  .post(jsonParser, (req, res, next) => {
    for (const field of [
      "title",
      "description",
      "price",
      "height",
      "width",
      "image",
      "availability"
    ]) {
      if (!req.body[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send(`'${field}' is required`);
      }
    }

    const newArt = req.body;
    const noSpaceTitle = newArt.title.split(" ").join("");
    ArtService.insertArt(req.app.get("db"), newArt)
      .then(newArt => {
        res
          .status(201)
          .location(`/art/${noSpaceTitle}`)
          .json(newArt[0]);
      })

      .catch(err => {
        logger.error(err);
        next();
      });
  });

Router.route("/art/:artid")
  .all((req, res, next) => {
    const { artid } = req.params;
    ArtService.getOneArt(req.app.get("db"), artid)
      .then(art => {
        if (!art) {
          logger.error(`art not found.`);
          return res.status(404).json({
            error: { message: `art Not Found` }
          });
        }
        res.art = art;
        next();
      })
      .catch(err => {
        logger.error(err);
        next();
      });
  })
  .get((req, res) => {
    res.json(serializeArt(res.art)).status(200);
  })
  .delete((req, res, next) => {
    const { artid } = req.params;

    ArtService.deleteArt(req.app.get("db"), artid)

      .then(art => {
        logger.info(`Art with id ${artid} deleted.`);
        res.status(200).json({ artid });
      })
      .catch(err => {
        logger.error(err);
        next();
      });
  })
  .patch(jsonParser, (req, res, next) => {
    const {
      title,
      description,
      price,
      height,
      width,
      image,
      availability
    } = req.body;
    const { artid } = req.params;

    const artToUpdate = {
      title,
      description,
      price,
      height,
      width,
      image,
      availability
    };

    const numberOfValues = Object.values(artToUpdate).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain a change for either title, description, price, height, width, image, availability`
        }
      });

    ArtService.updateArt(req.app.get("db"), artid, artToUpdate)
      .then(art => {
        res
          .status(201)
          .location(`/art/${artid}`)
          .json(art[0]);
      })
      .catch(err => {
        logger.error(err);
        next();
      });
  });

Router.route("/users").get((req, res, next) => {
  ArtService.getAllUsers(req.app.get("db"))
    .then(users => {
      res.status(200).json(users.map(serializeUser));
    })
    .catch(err => {
      logger.error(err);
      next();
    });
});

Router.route("/users/:token").get((req, res, next) => {
  const { token } = req.params;
  ArtService.getOneUser(req.app.get("db"), token)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      logger.error(err);
      next();
    });
});

Router.route("/users/:userid").patch(jsonParser, (req, res, next) => {
  const { bio } = req.body;
  const { userid } = req.params;

  const userToUpdate = { bio };
  const numberOfValues = Object.values(userToUpdate).filter(Boolean).length;
  if (numberOfValues === 0)
    return res.status(400).json({
      error: {
        message: `Request body must contain a change for the biographical information`
      }
    });

  ArtService.updateUser(req.app.get("db"), userid, userToUpdate)
    .then(e => {
      res
        .status(201)
        .location(`/users/${e.userid}`)
        .json(e[0]);
    })
    .catch(err => {
      logger.error(err);
      next();
    });
});

module.exports = Router;
