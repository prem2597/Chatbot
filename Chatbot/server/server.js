import express from "express";
import { urlencoded, json } from "body-parser";
import cors from "cors";
import { create } from "axios";

dotenv.config();
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

const axios_instance = create({
  baseURL: 'http://localhost:5000/api/userquery',
  timeout: 3000,
});

const { intent, parameters, outputContexts, queryText } = req.body.queryResult;

const query = (parameters.os_commands) ? parameters.os_commands.toLowerCase().replace('.', '-').replace(' ', '').replace("'", "") : ''; 
// const specs = parameters.specs;
// const get_type_effectiveness = (parameters.type_effectiveness) ? true : false;

let response_obj = {};


