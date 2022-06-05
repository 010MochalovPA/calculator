import Variable from './Variable.js';
import Function from './Function.js';

class Data {
  constructor(){
    this.variables = [];
    this.functions = [];
  }

  createNumericVar(value){
    this.variables.push(new Variable(value, NaN));
    return;
  }
  createNumericVar(){
    
  }
}

export default Data;