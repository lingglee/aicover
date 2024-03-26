import { Word } from "@/types/word";
import { getDb } from "./db";

export async function insertWord(word: Word) {
  const db = getDb();
  const res = await db.query(
    `INSERT INTO covers 
        (word, word_category, user_id, status, created_at, updated_at) 
        VALUES 
        ($1, $2, $3, $4, $5, $6)
    `,
    [
      word.word,
      word.word_category,
      word.user_id,
      word.status,
      word.created_at,
      word.updated_at,
    ]
  );

  return res;
}