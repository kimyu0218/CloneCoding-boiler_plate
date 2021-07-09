const express = require('express') /* express 모듈 가져오기 */
const app = express() /* 앱 생성 */
const port = 5000
const bodyParser = require('body-parser');
const { User } = require('./models/User');
const config = require('./config/key');

//application/x-www-form-urlencoded 분석하기 위함
app.use(bodyParser.urlencoded({extended: true}));
//application/json 분석하기 위함
app.use(bodyParser.json());

const mongoose = require('mongoose') /* mongoose 모듈 가져오기 */
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...')) /* 연결 성공 */
.catch(err => console.log(err)) /* 연결 실패 */

/* root 디렉토리에 출력되도록 */
app.get('/', (req, res) => {
  res.send('Hello World! 김유정')
})

app.post('/register', (req, res) => {
    // 회원 가입할 때 필요한 정보들을 client에서 가져오면 데이터베이스에 넣어준다.
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if(err) return res.json({ success:false, err })
        return res.status(200).json({ success: true })
    })
})
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})