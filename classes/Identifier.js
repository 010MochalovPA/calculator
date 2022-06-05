class Identifier {
  constructor(value) {
    this.value = value || null;
  }

  isNumeric(value) {
    return value ? /^[-]?[0-9]+[.]?[0-9]*$/.test(value) : /^[-]?[0-9]+[.]?[0-9]*$/.test(this.value);
  }

  isValid() {
    if (this._invalidValue.includes(this.value)) return false;
    if (!this.value) return false;
    if (/^[a-zA-Z_]+([a-zA-Z0-9_]+)?$/.test(this.value)) return true;
    if (/^[-]?[0-9]+[.]?[0-9]*$/.test(this.value)) return true;
    return false;
  }

  getValue(){
    return this.value;
  }

}

export default Identifier;