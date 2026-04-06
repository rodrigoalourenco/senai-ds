import sql from "mysql2"

export const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sis_vendas"
})