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
    this.partials = {
      'empty': template(fs.readFileSync(path.join(__dirname, 'partials/empty.tpl'), 'utf-8'))
    };
  }

  /**
   * Render the books shop
   *
   * @param {Object} data
   * @return {Shop}
   */
  render (data = {}) {
    this.emit('rendering');

    if (! data.items || ! data.items.length) {
      this.element = this.partials.empty();
    }

    if (! this.element) {
      this.element = this.template(data);
    }

    //set element to zone books
    document.querySelector('[hp-zone-content]').innerHTML = this.element;
    this.emit('render');

    return this;
  }
};
