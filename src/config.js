import os from "os";

export const HOME_DIR = os.homedir();
export const CONFIG_DIR = `${HOME_DIR}/.fridge-notes`;
export const KEY_FILE = `${CONFIG_DIR}/key.json`;
