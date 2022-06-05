import Data from '../classes/Data.js';
import Identifier from '../classes/Identifier.js';
import print from '../modules/print.js'

const data = new Data;

const commands = {

  var(value) {

    let identifier = new Identifier(value);

    if (identifier.isNumeric() || !identifier.isValid()) {
      print.addOutput(`Введите "var <идентификатор>"!`);
      print.addOutput(`Можно использовать буквы английского алфавита, цифры и символ подчеркивания. Идентификатор не может начинаться с цифры.`);
      print.addOutput(`-----------------`);
      return;
    }

    if(data.isUsed(identifier)){
      print.addOutput(`"${identifier.getValue()}" уже существует!`);
      print.addOutput(`-----------------`);
      return;
    }

    if (identifier.isNumeric()) data.createNumericVar(identifier.getValue());
    if (!identifier.isNumeric()) data.createValueVar(identifier.getValue());
    data.addVar(identifier);
    print.addInput(`var ${value}`);
    
  },

  let(value) {
  },

  fn(value){
  },

  print(value){
  },

  printvars() {
  },

  printfns() {
  },

  help() {
  }
}

export default commands;