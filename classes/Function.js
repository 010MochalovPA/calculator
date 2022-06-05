class Function {
  constructor(isFull, fnName, identifier1, identifier2, operator){
    this.cache = {};
    this.cached = (fn) =>{
      return () => {
        if (this.cache[[this.identifier1.getValue(),this.operator,this.identifier2.getValue()]]) {
          return this.cache[[this.identifier1.getValue(),this.operator,this.identifier2.getValue()]]
        }
        return this.cache[[this.identifier1.getValue(),this.operator,this.identifier2.getValue()]] = fn();
      }
    }

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

    if (isFull){
      this.getValue = this.cached(this.fn);
      return;
    }

    if (!isFull){
      this.getValue = () => identifier1 instanceof Function ? this.cached(identifier1.getValue()) : identifier1.getValue();
      return;
    }
    
  }
}


export default Function;