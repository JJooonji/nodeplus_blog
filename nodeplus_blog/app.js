// require("dotenv").config();
const express = require("express");
const app = express();

const port = 3333;



//mysql 연결
const { sequelize } = require('./models')

sequelize.sync({ force: false })
    .then(() => {
        console.log("데이터베이스 연결 성공!")
})
    .catch((err) => {
        console.log(err, "데이터베이스 연결 error..")
    });

//connetct
const PostRouter = require("./routes/posts");

app.use(express.json());//순서가..?

//미들웨어
app.use('/api', [PostRouter])
app.use(express.urlencoded({ extended: false }))



app.listen(port, () =>{
    console.log(`${port}에서 서버가 열렸습니다!`)
})