const Koa = require('koa');
const app = new Koa();
let cors = require('koa2-cors');
const Router = require('koa-route');
const Static = require('koa-static');
const path = require('path');
const jwt = require('koa-jwt');

const db = require(path.resolve('db.json'));

//导middleware
import ErrorHandle from './middleware/ErrorHandle.js';

//jwt
import JWTHandle from './middleware/JWTHandle.js';

//koa-route
import Login from './route/auth/Login.js';
import Home from './route/Home';
import WriteArticle from './route/WriteArticle.js';
import ArticleList from './route/ArticleList.js';
import GetArticle from './route/GetArticle.js';
import DeleteArticle from './route/DeleteArticle.js';
import Deploy from './route/Deploy.js';


//导入中间件
app.use(cors());
app.use(ErrorHandle);
app.use(Router.post('/auth/login', Login));


//--------------------------------------------
app.use(JWTHandle.UnAuthorizationHandle);
app.use(jwt({ secret: db.auth.secret }));
//--------------------------------------------

//导入路由
app.use(Static(path.resolve('dist')));
app.use(Router.get('/', ctx => {ctx.response.redirect('/index.html')}));
app.use(Router.get('/home', Home));
app.use(Router.get('/article', GetArticle));
app.use(Router.get('/article/list', ArticleList));
app.use(Router.post('/article/new', WriteArticle));
app.use(Router.post('/article/delete', DeleteArticle));
app.use(Router.get('/article/deploy', Deploy));

//端口启动
app.listen(3000);