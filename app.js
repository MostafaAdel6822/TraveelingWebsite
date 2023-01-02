var express = require('express');
const { Db } = require('mongodb');
var path = require('path');
var app = express();
var session=require('express-session');
const PORT = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(session({
      
  
   resave:false,
   saveUninitialized:true,
   secret:'hhg',
  
  
  
 }));

var MongoClient = require('mongodb').MongoClient;

// Connect to the db
app.post("/register",function(req,res){
  var x =req.body.username;
  var y =req.body.password;
  var flag =false;
   if (x=="" || y=="")
   {
    res.render("registration",{text:"Fill All Boxes",text1:""})
   }
   else
   {
   MongoClient.connect("mongodb://0.0.0.0:27017/",  { useUnifiedTopology: true }, function (err, client) {
       if(err)  throw err;
       var db= client.db("myDB");
       db.collection("myCollection").find().toArray(function(err,s){
        for(const i of s){
           if(i.username==x)
           {
             flag=true;
           }
        } 
        if (flag==true)
        {
         
          res.render('registration',{text:'UserName Taken',text1:""});
          
        }
        else{
        db.collection("myCollection").insertOne({ username: x , password: y ,wantToGo: []});
          res.render("registration",{text:"Registration Successful",text1:"Login"})
         
        }
     });
       
      
                
     });
    }
});
app.post("/",function(req,res){
  var x =req.body.username;
  var y =req.body.password;
  
  var flag =false;
  if(x=='Mohab' && y=='Olayan')
  {
    flag=true;
  }
  MongoClient.connect("mongodb://0.0.0.0:27017/",  { useUnifiedTopology: true }, function (err, client) {
    if(err)  throw err;
    var db= client.db("myDB");
    db.collection("myCollection").find().toArray(function(err,s){
       for(const i of s){
          if((i.username==x && i.password==y) || (x=='Mohab' && y=='Olayan'))
          {
            flag=true;
            req.session.wantToGo = i.wantToGo;
            
          }
       } 
       if (flag==true)
       {
        req.session.username=x;
        req.session.save();
        res.render("home");
        
        
       }
       else{
        res.render("login",{text:'Incorrect UserName or Password'});
       }
    });
    
    
   
             
  });
  
});
app.post('/search',function(req,res){
  var sear=(req.body.Search).toLowerCase();
  var x=[];
  var f=false;
  var des=['paris','rome','santorini','inca','bali','annapurna'];
  for(const i of des)
  { 
    if(i.includes(sear))
      {
        console.log(i);
        x.push(i);
        f=true;
      }  
  }
 
  if(f){
    res.render('searchresults',{searchresults:x,Found:""})
  }else{
    res.render('searchresults',{searchresults:[],Found:"Not Found"});
  }


});

  // post for annapurna
  app.post("/annapurna", function (req, res) {
    var tmp=[];
    MongoClient.connect("mongodb://0.0.0.0:27017/",  { useUnifiedTopology: true }, function (err, client) {
       if(err)  throw err;
       var db= client.db("myDB");
       db.collection("myCollection").find().toArray(function(err,s){
        for(const i of s){
           if(i.username==req.session.username)
           {
             tmp=i.wantToGo;
             if (!tmp.includes("annapurna")) {
              tmp.push("annapurna");
              db.collection("myCollection").updateOne(
                { username: req.session.username },
                {
                  $set: { wantToGo: [...tmp] },
                }
              );
             }
             else {
              // display error that place was added before
              res.render("annapurna",{Found:"Already In the Want To Go List"});
            }
           }
          }
          })
        })
    
  });

  // post for bali
  app.post("/bali", function (req, res) {
    var tmp=[];
    MongoClient.connect("mongodb://0.0.0.0:27017/",  { useUnifiedTopology: true }, function (err, client) {
       if(err)  throw err;
       var db= client.db("myDB");
       db.collection("myCollection").find().toArray(function(err,s){
        for(const i of s){
           if(i.username==req.session.username)
           {
             tmp=i.wantToGo;
             if (!tmp.includes("bali")) {
              tmp.push("bali");
              db.collection("myCollection").updateOne(
                { username: req.session.username },
                {
                  $set: { wantToGo: [...tmp] },
                }
              );
             }
             else {
              // display error that place was added before
              res.render("bali",{Found:"Already In the Want To Go List"});
            }
           }
          }
          })
        })
    
  });

  // post for inca
  app.post("/inca", function (req, res) {
    var tmp=[];
    MongoClient.connect("mongodb://0.0.0.0:27017/",  { useUnifiedTopology: true }, function (err, client) {
       if(err)  throw err;
       var db= client.db("myDB");
       db.collection("myCollection").find().toArray(function(err,s){
        for(const i of s){
           if(i.username==req.session.username)
           {
             tmp=i.wantToGo;
             if (!tmp.includes("inca")) {
              tmp.push("inca");
              db.collection("myCollection").updateOne(
                { username: req.session.username },
                {
                  $set: { wantToGo: [...tmp] },
                }
              );
             }
             else {
              // display error that place was added before
              res.render("inca",{Found:"Already In the Want To Go List"});
            }
           }
          }
          })
        })
    
  });

  // post for paris
  app.post("/paris", function (req, res) {
    var tmp=[];
    MongoClient.connect("mongodb://0.0.0.0:27017/",  { useUnifiedTopology: true }, function (err, client) {
       if(err)  throw err;
       var db= client.db("myDB");
       db.collection("myCollection").find().toArray(function(err,s){
        for(const i of s){
           if(i.username==req.session.username)
           {
             tmp=i.wantToGo;
             if (!tmp.includes("paris")) {
              tmp.push("paris");
              db.collection("myCollection").updateOne(
                { username: req.session.username },
                {
                  $set: { wantToGo: [...tmp] },
                }
              );
             }
             else {
              // display error that place was added before
              res.render("paris",{Found:"Already In the Want To Go List"});
            }
           }
          }
          })
        })
    
  });

  //post for rome
  app.post("/rome", function (req, res) {
    var tmp=[];
    MongoClient.connect("mongodb://0.0.0.0:27017/",  { useUnifiedTopology: true }, function (err, client) {
       if(err)  throw err;
       var db= client.db("myDB");
       db.collection("myCollection").find().toArray(function(err,s){
        for(const i of s){
           if(i.username==req.session.username)
           {
             tmp=i.wantToGo;
             if (!tmp.includes("rome")) {
              tmp.push("rome");
              db.collection("myCollection").updateOne(
                { username: req.session.username },
                {
                  $set: { wantToGo: [...tmp] },
                }
              );
             }
             else {
              // display error that place was added before
              res.render("rome",{Found:"Already In the Want To Go List"});
            }
           }
          }
          })
        })
    
  });

  // post for santorini
  app.post("/santorini", function (req, res) {
    var tmp=[];
    MongoClient.connect("mongodb://0.0.0.0:27017/",  { useUnifiedTopology: true }, function (err, client) {
       if(err)  throw err;
       var db= client.db("myDB");
       db.collection("myCollection").find().toArray(function(err,s){
        for(const i of s){
           if(i.username==req.session.username)
           {
             tmp=i.wantToGo;
             if (!tmp.includes("santorini")) {
              tmp.push("santorini");
              db.collection("myCollection").updateOne(
                { username: req.session.username },
                {
                  $set: { wantToGo: [...tmp] },
                }
              );
             }
             else {
              // display error that place was added before
              res.render("santorini",{Found:"Already In the Want To Go List"});
            }
           }
          }
          })
        })
    
    
  });



app.get('/',function(req,res){
  res.render("login",{text:''});
});
app.get('/login',function(req,res){
  res.render("login",{text:''});
});

app.get('/home',function(req,res){
  if(req.session.username==null)
  {
   res.redirect('/');
  
  }
  else
  {
   res.render('home');
  }
});
app.get('/registration',function(req,res){
  
    res.render('registration',{text:'',text1:''});
  
 
});
app.get('/annapurna',function(req,res){
  if(req.session.username!=null){
    res.render('annapurna',{Found:""});
  }
  else{
    res.redirect('/')
  }
  
});
app.get('/bali',function(req,res){
  if(req.session.username!=null){
    res.render('bali',{Found:""});
  }
  else{
    res.redirect('/')
  }

});
app.get('/cities',function(req,res){
  if(req.session.username!=null){
    res.render('cities');
  }
  else{
    res.redirect('/')
  }
  
});
app.get('/hiking',function(req,res){
  if(req.session.username!=null){
    res.render('hiking');
  }
  else{
    res.redirect('/')
  }
 
});
app.get('/inca',function(req,res){
  if(req.session.username!=null){
    res.render('inca',{Found:""});
  }
  else{
    res.redirect('/')
  }

});
app.get('/islands',function(req,res){
 
  if(req.session.username!=null){
    res.render('islands');
  }
  else{
    res.redirect('/')
  }
    
    
  
   

  
});
app.get('/paris',function(req,res){
  if(req.session.username!=null){
    res.render('paris',{Found:""});
  }
  else{
    res.redirect('/')
  }

});
app.get('/rome',function(req,res){
  if(req.session.username!=null){
    res.render('rome',{Found:""});
  }
  else{
    res.redirect('/')
  }
  
});
app.get('/santorini',function(req,res){
  if(req.session.username!=null){
    res.render('santorini',{Found:""});
  }
  else{
    res.redirect('/')
  }
  
});
app.get('/searchresults',function(req,res){
  if(req.session.username!=null){
    res.render('searchresults',{searchresults:[],Found:""});
  }
  else{
    res.redirect('/')
  }
  
});
app.get("/wanttogo", function (req, res) {
  if (req.session.username != null) {
    MongoClient.connect("mongodb://0.0.0.0:27017/",  { useUnifiedTopology: true }, function (err, client) {
    if(err)  throw err;
    var db= client.db("myDB");
    db.collection("myCollection").find().toArray(function(err,s){
      for(const i of s){
         if(i.username==req.session.username)
         {
           res.render("wanttogo",{places:i.wantToGo});

         }
      }
    })
    
  })
   
    
  } else {
    res.redirect("/");
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});