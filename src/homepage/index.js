var page = require('page');
var empty = require('empty-element');
var title = require('title');
var template = require('./template');
var header = require('../header');
//var axios = require('axios');
//var request = require('superagent');

page('/', header, loading, asyncLoad, function(ctx, next){
	title('PsychoGRAM');
	var main = document.getElementById('main-container');
	empty(main).appendChild(template(ctx.pictures));
})

//CARGA EL SPINNER
function loading(ctx, next){
	var el = document.createElement('div')
	el.classList.add('loader')
	document.getElementById('main-container').appendChild(el)
	next()
}


//REQUEST CON ASYNC AWAIT
async function asyncLoad(ctx, next){
	try{
		ctx.pictures = await fetch('/api/pictures').then(res => res.json())
		next();
	}
	catch(err){
		console.log(err);
	}
} 

/* REQUEST CON SUPERAGENT
function loadPictures(ctx, next){
	request
		.get('/api/pictures')
		.end(function(err, res){
			if (err) {
				return console.log('aca caga');
			}
			ctx.pictures = res.body;
			next();
		})
}
*/

/* REQUEST CON AXIOS
function loadPicturesAxios(ctx, next){
	axios
		.get('/api/pictures')
		.then(function(res){
			ctx.pictures = res.data;
			next();
		})
		.catch(function(err) {
			console.log(err);
		});
}
*/