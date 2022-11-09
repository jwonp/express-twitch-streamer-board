import { runQuery } from "../db";

export const excuteSelect = async (
  select: string,
  from: string,
  where: string
) => {
  return await runQuery(`
    SELECT ${select} 
    FROM ${from} 
    WHERE ${where}`);
};

// export const excuteSelect = async (
//   select: string[],
//   from: string,
//   where: string
// ) => {
//   return await runQuery(
//     `SELECT
//     ${select.length > 1 ? select.map((item) => item + ", ") : select[0]}
//     FROM ${from}
//     WHERE ${where}`
//   );
// };

export const excuteInsert = async () => {
  // return await runQuery(`INSERT INTO ${table} VALUES (${})`);
};

export const excuteUpdate = async () => {};

export const excuteDelete = async () => {};
