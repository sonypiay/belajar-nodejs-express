import express from "express";
import request from "supertest";

test("Test Response Header", async () => {
    const app = express();

    app.get("/", (req, res) => {
        res.set({
            "X-Powered-By": "PZN",
            "X-Author": "Eko"
        });

        res.send("OK");
    });

    const response = await request(app).get("/");

    expect(response.text).toBe("OK");
    expect(response.get("X-Powered-By")).toBe("PZN");
    expect(response.get("X-Author")).toBe("Eko");
});