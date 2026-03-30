import express from 'express';
import sql from 'mssql';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    console.log("Executando o get do backend!!!")
    res.json("Executando o get do backend!!!")
})

// Configuração do MSSQL
const config = {
    user: 'senai',
    password: '1234',
    database: 'sis_vendas',
    server: 'localhost',
    port: 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}

const conexaoDb = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado ao banco de dados!');
        return pool;
    })
    .catch(err => {
        console.log(err)
        throw err;
    });

app.get('/users', async(req, res) => {
    console.log("Executando o get Users !!!")
    
    try {
        const pool = await conexaoDb;
        const result = await pool.request()
            .query("SELECT * FROM users");

        console.log(result.recordset)
        //res.json(result.recordset)

        res.status(200).json({
            success: true,
            code: 200,
            data: result.recordset})
        
    } catch (error) {
        res.status(500).json({
            success: true,
            code: 500,
            data: error})
        console.log(error)
    }
});

app.listen(8800, ()=>{
    console.log("Backend executando!")
})
  