
import express from  "express";
import { accountRouter } from "./routes/account";

const app = express(); 

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Metaverse Project 100xDevs')
});


app.use('/api/v1', accountRouter);


export default app; 

