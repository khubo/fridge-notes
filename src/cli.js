import {
  OnePubOneWorkspaceSyncer,
  StorageMemory,
  ValidatorEs4,
} from "earthstar";
import minimist from "minimist";

import { PUB_ADDRESS, WORKSPACE } from "./config";
import { createNote, readAllNotes, syncData } from "./actions";

const args = minimist(process.argv.slice(2));

const storage = new StorageMemory([ValidatorEs4], WORKSPACE);
const syncer = new OnePubOneWorkspaceSyncer(storage, PUB_ADDRESS);

if (args["new"]) {
  createNote(storage, args["new"]);
  if (args["sync"]) syncData(syncer);
}

if (args["list"]) {
  (async () => {
    if (args["sync"]) {
      await syncer.syncOnce(false);
    }
    readAllNotes(storage);
  })();
}
