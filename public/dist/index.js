(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

let HenriPotier = require('./lib/henri-potier');
let view = new HenriPotier();

view.run();

},{"./lib/henri-potier":4}],2:[function(require,module,exports){
/*eslint-disable space-unary-ops */
'use strict';

let Delegate = require('dom-delegate');
let EventEmitter = require('ak-eventemitter');

let path = require('path');
let template = require('ak-template');

module.exports = class Cart extends EventEmitter {
  constructor () {
    super();

    this.element = null;
    this.delegate = new Delegate(document.body);
    this.template = template("<article class=\"woocommerce-cart page type-page status-publish hentry language-en\">\n  <div class=\"entry-content static-content\">\n    <div class=\"woocommerce\">\n        <table class=\"shop_table cart\" cellspacing=\"0\">\n          <thead>\n            <tr>\n\n              <th class=\"product-thumbnail\">&nbsp;</th>\n              <th class=\"product-name\">Product</th>\n              <th class=\"product-price\">Price</th>\n              <th class=\"product-quantity\">Quantity</th>\n              <th class=\"product-subtotal\">Total</th>\n              <th class=\"product-remove\">&nbsp;</th>\n            </tr>\n          </thead>\n          <tbody>\n            <% var items = locals.items || []; %>\n              <% for (var index=0, length=items.length; index < length; index++) { %>\n                <% var item = items[index]; %>\n                  <tr class=\"cart_item\" data-hp-isbn=\"<%- item.isbn %>\">\n\n                    <td class=\"product-thumbnail\" width=\"120\" height=\"100\">\n                      <a href=\"javascript:void(0);\"><img src=\"<%- item.cover %>\" class=\"attachment-shop_thumbnail wp-post-image\" alt=\"<%- ~~item.title %>\" /></a>\n                    </td>\n\n                    <td class=\"product-name\">\n                      <spans>\n                        <%- item.title %>\n                          </span>\n                    </td>\n\n                    <td class=\"product-price\">\n                      <span class=\"amount\"><%- item.price %> &euro;</span> </td>\n\n                    <td class=\"product-quantity\">\n                      <div class=\"quantity\">\n                        <input data-hp-quantity-<%- item.isbn %> type=\"text\" step=\"1\" min=\"0\" value=\"<%- item.quantity %>\" title=\"Qty\" class=\"hp-input-quantity input-text qty text\" size=\"4\" />\n                        <div class=\"qty-adjust\">\n                          <a href=\"javascript:void(0);\" class=\"hp-plus-one fa fa-angle-up\"></a>\n                          <a href=\"javascript:void(0);\" class=\"hp-minus-one fa fa-angle-down\"></a>\n                        </div>\n                      </div>\n                    </td>\n\n                    <td class=\"product-subtotal\">\n                      <span data-hp-amount-<%- item.isbn %> class=\"hp-amount amount\" data-hp-price=\"<%- ~~item.price %>\"><%- ~~item.quantity * ~~item.price%> &euro;</span> </td>\n                    <td class=\"hp-remove product-remove\">\n                      <a href=\"javascript:void(0);\" class=\"remove\" title=\"Remove this item\">x</a> </td>\n                  </tr>\n                  <% } %>\n          </tbody>\n        </table>\n\n\n\n      <div hp-zone-total class=\"cart-collaterals\">\n\n      </div>\n\n    </div>\n  </div>\n</article>\n");
    this.partials = {
      'empty': template("<article class=\"page type-page status-publish hentry language-en\">\n  <div class=\"entry-content static-content\">\n    <div class=\"woocommerce\">\n      <p class=\"cart-empty\">Your cart is currently empty.</p>\n\n\n      <p class=\"return-to-shop\"><a class=\"button wc-backward\" href=\"http://92bondstreet.github.io/henri-potier\">Return To Shop</a></p>\n    </div>\n  </div>\n</article>\n"),
      'total': template("<div class=\"cart_totals \">\n\n  <h2>Cart Totals</h2>\n  <div class=\"cart_totals_wrap\">\n    <table cellspacing=\"0\">\n\n      <tbody>\n        <tr class=\"cart-subtotal\">\n          <th>Was</th>\n          <td><del><span class=\"amount\"><%- locals.was || 0 %> &euro;</span></del></td>\n        </tr>\n\n\n        <tr class=\"order-total\">\n          <th>Total</th>\n          <td><strong><span class=\"amount\"><%- locals.now || 0%> &euro;</span></strong> </td>\n        </tr>\n\n\n      </tbody>\n\n    </table>\n  </div>\n\n</div>\n")
    };

    this.listen();
  }

  /**
   * Listen events
   *
   * @return {Cart}
   */
  listen () {
    this.delegate.on('input', '.hp-input-quantity', (event, target) => {
      this.onInputQuantity(target);
    });

    this.delegate.on('click', '.hp-plus-one', (event, target) => {
      this.onClickQuantity(target, true);
    });

    this.delegate.on('click', '.hp-minus-one', (event, target) => {
      this.onClickQuantity(target, false);
    });

    this.delegate.on('click', '.hp-remove', (event, target) => {
      this.remove(target);
    });

    return this;
  }

  /**
   * Get the isbn of current item
   *
   * @param  {Element} target
   * @return {String}
   */
  getIsbn (target) {
    const root = target.closest('[data-hp-isbn]');

    return root.getAttribute('data-hp-isbn');
  }

  /**
   * Get input according data
   *
   * @param  {String} what
   * @param  {String} isbn
   * @return {Element}
   */
  getInput (what, isbn) {
    return document.querySelector(`[data-hp-${what}-${isbn}]`);
  }

  /**
   * Set quantity value
   * @param {Element} dom
   * @param {Integer} value
   * @return {Cart}
   */
  setQuantity (dom, value) {
    dom.value = value;
    dom.dispatchEvent(new Event('input', {'bubbles': true}));

    return this;
  }

  /**
   * Render the cart
   *
   * @param {Object} data
   * @return {Cart}
   */
  render (data = {}) {
    this.emit('rendering');

    //total order with best special offer
    const totalOrder = data.total || {};

    if (! data.items || ! data.items.length) {
      this.element = this.partials.empty();
    } else {
      this.element = this.template(data);
    }

    //set element to zone cart
    this.set('content', this.element);
    this.set('total', this.partials.total(totalOrder));
    this.emit('render');

    return this;
  }

  update (data = {}) {
    this.emit('updating');

    //total order with best special offer
    const totalOrder = data.total || {};

    this.set('total', this.partials.total(totalOrder));

    this.emit('update');

    return this;
  }

  /**
   * Set HTML DOM to a zone
   *
   * @param  {String} zone
   * @param  {Element} dom
   * @return {Cart}
   */
  set (zone, dom) {
    let attribute = document.querySelector(`[hp-zone-${zone}]`) || {};

    attribute.innerHTML = dom;

    return this;
  }

  /**
   * Update quantity for the current item
   *
   * @param {Element} target
   * @param {Cart}
   */
  onInputQuantity (target) {
    const quantity = target.value;
    const isbn = this.getIsbn(target);
    let amount = this.getInput('amount', isbn);
    const price = amount.getAttribute('data-hp-price');

    amount.innerHTML = `${quantity * price} &euro;`;
    this.emit('cart.item.quantity', isbn, quantity);

    return this;
  }

  /**
   * Modify quantity
   *
   * @param  {Element} target
   * @return {Cart}
   */
  onClickQuantity (target, add = true) {
    const isbn = this.getIsbn(target);
    const increment = add ? 1 : - 1;
    let quantity = this.getInput('quantity', isbn);
    let value = ~~quantity.value + increment;

    value = value < 0 ? 0 : value;
    this.setQuantity(quantity, value);

    return this;
  }

  /**
   * Remove item from cart
   *
   * @param  {Event} event
   * @param  {Element} target
   * @return {Cart}
   */
  remove (target) {
    const isbn = this.getIsbn(target);
    let quantity = this.getInput('quantity', isbn);

    this.setQuantity(quantity, 0);

    return this;
  }
};

},{"ak-eventemitter":7,"ak-template":9,"dom-delegate":15,"path":12}],3:[function(require,module,exports){
'use strict';

let EventEmitter = require('ak-eventemitter');

module.exports = class Core extends EventEmitter {
  constructor () {
    super();

    this.listen();
  }

  /**
   * Listen events
   *
   * @return {Core}
   */
  listen () {
    this.on('shop.update.quantity', (ns, value) => {
      this.quantity = value;
    });

    return this;
  }

  /**
   * Set quantity
   *
   * @param  {String} value
   */
  set quantity (value) {
    document.querySelector('.hp-cart-total-item').innerHTML = value;
  }
};

},{"ak-eventemitter":7}],4:[function(require,module,exports){
'use strict';

let Cart = require('./cart');
let Core = require('./core');
let EventEmitter = require('ak-eventemitter');
let Items = require('./items');
let Shop = require('./shop');
let store = require('henri-potier-store');

const books = store.books;
const order = store.order;

module.exports = class HenriPotier extends EventEmitter {
  /**
   * Constructor
   *
   * Prepares Controller
   *
   */
  constructor () {
    super();

    this.cart = new Cart();
    this.core = new Core();
    this.shop = new Shop();
    this.items = new Items();

    this.listen();
  }

  /**
   * Listen events
   *
   * @return {HenriPotier}
   */
  listen () {
    this.shop.on('shop.add', (ns, isbn) => {
      this.items.add(isbn);
      this.core.emit('shop.update.quantity', this.items.quantity);
    });

    this.shop.on('shop.cart.open', () => {
      this.openCart();
    });

    this.cart.on('cart.item.quantity', (ns, isbn, quantity) => {
      this.change(isbn, quantity);
    });

    return this;
  }

  /**
   * Run and fetch data before rendering
   *
   * @return {HenriPotier}
   */
  run () {
    books()
    .then(list => {
      this.items.books = list;
      this.shop.render({'books': list});
    });

    return this;
  }

  /**
   * Open cart
   * @return {HenriPotier}
   */
  openCart () {
    const items = this.items.toJSON();

    order(items)
      .then(total => {
        this.cart.render({
          'items': items,
          'total': total
        });
      });

    return this;
  }

  /**
   * Update cart
   * @return {HenriPotier}
   */
  updateCart () {
    const items = this.items.toJSON();

    order(items)
      .then(total => {
        this.cart.update({
          'total': total
        });
      });

    return this;
  }

  /**
   * Change item quantity
   * @param  {[type]} isbn     [description]
   * @param  {[type]} quantity [description]
   * @return {[type]}          [description]
   */
  change (isbn, quantity) {
    this.items.update(isbn, quantity);
    this.core.emit('shop.update.quantity', this.items.quantity);
    this.updateCart();

    return this;
  }
};

},{"./cart":2,"./core":3,"./items":5,"./shop":6,"ak-eventemitter":7,"henri-potier-store":16}],5:[function(require,module,exports){
/*eslint-disable space-unary-ops */
'use strict';

module.exports = class Items {
  /**
   * Constructor
   *
   * Getter/Setter to cart Items
   */
  constructor () {
    this._books = new Map();
    this._cart = new Map();
  }

  /**
   * Get total of cart items
   *
   * @return {Integer}
   */
  get quantity () {
    let total = 0;

    this._cart.forEach(item => {
      total += ~~item.quantity;
    });

    return total;
  }

  /**
   * Set list of books shop
   *
   * @param  {Array} value
   * @return {Items}
   */
  set books (value) {
    this._books = new Map();

    value.forEach(current => {
      current.quantity = 0;
      this._books.set(current.isbn, current);
    });

    return this;
  }

  /**
   * Get the book for given isbn
   *
   * @param  {String} isbn
   * @return {Object}
   */
  book (isbn) {
    return this._books.get(isbn) || {};
  }

  //for not yet added books in cart, we get it
  //from list of books
  //or add +1 as quantity
  /**
   * Add a book to cart
   *
   * @param {String} isbn
   * @return {Items}
   */
  add (isbn) {
    let book = this._cart.get(isbn) || this.book(isbn);

    book.quantity += 1;
    this._cart.set(isbn, book);

    return this;
  }

  /**
   * Update a book to cart
   *
   * @param {String} isbn
   * @param {Integer} quantity
   * @return {Items}
   */
  update (isbn, quantity = 1) {
    let book = this._cart.get(isbn) || this.book(isbn);

    book.quantity = quantity;
    this._cart.set(isbn, book);

    return this;
  }

  /**
   * Get JSON
   * @return {Array}
   */
  toJSON () {
    let json = [];

    this._cart.forEach(current => {
      if (current.quantity > 0) {
        json.push(current);
      }
    });

    return json;
  }
};

},{}],6:[function(require,module,exports){
'use strict';

let Delegate = require('dom-delegate');
let EventEmitter = require('ak-eventemitter');

let path = require('path');
let template = require('ak-template');

module.exports = class Shop extends EventEmitter {
  constructor () {
    super();

    this.element = null;
    this.delegate = new Delegate(document.body);
    this.template = template("<div class=\"product-listing-layout-3\">\n  <ul class=\"product-grid product-listing\">\n    <% var books = locals.books || []; %>\n\n    <% for (var index=0, length=books.length; index < length; index++) { %>\n      <% var book = books[index]; %>\n      <li class=\"grid-item col-lg-3 col-md-3 col-sm-6 col-xs-12\">\n\n        <div class=\"item-wrap\">\n\n          <div class=\"clear\"></div>\n\n          <a href=\"javascript:void(0);\" class=\"item-thumb\" data-hp-isbn=\"<%- book.isbn %>\">\n            <img width=\"340\" height=\"500\" src=\"<%- book.cover %>\" class=\"attachment-shop_catalog wp-post-image\" alt=\"<%- book.title %>\" />\n          </a>\n\n          <div class=\"item-info\">\n            <button class=\"hp-add-cart single_add_to_cart_button button alt\" data-hp-isbn=\"<%- book.isbn %>\" type=\"submit\" style=\"display: inline!important;\"><%- book.price %> &euro; | Add to cart</button>\n            <h2 style=\"margin-top: 5px; font-size: 1em\"><%- book.title %></h2>\n          </div>\n      </li>\n    <% } %>\n  </ul>\n</div>\n");

    this.listen();
  }

  /**
   * Listen events
   *
   * @return {Shop}
   */
  listen () {
    this.delegate.on('click', '.hp-add-cart', (event) => {
      this.add(event);
    });

    this.delegate.on('click', '.hp-open-cart', () => {
      this.emit('shop.cart.open');
    });

    return this;
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
    document.querySelector('[hp-zone-content]').innerHTML = this.element;
    this.emit('render');

    return this;
  }

  /**
   * Add item to cart
   *
   * @param {Event} event
   * @return {Shop}
   */
  add (event) {
    let isbn = event.target.getAttribute('data-hp-isbn');

    this.emit('shop.add', isbn);

    return this;
  }
};

},{"ak-eventemitter":7,"ak-template":9,"dom-delegate":15,"path":12}],7:[function(require,module,exports){
module.exports = require('./lib/eventemitter');

},{"./lib/eventemitter":8}],8:[function(require,module,exports){
'use strict';

/**
 * Export `EventEmitter`
 *
 * @param {Object} options (optional)
 * @return {EventEmitter}
 */
var EventEmitter = module.exports = function (options) {
  options = options || {};
  this._eventEmitter = {};
  this._eventEmitter.tree = {'children': {}};
  this._eventEmitter.delimiter = options.delimiter || '.';
};

/**
 * Call all callbacks for given tree
 *
 * @see #_searchTree();
 *
 * @param {Object} tree
 * @param {arguments} args
 */
EventEmitter.prototype._emit = function (tree, args) {
  var callbacks = tree.callbacks;

  if (! callbacks) {
    return this;
  }

  var argc = args.length;

  for (
    var i = 0,
    len = callbacks.length,
    callback;
    i < len;
    i += 1
  ) {
    callback = callbacks[i];

    if (argc === 1) {
      callback.fn.call(callback.context, args[0]);
    } else if (argc === 2) {
      callback.fn.call(callback.context, args[0], args[1]);
    } else {
      callback.fn.apply(callback.context, args);
    }

    if (callback.once) {
      callbacks.splice(i, 1);

      i -= 1;
      len -= 1;

      if (callbacks.length === 0) {
        tree.callbacks = undefined;
      }
    }
  }
};

/**
 * Parse given tree for given ns
 *
 * @see #emit();
 *
 * @param {Object} tree
 * @param {Array} ns
 * @param {Integer} start
 * @param {arguments} args
 */
EventEmitter.prototype._searchTree = function (tree, ns, start, args) {
  for (var i = start,
    len = ns.length,
    currentNs,
    currentTree,
    wildTree;
    i < len;
    i += 1
  ) {
    wildTree = tree.children['*'];

    if (wildTree) {
      if (wildTree.callbacks) {
        this._emit(wildTree, args);
      }

      this._searchTree(wildTree, ns, i + 1, args);
    }

    currentNs = ns[i];
    currentTree = tree.children[currentNs];

    if (! currentTree) {
      return this;
    }

    tree = currentTree;
  }

  if (currentTree) {
    this._emit(currentTree, args);
  }
};

/**
 * Add event listener
 *
 * @param {String} ns
 * @param {Function} callback
 * @param {Object} options (optional)
 * @return {EventEmitter}
 */
EventEmitter.prototype.on = function (ns, callback, context, once) {
  ns = ns.split(this._eventEmitter.delimiter);
  var tree = this._eventEmitter.tree;
  var currentNs;
  var currentTree;

  for (var i = 0, len = ns.length; i < len; i += 1) {
    currentNs = ns[i];
    currentTree = tree.children[currentNs];

    if (! currentTree) {
      currentTree = tree.children[currentNs] = {'children': {}};
    }

    tree = currentTree;
  }

  if (! tree.callbacks) {
    tree.callbacks = [];
  }

  tree.callbacks.push({
    'fn': callback,
    'context': context ? context : this,
    'once': !! once
  });

  return this;
};

/**
 * Remove event listener
 *
 * @param {String} ns
 * @param {Function} callback
 * @param {Object} options (optional)
 * @return {EventEmitter}
 */
EventEmitter.prototype.off = function (ns, callback, context) {
  if (! ns) {
    this._eventEmitter.tree = {'children': {}};

    return this;
  }

  ns = ns.split(this._eventEmitter.delimiter);
  var tree = this._eventEmitter.tree;
  var currentTree;

  for (var i = 0, len = ns.length; i < len; i += 1) {
    currentTree = tree.children[ns[i]];

    if (! currentTree) {
      return this;
    }

    tree = currentTree;
  }

  if (! callback) {
    tree.callbacks = undefined;

    return this;
  }

  if (! tree.callbacks) {
    return this;
  }

  for (
    var i2 = 0,
    callbacks = tree.callbacks,
    len2 = callbacks.length,
    currentCallback;
    i2 < len2;
    i2 += 1
  ) {
    currentCallback = callbacks[i2];

    if (currentCallback.fn === callback) {
      if (context && context !== currentCallback.context) {
        continue;
      }

      callbacks.splice(i2, 1);

      break;
    }
  }

  if (! callbacks.length) {
    tree.callbacks = undefined;
  }

  return this;
};

/**
 * Emit event
 *
 * @param {String} ns
 * @param {*} ... (optional)
 * @return {EventEmitter}
 */
EventEmitter.prototype.emit = function (ns) {
  ns = ns.split(this._eventEmitter.delimiter);

  this._searchTree(this._eventEmitter.tree, ns, 0, arguments);

  return this;
};

/**
 * Add event listener for once
 *
 * @param {String} ns
 * @param {Function} callback
 * @param {Object} options (optional)
 * @return {EventEmitter}
 */
EventEmitter.prototype.once = function (ns, callback, context) {
  this.on(ns, callback, context, true);

  return this;
};

},{}],9:[function(require,module,exports){
module.exports = require('./lib/template');

},{"./lib/template":10}],10:[function(require,module,exports){
'use strict';

/**
 * Dependencies
 */
var defaults = require('stluafed');

/**
 * Export `template`
 *
 * @param {String} str
 * @return {Function}
 */
var template = module.exports = function (str) {
  var tpl = template.cache[str];

  if (tpl) {
    return tpl;
  }

  /*jshint evil: true*/
  tpl = (new Function(
    'locals',
    'locals = this.defaults(locals || {}, this.globals);' +
    'var __p = [];' +
    '__p.push(\'' +
    str.replace(/[\r\t\n]/g, ' ')
      .replace(/'(?=[^%]*%>)/g, '\t')
      .split('\'').join('\\\'')
      .split('\t').join('\'')
      .replace(/<%=(.+?)%>/g, '\',$1,\'')
      .replace(/<%-(.+?)%>/g, '\',this.escape($1),\'')
      .split('<%').join('\');')
      .split('%>').join('__p.push(\'') +
    '\');return __p.join(\'\');'
  )).bind({
    'defaults': defaults,
    'globals': template.globals,
    'escape': template.escape
  });
  /*jshint evil: false*/

  template.cache[str] = tpl;

  return tpl;
};

/**
 * Globals are merged into `locals`
 */
template.globals = {};

/**
 * Cache
 */
template.cache = {};

/**
 * Escape function for <%- variable %>, can be overridden (default escape HTML)
 *
 * @param {String} str
 * @return {Function}
 */
template.escape = function (str) {
  return (str + '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39');
};

},{"stluafed":11}],11:[function(require,module,exports){
'use strict';

/**
 * Merge default values.
 *
 * @param {Object} dest
 * @param {Object} defaults
 * @return {Object}
 * @api public
 */
var defaults = function (dest, src, recursive) {
  for (var prop in src) {
    if (recursive && dest[prop] instanceof Object && src[prop] instanceof Object) {
      dest[prop] = defaults(dest[prop], src[prop], true);
    } else if (! (prop in dest)) {
      dest[prop] = src[prop];
    }
  }

  return dest;
};

/**
 * Expose `defaults`.
 */
module.exports = defaults;

},{}],12:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":13}],13:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],14:[function(require,module,exports){
/*jshint browser:true, node:true*/

'use strict';

module.exports = Delegate;

/**
 * DOM event delegator
 *
 * The delegator will listen
 * for events that bubble up
 * to the root node.
 *
 * @constructor
 * @param {Node|string} [root] The root node or a selector string matching the root node
 */
function Delegate(root) {

  /**
   * Maintain a map of listener
   * lists, keyed by event name.
   *
   * @type Object
   */
  this.listenerMap = [{}, {}];
  if (root) {
    this.root(root);
  }

  /** @type function() */
  this.handle = Delegate.prototype.handle.bind(this);
}

/**
 * Start listening for events
 * on the provided DOM element
 *
 * @param  {Node|string} [root] The root node or a selector string matching the root node
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.root = function(root) {
  var listenerMap = this.listenerMap;
  var eventType;

  // Remove master event listeners
  if (this.rootElement) {
    for (eventType in listenerMap[1]) {
      if (listenerMap[1].hasOwnProperty(eventType)) {
        this.rootElement.removeEventListener(eventType, this.handle, true);
      }
    }
    for (eventType in listenerMap[0]) {
      if (listenerMap[0].hasOwnProperty(eventType)) {
        this.rootElement.removeEventListener(eventType, this.handle, false);
      }
    }
  }

  // If no root or root is not
  // a dom node, then remove internal
  // root reference and exit here
  if (!root || !root.addEventListener) {
    if (this.rootElement) {
      delete this.rootElement;
    }
    return this;
  }

  /**
   * The root node at which
   * listeners are attached.
   *
   * @type Node
   */
  this.rootElement = root;

  // Set up master event listeners
  for (eventType in listenerMap[1]) {
    if (listenerMap[1].hasOwnProperty(eventType)) {
      this.rootElement.addEventListener(eventType, this.handle, true);
    }
  }
  for (eventType in listenerMap[0]) {
    if (listenerMap[0].hasOwnProperty(eventType)) {
      this.rootElement.addEventListener(eventType, this.handle, false);
    }
  }

  return this;
};

/**
 * @param {string} eventType
 * @returns boolean
 */
Delegate.prototype.captureForType = function(eventType) {
  return ['blur', 'error', 'focus', 'load', 'resize', 'scroll'].indexOf(eventType) !== -1;
};

/**
 * Attach a handler to one
 * event for all elements
 * that match the selector,
 * now or in the future
 *
 * The handler function receives
 * three arguments: the DOM event
 * object, the node that matched
 * the selector while the event
 * was bubbling and a reference
 * to itself. Within the handler,
 * 'this' is equal to the second
 * argument.
 *
 * The node that actually received
 * the event can be accessed via
 * 'event.target'.
 *
 * @param {string} eventType Listen for these events
 * @param {string|undefined} selector Only handle events on elements matching this selector, if undefined match root element
 * @param {function()} handler Handler function - event data passed here will be in event.data
 * @param {Object} [eventData] Data to pass in event.data
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.on = function(eventType, selector, handler, useCapture) {
  var root, listenerMap, matcher, matcherParam;

  if (!eventType) {
    throw new TypeError('Invalid event type: ' + eventType);
  }

  // handler can be passed as
  // the second or third argument
  if (typeof selector === 'function') {
    useCapture = handler;
    handler = selector;
    selector = null;
  }

  // Fallback to sensible defaults
  // if useCapture not set
  if (useCapture === undefined) {
    useCapture = this.captureForType(eventType);
  }

  if (typeof handler !== 'function') {
    throw new TypeError('Handler must be a type of Function');
  }

  root = this.rootElement;
  listenerMap = this.listenerMap[useCapture ? 1 : 0];

  // Add master handler for type if not created yet
  if (!listenerMap[eventType]) {
    if (root) {
      root.addEventListener(eventType, this.handle, useCapture);
    }
    listenerMap[eventType] = [];
  }

  if (!selector) {
    matcherParam = null;

    // COMPLEX - matchesRoot needs to have access to
    // this.rootElement, so bind the function to this.
    matcher = matchesRoot.bind(this);

  // Compile a matcher for the given selector
  } else if (/^[a-z]+$/i.test(selector)) {
    matcherParam = selector;
    matcher = matchesTag;
  } else if (/^#[a-z0-9\-_]+$/i.test(selector)) {
    matcherParam = selector.slice(1);
    matcher = matchesId;
  } else {
    matcherParam = selector;
    matcher = matches;
  }

  // Add to the list of listeners
  listenerMap[eventType].push({
    selector: selector,
    handler: handler,
    matcher: matcher,
    matcherParam: matcherParam
  });

  return this;
};

/**
 * Remove an event handler
 * for elements that match
 * the selector, forever
 *
 * @param {string} [eventType] Remove handlers for events matching this type, considering the other parameters
 * @param {string} [selector] If this parameter is omitted, only handlers which match the other two will be removed
 * @param {function()} [handler] If this parameter is omitted, only handlers which match the previous two will be removed
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.off = function(eventType, selector, handler, useCapture) {
  var i, listener, listenerMap, listenerList, singleEventType;

  // Handler can be passed as
  // the second or third argument
  if (typeof selector === 'function') {
    useCapture = handler;
    handler = selector;
    selector = null;
  }

  // If useCapture not set, remove
  // all event listeners
  if (useCapture === undefined) {
    this.off(eventType, selector, handler, true);
    this.off(eventType, selector, handler, false);
    return this;
  }

  listenerMap = this.listenerMap[useCapture ? 1 : 0];
  if (!eventType) {
    for (singleEventType in listenerMap) {
      if (listenerMap.hasOwnProperty(singleEventType)) {
        this.off(singleEventType, selector, handler);
      }
    }

    return this;
  }

  listenerList = listenerMap[eventType];
  if (!listenerList || !listenerList.length) {
    return this;
  }

  // Remove only parameter matches
  // if specified
  for (i = listenerList.length - 1; i >= 0; i--) {
    listener = listenerList[i];

    if ((!selector || selector === listener.selector) && (!handler || handler === listener.handler)) {
      listenerList.splice(i, 1);
    }
  }

  // All listeners removed
  if (!listenerList.length) {
    delete listenerMap[eventType];

    // Remove the main handler
    if (this.rootElement) {
      this.rootElement.removeEventListener(eventType, this.handle, useCapture);
    }
  }

  return this;
};


/**
 * Handle an arbitrary event.
 *
 * @param {Event} event
 */
Delegate.prototype.handle = function(event) {
  var i, l, type = event.type, root, phase, listener, returned, listenerList = [], target, /** @const */ EVENTIGNORE = 'ftLabsDelegateIgnore';

  if (event[EVENTIGNORE] === true) {
    return;
  }

  target = event.target;

  // Hardcode value of Node.TEXT_NODE
  // as not defined in IE8
  if (target.nodeType === 3) {
    target = target.parentNode;
  }

  root = this.rootElement;

  phase = event.eventPhase || ( event.target !== event.currentTarget ? 3 : 2 );
  
  switch (phase) {
    case 1: //Event.CAPTURING_PHASE:
      listenerList = this.listenerMap[1][type];
    break;
    case 2: //Event.AT_TARGET:
      if (this.listenerMap[0] && this.listenerMap[0][type]) listenerList = listenerList.concat(this.listenerMap[0][type]);
      if (this.listenerMap[1] && this.listenerMap[1][type]) listenerList = listenerList.concat(this.listenerMap[1][type]);
    break;
    case 3: //Event.BUBBLING_PHASE:
      listenerList = this.listenerMap[0][type];
    break;
  }

  // Need to continuously check
  // that the specific list is
  // still populated in case one
  // of the callbacks actually
  // causes the list to be destroyed.
  l = listenerList.length;
  while (target && l) {
    for (i = 0; i < l; i++) {
      listener = listenerList[i];

      // Bail from this loop if
      // the length changed and
      // no more listeners are
      // defined between i and l.
      if (!listener) {
        break;
      }

      // Check for match and fire
      // the event if there's one
      //
      // TODO:MCG:20120117: Need a way
      // to check if event#stopImmediatePropagation
      // was called. If so, break both loops.
      if (listener.matcher.call(target, listener.matcherParam, target)) {
        returned = this.fire(event, target, listener);
      }

      // Stop propagation to subsequent
      // callbacks if the callback returned
      // false
      if (returned === false) {
        event[EVENTIGNORE] = true;
        event.preventDefault();
        return;
      }
    }

    // TODO:MCG:20120117: Need a way to
    // check if event#stopPropagation
    // was called. If so, break looping
    // through the DOM. Stop if the
    // delegation root has been reached
    if (target === root) {
      break;
    }

    l = listenerList.length;
    target = target.parentElement;
  }
};

/**
 * Fire a listener on a target.
 *
 * @param {Event} event
 * @param {Node} target
 * @param {Object} listener
 * @returns {boolean}
 */
Delegate.prototype.fire = function(event, target, listener) {
  return listener.handler.call(target, event, target);
};

/**
 * Check whether an element
 * matches a generic selector.
 *
 * @type function()
 * @param {string} selector A CSS selector
 */
var matches = (function(el) {
  if (!el) return;
  var p = el.prototype;
  return (p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector);
}(Element));

/**
 * Check whether an element
 * matches a tag selector.
 *
 * Tags are NOT case-sensitive,
 * except in XML (and XML-based
 * languages such as XHTML).
 *
 * @param {string} tagName The tag name to test against
 * @param {Element} element The element to test with
 * @returns boolean
 */
function matchesTag(tagName, element) {
  return tagName.toLowerCase() === element.tagName.toLowerCase();
}

/**
 * Check whether an element
 * matches the root.
 *
 * @param {?String} selector In this case this is always passed through as null and not used
 * @param {Element} element The element to test with
 * @returns boolean
 */
function matchesRoot(selector, element) {
  /*jshint validthis:true*/
  if (this.rootElement === window) return element === document;
  return this.rootElement === element;
}

/**
 * Check whether the ID of
 * the element in 'this'
 * matches the given ID.
 *
 * IDs are case-sensitive.
 *
 * @param {string} id The ID to test against
 * @param {Element} element The element to test with
 * @returns boolean
 */
function matchesId(id, element) {
  return id === element.id;
}

/**
 * Short hand for off()
 * and root(), ie both
 * with no parameters
 *
 * @return void
 */
Delegate.prototype.destroy = function() {
  this.off();
  this.root();
};

},{}],15:[function(require,module,exports){
/*jshint browser:true, node:true*/

'use strict';

/**
 * @preserve Create and manage a DOM event delegator.
 *
 * @version 0.3.0
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */
var Delegate = require('./delegate');

module.exports = function(root) {
  return new Delegate(root);
};

module.exports.Delegate = Delegate;

},{"./delegate":14}],16:[function(require,module,exports){
'use strict';

module.exports.books = require('./lib/books');
module.exports.order = require('./lib/order');

},{"./lib/books":17,"./lib/order":21}],17:[function(require,module,exports){
'use strict';

let request = require('superagent');

const BOOKS_STORE_URL = 'http://henri-potier.xebia.fr/books';

/**
 * Get the list of available books
 * @return {Promise}
 */
module.exports = function books () {
  return new Promise((resolve, reject) => {
    request
    .get(BOOKS_STORE_URL)
    .end((err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res.body);
    });
  });
};

},{"superagent":22}],18:[function(require,module,exports){
'use strict';

/**
 * Repeat string
 *
 * @param  {String} string - to repeat
 * @param  {Integer} count
 * @return {String}
 */
const repeat = (string, count) => {
  count = count || 1;

  return Array(count).fill(string).join(',');
};

/**
 * Reduce the isbn list according quantity
 *
 * @param  {Array} cart
 * @return {String}
 */
module.exports = function isbn (cart) {
  return cart.reduce((prev, curr) =>{
    return {
      'isbn': `${repeat(prev.isbn, prev.quantity)},${repeat(curr.isbn, curr.quantity)}`,
      'quantity': 1
    };
  }).isbn;
};

},{}],19:[function(require,module,exports){
'use strict';

module.exports = {
  /**
   * Compute percentage price
   *
   * @param  {Integer} total
   * @param  {Object} value
   * @return {Number}
   */
  'percentage': (total, offer) => {
    const value = offer && offer.value || 0;

    return total - total * value / 100;
  },
  /**
   * Compute minus price
   *
   * @param  {Integer} total
   * @param  {Object} value
   * @return {Number}
   */
  'minus': (total, offer) => {
    const value = offer && offer.value || 0;

    return total - value;
  },
  /**
   * Compute slice price
   *
   * @param  {Integer} total
   * @param  {Object} value
   * @return {Number}
   */
  'slice': (total, offer) => {
    const value = offer && offer.value || 0;
    const slice = offer && offer.sliceValue || 1;

    return total - parseInt(total / slice, 10) * value;
  }
};

},{}],20:[function(require,module,exports){
'use strict';

let special = require('./special-offers');

/**
 * Original total order
 *
 * @param  {Array} cart
 * @return {Integer}
 */
const was = cart => {
  return cart.reduce((price, item) => {
    return price + item.price * (item.quantity || 1);
  }, 0);
};

/**
 * Get the best special offer for total order
 *
 * @param  {Integer} total - from  original order
 * @param  {Array} offers
 * @return {Number}
 */
const now = (total, offers) => {
  let totals = offers.map(offer => {
    const compute = special[offer.type];

    //compute only if the special price is defined
    //else return the origina total itself
    return compute && compute(total, offer) || total;
  });

  return Math.min.apply(Math, totals);
};

/**
 * Get the total order with the best special offer
 *
 * @param  {Array} cart
 * @param  {Array} offers - list of special offers
 * @return {Object}
 */
module.exports = function total (cart, offers) {
  //From cart and special offers
  //compute the total order where
  //* was, is the original total order
  //* now, the total order with the best offers
  //* offer, the applied special offer
  const original = was(cart);
  const best = now(original, offers);

  return {
    'was': original,
    'now': best
  };
};

},{"./special-offers":19}],21:[function(require,module,exports){
'use strict';

let isbn = require('./helpers/isbn');
let request = require('superagent');
let total = require('./helpers/total');

/**
 * Get the order total cart
 *
 * @param {Array} cart
 * @return {Promise}
 */
module.exports = function order (cart) {
  return new Promise((resolve, reject) => {
    //break for empty cart
    if (! cart || ! cart.length) {
      return resolve([]);
    }

    const url = `http://henri-potier.xebia.fr/books/${isbn(cart)}/commercialOffers`;

    request
    .get(url)
    .end((err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(total(cart, res.body.offers));
    });
  });
};

},{"./helpers/isbn":18,"./helpers/total":20,"superagent":22}],22:[function(require,module,exports){
/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var reduce = require('reduce');
var requestBase = require('./request-base');
var isObject = require('./is-object');

/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  root = this;
}

/**
 * Noop.
 */

function noop(){};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Expose `request`.
 */

var request = module.exports = require('./request').bind(null, Request);

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  return false;
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pushEncodedKeyValuePair(pairs, key, obj[key]);
        }
      }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (Array.isArray(val)) {
    return val.forEach(function(v) {
      pushEncodedKeyValuePair(pairs, key, v);
    });
  }
  pairs.push(encodeURIComponent(key)
    + '=' + encodeURIComponent(val));
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  this.setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this.parseBody(this.text ? this.text : this.xhr.response)
    : null;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype.setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype.setStatusProperties = function(status){
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }

  var type = status / 100 | 0;

  // status / class
  this.status = this.statusCode = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
      // issue #876: return the http status code if the response parsing fails
      err.statusCode = self.xhr && self.xhr.status ? self.xhr.status : null;
      return self.callback(err);
    }

    self.emit('response', res);

    if (err) {
      return self.callback(err, res);
    }

    if (res.status >= 200 && res.status < 300) {
      return self.callback(err, res);
    }

    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
    new_err.original = err;
    new_err.response = res;
    new_err.status = res.status;

    self.callback(new_err, res);
  });
}

/**
 * Mixin `Emitter` and `requestBase`.
 */

Emitter(Request.prototype);
for (var key in requestBase) {
  Request.prototype[key] = requestBase[key];
}

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */

Request.prototype.abort = function(){
  if (this.aborted) return;
  this.aborted = true;
  this.xhr.abort();
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set responseType to `val`. Presently valid responseTypes are 'blob' and 
 * 'arraybuffer'.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (!options) {
    options = {
      type: 'basic'
    }
  }

  switch (options.type) {
    case 'basic':
      var str = btoa(user + ':' + pass);
      this.set('Authorization', 'Basic ' + str);
    break;

    case 'auto':
      this.username = user;
      this.password = pass;
    break;
  }
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, filename){
  if (!this._formData) this._formData = new root.FormData();
  this._formData.append(field, file, filename || file.name);
  return this;
};

/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.send = function(data){
  var obj = isObject(data);
  var type = this._header['content-type'];

  // merge
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj || isHost(data)) return this;
  if (!type) this.type('json');
  return this;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  this.clearTimeout();
  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

Request.prototype.timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

Request.prototype.withCredentials = function(){
  this._withCredentials = true;
  return this;
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var data = this._formData || this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (0 == status) {
      if (self.timedout) return self.timeoutError();
      if (self.aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(e){
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = 'download';
    self.emit('progress', e);
  };
  if (this.hasListeners('progress')) {
    xhr.onprogress = handleProgress;
  }
  try {
    if (xhr.upload && this.hasListeners('progress')) {
      xhr.upload.onprogress = handleProgress;
    }
  } catch(e) {
    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
    // Reported here:
    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
  }

  // timeout
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.timedout = true;
      self.abort();
    }, timeout);
  }

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }

  // initiate request
  if (this.username && this.password) {
    xhr.open(this.method, this.url, true, this.username, this.password);
  } else {
    xhr.open(this.method, this.url, true);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];
    var serialize = this._parser || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};


/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

function del(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"./is-object":23,"./request":25,"./request-base":24,"emitter":26,"reduce":28}],23:[function(require,module,exports){
/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null != obj && 'object' == typeof obj;
}

module.exports = isObject;

},{}],24:[function(require,module,exports){
/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = require('./is-object');

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

exports.clearTimeout = function _clearTimeout(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Force given parser
 *
 * Sets the body parser no matter type.
 *
 * @param {Function}
 * @api public
 */

exports.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

exports.timeout = function timeout(ms){
  this._timeout = ms;
  return this;
};

/**
 * Faux promise support
 *
 * @param {Function} fulfill
 * @param {Function} reject
 * @return {Request}
 */

exports.then = function then(fulfill, reject) {
  return this.end(function(err, res) {
    err ? reject(err) : fulfill(res);
  });
}

/**
 * Allow for extension
 */

exports.use = function use(fn) {
  fn(this);
  return this;
}


/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

exports.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

exports.getHeader = exports.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

exports.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
exports.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
exports.field = function(name, val) {
  if (!this._formData) {
    var FormData = require('form-data'); // browserify compatible. May throw if FormData is not supported natively.
    this._formData = new FormData();
  }
  this._formData.append(name, val);
  return this;
};

},{"./is-object":23,"form-data":27}],25:[function(require,module,exports){
// The node and browser modules expose versions of this with the
// appropriate constructor function bound as first argument
/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(RequestConstructor, method, url) {
  // callback
  if ('function' == typeof url) {
    return new RequestConstructor('GET', method).end(url);
  }

  // url first
  if (2 == arguments.length) {
    return new RequestConstructor('GET', method);
  }

  return new RequestConstructor(method, url);
}

module.exports = request;

},{}],26:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],27:[function(require,module,exports){
module.exports = FormData;
},{}],28:[function(require,module,exports){

/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};
},{}]},{},[1]);
