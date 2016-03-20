'use strict';

let EventEmitter = require('ak-eventemitter');
let fs = require('fs');
let path = require('path');
let template = require('ak-template');

module.exports = class Shop extends EventEmitter {
  constructor () {
    super();

    this.element = null;
    this.template = template(fs.readFileSync(path.join(__dirname, 'index.tpl'), 'utf-8'));
  }

  /**
   * Render the books shop
   *
   * @param {Object} data
   * @return {Shop}
   */
  render (data = {}) {
    this.emit('rendering');

    if (! this.element) {
      this.element = this.template(data);
    }

    //set element to zone books
    document.querySelector('[hp-zone-books]').innerHTML = this.element;
    this.emit('render');

    return this;
  }

};
