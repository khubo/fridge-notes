import os from "os";

export const HOME_DIR = os.homedir();
export const CONFIG_DIR = `${HOME_DIR}/.fridge-notes`;
export const KEY_FILE = `${CONFIG_DIR}/key.json`;

// TODO: remove hardcoded pub and workspace
export const PUB_ADDRESS = "https://earthstar-demo-pub-v5-a.glitch.me";
export const WORKSPACE = "+fridgenotes.q0b4jf9qo4f3fb4";
