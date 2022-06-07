class Variable {
  constructor(name, value = NaN){
    this.name = name;
    this.value = value;
    this.links = [];
  }
  getValue(){
    return this.value;
  }
  addLink(fn){
    this.links.push(fn);
  }
  recountLinks(){
    this.links.forEach(link => link.recount());
  }
}

export default Variable;