import express from "express";
import request from "supertest";

test("Test Response Status", async () => {
    const app = express();

    app.get("/", (req, res) => {
        if( req.query.name ) {
            res.status(200).send(`Hello ${req.query.name}`);
        } else {
            res.status(400).end();
        }
    })

    let response = await request(app)
    .get("/")
    .query({ name: "Sony" });

    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello Sony");

    response = await request(app).get("/");
    expect(response.status).toBe(400);
});