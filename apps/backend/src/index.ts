import app from "./app";  

const PORT = process.env.PORT || 3000;
app.listen(8000, () => {
  console.log( `Server running in http://localhost:${PORT}`);
})


