import express from "express";
import request from "supertest";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/json', (req, res) => {
    const name = req.body.name;
    res.json({
        message: `Hello ${name}`,
    });
});

app.post('/form', (req, res) => {
    const name = req.body.name;
    res.json({
        message: `Hello ${name}`,
    });
});

test("Request Body Json", async () => {
    const response = await request(app).post('/json')
    .set('Content-Type', 'application/json')
    .send({
        name: 'World'
    });

    expect(response.body).toEqual({
        message: "Hello World"
    });
});

test("Request Body Form", async () => {
    const response = await request(app).post('/form')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send("name=World");

    expect(response.body).toEqual({
        message: "Hello World"
    });
});