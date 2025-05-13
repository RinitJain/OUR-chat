import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const deleteOldMessages = functions.pubsub
  .schedule("every 6 hours")
  .timeZone("Asia/Kolkata")
  .onRun(async (_context) => {
    console.log("🔥 Scheduled deletion function triggered");

    const now = Date.now();
    const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;

    const snapshot = await db.collection("messages")
      .where("timestamp", "<", new Date(twentyFourHoursAgo))
      .orderBy("timestamp", "asc")
      .get(); // Removed .limit()

    let deletedCount = 0;
    const batchSize = 500;
    let batch = db.batch();

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const isStarred = data.star === true;

      if (!isStarred) {
        batch.delete(doc.ref);
        deletedCount++;

        console.log(`🗑️ Deleting: ${doc.id} - ${data.text}`);

        // Commit in batches of 500
        if (deletedCount % batchSize === 0) {
          await batch.commit();
          console.log(`🚀 Batch of ${batchSize} deletions committed.`);
          batch = db.batch();
        }
      }
    }

    if (deletedCount % batchSize !== 0) {
      await batch.commit();
      console.log("🚀 Final batch committed.");
    }

    console.log(`✅ Deleted ${deletedCount} old messages.`);
    return null;
  });
