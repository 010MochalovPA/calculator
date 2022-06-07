class Function {
  constructor(isFull, fnName, identifier1, identifier2, operator){
    this.cached = (fn) =>{
      const cache = {};
      return () => {
        const id1 = identifier1.getValue();
        const id2 = identifier2.getValue();
        const oper = operator;
        const key = [id1, oper, id2].join('');
        if (!cache[key]) {
          let result = fn();
          cache[key] = result;
        };
        console.log(cache);
        return cache[key];
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
      this.getValue = () => {
        if (identifier1.getValue() instanceof Function) {
          return this.cached(identifier1.getValue());
        } else {
          return identifier1.getValue();
        } 
      };
      return;
    }
    
  }
}


export default Function;