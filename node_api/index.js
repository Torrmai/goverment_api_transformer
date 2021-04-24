const express = require('express')
const app = express()
const port = 8000
app.use('/api',require('./my_modules/routes'))
app.use(function (req,res,next) {
    res.status(404);
    res.json({err:"Api path worng"})
})

app.listen(port,()=>{
    console.log(`listening to ${port}`)
})