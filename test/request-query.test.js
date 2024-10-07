import express from "express";
import request from "supertest";

const app = express();

app.get("/query", (req, res) => {
    res.send(`Hello ${req.query.firstname} ${req.query.lastname}`);
});

test("Test Query Parameter", async () => {
    const response = await request(app)
    .get("/query")
    .query({
        firstname: "Sony",
        lastname: "Darmawan"
    });

    expect(response.text).toBe("Hello Sony Darmawan");
});