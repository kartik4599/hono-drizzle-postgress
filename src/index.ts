import { serve } from "@hono/node-server";
import { Hono } from "hono";
import database from "./database/database";
import { User } from "./database/schema";

const app = new Hono();

app.get("/", async (c) => {
  const { req, res, json } = c;
  return json({
    msg: req.query(),
  });
});

app.post("/user", async (c) => {
  const { req, json } = c;
  const { name, age, email } = await req.json();

  const data = await database
    .insert(User)
    .values({ name, age, email })
    .returning();

  return json({
    data,
  });
});

app.delete("/", async (c) => {
  const { req, res, json } = c;
  await database.delete(User);
  return json({
    msg: req.query(),
  });
});

const port = 5500;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
