var page = require('page');
var empty = require('empty-element');
var title = require('title');
var template = require('./template');

page('/signup', function(ctx, next){
	title('PsychoGRAM - Signup');
	var main = document.getElementById('main-container');
	empty(main).appendChild(template);
})