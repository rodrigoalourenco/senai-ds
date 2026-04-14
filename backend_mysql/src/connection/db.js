import sql from "mysql2"

export const db = sql.createConnection({
    host: "sql10.freesqldatabase.com",
    user: "sql10823122",
    password: "",
    database: "sql10823122"
})
