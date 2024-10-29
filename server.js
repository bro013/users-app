const express = require('express');
const userRouter = require('./routes/users')
const app = express();

app.set('view engine', 'ejs')

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/users', userRouter);

app.listen(3000)