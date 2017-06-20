var express = require('express');
var multer  = require('multer');
var ext = require('file-extension');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
});
var upload = multer({ storage: storage }).single('picture');

var app = express();

app.set('view engine', 'pug');//define a pug(jade) como motor de vistas

app.use(express.static('public'));//le dice al server que cualquier usuario se sirva de esta carpeta

app.get('/', function(req, res) {
  res.render('index', { "title":"PsyChoGRAM" });
});

app.get('/signup', function(req, res) {
  res.render('index', { "title":"Signup" });
});

app.get('/signin', function(req, res) {
    res.render('index', { "title":"Signin" });
});

app.get('/api/pictures', function (req, res, next){
	var pictures = [
		{
			user: {
				username: 'Aldo',
				avatar: 'Me_Gusta.png',
			},
			url : 'enrique1.jpg',
			likes: 100,
			liked: true,
			createdAt: new Date().setDate(new Date().getDate())
		},
		{
			user: {
				username: 'Aldo',
				avatar: 'Me_Gusta.png',
			},
			url : 'IMG-20160320-WA0000.jpg',
			likes: 69,
			liked: true,
			createdAt: new Date().setDate(new Date().getDate() - 10)
		},
		{
			user: {
				username: 'Aldo',
				avatar: 'Me_Gusta.png',
			},
			url : 'IMG-20160316-WA0002.jpg',
			likes: 45,
			liked: true,
			createdAt: new Date().setDate(new Date().getDate() - 10)
		},
		{
			user: {
				username: 'Aldo',
				avatar: 'Me_Gusta.png',
			},
			url : 'IMG-20160228-WA0001.jpg',
			likes: 56,
			liked: true,
			createdAt: new Date().setDate(new Date().getDate() - 10)
		}
	];
	setTimeout(() => res.send(pictures), 2000) //ARROW FUNCTION 
});

app.post('/api/pictures', function(req, res){
	upload(req, res, function (err) {
		if(err){
			return res.send(500,"error uploading file");
		}else{
			res.send("file uploaded");
		}
	})
});

app.get('/api/user/:username', function(req,res){
	const user = {
		username: 'Aldo',
		avatar: 'Me_Gusta.png',
		pictures: [
			{
				id: 1,
				src: 'emperador.jpg',
				likes: 3
			},
			{
				id: 2,
				src: 'kotengu.jpg',
				likes: 20
			},
			{
				id: 3,
				src: 'orochimaru.jpg',
				likes: 25
			},
			{
				id: 4,
				src: 'proyeccion.png',
				likes: 50
			},
			{
				id: 5,
				src: 'tomoe.jpg',
				likes: 15
			},
			{
				id: 6,
				src: 'uwibami.png',
				likes: 70
			},
			{
				id: 7,
				src: 'yoritomo.png',
				likes: 44
			}
		]
	}
	res.send(user);
});

app.get('/:username', function(req, res) {
	res.render('index', {title: 'PsyChoGRAM - ${req.params.username}'});
});

app.get('/:username/:id', function(req, res) {
	res.render('index', {title: 'PsyChoGRAM - ${req.params.username}'});
});

app.listen(3000, function(err){
	if (err) {
		return console.log('algo paso'), process.exit(1);
	}else{
		console.log('escuchando por el puerto 3000');
	}
});