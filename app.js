const express=require('express')
const session=require('express-session')
const data=require('./data')
const app=express()
const credentials={email:'devasasi@gmail.com',password:407256}

app.set('view engine','ejs')

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    
  }))

app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});


app.get('/',(req,res)=>{
    if(req.session.log){
        res.render('home',{data})
    }else{
        res.render('login',{invalid:req.session.invalid})
        req.session.invalid=false
        req.session.save()
        
    }

})

app.post('/login',(req,res)=>{
    if(req.body.email==credentials.email && req.body.password==credentials.password){
        req.session.log=true
        
         res.redirect('/')
    }else{
        req.session.invalid=true
        res.redirect('/')
    }
})

app.post('/home',(req,res)=>{
    req.session.log=false
    res.redirect('/')
})

app.listen(5000,()=>{
    console.log('Server is running ')
})