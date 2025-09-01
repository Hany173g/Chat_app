const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);
const getFriendRequests = require('./controllors/friend.controlloers').getFriendRequests
const socketIO = require('socket.io')
require('dotenv').config();

const app = express();
const server = require('http').createServer(app)
const io = socketIO(server)

// إعدادات البورت والـ DB
const PORT = process.env.PORT || 3000;
const DURL = process.env.DURL;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/chatapp', // رابط قاعدة البيانات
  collection: 'sessions' // اسم الجدول/المجموعة اللي هيتخزن فيها الـ sessions
});
app.use(session({
  secret: 'chatappliction',
  resave: false,
  saveUninitialized: false,
  store: store,   // هنا أهم حاجة
  cookie: { maxAge: 1000 * 60 * 60  * 24} // ساعة
}));

app.use(flash());

// إعداد الـ EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// ملفات static
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname,'images')))
// Routes




//sokect io

io.OnlineUsers = {};
require('./sockets/notfications')(io)
require('./sockets/chat')(io)
require('./sockets/groups')(io)
io.on('connection', socket => {
  
  require('./sockets/friend')(io,socket)
})


app.use(async (req,res,next) => {
  try {
  if (req.session.userId){
    let friendsRequests = await getFriendRequests(req.session.userId);
    req.friendsRequest = friendsRequests;
    next()
    }else
    {
      next();
    }
  }catch{
    console.log("error")
  }
})
const authRoute = require('./routes/auth.route');
const profileRoute = require('./routes/profile.route');
const friendRoute = require('./routes/friend.route');
const homeRoute = require('./routes/home.route')
const messageRouter = require('./routes/chat.route');
const groupRoute = require('./routes/groups.route')
app.use(groupRoute);
app.use(authRoute);
app.use('/chat',messageRouter);
app.use(profileRoute);
app.use('/friend',friendRoute);
app.use(homeRoute)
// الاتصال بالـ MongoDB
mongoose.connect(DURL)
    .then(() => console.log("Database connected"))
    .catch(err => console.error("DB connection error:", err));

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

