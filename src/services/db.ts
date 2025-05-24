
import { worker } from "@electric-sql/pglite/worker";
//@ts-ignore
import { PGlite } from 'https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/index.js'

const number=1;
worker({
  async init() {
    const db = new PGlite("idb://patient-db", {
      relaxedDurability: true,
    });

    await db.waitReady;
    
    // Create tables if they don't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        gender TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

      );
    `);
    
    return db;
  },
});
export {number};