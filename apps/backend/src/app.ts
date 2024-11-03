
import express from  "express";
import { accountRouter } from "./routes/account";
// import { sideUrlRouter } from "./routes/sideUrl";
// import { spaceRouter } from "./routes/space";


const app = express(); 

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Metaverse Project 100xDevs')
});


app.use('/api/v1', accountRouter);
// app.use('/api/v1',sideUrlRouter);
// app.use('/api/v1',spaceRouter);


export default app; 

