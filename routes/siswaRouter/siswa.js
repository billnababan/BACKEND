const express = require("express");
const { getSiswa, createSiswa, updateSiswa, updateSiswaById, deteleSiswa } = require("../../controllers/siswa");
const app = express();

app.get("/siswa", getSiswa);
app.post("/siswa", createSiswa);
app.put("/siswa/:id", updateSiswa);
app.patch("/siswa/:id", updateSiswaById);
app.delete("/siswa/:id", deteleSiswa);

module.exports = app;
