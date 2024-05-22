import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: 'localhost',
    port: '3306',
    user: 'Prueba01',
    password: 'prueba01',
    database: 'prueba01'
});

export default pool;