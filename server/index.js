const exp = require('express');
const app = exp();

app.get("/", (req, res) => {
    res.send("hello ")
})

app.listen(1101, () => {
    console.log('server is run ')
})