import { isErr } from "earthstar";
import { generateNoteId, getUserAuth } from "./helper";

let auth = getUserAuth();

export async function createNote(storage, note) {
  try {
    if (!note) {
      console.log("no notes passed");
      process.exit(1);
    }

    const path = `/fridgenotes/${generateNoteId()}.txt`;
    const write = storage.set(auth, {
      format: "es.4",
      path,
      content: note,
    });

    if (isErr(write)) {
      console.log("error is", write);
      process.exit(1);
    }
    console.log("Note added..`");
  } catch (e) {
    console.log("error creating a note", e);
    process.exit(1);
  }
}

export async function syncData(syncer) {
  console.log("Syncing with pub...");
  syncer.syncOnce(false).then(() => {
    console.log("synced...");
    process.exit(1);
  });
}

export function readAllNotes(storage) {
  const paths = storage.paths().sort();
  for (const path of paths) {
    const doc = storage.getDocument(path);
    console.log(`${doc.author.slice(0, 5)}: ${doc.content}`);
  }
  process.exit(0);
}
