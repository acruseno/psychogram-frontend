var yoyo = require('yo-yo');
var translate = require('../translate');

module.exports = function layout(content){
return yoyo`
	<div class="content">
		${content}
	</div>`;
}