import {
  createConnection
} from 'mysql';

const hostname = "cse.unl.edu";
const username = "dryckman";
const password = "6WCfFm1V";

const db = createConnection({
  host: hostname,
  user: username,
  password: password,
  database: "dryckman",
});
export default db;