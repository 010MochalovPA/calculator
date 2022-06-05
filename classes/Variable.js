class Variable {
  constructor(name, value = NaN){
    this.name = name;
    this.value = value;
  }
  getValue(){
    return this.value;
  }
}

export default Variable;