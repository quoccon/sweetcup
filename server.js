const express = require('express') 
const configViewEngine = require('./src/configs/viewEngine')
const initWebRouter = require('./src/router/web') 

require("dotenv").config();
const bodyParser = require('body-parser');
const storage = require('./src/Model/fireBase')
const session = require('express-session');
const cors = require('cors')



const app = express();
const PORT = 8080;
 
//config view engine
configViewEngine(app);
var apiRouter = require('./src/router/api')
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));   
app.use(session({
    secret: 'kjasfiuhsjvbiub8ew8fbffy7f3vds',
    resave: true,
    saveUninitialized: true
  }));


app.use('/api', apiRouter );
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
  
    // kiểm tra link nếu là API thì trả về dữ liệu dạng json
    //  GET:  /api/users 
    if(req.originalUrl.indexOf('/api') ==0 ){
      // đang truy cập vào link api
      res.json( {
          status: 0,
          msg: err.message
      });
  
    }else{
      res.render('error');
    } 
    
  });  

  
//init web router
initWebRouter(app);

app.listen(PORT, ()=>{
    console.log(">>> Server is running on the port :" + PORT);
})