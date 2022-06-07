import Numeric from "./Numeric.js";

class Func {
  constructor(fnName, identifier1, identifier2 = new Numeric('0'), operator = '+'){
    this.name = fnName;
    this.arg1 = identifier1;
    this.arg2 = identifier2;
    this.operator = operator;
    this.result = this.count();
    this.links = [];
  }

  recount(){
    this.result = this.count();
    this.links.forEach(link => link.recount());
  }

  getValue(){
    return this.result;
  }

  addLink(fn){
    this.links.push(fn);
  }

  count() {
    const arg1 = this.arg1.getValue();
    const arg2 = this.arg2.getValue();
    const oper = this.operator;

    if (oper === "+") return +arg1 + +arg2;
    if (oper === "-") return +arg1 - +arg2;
    if (oper === "/") return +arg1 / +arg2;
    if (oper === "*") return +arg1 * +arg2;
  
  }
}


export default Func;