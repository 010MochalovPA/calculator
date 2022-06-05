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

  print(value){
    return Number(this.getItem(value).getValue()).toFixed(2);
  }

  getVars(){
    return this.variables.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }).reduce((result, item) => {
      return result += `${item.name}:${Number(item.value).toFixed(2)}\n`
    },'');
  }

  getFns(){
    return this.functions.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }).reduce((result, item) => {
      return result += `${item.name}:${Number(item.getValue()).toFixed(2)}\n`
    },'');
  }
}

export default Data;