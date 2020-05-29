const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const axios_instance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 3000,
});
