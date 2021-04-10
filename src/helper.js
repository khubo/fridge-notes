import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import readLine from "readline-sync";
import { generateAuthorKeypair } from "earthstar";
import { KEY_FILE, CONFIG_DIR } from "./config";

export function getUserAuth() {
  // if config directory doesnt exist create it
  if (!existsSync(CONFIG_DIR)) {
    mkdirSync(CONFIG_DIR);
  }

  // check if user has already has an account
  // then fetch it and return
  if (existsSync(KEY_FILE)) {
    const auth = JSON.parse(readFileSync(KEY_FILE, { encoding: "utf-8" }));
    console.log("returning from here");
    return auth;
  }

  // if user doesnt have an account, suggest creating one
  const response = readLine.question(
    "No accounts found locally. Do you want to generate one? [Y/n]: "
  );

  if (response.toLowerCase() === "n") {
    console.log("Okay, Bye!");
    process.exit(0);
  }

  if (response.toLocaleLowerCase() !== "y") {
    console.log("invalid input. Quitting");
    process.exit(0);
  }

  const username = readLine.question(
    "Enter a 4 character long username for you: "
  );

  if (username.length !== 4) {
    console.log("Oopsie, not 4! \n exiting");
    process.exit(0);
  }

  // generate a new keypair and save it to config folder
  const auth = generateAuthorKeypair(username);
  writeFileSync(KEY_FILE, JSON.stringify(auth), {
    encoding: "utf-8",
  });
  return auth;
}
