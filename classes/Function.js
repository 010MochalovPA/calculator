class Function {
  constructor(fnName, identifier1, identifier2, operator){
    this.name = fnName;
    this.identifier1 = identifier1;
    this.operator = operator;
    this.identifier2 = identifier2;

    this.fn = () => {
      
      const firstArgument = identifier1.getValue();
      const secondArgument = identifier2.getValue();
      
      if (operator === '+') return (+firstArgument + +secondArgument);
      if (operator === '-') return (+firstArgument - +secondArgument);
      if (operator === '*') return (+firstArgument * +secondArgument);
      if (operator === '/') return (+firstArgument / +secondArgument);
    }

    this.getValue = this.fn;
  }
}


export default Function;