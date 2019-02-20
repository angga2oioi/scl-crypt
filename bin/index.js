#!/usr/bin/env node

const lib = require("../index.js");
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
	console.log("\t -d \t descript string, require --k and --s argument");
	
	console.log(" ");
	console.log("Options : ");
	console.log("\t --k \t encryption key");
	console.log("\t --s \t encrypted/plain string to process");
	
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
console.log("please run scl-crypt -h for info");
