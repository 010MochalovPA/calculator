import print from "./modules/print.js";
import commands from "./modules/commands.js"

const commandLineElement = document.querySelector(".command-line");
const form = document.querySelector('.command-form');

commandLineElement.focus();
commandLineElement.onblur = () => commandLineElement.focus();

function runCommand(event,command){
  event.preventDefault();
  commandLineElement.value = '';
  
  let [directive, value] = [...command.split(' ')];
  
  if (!directive) return;
  
  if (!Object.keys(commands).includes(directive)) {
    print.addOutput(`Команда "${directive}" не существует!`);
    return;
  }

  if (!value && directive != 'help' && directive != 'printvars' && directive != 'printfns'){
    print.addOutput(`Отсутствуют аргументы!`);
    print.addOutput(`Используйте команду "help" для получения информации.`);
    print.addOutput(`-----------------`);
    return;
  }
  
  if (directive === 'print') commands.print(value);
  if (directive === 'printvars') commands.printvars();
  if (directive === 'printfns') commands.printfns();
  if (directive === 'var') commands.var(value);
  if (directive === 'help') commands.help();
  if (directive === 'let') commands.let(value);  
  if (directive === 'fn') commands.fn(value);
}


form.addEventListener("submit", () => runCommand(event, commandLineElement.value.trim()));