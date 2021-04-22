var express                  = require("express"),
    app                      = express(),
    bodyparser               = require("body-parser"),
    {spawn}                  = require('child_process');




app.use(bodyparser.urlencoded({extended:true}));
app.use('/public',express.static('public'));

app.set("view engine","ejs");





app.get("/",function(req,res){
res.render("index");
    
});






app.get("/heart",function(req,res){
  var dataToSend=""

  res.render("heart",{data:dataToSend})
});

app.post("/heart",function(req,res){
  console.log(req.body.wake);
   var dataString=[req.body.age,req.body.optradio1,req.body.optradio2,req.body.tbps,req.body.chol,req.body.optradio3,req.body.optradio4,req.body.thalach,req.body.optradio5,req.body.oldpeak,req.body.optradio6,req.body.optradio7,req.body.optradio8];
  // var dataString=req.body.optradio1,req.body.optradio2,req.body.optradio3,req.body.optradio4,req.body.optradio5,req.body.optradio6,req.body.optradio7,req.body.optradio8,req.body.optradio9,req.body.optradio10,req.body.optradio11,req.body.optradio12,req.body.sleep,req.body.wake,req.body.optradio13,req.body.optradio14,req.body.optradio15,req.body.optradio16,req.body.optradio17;

   console.log(dataString);
    var dataToSend;
    // spawn new child process to call the python script
   
    const python = spawn('python', ['ha_actual.py',JSON.stringify(dataString)]);
    // collect data from script
    python.stdout.on('data', function (data) {
     dataToSend = data.toString();
     console.log(dataToSend);
    
    
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.render("heart",{data:dataToSend});
    });

});




let port=process.env.PORT;
if(port==null||port==""){
  port=3500;
}
app.listen(port, function () {
  console.log("Server started successfully at port 3500");
});
