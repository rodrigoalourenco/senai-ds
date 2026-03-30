import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    console.log("Executando o get do backend!!!")
    res.json("Executando o get do backend!!!")
})

app.listen(8800, ()=>{
    console.log("Backend executando!")
})
  