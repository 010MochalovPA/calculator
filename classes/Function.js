class Function {
  constructor(isFull, fnName, identifier1, identifier2, operator){
    this.cached = (fn) =>{
      const cache = {};
      return () => {
        const id1 = identifier1.getValue();
        const id2 = identifier2.getValue();
        const oper = operator;
        if (!cache[[id1, oper, id2]]) {
          let result = fn();
          cache[[id1, oper, id2]] = result;
        }
        return cache[[id1, oper, id2]];
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