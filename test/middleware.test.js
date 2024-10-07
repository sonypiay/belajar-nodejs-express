import express from "express";
import request from "supertest";

const logger = (req, res, next) => {
    console.info(`Receive request: ${req.method} ${req.originalUrl}`);
    next();
};

const addPoweredHeader = (req, res, next) => {
    res.set('X-Powered-By', 'PZN');
    next();
}

const validateApiKey = (req, res, next) => {
    if( req.query.apiKey ) {
        next();
    } else {
        res.status(401).end();
    }
}

const requestTimeMiddleware = (req, res, next) => {
    req.requestTime = Date.now();
    next();
}

const app = express();

app.use(logger);
app.use(validateApiKey);
app.use(addPoweredHeader);
app.use(requestTimeMiddleware);

app.get("/", ( req, res ) => {
    res.send("OK");
});

app.get("/time", ( req, res ) => {
    res.send(`Today is ${req.requestTime}`);
});

test("Test Middleware 1", async () => {
    let response = await request(app).get("/").query({
        apiKey: '123',
    });
    expect(response.get("X-Powered-By")).toBe("PZN");
    expect(response.text).toBe("OK");
    expect(response.status).toBe(200);
});

test("Test Middleware 2", async () => {
    let response = await request(app).get("/");
    expect(response.status).toBe(401);
});

test("Test Middleware 3", async () => {
    let response = await request(app).get("/time").query({
        apiKey: '123',
    });
    expect(response.get("X-Powered-By")).toBe("PZN");
    expect(response.text).toContain(`Today is `);
    expect(response.status).toBe(200);
});