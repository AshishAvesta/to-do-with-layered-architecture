// src/infrastructure/config/database.ts

import { Pool } from 'pg';

const pool = new Pool({
  host: '192.168.1.110',
  port: 5432,
  user: 'postgres',
  password: 'avesta',
  database: 'todo',
});

export default pool;
