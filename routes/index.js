var express = require('express');
var router = express.Router();

const mongodb = 'mongodb+srv://hoang:kh091205@demo1.xmbo5.mongodb.net/?retryWrites=true&w=majority&appName=demo1';
const mongoose = require('mongoose')
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  console.log("MongoDB Connected");
}).catch(err=>{
  console.log(err);
})


const studentSCHEMA = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
})

const STUDENT = mongoose.model('Student', studentSCHEMA)

router.get('/getDatabase', (req, res) => {
  STUDENT.find({}).then( result =>{
    res.send(result);
  })
})

router.get('/createUser', (req, res) => {
  const random = Math.floor(Math.random()*10);
  const student = new STUDENT({
    name: "Hoang Ngo" + random,
    address:  random + "Ha Noi" ,
    phone: "0123456789" + random
  })
  student.save().then( result =>{
    res.send(result);
  })
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/demo', function(req, res, next) {
  res.send("Hello Hello")
});
router.get('/getAllUser', function(req, res, next) {
  var jsonData = [{
    id: 1,
    name: "Nguyen Van A",
    age: 20
  },
    {
      id: 2,
      name: "Nguyen Van B",
      age: 21
    },
    {
      id: 3,
      name: "Nguyen Van C",
      age: 23
    }]
  res.send(jsonData);
})
router.get('/getAUser', function(req, res, next) {
  var jsonData = {
    id: 1,
    name: "Nguyen Van A",
    age: 20
  }
  res.send(jsonData);
})
router.get('/displayUsers', function(req, res, next) {
  // var jsonData=[{
  //   id:1,
  //   name: "Nguyen Van A",
  //   age: 20
  // },
  //   {
  //     id:2,
  //     name: "Nguyen Van B",
  //     age: 20
  //   },{
  //     id:3,
  //     name: "Nguyen Van C",
  //     age: 20
  //   }
  //
  // ]
  STUDENT.find({}).then( jsonData =>{
    res.render('users', {nam: "Hoang",
      data: jsonData})
  })

})

router.get('/deleteUser', function(req, res, next) {
  const id = req.query.id;
  STUDENT.deleteOne({_id:id}).then( result =>{
    res.redirect('/displayUsers');
  })
})
router.get('/updateUser', function(req, res, next) {
  const id = req.query.id;
  STUDENT.findOne({_id:id}).then( result =>{
    res.render('updateForm',{data:result});
  })
})
router.post('/updateUser', function(req, res, next) {
  const id = req.body.id;
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  STUDENT.updateOne({_id:id},{name: name ,address: address, phone: phone}).then(  result =>{
    res.redirect('/displayUsers')
  })
})
router.post('/createUser',function (rep,res,next){
  const name = rep.body.name;
  const age = rep.body.age;
  const random = Math.floor(Math.random()*1000);
  const student = new STUDENT({
    name: name,
    address:  random + "Ha Noi" ,
    phone: age
  })
  student.save().then( result =>{
    res.redirect('/displayUsers');
  })
})
module.exports = router;
