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