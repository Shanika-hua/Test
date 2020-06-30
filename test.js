const Koa = require("koa");
const fs = require("fs");
const app = new Koa();

const main = async function (ctx) {
  ctx.response.type = "html";
  ctx.response.body = await fs.readFile("./demo.html", "utf8");
  console.log("xxxx");
};

app.use(main);
app.listen(3002);
