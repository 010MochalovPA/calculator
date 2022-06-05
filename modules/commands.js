import Data from '../classes/Data.js';
import Identifier from '../classes/Identifier.js';
import print from '../modules/print.js'

const data = new Data;

const commands = {

  var(value) {

    const identifier = new Identifier(value);
    const identifierValue = identifier.getValue();

    if (identifier.isNumeric() || !identifier.isValid()) {
      print.addOutput(`Введите "var <идентификатор>"!`);
      print.addOutput(`Можно использовать буквы английского алфавита, цифры и символ подчеркивания. Идентификатор не может начинаться с цифры.`);
      print.addOutput(`-----------------`);
      return;
    }
    
    if(data.isUsed(identifierValue)){
      print.addOutput(`"${identifierValue}" уже существует!`);
      print.addOutput(`-----------------`);
      return;
    }

    data.createVar(identifierValue);
    print.addInput(`var ${value}`);
    
  },

  let(value) {

    const regexp = /^([a-zA-Z_]+?[a-zA-Z0-9_]*)=([-]?[0-9]+[.]?[0-9]*|[a-zA-Z_]+?[a-zA-Z0-9_]*)$/;

    if (!regexp.test(value)) {
      print.addOutput(`Введите "let <идентификатор1>=<число с плавающей запятой>"\nили "let <идентификатор1>=<идентификатор2>"!`);
      print.addOutput(`Можно использовать буквы английского алфавита, цифры и символ подчеркивания. Идентификатор не может начинаться с цифры.`);
      print.addOutput(`-----------------`);
      return;
    }

    let [, identifier1, identifier2] = [...value.match(regexp)];

    const variable = new Identifier(identifier1);
    const variableValue = variable.getValue();

    const exp = new Identifier(identifier2);
    const expValue = exp.getValue();

    if (!variable.isValid() || !exp.isValid()) {
      print.addOutput(`Введите "let <идентификатор1>=<число с плавающей запятой>"\nили "let <идентификатор1>=<идентификатор2>"!`);
      print.addOutput(`Можно использовать буквы английского алфавита, цифры и символ подчеркивания. Идентификатор не может начинаться с цифры.`);
      print.addOutput(`-----------------`);
      return;
    }

    if(!exp.isNumeric() && !data.isUsed(expValue)){
      print.addOutput(`"${expValue}" не существует!`);
      return;
    }
    
    if (!data.isUsed(variableValue) && exp.isNumeric()) {
      data.createNumericLet(variableValue, expValue);
      print.addInput(`let ${value}`);
      return;
    }

    if (!data.isUsed(variableValue) && !exp.isNumeric()) {
      data.createValueLet(variableValue, expValue);
      print.addInput(`let ${value}`);
      return;
    }

    if (data.isUsed(variableValue) && exp.isNumeric()) {
      data.editNumericLet(variableValue, expValue);
      print.addInput(`let ${value}`);
      return;
    }

    if (data.isUsed(variableValue) && exp.isNumeric()) {
      data.editValueLet(variableValue, expValue);
      print.addInput(`let ${value}`);
      return;
    }
  },

  fn(value){

    const regexpFull = /^([a-zA-Z_]+?[a-zA-Z0-9_]*)=([-]?[0-9]+[.]?[0-9]*|[a-zA-Z_]+?[a-zA-Z0-9_]*)([+\-*\/])([-]?[0-9]+[.]?[0-9]*|[a-zA-Z_]+?[a-zA-Z0-9_]*)?$/;
    const regexpShort = /^([a-zA-Z_]+?[a-zA-Z0-9_]*)=([a-zA-Z_]+?[a-zA-Z0-9_]*)?$/;

    let variable, argument1, sign = "+", argument2 = '0';

    if (!regexpFull.test(value) && !regexpShort.test(value)) {
      print.addOutput(`Введите "fn <идентификатор1>=<идентификатор2>" либо "fn <идентификатор1>=<идентификатор2><операция><идентификатор3>"!`);
      print.addOutput(`Можно использовать буквы английского алфавита, цифры и символ подчеркивания. Идентификатор не может начинаться с цифры.`);
      print.addOutput(`-----------------`);
      return;
    }

    
    
    if (regexpFull.test(value)){
      [,variable, argument1, sign, argument2] = [...value.match(regexpFull)];
    }

    if (regexpShort.test(value)){
      [,variable, argument1] = [...value.match(regexpShort)];
    }

    const identifier1 = new Identifier(variable);
    const identifier2 = new Identifier(argument1);
    const identifier3 = new Identifier(argument2);

    const variableName = identifier1.getValue();
    const firstArgumentValue = identifier2.getValue();
    const secondArgumentValue = identifier3.getValue();

    if (!identifier1.isValid() || !identifier2.isValid() || !identifier3.isValid()) {
      print.addOutput(`Введите "fn <идентификатор1>=<идентификатор2>" либо "fn <идентификатор1>=<идентификатор2><операция><идентификатор3>"!`);
      print.addOutput(`Можно использовать буквы английского алфавита, цифры и символ подчеркивания. Идентификатор не может начинаться с цифры.`);
      print.addOutput(`-----------------`);
      return;
    }

    if(!identifier2.isNumeric() && !data.isUsed(firstArgumentValue)){
      print.addOutput(`"${firstArgumentValue}" не существует!`);
      print.addOutput(`-----------------`);
      return;
    }

    if(!identifier3.isNumeric() && !data.isUsed(secondArgumentValue)){
      print.addOutput(`"${secondArgumentValue}" не существует!`);
      print.addOutput(`-----------------`);
      return;
    }

    if(data.isUsed(variableName)){
      print.addOutput(`"${variableName.getValue()}" уже существует!`);
      print.addOutput(`-----------------`);
      return;
    }

    data.createFn(variableName, firstArgumentValue, secondArgumentValue, sign);
    // data.addFn(isFull, variableName, identifier1, operator, identifier2);
    print.addInput(`fn ${value}`);
  },
  

  print(value){

    const identifier = new Identifier(value);
    const identifierValue = identifier.getValue();

    if (identifier.isNumeric() || !identifier.isValid()) {
      print.addOutput(`Введите "print <идентификатор>"!`);
      print.addOutput(`Можно использовать буквы английского алфавита, цифры и символ подчеркивания. Идентификатор не может начинаться с цифры.`);
      print.addOutput(`-----------------`);
      return;
    }

    if(!data.isUsed(identifierValue)){
      print.addOutput(`"${identifierValue}" не существует!`);
      print.addOutput(`-----------------`);
      return;
    }

    print.addOutput(data.print(identifierValue));
    print.addInput(`print ${value}`);

  },

  printvars() {
    print.addOutput(data.getVars());
    print.addInput(`printvars`);
  },

  printfns() {
    print.addOutput(data.getFns());
    print.addInput(`printfns`);
  },

  help() {
  }
}

export default commands;