const express = require("express");
const bodyParser = require("body-parser");
const { createServer } = require("http");
const siswaRoutes = require("./routes/siswaRouter");

const app = express();
const PORT = 5050;
const server = createServer(app);

app.use(bodyParser.json());

app.use(siswaRoutes);

app.use("/config", (_, res) => {
  return res.send("Server already running!");
});

// http://localhost:50501
server.listen(PORT, () => console.log(`server are running in http://localhost:${PORT}`));
