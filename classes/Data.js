import Variable from './Variable.js';
import Func from './Function.js';
import Numeric from './Numeric.js';

class Data {
  constructor(){
    this.variables = [];
    this.functions = [];
  }

  createVar(variable, value = NaN){
    let newValue = this.getItem(value) ? this.getItem(value).getValue(): value;
    this.variables.push(new Variable(variable, newValue));
    return;
  }

  editVar(variable, value){
    let newValue = this.getItem(value) ? this.getItem(value).getValue(): value;
    this.variables = this.variables.map(v => {
      if (v.name === variable) v.value = newValue;
      return v;
    });
    const item = this.getItem(variable);
    item.recountLinks();
  }

  createFn(fnName, identifier1, identifier2, operator){
    const value1 = this.getItem(identifier1) ? this.getItem(identifier1) : new Numeric (identifier1);
    const value2 = this.getItem(identifier2) ? this.getItem(identifier2) : new Numeric (identifier2);

    let newFn = new Func(fnName, value1, value2, operator);

    this.functions.push(newFn);

    if (!(value1 instanceof Numeric)) value1.addLink(newFn);
    if (!(value2 instanceof Numeric)) value2.addLink(newFn);
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
      return result += `${item.name}:${Number(item.getValue()).toFixed(2)}\n`
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