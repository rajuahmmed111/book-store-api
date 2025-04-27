import { Server } from "http";
import config from "./App/config";
import app from "./app";

async function main() {
  const server: Server = app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
  });
}

main();
