var exec = require('child_process').exec
  , SERVER_PORT = 4343;

// support code

function start_web(lines){
	var http = require('http');
	http.createServer(function(request, response){
		var num = 0;
		response.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
		response.write('<pre>');
		(function timeout(){	
			if (lines[num]){
				response.write("<p> " + lines[num++].replace(/\n/g, "<br />") + " </h1>");
				setTimeout(timeout, 200);
			} else {
				response.end('<h3>:), find me at <a href="http://iain.in">http://iain.in/</a></h3>');
			}
		})();
	}).listen(SERVER_PORT);

}

function resume(){
	var obj = {}
	  , lines = [];
    obj.node = Infinity
	function print(str){
		lines.push(str);
	}
	obj.web = function(){
		start_web(lines);
		console.log('Webserver running on port ' + SERVER_PORT);
	}
	obj.console = function(){
		for (var i = 0; i < lines.length; i++){
			console.log(lines[i]);
		}
	}
	obj.slow_console = function(time){
		var line = 0, curchar = 0;
		if (!time) time = 400;
		(function print(){
			if (lines[line]){
				console.log(lines[line++]);
				setTimeout(print, time)
			}
		})();
	}
	obj.show = function(lines){
		for (line in lines){
			lines[line]();
		}
		return {
			using: function(type){
				type();
			}
		}
	}
	obj.enumerate = function(objs){
		var buf = '';
		for (obj in objs){
			buf += (obj + ":" + objs[obj] + "\t");
			while(objs[obj]-- > 0){ buf += "|"; }
			buf += '\n';
		}
		return buf;
	}
	obj.hello = function(text){
		print('Hello! ' + text);
	}
	obj.say = function(text){
		print(text);
	}
	obj.my = function(arg){
		return {
			is: function(spec){
				return ('My ' + arg + ' is ' + spec + '.\n');
			},
			includes: function(name){
				print('My ' + arg + ' includes ' + name + '.\n');
			},
			resume: 'http://localhost:' + SERVER_PORT,
			website: 'http://iain.in/'
		}
	}
	obj.i = {
			skills: function(args){
				if (args){
					print(args);
				} else {
					print('Skills: ');
				}
			}
		};
	obj.bye = function(arg){
		print('bye! ' + arg);
	}
	obj.open = function(arg){
		console.log('opening ' + arg);
		exec('open ' + arg, function(){});
	}
	return obj;
}

module.exports = resume();