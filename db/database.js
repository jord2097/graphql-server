import pkg from "knex";
const { knex } = pkg;
import { development } from "./knexfile.js";

const db = knex(development);
export default db;
