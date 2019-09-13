const app = require("../src/app");
const expect = require("chai").expect;
const request = require("supertest");
const knex = require("knex");
const fixtures = require("./art-fixtures");

describe("Dinner App", () => {
  it("GET / should return a message", () => {
    return request(app)
      .get("/")
      .expect(200, "Hello, Kris!");
  });
});
describe("Dinner App", () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: "postgresql://postgres@localhost/art_site_app"
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => db("art").truncate());

  afterEach("cleanup", () => db("users").truncate());

  describe("GET /art", () => {
    context(`If tables are empty`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/art")
          .expect(200, []);
      });
    });

    context("Given there is art in the database", () => {
      const testart = fixtures.makeArtArray();

      beforeEach("insert art", () => {
        return db.into("art").insert(testart);
      });

      it("gets the art from the store", () => {
        return supertest(app)
          .get("/art")
          .expect(200, testart);
      });
    });
  });

  describe("GET /art/:artid", () => {
    context(`Given no art`, () => {
      it(`responds 404 Art Not Found`, () => {
        return supertest(app)
          .get(`/art/123`)
          .expect(404, {
            error: { message: `Art Not Found` }
          });
      });
    });

    context("Given there is art in the database", () => {
      const testart = fixtures.makeArtArray();

      beforeEach("insert art", () => {
        return db.into("art").insert(testart);
      });

      it("responds with 200 and the specified art", () => {
        const artTitle = "Flatirons";
        const expectedArt = testart[1];
        return supertest(app)
          .get(`/art/${artTitle}`)
          .expect(200, expectedArt);
      });
    });
  });

  describe("DELETE /art/:artid", () => {
    context("Given there is art in the database", () => {
      const testart = fixtures.makeArtArray();

      beforeEach("insert art", () => {
        return db.into("art").insert(testart);
      });

      it("removes the art by ID from the store", () => {
        const idToRemove = "820ee752-d3d0-11e9-aa2e-22000bcdf204";
        const expectedart = testart.filter(art => art.artid !== idToRemove);
        return supertest(app)
          .delete(`/art/${idToRemove}`)
          .expect(204)
          .then(() =>
            supertest(app)
              .get(`/art`)
              .expect(expectedart)
          );
      });
    });
  });

  describe("POST /art", () => {
    it("adds a new art to the store", () => {
      const newart = {
        title: "Flatirons",
        description:
          "Flatirons - Boulder, CO.Acrylic paint with varnish, on Sandstone.",
        price: "90",
        height: "9",
        width: "12",
        availability: "available",
        image: "https://i.imgur.com/QAw7mKV.jpg"
      };
      return supertest(app)
        .post(`/art`)
        .send(newart)
        .expect(201)
        .expect(res => {
          expect(res.body.title).to.eql(newart.title);
          expect(res.body.description).to.eql(newart.description);
          expect(res.body.price).to.eql(newart.price);
          expect(res.body.height).to.eql(newart.height);
          expect(res.body.width).to.eql(newart.width);
          expect(res.body.availability).to.eql(newart.availability);
          expect(res.body.image).to.eql(newart.image);
        })
        .then(res =>
          supertest(app)
            .get(`/art/${res.body.artid}`)
            .expect(res.body)
        );
    });
  });
});
