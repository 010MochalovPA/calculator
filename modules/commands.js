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
    
    if (!data.isUsed(variableValue)) {
      data.createVar(variableValue, expValue);
      print.addInput(`let ${value}`);
      return;
    }

    if (data.isUsed(variableValue)) {
      data.editVar(variableValue, expValue);
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
      print.addOutput(`"${firstArgumentValue}" уже существует!`);
      print.addOutput(`-----------------`);
      return;
    }

  data.createFn(variableName, firstArgumentValue, secondArgumentValue, sign);
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
    print.addOutput("● var <идентификатор>\n\n\
Объявляет переменную типа double с именем <идентификатор>.\n\
Значение переменной после ее объявления не определено.\n\n");

    print.addOutput("● let <идентификатор1>=<число с плавающей запятой> \n\
или let <идентификатор1>=<идентификатор2> \n\n\
Присваивает переменной с именем <идентификатор1> числовое значение, либо текущее \
значение ранее объявленного идентификатора с именем <идентификатор2>. Если переменная \
с именем <идентификатор1> не была ранее объявлена, происходит объявление новой переменной. \
В качестве <идентификатора1> не может выступать имя функции.\n\n");

    print.addOutput("● fn <идентификатор1>=<идентификатор2> \n\
или fn <идентификатор1>=<идентификатор2><операция><идентификатор3> \n\n\
Объявляет новую функцию с ранее необъявленным именем <идентификатор1>, \
значением которой будет либо значение идентификатора <идентификатор2>, \
либо результат применения одной из следующих бинарных операций к значениям \
ранее объявленных идентификаторов <идентификатор2> и <идентификатор3> в момент \
вычисления значения функции: \n\
  ○ + Сложение. Результат – сумма значений <идентификатор2> и <идентификатор3>. \n\
  ○ - Вычитание. Результат – разность значений <идентификатор2> и <идентификатор3>. \n\
  ○ * Умножение. Результат – произведение значений <идентификатор2> и <идентификатор3>. \n\
  ○ / Деление. Результат – частное значений <идентификатор2> и <идентификатор3>.\n\n");

  print.addOutput("● print <идентификатор>\n\n\
Выводит в Output значение ранее объявленного идентификатора. \
Если идентификатором являлась переменная, то выводится ее значение, \
а если функция, то выводится вычисленное значение функции. \
Значение идентификатора выводится с точностью в 2 знака после запятой.\n\n");
  print.addOutput("● printvars \n\n\
Выводит в Output имена и значения всех ранее объявленных переменных, \
отсортированных по алфавиту, по одному в каждой строке в следующем формате: \
<идентификатор>:<значение>\n\n");
  print.addOutput("● printfns \n\n\
Выводит в Output имена и значения всех ранее объявленных функций, отсортированных \
по алфавиту, по одному в каждой строке в следующем формате: <идентификатор>:<значение>\n\n");
print.addOutput("* Идентификатор – непустая строка, в которой можно использовать буквы английского алфавита, \
цифры и символ подчеркивания. Идентификатор не может начинаться с цифры. Идентификаторы используются в качестве имен переменных и функций.\n\n")
  }
  
}

export default commands;