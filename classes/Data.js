import Variable from './Variable.js';
import Function from './Function.js';
import Numeric from './Numeric.js';

class Data {
  constructor(){
    this.variables = [];
    this.functions = [];
  }

  createVar(variable){
    this.variables.push(new Variable(variable, NaN));
    return;
  }

  createNumericLet(variable, value){
    this.variables.push(new Variable(variable, value));
    return;
  }

  editNumericLet(variable, value){
    this.variables = this.variables.map(v => {
      if (v.name === variable) v.value = value;
      return v;
    });
    return;
  }

  createValueLet(variable, value){
    value = this.getItem(value).getValue();
    this.variables.push(new Variable(variable, value));
  }

  editValueLet(variable, value){
    value = this.getItem(value).getValue();
    this.variables = this.variables.map(v => {
      if (v.name === variable) v.value = value;
      return v;
    });
    return;
  }

  createFullFn(fnName, identifier1, identifier2, operator){
    identifier1 = this.isUsed(identifier1) ? this.getItem(identifier1) : new Numeric(identifier1);
    identifier2 = this.isUsed(identifier2) ? this.getItem(identifier2) : new Numeric(identifier2);

    this.functions.push(new Function(true, fnName, identifier1, identifier2, operator));
  }

  createShortFn(fnName, identifier1){
    identifier1 = this.getItem(identifier1);
    
    this.functions.push(new Function(false, fnName, identifier1));
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