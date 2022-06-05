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