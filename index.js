const express = require('express') /* express 모듈 가져오기 */
const app = express() /* 앱 생성 */
const port = 5000

const mongoose = require('mongoose') /* mongoose 모듈 가져오기 */
mongoose.connect('mongodb+srv://KimYujeong:kimyu0218@boilerplate.2sjmj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...')) /* 연결 성공 */
.catch(err => console.log(err)) /* 연결 실패 */

/* root 디렉토리에 출력되도록 */
app.get('/', (req, res) => {
  res.send('Hello World! 김유정')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})