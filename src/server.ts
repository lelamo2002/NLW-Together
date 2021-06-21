import express from "express"

const app = express();

app.get("/teste", (request, response) => {
  return response.send("olá NLW");
})

app.post("/teste-post", (request, response) => {
  return response.send("olá NLW post!")
})

app.listen(3000, () => console.log("server is running now"));