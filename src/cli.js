import minimist from "minimist";
import { getUserAuth } from "./helper";

const args = minimist(process.argv.slice(2));

let auth = getUserAuth();

console.log("auth is", auth);
