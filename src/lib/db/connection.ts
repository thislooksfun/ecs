import type { QueryResult, QueryResultRow } from "pg";
import { DatabaseUrl } from "$lib/env";
import pg from "pg";

const pool = new pg.Pool({ connectionString: DatabaseUrl });

export async function query<
  R extends QueryResultRow = any,
  I extends any[] = any[]
>(query: string, values?: I): Promise<QueryResult<R>> {
  return await pool.query(query, values);
}

function buildKVPairs<I extends any = any>(
  data: { [key: string]: I },
  start: number = 1
): { s: string; v: I[] } {
  const keys = Object.keys(data);
  const items = keys.map((k, i) => `${k}=$${i + start}`).join(", ");
  return { s: items, v: Object.values(data) };
}

function buildSelectQuery<I extends any = any>(
  table: string,
  rows: string,
  where: { [key: string]: I },
  limit?: number,
  join?: { [key: string]: string },
  joinType: string = "INNER"
): string {
  let q = `SELECT ${rows} FROM ${table}`;
  if (join) {
    for (const [table, on] of Object.entries(join)) {
      q += ` ${joinType} JOIN ${table} ON ${on}`;
    }
  }

  const { s: checks } = buildKVPairs(where);
  q += ` WHERE ${checks}`;

  if (limit) q += ` LIMIT ${limit}`;

  return q;
}

export async function select<
  R extends QueryResultRow = any,
  I extends any = any
>(
  table: string,
  rows: string,
  where: { [key: string]: I },
  limit?: number,
  join?: { [key: string]: string },
  joinType: string = "INNER"
): Promise<QueryResult<R>> {
  const values = Object.values(where);
  const q = buildSelectQuery(table, rows, where, limit, join, joinType);
  return await query(q, values);
}

export async function selectExists<I extends any = any>(
  table: string,
  where: { [key: string]: I },
  join?: { [key: string]: string },
  joinType: string = "INNER"
): Promise<boolean> {
  const values = Object.values(where);

  const q = buildSelectQuery(table, "1", where, 1, join, joinType);
  const { rows } = await query(`SELECT EXISTS(${q}) AS "exists"`, values);
  return rows[0].exists;
}

export async function insert<
  R extends QueryResultRow = any,
  I extends any = any
>(
  table: string,
  data: { [key: string]: I },
  returning?: string
): Promise<QueryResult<R>> {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const indexes = values.map((_, i) => `$${i + 1}`);

  let q = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${indexes})`;
  if (returning) q += ` RETURNING ${returning}`;
  return await query(q, values);
}

export async function update<
  R extends QueryResultRow = any,
  I extends any = any,
  J extends any = any
>(
  table: string,
  data: { [key: string]: I },
  where: { [key: string]: J }
): Promise<QueryResult<R>> {
  const { s: set, v: setVals } = buildKVPairs(data);
  const { s: checks, v: checkVals } = buildKVPairs(where, setVals.length + 1);

  const q = `UPDATE ${table} SET ${set} WHERE ${checks}`;
  return await query(q, [...setVals, ...checkVals]);
}

export async function del<R extends QueryResultRow = any, I extends any = any>(
  table: string,
  where: { [key: string]: I }
): Promise<QueryResult<R>> {
  const keys = Object.keys(where);
  const values = Object.values(where);
  const checks = keys.map((k, i) => `${k}=$${i + 1}`).join(", ");

  let q = `DELETE FROM ${table} WHERE ${checks}`;
  return await query(q, values);
}
