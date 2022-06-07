const inputField = document.querySelector('#input');
const outputField = document.querySelector('#output');


const print = {
  addInput: (value) => {
    inputField.value += `${value}\n`;
  },
  addOutput: (value) => {
    outputField.value += `${value}\n`;
  },
  clearInput: () => {
    inputField.value = ``;
  },
  clearOutput: ()=> {
    outputField.value = ``;
  }
}

export default print;