const app = require("./app.js");
const { connectDatabase } = require("./server/db.service.js");
const { client } = require("./server/redis.service.js");
const { APPLICATION_PORT } = require("./services/environment.service.js");

async function bootstrap() {
  try {
    await connectDatabase();

    app.listen(APPLICATION_PORT);
  } catch (error) {
    console.log(error);
  }

  try {
    await client.connect();
  } catch (error) {
    console.log(error);
  }

  console.log(`http://localhost:${APPLICATION_PORT}/`);
}

bootstrap();
