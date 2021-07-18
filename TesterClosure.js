function Tester(){
	const _this = {}

	_this.exec = function(func, args, expected){
		const value = func(...args);
		console.log(args,value, expected);
		if(_this.isSame(value, expected)){
			return true;
		}
		else{
			return false;
		}
	}
	
	_this.testAll = function(func, data){
		let ok = true;
		for(let d of data){
			const args = d[0];
			const value = func(...args);
			const expected = d[1];
			
			if(_this.isSame(value, expected)){
				console.log("OK: args=",JSON.stringify(args));
			}
			else{
				console.log("NO: args=",JSON.stringify(args), JSON.stringify(value), "!=",JSON.stringify(expected));
				ok = false;
			}
		}
		return ok;
	}
	
	_this.typeOf = function(obj){
		return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	}
	
	_this.isSame = function(object1, object2){
		const type1 = _this.typeOf(object1);
		const type2 = _this.typeOf(object2);
		
		if(type1 !== type2)return false;
		
		if(["undefined","null","boolean","number","string"].includes(type1)){
			return object1 == object2;
		}
		else if(type1 == "array"){
			if(object1.length != object2.length)return false;
			for(let i=0;i<object1.length;i++){
				if(!isSameObject(object1[i], object2[i]))return false;
			}
			return true;
		}
		else if(type1 == "object"){
			if(object1.length != object2.length)return false;
			for(let k in object1){
				if(k in object2 == false) return false;
				if(!isSameObject(object1[k], object2[k]))return false;
			}
			return true;
		}
		else{//mapとかsetとかsymbolとか
			console.log("warning: unsupposed type", type1);
			return object1 === object2;
		}
	}
	
	return {
		exec: _this.exec,
		testAll: _this.testAll
	}

	
}

export { Tester }