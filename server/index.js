// << 회원 가입 기능 만들기 >>

// 모듈 가져오기
const express = require('express') // express 모듈 가져오기 (노드 js 프레임워크)
const app = express() // 앱 생성
const bodyParser = require('body-parser'); // body-parser 가져오기
const cookieParser = require('cookie-parser'); //cookie-parser 가져오기

const port = 5000 // 포트번호 설정

// 모듈 가져오기 (js 파일)
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');
const config = require('./config/key');

// application/x-www-form-urlencoded 분석하기 위함
app.use(bodyParser.urlencoded({ extended: true }));

// application/json 분석하기 위함
app.use(bodyParser.json());
app.use(cookieParser());

// 몽고 DB 연결
const mongoose = require('mongoose') // mongoose 모듈 가져오기
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
})
.then(() => console.log('MongoDB Connected...')) // 연결 성공
.catch(err => console.log(err))                  // 연결 실패

// root 디렉토리에 출력되도록
app.get('/', (req, res) => {
  res.send('Hello World! 김유정')
})

// 1. 회원가입
app.post('/api/users/register', (req, res) => {
  // 회원 가입할 때 필요한 정보들을 client에서 가져오면 데이터베이스에 넣어준다.
  const user = new User(req.body)
  user.save((err, userInfo) => {
      if(err) return res.json({ success:false, err })
      return res.status(200).json({ success: true })
  })
})

// 2. 로그인
app.post('/api/users/login', (req, res) => {

  // 2-1. 요청된 이메일이 데이터베이스에서 있는지
  User.findOne({ email: req.body.email }, (err, user) => { // (findOne: 몽고DB 메서드)
    if(!user) { // 사용자가 없는 경우
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    // 2-2. 요청된 이베일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) // 비밀번호 불일치
        return res.json({ 
          loginSuccess: false, 
          message: "비밀번호가 틀렸습니다." })
    })

    // 2-3. 비밀번호가 일치한다면 토큰 생성
    user.generateToken((err, user) => {
      if(err) return res.status(400).send(err);
      // 토큰 저장 -> 쿠키
      res.cookie("x_auth", user.token)  // (cookies.x_auth에 token 들어있음)
      .status(200)
      .json({ loginSuccess: true, userId: user._id })
    })
  })
})

// 3. 인증
app.get('/api/users/auth', auth, (req, res) => {
  // authentication 완료ple
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, // 0 일반유저
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

// 4. 로그아웃
app.get('/api/users/logout', auth, (req, res) => {
  // 토큰 비우기
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).send({ success: true })
  })
})

app.get('/api/hello', (req, res) => {
  res.send('안녕하세요~')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})