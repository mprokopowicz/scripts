'use strict';

const JxaExecutor = require('./jxa-executor');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const chai = require('chai');

chai.use(chaiAsPromised);
chai.use(sinonChai);
const { expect } = chai;

describe('JxaExecutor', function () {
  let osaStub;
  let executor;
  let jxaFunction;

  beforeEach(function () {
    osaStub = sinon.spy((fn, ...args) => {
      const callback = args.pop();
      try {
        callback(null, fn(...args));
      } catch (error) {
        callback(error);
      }
    });
    executor = new JxaExecutor(osaStub);
    jxaFunction = (a, b) => a + b;
  });

  describe('#wrap', function () {
    it('should return a function', function () {
      const wrapped = executor.wrap(jxaFunction);
      expect(wrapped).to.be.a('function');
    });

    it('should return a function that resolves with the result of executing JXA script', function () {
      const wrapped = executor.wrap(jxaFunction);
      const promise = wrapped(1, 3);
      return Promise.all([
        expect(promise).to.eventually.equal(4),
        expect(osaStub).to.have.been.calledOnce
      ]);
    });

    it('should return a function that rejects when the JXA script had errors', function () {
      jxaFunction = () => {
        throw new Error('oopps!');
      };
      const wrapped = executor.wrap(jxaFunction);
      return Promise.all([
        expect(wrapped(4, 5)).to.be.rejectedWith('oopps!'),
        expect(osaStub).to.have.been.calledOnce
      ]);
    });
  });

  describe('#exec', function () {
    it('should resolve with the result of JXA script', function () {
      return expect(executor.exec(jxaFunction, 1, 4)).to.eventually.equal(5);
    });

    it('should reject with the error from JXA script', function () {
      jxaFunction = () => {
        throw new Error('nope :(');
      };
      return expect(executor.exec(jxaFunction, 1, 4)).to.be.rejectedWith('nope :(');
    });
  });
});