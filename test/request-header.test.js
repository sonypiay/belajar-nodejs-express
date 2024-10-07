import express from "express";
import request from "supertest";

test("Test Request Header", async () => {
    const app = express();
    
    app.get("/header", (req, res) => {
        const type = req.get("accept");
        res.send(`Hello ${type}`);
    });

    const response = await request(app)
    .get("/header")
    .set("Accept", "text/plain");

    expect(response.text).toBe("Hello text/plain");
});