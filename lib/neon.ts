import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URI!, {
  ssl: 'require',
});

export default sql;