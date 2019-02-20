#!/usr/bin/env node

const lib = require("../index.js");
const fs = require("fs");

var argv =process.argv.slice(2);
var params={};

argv.forEach(function(v){
	var temp = v.replace("-","").replace("-","");
	if(temp.indexOf("=")<0){
		params[temp] = true;
	}else{
		var split = temp.split("=");
		params[split[0]] = split[1];
	}
})

if(params.h===true){
	console.log("USAGE : ");
	console.log("\t scl-crypt [command] [option]");
	
	
	console.log("Command : ");
	console.log("\t -h  \t Show this help, no option needed");
	console.log("\t -e \t encrypt string, require --k and --s argument");
	console.log("\t -d \t decript string, require --k and --s argument");
	console.log("\t -el \t encrypt string listed on a txt files, the string must be separated by newline, require --i and --k argument");
	console.log("\t -dl \t decrypt string listed on a txt files, the string must be separated by newline, require --i and --k argument");
	
	
	console.log(" ");
	console.log("Options : ");
	console.log("\t --k \t encryption key");
	console.log("\t --s \t encrypted/plain string to process");
	console.log("\t --i \t file location to as input for the -dl and -el command");
	console.log("\t -o \t file location to as output for the -dl and -el command, if not set output.txt will be created");
	
	console.log(" ");
	console.log("Example : ");
	console.log("\t scl-crypt -e --k=mysecretkey -s=myplainstring");
	return;
}
if(params.e===true || params.d ===true){
	if(!params.k){
		console.log("invalid --k argument")
		return;
	}
	if(!params.s){
		console.log("invalid --s argument")
		return;
	}
	if(params.e===true){
		console.log(lib.encrypt(params.s,params.k));
		return;
	}
	if(params.d===true){
		console.log(lib.decrypt(params.s,params.k));
		return;
	}
}
if(params.el===true || params.dl ===true){
	if(!params.k){
		console.log("invalid --k argument")
		return;
	}
	if(!params.i){
		console.log("invalid --i argument")
		return;
	}
	var fpath = params.i;
	var stringList;
	var newList=[];
	var newString;
	var output = "./output.txt";
	if(params.o){
		output = params.o;
	}
	fs.readFile(fpath,"utf-8", function(err,text){
		if(err){
			console.log(err);
			return;
		}
		stringList=text.split("\n");
		stringList.forEach(function(v){
			if(params.el===true){
				newList.push(lib.encrypt(v,params.k));
			}
			if(params.dl===true){
				newList.push(lib.decrypt(v,params.k));
			}
		});
		fs.writeFile(output,
			newList.join('\n'),
			function (err) {
				if(err){
					console.log(err);
					return;
				}
				console.log("ecrypted file is on "+output);
			}
		);
	});
	return;
}
console.log("please run scl-crypt -h for info");
