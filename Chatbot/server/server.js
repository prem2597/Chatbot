import express from "express";
import { urlencoded, json } from "body-parser";
import cors from "cors";
import { create } from "axios";

require("dotenv").config();
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

const axios_instance = create({
  baseURL: 'http://localhost:5000/api/userquery',
  timeout: 3000,
});
