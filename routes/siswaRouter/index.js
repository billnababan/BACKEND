const express = require("express");

const app = express();

const Siswa = require("./siswa");

const api = "/api/v1";

app.use(api, Siswa);
module.exports = app;
