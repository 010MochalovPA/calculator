import Variable from './Variable.js';
import Function from './Function.js';

class Data {
  constructor(){
    this.variables = [];
    this.functions = [];
  }

  createVar(value){
    this.variables.push(new Variable(value, NaN));
  }

  createNumericLet(identifier, value){
    
  }

  createValueLet(identifier, value){
    
  }

  isUsed(identifier){
    if (this.variables.find(variable => variable.name === identifier)) return true;
    if (this.functions.find(func => func.name === identifier)) return true;
    return false;
  }

  getItem(identifier){
    const variable = this.variables.find(variable => variable.name === identifier);
    const func = this.functions.find(func => func.name === identifier);

    if (variable) return variable;
    if (func) return func;

    return null;
  }
}

export default Data;