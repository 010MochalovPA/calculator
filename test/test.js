import Identifier from '../classes/Identifier.js';
import Numeric from '../classes/Identifier.js';
import Variable from '../classes/Variable.js';
import Func from '../classes/Function.js'
import Data from '../classes/Function.js'

describe('Classes:',() => {
  describe('class Identifier', () => {

    it('класс Identifier существует', () => {
      expect(Identifier).to.exist;
      expect(Identifier).to.be.instanceOf(Function);
    });

    it('присутствуют методы', () => {
      const instance = new Identifier();
      expect(instance).to.respondTo('isNumeric');
      expect(instance).to.respondTo('isValid');
      expect(instance).to.respondTo('getValue');
    });

    it('возвращает корректное значение', () => {
      const identifier = new Identifier('x');
      assert.strictEqual(identifier.getValue(),'x');
    });

    it('является ли идентификатор числом с плавающей точкой ', () => {
      const identifier = new Identifier('x');
      const identifier2 = new Identifier('1.23');
      const identifier3 = new Identifier();
      const identifier4 = new Identifier('-2512.156234');
      const identifier5 = new Identifier('1,543');
      assert.strictEqual(identifier.isNumeric(), false);
      assert.strictEqual(identifier2.isNumeric(), true);
      assert.strictEqual(identifier3.isNumeric(), false);
      assert.strictEqual(identifier4.isNumeric(), true);
      assert.strictEqual(identifier5.isNumeric(), false);
    });

    it('является ли валидным', () => {
      const identifier = new Identifier('x');
      const identifier2 = new Identifier('1.233');
      const identifier3 = new Identifier('1,232523');
      const identifier4 = new Identifier("_1");
      const identifier5 = new Identifier("1x");
      const identifier6 = new Identifier('true');
      const identifier7 = new Identifier('false');
      const identifier8 = new Identifier('undefined');
      const identifier9 = new Identifier('NaN');
      assert.strictEqual(identifier.isValid(), true);
      assert.strictEqual(identifier2.isValid(), true);
      assert.strictEqual(identifier3.isValid(), false);
      assert.strictEqual(identifier4.isValid(), true);
      assert.strictEqual(identifier5.isValid(), false);
      assert.strictEqual(identifier6.isValid(), false);
      assert.strictEqual(identifier7.isValid(), false);
      assert.strictEqual(identifier8.isValid(), false);
      assert.strictEqual(identifier9.isValid(), false);
    });
  });

  describe('class Numeric', () => {

    it('класс Numeric существует', () => {
      expect(Numeric).to.exist;
      expect(Numeric).to.be.instanceOf(Function);
    });

    it('присутствуют методы', () => {
      const number = new Numeric();
      expect(number).to.respondTo('getValue');
    });

    it('возвращает корректное значение', () => {
      const number = new Numeric('-1');
      assert.strictEqual(number.getValue(),'-1');
    });
  });

  describe('class Variable', () => {

    it('класс Variable существует', () => {
      expect(Variable).to.exist;
      expect(Variable).to.be.instanceOf(Function);
    });

    it('присутствуют методы', () => {
      const variable = new Variable();
      expect(variable).to.respondTo('getValue');
    });


    it('возвращает корректное значение', () => {
      const variable1 = new Variable('x', 'NaN');
      const variable2 = new Variable('y','-1');
      const variable3 = new Variable('z','3');
      const variable4 = new Variable('x','12.5');

      assert.strictEqual(variable1.getValue(),'NaN');
      assert.strictEqual(variable2.getValue(),'-1');
      assert.strictEqual(variable3.getValue(),'3');
      assert.strictEqual(variable4.getValue(),'12.5');
    });

  });
  describe('class Function', () => {

    it('класс Function существует', () => {
      expect(Func).to.exist;
      expect(Func).to.be.instanceOf(Function);
    });

    it('присутствуют методы', () => {
      const fn = new Func();
      expect(fn).to.respondTo('getValue');
      expect(fn).to.respondTo('cached');
    });

    it('возвращает корректное значение', () => {
      
      const id1 = new Numeric(10);
      const id2 = new Numeric(2);

      const fn1 = new Func(true, 'fn1', id1, id2, '+');
      const fn2 = new Func(true, 'fn2', id1, id2, '-');
      const fn3 = new Func(true, 'fn3', id1, id2, '*');
      const fn4 = new Func(true, 'fn4', id1, id2, '/');

      assert.strictEqual(fn1.getValue(), 12);
      assert.strictEqual(fn2.getValue(), 8);
      assert.strictEqual(fn3.getValue(), 20);
      assert.strictEqual(fn4.getValue(), 5);

      const id4 = new Numeric(10);

      const fn5 = new Func(false, 'fn5', id4);
      assert.strictEqual(fn5.getValue(), 10);
    });

    it('возвращает корректное значение (рандомные тесты)', () => {
      const id1 = new Numeric(Math.floor(Math.random() * 10));
      const id2 = new Numeric(Math.floor(Math.random() * 10));
      const fn1 = new Func(true, 'fn1', id1, id2, '+');
      const fn2 = new Func(true, 'fn2', id1, id2, '-');
      const fn3 = new Func(true, 'fn3', id1, id2, '*');
      const fn4 = new Func(true, 'fn4', id1, id2, '/');

      assert.strictEqual(fn1.getValue(), +id1.getValue() + id2.getValue());
      assert.strictEqual(fn2.getValue(), +id1.getValue() - id2.getValue());
      assert.strictEqual(fn3.getValue(), +id1.getValue() * id2.getValue());
      assert.strictEqual(fn4.getValue(), +id1.getValue() / id2.getValue());
    });

    it('возвращает корректное значение (при аргументе класса Variable)', () => {
      
      const id1 = new Variable('var1', 10);
      const fn1 = new Func(false, 'fn1', id1);
      assert.strictEqual(fn1.getValue(), 10);
      id1.value = 20;
      assert.strictEqual(fn1.getValue(), 20);
      id1.value = 12.542;
      assert.strictEqual(fn1.getValue(), 12.542);

    });

    it('возвращает корректное значение (при аргументе класса Function)', () => {
      
      const id1 = new Variable('var1', 25);
      const id2 = new Numeric(10);
      const id3 = new Numeric(20);
      const fn1 = new Func(true, 'fn1', id1, id2, '*');
      const fn2 = new Func(true, 'fn1', fn1, id3, '/');
      assert.strictEqual(fn1.getValue(), 250);
      assert.strictEqual(fn2.getValue(), 12.5);
      id2.value = 5;
      assert.strictEqual(fn1.getValue(), 125);
      assert.strictEqual(fn2.getValue(), 6.25);

    });

    it('вычисление последовательности Фибоначчи (fib25)', () => {
      
      const id1 = new Variable('v0', 0);
      const id2 = new Variable('v1', 1);
      
      let functions = {};

      functions[`fib0`] = new Func(false, 'fib0', id1);
      functions[`fib1`] = new Func(false, 'fib1', id2);

      for (let i = 2; i <= 18; i++){
        functions[`fib${i}`] = new Func (true, `fib${i}`, functions[`fib${i-1}`], functions[`fib${i-2}`], '+');
      }
      
      assert.strictEqual(functions[`fib18`].getValue(), 2584);

    });

  });
})