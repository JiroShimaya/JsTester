import { MyLang } from "./MyLang.js";
//import { Tester } from "./TesterClass.js";
import { Tester } from "./TesterClosure.js";

let obj = {"name":"ピカチュウ","type1":"でんき","type2":"NA"}
let m = new MyLang();
//alert(m.exec(obj, "type1 = でんき and type2 = NA )"));
const tester = new Tester();
const tested = function(args){
	return m.exec.call(m, ...arguments);
}
//const r =tester.exec(tested, [obj, "type1 = でんき"], true);
//const a = (()=>tester.exec)();
//const r = tester.exec(a, [tested, [obj, "type1 = でんき"],true], true);
//console.log(r);

const data = [
	[[obj, "type1 = でんき"], true],
	[[obj, "type1 = みず"], false],
	[[obj, "type1 = みず or type1 = でんき" ], false]
]
tester.testAll(tested, data);
