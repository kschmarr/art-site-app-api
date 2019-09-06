const express = require("express");
const xss = require("xss");
const logger = require("./logger");
const ArtService = require("./art-service");
const jsonParser = express.json();
const Router = express.Router();

const serializeUser = user => ({
  username: xss(user.username),
  userid: xss(user.userid),
  token: xss(user.token),
  bio: xss(user.bio)
});

const serializeArt = art => ({
  title: xss(art.title),
  description: xss(art.description),
  price: xss(art.price),
  dims: xss(art.dims),
  image: xss(art.image)
});

Router.route("/art").get((req, res, next) => {
  console.log(req.app.get("db")._context.client);
  ArtService.getAllArt(req.app.get("db"))
    .then(art => {
      console.log("middle message");
      res.json(art.map(serializeArt)).status(200);
    })
    .catch(next);
  console.log("final message");
});
// .post(jsonParser, (req, res, next) => {
//   for (const field of ["meal", "rotation"]) {
//     if (!req.body[field]) {
//       logger.error(`${field} is required`);
//       return res.status(400).send(`'${field}' is required`);
//     }
//   }

//   const meal = req.body;

//   ArtService.insertMeal(req.app.get("db"), meal)
//     .then(meal => {
//       res
//         .status(201)
//         .location(`/meals/${meal.meal}`)
//         .json(meal[0]);
//     })

//     .catch(next);
// });

// Router.route("/edit-meal/:mealid")
//   .all((req, res, next) => {
//     const { mealid } = req.params;
//     ArtService.getOneMeal(req.app.get("db"), mealid)
//       .then(meal => {
//         if (!meal) {
//           logger.error(`Meal not found.`);
//           return res.status(404).json({
//             error: { message: `Meal Not Found` }
//           });
//         }
//         res.meal = meal;
//         next();
//       })
//       .catch(next);
//   })
//   .get((req, res) => {
//     res.json(serializeArt(res.meal)).status(200);
//   })
//   .delete((req, res, next) => {
//     const { mealid } = req.params;

//     ArtService.deleteMeal(req.app.get("db"), mealid)

//       .then(meal => {
//         logger.info(`Meal with id ${mealid} deleted.`);
//         res.status(200).json({ mealid: mealid });
//       })
//       .catch(next);
//   })
//   .patch(jsonParser, (req, res, next) => {
//     const { meal, rotation, date_last_eaten } = req.body;
//     const { mealid } = req.params;

//     const mealToUpdate = { meal, rotation, date_last_eaten };

//     const numberOfValues = Object.values(mealToUpdate).filter(Boolean).length;
//     if (numberOfValues === 0)
//       return res.status(400).json({
//         error: {
//           message: `Request body must contain an change for either meal, date_last_eaten, or rotation`
//         }
//       });

//     ArtService.updateMeal(req.app.get("db"), mealid, mealToUpdate)
//       .then(e => {
//         res
//           .status(201)
//           .location(`/meals/${mealid}`)
//           .json(e[0]);
//       })
//       .catch(next);
//   });

Router.route("/users").get((req, res, next) => {
  ArtService.getAllUsers(req.app.get("db"))
    .then(users => {
      res.status(200).json(users);
    })

    .catch(next);
});
//   .post(jsonParser, (req, res, next) => {
//     for (const field of ["username", "token"]) {
//       if (!req.body[field]) {
//         logger.error(`${field} is required`);
//         return res.status(400).send(`'${field}' is required`);
//       }
//     }

//     const newUser = req.body;

//     ArtService.insertUser(req.app.get("db"), newUser)
//       .then(user => {
//         if (!user) {
//           logger.error(`user not found.`);
//           return res.status(404).json({
//             error: { message: `User Not Found` }
//           });
//         }
//         res
//           .status(201)
//           .location(`/users/${newUser.username}`)
//           .json(user[0]);
//       })
//       .catch(next);
//   });

// Router.route("/users/:userid")
//   .all((req, res, next) => {
//     const { userid } = req.params;
//     ArtService.getOneUser(req.app.get("db"), userid)
//       .then(user => {
//         if (!user) {
//           logger.error(`user not found.`);
//           return res.status(404).json({
//             error: { message: `User Not Found` }
//           });
//         }

//         res.user = user;
//         next();
//       })
//       .catch(next);
//   })
//   .get((req, res) => {
//     res.json(serializeUser(res.user));
//   })
//   .delete((req, res, next) => {
//     const { userid } = req.params;

//     ArtService.deleteUser(req.app.get("db"), userid)
//       .then(() => {
//         logger.info(`User with id ${userid} deleted.`);
//         res.status(200).json({ userid: userid });
//       })
//       .catch(next);
//   })
//   .patch(jsonParser, (req, res, next) => {
//     const { meal_index, short_index, medium_index, long_index } = req.body;
//     const { userid } = req.params;

//     const userToUpdate = { meal_index, short_index, medium_index, long_index };
//     const numberOfValues = Object.values(userToUpdate).filter(Boolean).length;
//     if (numberOfValues === 0)
//       return res.status(400).json({
//         error: {
//           message: `Request body must contain an change for either meal_index, short_index, medium_index, or long_index`
//         }
//       });

//     ArtService.updateUser(req.app.get("db"), userid, userToUpdate)
//       .then(e => {
//         res
//           .status(201)
//           .location(`/users/${userid}`)
//           .json(e[0]);
//       })
//       .catch(next);
//   });

module.exports = Router;
