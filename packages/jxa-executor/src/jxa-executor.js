'use strict';

const debug = require('debug')('JxaExecutor');

class JxaExecutor {
  constructor(osa) {
    this.osa = osa;
    debug('created');
  }

  wrap(jxaFunction) {
    const { osa } = this;
    return (...args) => new Promise((resolve, reject) => {
      osa(jxaFunction, ...args, (error, response) => {
        if (error) {
          reject(error);
        }

        resolve(response);
      });
    });
  }

  exec(jxaFunction, ...args) {
    return this.wrap(jxaFunction)(...args);
  }
}

module.exports = JxaExecutor;