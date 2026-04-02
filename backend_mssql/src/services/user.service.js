import { poolPromise } from "../connections/mssql-db.js"; 

const getAllUser = async () => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .query('SELECT * FROM users');

        return result?.recordset || null;

    } catch (error) {
        console.error(error);
        throw error; 
    }
};

export default { getAllUser }