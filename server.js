const app = require("./app");
const http = require("http");
const onError = (error) => {
  
  if (error.syscall !== "listen") {
    throw error;
  }

  //Handling the LISTENING error:
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const port = process.env.PORT || "3000";
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.listen(port);