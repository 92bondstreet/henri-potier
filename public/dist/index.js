"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck2(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f;}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++){s(r[o]);}return s;})({1:[function(require,module,exports){'use strict';var HenriPotier=require('./lib/henri-potier');var view=new HenriPotier();view.run();},{"./lib/henri-potier":4}],2:[function(require,module,exports){ /*eslint-disable space-unary-ops */'use strict';var Delegate=require('dom-delegate');var EventEmitter=require('ak-eventemitter');var path=require('path');var template=require('ak-template');module.exports=function(_EventEmitter){_inherits(Cart,_EventEmitter);function Cart(){_classCallCheck2(this,Cart);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(Cart).call(this));_this.element=null;_this.delegate=new Delegate(document.body);_this.template=template("<article class=\"woocommerce-cart page type-page status-publish hentry language-en\">\n  <div class=\"entry-content static-content\">\n    <div class=\"woocommerce\">\n        <table class=\"shop_table cart\" cellspacing=\"0\">\n          <thead>\n            <tr>\n\n              <th class=\"product-thumbnail\">&nbsp;</th>\n              <th class=\"product-name\">Product</th>\n              <th class=\"product-price\">Price</th>\n              <th class=\"product-quantity\">Quantity</th>\n              <th class=\"product-subtotal\">Total</th>\n              <th class=\"product-remove\">&nbsp;</th>\n            </tr>\n          </thead>\n          <tbody>\n            <% var items = locals.items || []; %>\n              <% for (var index=0, length=items.length; index < length; index++) { %>\n                <% var item = items[index]; %>\n                  <tr class=\"cart_item\" data-hp-isbn=\"<%- item.isbn %>\">\n\n                    <td class=\"product-thumbnail\" width=\"120\" height=\"100\">\n                      <a href=\"javascript:void(0);\"><img src=\"<%- item.cover %>\" class=\"attachment-shop_thumbnail wp-post-image\" alt=\"<%- ~~item.title %>\" /></a>\n                    </td>\n\n                    <td class=\"product-name\">\n                      <spans>\n                        <%- item.title %>\n                          </span>\n                    </td>\n\n                    <td class=\"product-price\">\n                      <span class=\"amount\"><%- item.price %> &euro;</span> </td>\n\n                    <td class=\"product-quantity\">\n                      <div class=\"quantity\">\n                        <input data-hp-quantity-<%- item.isbn %> type=\"text\" step=\"1\" min=\"0\" value=\"<%- item.quantity %>\" title=\"Qty\" class=\"hp-input-quantity input-text qty text\" size=\"4\" />\n                        <div class=\"qty-adjust\">\n                          <a href=\"javascript:void(0);\" class=\"hp-plus-one fa fa-angle-up\"></a>\n                          <a href=\"javascript:void(0);\" class=\"hp-minus-one fa fa-angle-down\"></a>\n                        </div>\n                      </div>\n                    </td>\n\n                    <td class=\"product-subtotal\">\n                      <span data-hp-amount-<%- item.isbn %> class=\"hp-amount amount\" data-hp-price=\"<%- ~~item.price %>\"><%- ~~item.quantity * ~~item.price%> &euro;</span> </td>\n                    <td class=\"hp-remove product-remove\">\n                      <a href=\"javascript:void(0);\" class=\"remove\" title=\"Remove this item\">x</a> </td>\n                  </tr>\n                  <% } %>\n          </tbody>\n        </table>\n\n\n\n      <div hp-zone-total class=\"cart-collaterals\">\n\n      </div>\n\n    </div>\n  </div>\n</article>\n");_this.partials={'empty':template("<article class=\"page type-page status-publish hentry language-en\">\n  <div class=\"entry-content static-content\">\n    <div class=\"woocommerce\">\n      <p class=\"cart-empty\">Your cart is currently empty.</p>\n\n\n      <p class=\"return-to-shop\"><a class=\"button wc-backward\" href=\"http://92bondstreet.github.io/henri-potier\">Return To Shop</a></p>\n    </div>\n  </div>\n</article>\n"),'total':template("<div class=\"cart_totals \">\n\n  <h2>Cart Totals</h2>\n  <div class=\"cart_totals_wrap\">\n    <table cellspacing=\"0\">\n\n      <tbody>\n        <tr class=\"cart-subtotal\">\n          <th>Was</th>\n          <td><del><span class=\"amount\"><%- locals.was || 0 %> &euro;</span></del></td>\n        </tr>\n\n\n        <tr class=\"order-total\">\n          <th>Total</th>\n          <td><strong><span class=\"amount\"><%- locals.now || 0%> &euro;</span></strong> </td>\n        </tr>\n\n\n      </tbody>\n\n    </table>\n  </div>\n\n</div>\n")};_this.listen();return _this;} /**
   * Listen events
   *
   * @return {Cart}
   */_createClass(Cart,[{key:"listen",value:function listen(){var _this2=this;this.delegate.on('input','.hp-input-quantity',function(event,target){_this2.onInputQuantity(target);});this.delegate.on('click','.hp-plus-one',function(event,target){_this2.onClickQuantity(target,true);});this.delegate.on('click','.hp-minus-one',function(event,target){_this2.onClickQuantity(target,false);});this.delegate.on('click','.hp-remove',function(event,target){_this2.remove(target);});return this;} /**
   * Get the isbn of current item
   *
   * @param  {Element} target
   * @return {String}
   */},{key:"getIsbn",value:function getIsbn(target){var root=target.closest('[data-hp-isbn]');return root.getAttribute('data-hp-isbn');} /**
   * Get input according data
   *
   * @param  {String} what
   * @param  {String} isbn
   * @return {Element}
   */},{key:"getInput",value:function getInput(what,isbn){return document.querySelector("[data-hp-"+what+"-"+isbn+"]");} /**
   * Set quantity value
   * @param {Element} dom
   * @param {Integer} value
   * @return {Cart}
   */},{key:"setQuantity",value:function setQuantity(dom,value){dom.value=value;dom.dispatchEvent(new Event('input',{'bubbles':true}));return this;} /**
   * Render the cart
   *
   * @param {Object} data
   * @return {Cart}
   */},{key:"render",value:function render(){var data=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];this.emit('rendering'); //total order with best special offer
var totalOrder=data.total||{};if(!data.items||!data.items.length){this.element=this.partials.empty();}else {this.element=this.template(data);} //set element to zone cart
this.set('content',this.element);this.set('total',this.partials.total(totalOrder));this.emit('render');return this;}},{key:"update",value:function update(){var data=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];this.emit('updating'); //total order with best special offer
var totalOrder=data.total||{};this.set('total',this.partials.total(totalOrder));this.emit('update');return this;} /**
   * Set HTML DOM to a zone
   *
   * @param  {String} zone
   * @param  {Element} dom
   * @return {Cart}
   */},{key:"set",value:function set(zone,dom){var attribute=document.querySelector("[hp-zone-"+zone+"]")||{};attribute.innerHTML=dom;return this;} /**
   * Update quantity for the current item
   *
   * @param {Element} target
   * @param {Cart}
   */},{key:"onInputQuantity",value:function onInputQuantity(target){var quantity=target.value;var isbn=this.getIsbn(target);var amount=this.getInput('amount',isbn);var price=amount.getAttribute('data-hp-price');amount.innerHTML=quantity*price+" &euro;";this.emit('cart.item.quantity',isbn,quantity);return this;} /**
   * Modify quantity
   *
   * @param  {Element} target
   * @return {Cart}
   */},{key:"onClickQuantity",value:function onClickQuantity(target){var add=arguments.length<=1||arguments[1]===undefined?true:arguments[1];var isbn=this.getIsbn(target);var increment=add?1:-1;var quantity=this.getInput('quantity',isbn);var value=~ ~quantity.value+increment;value=value<0?0:value;this.setQuantity(quantity,value);return this;} /**
   * Remove item from cart
   *
   * @param  {Event} event
   * @param  {Element} target
   * @return {Cart}
   */},{key:"remove",value:function remove(target){var isbn=this.getIsbn(target);var quantity=this.getInput('quantity',isbn);this.setQuantity(quantity,0);return this;}}]);return Cart;}(EventEmitter);},{"ak-eventemitter":7,"ak-template":9,"dom-delegate":15,"path":12}],3:[function(require,module,exports){'use strict';var EventEmitter=require('ak-eventemitter');module.exports=function(_EventEmitter2){_inherits(Core,_EventEmitter2);function Core(){_classCallCheck2(this,Core);var _this3=_possibleConstructorReturn(this,Object.getPrototypeOf(Core).call(this));_this3.listen();return _this3;} /**
   * Listen events
   *
   * @return {Core}
   */_createClass(Core,[{key:"listen",value:function listen(){var _this4=this;this.on('shop.update.quantity',function(ns,value){_this4.quantity=value;});return this;} /**
   * Set quantity
   *
   * @param  {String} value
   */},{key:"quantity",set:function set(value){document.querySelector('.hp-cart-total-item').innerHTML=value;}}]);return Core;}(EventEmitter);},{"ak-eventemitter":7}],4:[function(require,module,exports){'use strict';var Cart=require('./cart');var Core=require('./core');var EventEmitter=require('ak-eventemitter');var Items=require('./items');var Shop=require('./shop');var store=require('henri-potier-store');var books=store.books;var order=store.order;module.exports=function(_EventEmitter3){_inherits(HenriPotier,_EventEmitter3); /**
   * Constructor
   *
   * Prepares Controller
   *
   */function HenriPotier(){_classCallCheck2(this,HenriPotier);var _this5=_possibleConstructorReturn(this,Object.getPrototypeOf(HenriPotier).call(this));_this5.cart=new Cart();_this5.core=new Core();_this5.shop=new Shop();_this5.items=new Items();_this5.listen();return _this5;} /**
   * Listen events
   *
   * @return {HenriPotier}
   */_createClass(HenriPotier,[{key:"listen",value:function listen(){var _this6=this;this.shop.on('shop.add',function(ns,isbn){_this6.items.add(isbn);_this6.core.emit('shop.update.quantity',_this6.items.quantity);});this.shop.on('shop.cart.open',function(){_this6.openCart();});this.cart.on('cart.item.quantity',function(ns,isbn,quantity){_this6.change(isbn,quantity);});return this;} /**
   * Run and fetch data before rendering
   *
   * @return {HenriPotier}
   */},{key:"run",value:function run(){var _this7=this;books().then(function(list){_this7.items.books=list;_this7.loadCart();_this7.shop.render({'books':list});});return this;} /**
   * Open cart
   *
   * @return {HenriPotier}
   */},{key:"openCart",value:function openCart(){var _this8=this;var items=this.items.toJSON();order(items).then(function(total){_this8.cart.render({'items':items,'total':total});});return this;} /**
   * Load cart from LocalForage
   *
   * @return {HenriPotier}
   */},{key:"loadCart",value:function loadCart(){var _this9=this;this.items.load().then(function(value){_this9.items.cart=value;_this9.core.emit('shop.update.quantity',_this9.items.quantity);});} /**
   * Update cart
   * @return {HenriPotier}
   */},{key:"updateCart",value:function updateCart(){var _this10=this;var items=this.items.toJSON();order(items).then(function(total){_this10.cart.update({'total':total});});return this;} /**
   * Change item quantity
   * @param  {[type]} isbn     [description]
   * @param  {[type]} quantity [description]
   * @return {[type]}          [description]
   */},{key:"change",value:function change(isbn,quantity){this.items.update(isbn,quantity);this.core.emit('shop.update.quantity',this.items.quantity);this.updateCart();return this;}}]);return HenriPotier;}(EventEmitter);},{"./cart":2,"./core":3,"./items":5,"./shop":6,"ak-eventemitter":7,"henri-potier-store":16}],5:[function(require,module,exports){ /*eslint-disable space-unary-ops */'use strict';var localforage=require('localforage');module.exports=function(){ /**
   * Constructor
   *
   * Getter/Setter to cart Items
   */function Items(){_classCallCheck2(this,Items);this._books=new Map();this._cart=new Map();} /**
   * Get total of cart items
   *
   * @return {Integer}
   */_createClass(Items,[{key:"book", /**
   * Get the book for given isbn
   *
   * @param  {String} isbn
   * @return {Object}
   */value:function book(isbn){return this._books.get(isbn)||{};} //for not yet added books in cart, we get it
//from list of books
//or add +1 as quantity
/**
   * Add a book to cart
   *
   * @param {String} isbn
   * @return {Items}
   */},{key:"add",value:function add(isbn){var book=this._cart.get(isbn)||this.book(isbn);book.quantity++;this.save(isbn,book);return this;} /**
   * Update a book to cart
   *
   * @param {String} isbn
   * @param {Integer} quantity
   * @return {Items}
   */},{key:"update",value:function update(isbn){var quantity=arguments.length<=1||arguments[1]===undefined?1:arguments[1];var book=this._cart.get(isbn)||this.book(isbn);book.quantity=quantity;this.save(isbn,book);return this;} /**
   * Load cart from localforage
   *
   * @return {Promise}
   */},{key:"load",value:function load(){return localforage.getItem('henri-potier');} /**
   * Save the book according isbn
   *
   * @param {String} isbn
   * @param {Object} book
   * @return {Items}
   */},{key:"save",value:function save(isbn,book){this._cart.set(isbn,book);localforage.setItem('henri-potier',this._cart);return this;} /**
   * Get JSON
   * @return {Array}
   */},{key:"toJSON",value:function toJSON(){var json=[];this._cart.forEach(function(current){if(current.quantity>0){json.push(current);}});return json;}},{key:"quantity",get:function get(){var total=0;this._cart.forEach(function(item){total+=~ ~item.quantity;});return total;} /**
   * Set list of books shop
   *
   * @param  {Array} value
   * @return {Items}
   */},{key:"books",set:function set(value){var _this11=this;this._books=new Map();value.forEach(function(current){current.quantity=0;_this11._books.set(current.isbn,current);});return this;}},{key:"cart",set:function set(value){this._cart=value||new Map();return this;}}]);return Items;}();},{"localforage":22}],6:[function(require,module,exports){'use strict';var Delegate=require('dom-delegate');var EventEmitter=require('ak-eventemitter');var path=require('path');var template=require('ak-template');module.exports=function(_EventEmitter4){_inherits(Shop,_EventEmitter4);function Shop(){_classCallCheck2(this,Shop);var _this12=_possibleConstructorReturn(this,Object.getPrototypeOf(Shop).call(this));_this12.element=null;_this12.delegate=new Delegate(document.body);_this12.template=template("<div class=\"product-listing-layout-3\">\n  <ul class=\"product-grid product-listing\">\n    <% var books = locals.books || []; %>\n\n    <% for (var index=0, length=books.length; index < length; index++) { %>\n      <% var book = books[index]; %>\n      <li class=\"grid-item col-lg-3 col-md-3 col-sm-6 col-xs-12\">\n\n        <div class=\"item-wrap\">\n\n          <div class=\"clear\"></div>\n\n          <a href=\"javascript:void(0);\" class=\"item-thumb\" data-hp-isbn=\"<%- book.isbn %>\">\n            <img width=\"340\" height=\"500\" src=\"<%- book.cover %>\" class=\"attachment-shop_catalog wp-post-image\" alt=\"<%- book.title %>\" />\n          </a>\n\n          <div class=\"item-info\">\n            <button class=\"hp-add-cart single_add_to_cart_button button alt\" data-hp-isbn=\"<%- book.isbn %>\" type=\"submit\" style=\"display: inline!important;\"><%- book.price %> &euro; | Add to cart</button>\n            <h2 style=\"margin-top: 5px; font-size: 1em\"><%- book.title %></h2>\n          </div>\n      </li>\n    <% } %>\n  </ul>\n</div>\n");_this12.listen();return _this12;} /**
   * Listen events
   *
   * @return {Shop}
   */_createClass(Shop,[{key:"listen",value:function listen(){var _this13=this;this.delegate.on('click','.hp-add-cart',function(event){_this13.add(event);});this.delegate.on('click','.hp-open-cart',function(){_this13.emit('shop.cart.open');});return this;} /**
   * Render the books shop
   *
   * @param {Object} data
   * @return {Shop}
   */},{key:"render",value:function render(){var data=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];this.emit('rendering');if(!this.element){this.element=this.template(data);} //set element to zone books
document.querySelector('[hp-zone-content]').innerHTML=this.element;this.emit('render');return this;} /**
   * Add item to cart
   *
   * @param {Event} event
   * @return {Shop}
   */},{key:"add",value:function add(event){var isbn=event.target.getAttribute('data-hp-isbn');this.emit('shop.add',isbn);return this;}}]);return Shop;}(EventEmitter);},{"ak-eventemitter":7,"ak-template":9,"dom-delegate":15,"path":12}],7:[function(require,module,exports){module.exports=require('./lib/eventemitter');},{"./lib/eventemitter":8}],8:[function(require,module,exports){'use strict'; /**
 * Export `EventEmitter`
 *
 * @param {Object} options (optional)
 * @return {EventEmitter}
 */var EventEmitter=module.exports=function(options){options=options||{};this._eventEmitter={};this._eventEmitter.tree={'children':{}};this._eventEmitter.delimiter=options.delimiter||'.';}; /**
 * Call all callbacks for given tree
 *
 * @see #_searchTree();
 *
 * @param {Object} tree
 * @param {arguments} args
 */EventEmitter.prototype._emit=function(tree,args){var callbacks=tree.callbacks;if(!callbacks){return this;}var argc=args.length;for(var i=0,len=callbacks.length,callback;i<len;i+=1){callback=callbacks[i];if(argc===1){callback.fn.call(callback.context,args[0]);}else if(argc===2){callback.fn.call(callback.context,args[0],args[1]);}else {callback.fn.apply(callback.context,args);}if(callback.once){callbacks.splice(i,1);i-=1;len-=1;if(callbacks.length===0){tree.callbacks=undefined;}}}}; /**
 * Parse given tree for given ns
 *
 * @see #emit();
 *
 * @param {Object} tree
 * @param {Array} ns
 * @param {Integer} start
 * @param {arguments} args
 */EventEmitter.prototype._searchTree=function(tree,ns,start,args){for(var i=start,len=ns.length,currentNs,currentTree,wildTree;i<len;i+=1){wildTree=tree.children['*'];if(wildTree){if(wildTree.callbacks){this._emit(wildTree,args);}this._searchTree(wildTree,ns,i+1,args);}currentNs=ns[i];currentTree=tree.children[currentNs];if(!currentTree){return this;}tree=currentTree;}if(currentTree){this._emit(currentTree,args);}}; /**
 * Add event listener
 *
 * @param {String} ns
 * @param {Function} callback
 * @param {Object} options (optional)
 * @return {EventEmitter}
 */EventEmitter.prototype.on=function(ns,callback,context,once){ns=ns.split(this._eventEmitter.delimiter);var tree=this._eventEmitter.tree;var currentNs;var currentTree;for(var i=0,len=ns.length;i<len;i+=1){currentNs=ns[i];currentTree=tree.children[currentNs];if(!currentTree){currentTree=tree.children[currentNs]={'children':{}};}tree=currentTree;}if(!tree.callbacks){tree.callbacks=[];}tree.callbacks.push({'fn':callback,'context':context?context:this,'once':!!once});return this;}; /**
 * Remove event listener
 *
 * @param {String} ns
 * @param {Function} callback
 * @param {Object} options (optional)
 * @return {EventEmitter}
 */EventEmitter.prototype.off=function(ns,callback,context){if(!ns){this._eventEmitter.tree={'children':{}};return this;}ns=ns.split(this._eventEmitter.delimiter);var tree=this._eventEmitter.tree;var currentTree;for(var i=0,len=ns.length;i<len;i+=1){currentTree=tree.children[ns[i]];if(!currentTree){return this;}tree=currentTree;}if(!callback){tree.callbacks=undefined;return this;}if(!tree.callbacks){return this;}for(var i2=0,callbacks=tree.callbacks,len2=callbacks.length,currentCallback;i2<len2;i2+=1){currentCallback=callbacks[i2];if(currentCallback.fn===callback){if(context&&context!==currentCallback.context){continue;}callbacks.splice(i2,1);break;}}if(!callbacks.length){tree.callbacks=undefined;}return this;}; /**
 * Emit event
 *
 * @param {String} ns
 * @param {*} ... (optional)
 * @return {EventEmitter}
 */EventEmitter.prototype.emit=function(ns){ns=ns.split(this._eventEmitter.delimiter);this._searchTree(this._eventEmitter.tree,ns,0,arguments);return this;}; /**
 * Add event listener for once
 *
 * @param {String} ns
 * @param {Function} callback
 * @param {Object} options (optional)
 * @return {EventEmitter}
 */EventEmitter.prototype.once=function(ns,callback,context){this.on(ns,callback,context,true);return this;};},{}],9:[function(require,module,exports){module.exports=require('./lib/template');},{"./lib/template":10}],10:[function(require,module,exports){'use strict'; /**
 * Dependencies
 */var defaults=require('stluafed'); /**
 * Export `template`
 *
 * @param {String} str
 * @return {Function}
 */var template=module.exports=function(str){var tpl=template.cache[str];if(tpl){return tpl;} /*jshint evil: true*/tpl=new Function('locals','locals = this.defaults(locals || {}, this.globals);'+'var __p = [];'+'__p.push(\''+str.replace(/[\r\t\n]/g,' ').replace(/'(?=[^%]*%>)/g,'\t').split('\'').join('\\\'').split('\t').join('\'').replace(/<%=(.+?)%>/g,'\',$1,\'').replace(/<%-(.+?)%>/g,'\',this.escape($1),\'').split('<%').join('\');').split('%>').join('__p.push(\'')+'\');return __p.join(\'\');').bind({'defaults':defaults,'globals':template.globals,'escape':template.escape}); /*jshint evil: false*/template.cache[str]=tpl;return tpl;}; /**
 * Globals are merged into `locals`
 */template.globals={}; /**
 * Cache
 */template.cache={}; /**
 * Escape function for <%- variable %>, can be overridden (default escape HTML)
 *
 * @param {String} str
 * @return {Function}
 */template.escape=function(str){return (str+'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt').replace(/"/g,'&quot;').replace(/'/g,'&#39');};},{"stluafed":11}],11:[function(require,module,exports){'use strict'; /**
 * Merge default values.
 *
 * @param {Object} dest
 * @param {Object} defaults
 * @return {Object}
 * @api public
 */var defaults=function defaults(dest,src,recursive){for(var prop in src){if(recursive&&dest[prop] instanceof Object&&src[prop] instanceof Object){dest[prop]=defaults(dest[prop],src[prop],true);}else if(!(prop in dest)){dest[prop]=src[prop];}}return dest;}; /**
 * Expose `defaults`.
 */module.exports=defaults;},{}],12:[function(require,module,exports){(function(process){ // Copyright Joyent, Inc. and other Node contributors.
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
function normalizeArray(parts,allowAboveRoot){ // if the path tries to go above the root, `up` ends up > 0
var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==='.'){parts.splice(i,1);}else if(last==='..'){parts.splice(i,1);up++;}else if(up){parts.splice(i,1);up--;}} // if the path is allowed to go above the root, restore leading ..s
if(allowAboveRoot){for(;up--;up){parts.unshift('..');}}return parts;} // Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;var splitPath=function splitPath(filename){return splitPathRe.exec(filename).slice(1);}; // path.resolve([from ...], to)
// posix version
exports.resolve=function(){var resolvedPath='',resolvedAbsolute=false;for(var i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){var path=i>=0?arguments[i]:process.cwd(); // Skip empty and invalid entries
if(typeof path!=='string'){throw new TypeError('Arguments to path.resolve must be strings');}else if(!path){continue;}resolvedPath=path+'/'+resolvedPath;resolvedAbsolute=path.charAt(0)==='/';} // At this point the path should be resolved to a full absolute path, but
// handle relative paths to be safe (might happen when process.cwd() fails)
// Normalize the path
resolvedPath=normalizeArray(filter(resolvedPath.split('/'),function(p){return !!p;}),!resolvedAbsolute).join('/');return (resolvedAbsolute?'/':'')+resolvedPath||'.';}; // path.normalize(path)
// posix version
exports.normalize=function(path){var isAbsolute=exports.isAbsolute(path),trailingSlash=substr(path,-1)==='/'; // Normalize the path
path=normalizeArray(filter(path.split('/'),function(p){return !!p;}),!isAbsolute).join('/');if(!path&&!isAbsolute){path='.';}if(path&&trailingSlash){path+='/';}return (isAbsolute?'/':'')+path;}; // posix version
exports.isAbsolute=function(path){return path.charAt(0)==='/';}; // posix version
exports.join=function(){var paths=Array.prototype.slice.call(arguments,0);return exports.normalize(filter(paths,function(p,index){if(typeof p!=='string'){throw new TypeError('Arguments to path.join must be strings');}return p;}).join('/'));}; // path.relative(from, to)
// posix version
exports.relative=function(from,to){from=exports.resolve(from).substr(1);to=exports.resolve(to).substr(1);function trim(arr){var start=0;for(;start<arr.length;start++){if(arr[start]!=='')break;}var end=arr.length-1;for(;end>=0;end--){if(arr[end]!=='')break;}if(start>end)return [];return arr.slice(start,end-start+1);}var fromParts=trim(from.split('/'));var toParts=trim(to.split('/'));var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length;for(var i=0;i<length;i++){if(fromParts[i]!==toParts[i]){samePartsLength=i;break;}}var outputParts=[];for(var i=samePartsLength;i<fromParts.length;i++){outputParts.push('..');}outputParts=outputParts.concat(toParts.slice(samePartsLength));return outputParts.join('/');};exports.sep='/';exports.delimiter=':';exports.dirname=function(path){var result=splitPath(path),root=result[0],dir=result[1];if(!root&&!dir){ // No dirname whatsoever
return '.';}if(dir){ // It has a dirname, strip trailing slash
dir=dir.substr(0,dir.length-1);}return root+dir;};exports.basename=function(path,ext){var f=splitPath(path)[2]; // TODO: make this comparison case-insensitive on windows?
if(ext&&f.substr(-1*ext.length)===ext){f=f.substr(0,f.length-ext.length);}return f;};exports.extname=function(path){return splitPath(path)[3];};function filter(xs,f){if(xs.filter)return xs.filter(f);var res=[];for(var i=0;i<xs.length;i++){if(f(xs[i],i,xs))res.push(xs[i]);}return res;} // String.prototype.substr - negative index don't work in IE8
var substr='ab'.substr(-1)==='b'?function(str,start,len){return str.substr(start,len);}:function(str,start,len){if(start<0)start=str.length+start;return str.substr(start,len);};}).call(this,require('_process'));},{"_process":13}],13:[function(require,module,exports){ // shim for using process in browser
var process=module.exports={};var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else {queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=setTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;clearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){setTimeout(drainQueue,0);}}; // v8 likes predictible objects
function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version=''; // empty string to avoid regexp issues
process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return '/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};},{}],14:[function(require,module,exports){ /*jshint browser:true, node:true*/'use strict';module.exports=Delegate; /**
 * DOM event delegator
 *
 * The delegator will listen
 * for events that bubble up
 * to the root node.
 *
 * @constructor
 * @param {Node|string} [root] The root node or a selector string matching the root node
 */function Delegate(root){ /**
   * Maintain a map of listener
   * lists, keyed by event name.
   *
   * @type Object
   */this.listenerMap=[{},{}];if(root){this.root(root);} /** @type function() */this.handle=Delegate.prototype.handle.bind(this);} /**
 * Start listening for events
 * on the provided DOM element
 *
 * @param  {Node|string} [root] The root node or a selector string matching the root node
 * @returns {Delegate} This method is chainable
 */Delegate.prototype.root=function(root){var listenerMap=this.listenerMap;var eventType; // Remove master event listeners
if(this.rootElement){for(eventType in listenerMap[1]){if(listenerMap[1].hasOwnProperty(eventType)){this.rootElement.removeEventListener(eventType,this.handle,true);}}for(eventType in listenerMap[0]){if(listenerMap[0].hasOwnProperty(eventType)){this.rootElement.removeEventListener(eventType,this.handle,false);}}} // If no root or root is not
// a dom node, then remove internal
// root reference and exit here
if(!root||!root.addEventListener){if(this.rootElement){delete this.rootElement;}return this;} /**
   * The root node at which
   * listeners are attached.
   *
   * @type Node
   */this.rootElement=root; // Set up master event listeners
for(eventType in listenerMap[1]){if(listenerMap[1].hasOwnProperty(eventType)){this.rootElement.addEventListener(eventType,this.handle,true);}}for(eventType in listenerMap[0]){if(listenerMap[0].hasOwnProperty(eventType)){this.rootElement.addEventListener(eventType,this.handle,false);}}return this;}; /**
 * @param {string} eventType
 * @returns boolean
 */Delegate.prototype.captureForType=function(eventType){return ['blur','error','focus','load','resize','scroll'].indexOf(eventType)!==-1;}; /**
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
 */Delegate.prototype.on=function(eventType,selector,handler,useCapture){var root,listenerMap,matcher,matcherParam;if(!eventType){throw new TypeError('Invalid event type: '+eventType);} // handler can be passed as
// the second or third argument
if(typeof selector==='function'){useCapture=handler;handler=selector;selector=null;} // Fallback to sensible defaults
// if useCapture not set
if(useCapture===undefined){useCapture=this.captureForType(eventType);}if(typeof handler!=='function'){throw new TypeError('Handler must be a type of Function');}root=this.rootElement;listenerMap=this.listenerMap[useCapture?1:0]; // Add master handler for type if not created yet
if(!listenerMap[eventType]){if(root){root.addEventListener(eventType,this.handle,useCapture);}listenerMap[eventType]=[];}if(!selector){matcherParam=null; // COMPLEX - matchesRoot needs to have access to
// this.rootElement, so bind the function to this.
matcher=matchesRoot.bind(this); // Compile a matcher for the given selector
}else if(/^[a-z]+$/i.test(selector)){matcherParam=selector;matcher=matchesTag;}else if(/^#[a-z0-9\-_]+$/i.test(selector)){matcherParam=selector.slice(1);matcher=matchesId;}else {matcherParam=selector;matcher=matches;} // Add to the list of listeners
listenerMap[eventType].push({selector:selector,handler:handler,matcher:matcher,matcherParam:matcherParam});return this;}; /**
 * Remove an event handler
 * for elements that match
 * the selector, forever
 *
 * @param {string} [eventType] Remove handlers for events matching this type, considering the other parameters
 * @param {string} [selector] If this parameter is omitted, only handlers which match the other two will be removed
 * @param {function()} [handler] If this parameter is omitted, only handlers which match the previous two will be removed
 * @returns {Delegate} This method is chainable
 */Delegate.prototype.off=function(eventType,selector,handler,useCapture){var i,listener,listenerMap,listenerList,singleEventType; // Handler can be passed as
// the second or third argument
if(typeof selector==='function'){useCapture=handler;handler=selector;selector=null;} // If useCapture not set, remove
// all event listeners
if(useCapture===undefined){this.off(eventType,selector,handler,true);this.off(eventType,selector,handler,false);return this;}listenerMap=this.listenerMap[useCapture?1:0];if(!eventType){for(singleEventType in listenerMap){if(listenerMap.hasOwnProperty(singleEventType)){this.off(singleEventType,selector,handler);}}return this;}listenerList=listenerMap[eventType];if(!listenerList||!listenerList.length){return this;} // Remove only parameter matches
// if specified
for(i=listenerList.length-1;i>=0;i--){listener=listenerList[i];if((!selector||selector===listener.selector)&&(!handler||handler===listener.handler)){listenerList.splice(i,1);}} // All listeners removed
if(!listenerList.length){delete listenerMap[eventType]; // Remove the main handler
if(this.rootElement){this.rootElement.removeEventListener(eventType,this.handle,useCapture);}}return this;}; /**
 * Handle an arbitrary event.
 *
 * @param {Event} event
 */Delegate.prototype.handle=function(event){var i,l,type=event.type,root,phase,listener,returned,listenerList=[],target, /** @const */EVENTIGNORE='ftLabsDelegateIgnore';if(event[EVENTIGNORE]===true){return;}target=event.target; // Hardcode value of Node.TEXT_NODE
// as not defined in IE8
if(target.nodeType===3){target=target.parentNode;}root=this.rootElement;phase=event.eventPhase||(event.target!==event.currentTarget?3:2);switch(phase){case 1: //Event.CAPTURING_PHASE:
listenerList=this.listenerMap[1][type];break;case 2: //Event.AT_TARGET:
if(this.listenerMap[0]&&this.listenerMap[0][type])listenerList=listenerList.concat(this.listenerMap[0][type]);if(this.listenerMap[1]&&this.listenerMap[1][type])listenerList=listenerList.concat(this.listenerMap[1][type]);break;case 3: //Event.BUBBLING_PHASE:
listenerList=this.listenerMap[0][type];break;} // Need to continuously check
// that the specific list is
// still populated in case one
// of the callbacks actually
// causes the list to be destroyed.
l=listenerList.length;while(target&&l){for(i=0;i<l;i++){listener=listenerList[i]; // Bail from this loop if
// the length changed and
// no more listeners are
// defined between i and l.
if(!listener){break;} // Check for match and fire
// the event if there's one
//
// TODO:MCG:20120117: Need a way
// to check if event#stopImmediatePropagation
// was called. If so, break both loops.
if(listener.matcher.call(target,listener.matcherParam,target)){returned=this.fire(event,target,listener);} // Stop propagation to subsequent
// callbacks if the callback returned
// false
if(returned===false){event[EVENTIGNORE]=true;event.preventDefault();return;}} // TODO:MCG:20120117: Need a way to
// check if event#stopPropagation
// was called. If so, break looping
// through the DOM. Stop if the
// delegation root has been reached
if(target===root){break;}l=listenerList.length;target=target.parentElement;}}; /**
 * Fire a listener on a target.
 *
 * @param {Event} event
 * @param {Node} target
 * @param {Object} listener
 * @returns {boolean}
 */Delegate.prototype.fire=function(event,target,listener){return listener.handler.call(target,event,target);}; /**
 * Check whether an element
 * matches a generic selector.
 *
 * @type function()
 * @param {string} selector A CSS selector
 */var matches=function(el){if(!el)return;var p=el.prototype;return p.matches||p.matchesSelector||p.webkitMatchesSelector||p.mozMatchesSelector||p.msMatchesSelector||p.oMatchesSelector;}(Element); /**
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
 */function matchesTag(tagName,element){return tagName.toLowerCase()===element.tagName.toLowerCase();} /**
 * Check whether an element
 * matches the root.
 *
 * @param {?String} selector In this case this is always passed through as null and not used
 * @param {Element} element The element to test with
 * @returns boolean
 */function matchesRoot(selector,element){ /*jshint validthis:true*/if(this.rootElement===window)return element===document;return this.rootElement===element;} /**
 * Check whether the ID of
 * the element in 'this'
 * matches the given ID.
 *
 * IDs are case-sensitive.
 *
 * @param {string} id The ID to test against
 * @param {Element} element The element to test with
 * @returns boolean
 */function matchesId(id,element){return id===element.id;} /**
 * Short hand for off()
 * and root(), ie both
 * with no parameters
 *
 * @return void
 */Delegate.prototype.destroy=function(){this.off();this.root();};},{}],15:[function(require,module,exports){ /*jshint browser:true, node:true*/'use strict'; /**
 * @preserve Create and manage a DOM event delegator.
 *
 * @version 0.3.0
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */var Delegate=require('./delegate');module.exports=function(root){return new Delegate(root);};module.exports.Delegate=Delegate;},{"./delegate":14}],16:[function(require,module,exports){'use strict';module.exports.books=require('./lib/books');module.exports.order=require('./lib/order');},{"./lib/books":17,"./lib/order":21}],17:[function(require,module,exports){'use strict';var request=require('superagent');var BOOKS_STORE_URL='http://henri-potier.xebia.fr/books'; /**
 * Get the list of available books
 * @return {Promise}
 */module.exports=function books(){return new Promise(function(resolve,reject){request.get(BOOKS_STORE_URL).end(function(err,res){if(err){return reject(err);}resolve(res.body);});});};},{"superagent":23}],18:[function(require,module,exports){'use strict'; /**
 * Repeat string
 *
 * @param  {String} string - to repeat
 * @param  {Integer} count
 * @return {String}
 */var repeat=function repeat(string,count){count=count||1;return Array(count).fill(string).join(',');}; /**
 * Reduce the isbn list according quantity
 *
 * @param  {Array} cart
 * @return {String}
 */module.exports=function isbn(cart){return cart.reduce(function(prev,curr){return {'isbn':repeat(prev.isbn,prev.quantity)+","+repeat(curr.isbn,curr.quantity),'quantity':1};}).isbn;};},{}],19:[function(require,module,exports){'use strict';module.exports={ /**
   * Compute percentage price
   *
   * @param  {Integer} total
   * @param  {Object} value
   * @return {Number}
   */'percentage':function percentage(total,offer){var value=offer&&offer.value||0;return total-total*value/100;}, /**
   * Compute minus price
   *
   * @param  {Integer} total
   * @param  {Object} value
   * @return {Number}
   */'minus':function minus(total,offer){var value=offer&&offer.value||0;return total-value;}, /**
   * Compute slice price
   *
   * @param  {Integer} total
   * @param  {Object} value
   * @return {Number}
   */'slice':function slice(total,offer){var value=offer&&offer.value||0;var slice=offer&&offer.sliceValue||1;return total-parseInt(total/slice,10)*value;}};},{}],20:[function(require,module,exports){'use strict';var special=require('./special-offers'); /**
 * Original total order
 *
 * @param  {Array} cart
 * @return {Integer}
 */var was=function was(cart){return cart.reduce(function(price,item){return price+item.price*(item.quantity||1);},0);}; /**
 * Get the best special offer for total order
 *
 * @param  {Integer} total - from  original order
 * @param  {Array} offers
 * @return {Number}
 */var now=function now(total,offers){var totals=offers.map(function(offer){var compute=special[offer.type]; //compute only if the special price is defined
//else return the origina total itself
return compute&&compute(total,offer)||total;});return Math.min.apply(Math,totals);}; /**
 * Get the total order with the best special offer
 *
 * @param  {Array} cart
 * @param  {Array} offers - list of special offers
 * @return {Object}
 */module.exports=function total(cart,offers){ //From cart and special offers
//compute the total order where
//* was, is the original total order
//* now, the total order with the best offers
//* offer, the applied special offer
var original=was(cart);var best=now(original,offers);return {'was':original,'now':best};};},{"./special-offers":19}],21:[function(require,module,exports){'use strict';var isbn=require('./helpers/isbn');var request=require('superagent');var total=require('./helpers/total'); /**
 * Get the order total cart
 *
 * @param {Array} cart
 * @return {Promise}
 */module.exports=function order(cart){return new Promise(function(resolve,reject){ //break for empty cart
if(!cart||!cart.length){return resolve([]);}var url="http://henri-potier.xebia.fr/books/"+isbn(cart)+"/commercialOffers";request.get(url).end(function(err,res){if(err){return reject(err);}resolve(total(cart,res.body.offers));});});};},{"./helpers/isbn":18,"./helpers/total":20,"superagent":23}],22:[function(require,module,exports){(function(process,global){ /*!
    localForage -- Offline Storage, Improved
    Version 1.4.0
    https://mozilla.github.io/localForage
    (c) 2013-2015 Mozilla, Apache License 2.0
*/(function(){var define,_requireModule,require,requirejs;(function(){var registry={},seen={};define=function define(name,deps,callback){registry[name]={deps:deps,callback:callback};};requirejs=require=_requireModule=function requireModule(name){requirejs._eak_seen=registry;if(seen[name]){return seen[name];}seen[name]={};if(!registry[name]){throw new Error("Could not find module "+name);}var mod=registry[name],deps=mod.deps,callback=mod.callback,reified=[],exports;for(var i=0,l=deps.length;i<l;i++){if(deps[i]==='exports'){reified.push(exports={});}else {reified.push(_requireModule(resolve(deps[i])));}}var value=callback.apply(this,reified);return seen[name]=exports||value;function resolve(child){if(child.charAt(0)!=='.'){return child;}var parts=child.split("/");var parentBase=name.split("/").slice(0,-1);for(var i=0,l=parts.length;i<l;i++){var part=parts[i];if(part==='..'){parentBase.pop();}else if(part==='.'){continue;}else {parentBase.push(part);}}return parentBase.join("/");}};})();define("promise/all",["./utils","exports"],function(__dependency1__,__exports__){"use strict"; /* global toString */var isArray=__dependency1__.isArray;var isFunction=__dependency1__.isFunction; /**
      Returns a promise that is fulfilled when all the given promises have been
      fulfilled, or rejected if any of them become rejected. The return promise
      is fulfilled with an array that gives all the values in the order they were
      passed in the `promises` array argument.

      Example:

      ```javascript
      var promise1 = RSVP.resolve(1);
      var promise2 = RSVP.resolve(2);
      var promise3 = RSVP.resolve(3);
      var promises = [ promise1, promise2, promise3 ];

      RSVP.all(promises).then(function(array){
        // The array here would be [ 1, 2, 3 ];
      });
      ```

      If any of the `promises` given to `RSVP.all` are rejected, the first promise
      that is rejected will be given as an argument to the returned promises's
      rejection handler. For example:

      Example:

      ```javascript
      var promise1 = RSVP.resolve(1);
      var promise2 = RSVP.reject(new Error("2"));
      var promise3 = RSVP.reject(new Error("3"));
      var promises = [ promise1, promise2, promise3 ];

      RSVP.all(promises).then(function(array){
        // Code here never runs because there are rejected promises!
      }, function(error) {
        // error.message === "2"
      });
      ```

      @method all
      @for RSVP
      @param {Array} promises
      @param {String} label
      @return {Promise} promise that is fulfilled when all `promises` have been
      fulfilled, or rejected if any of them become rejected.
    */function all(promises){ /*jshint validthis:true */var Promise=this;if(!isArray(promises)){throw new TypeError('You must pass an array to all.');}return new Promise(function(resolve,reject){var results=[],remaining=promises.length,promise;if(remaining===0){resolve([]);}function resolver(index){return function(value){resolveAll(index,value);};}function resolveAll(index,value){results[index]=value;if(--remaining===0){resolve(results);}}for(var i=0;i<promises.length;i++){promise=promises[i];if(promise&&isFunction(promise.then)){promise.then(resolver(i),reject);}else {resolveAll(i,promise);}}});}__exports__.all=all;});define("promise/asap",["exports"],function(__exports__){"use strict";var browserGlobal=typeof window!=='undefined'?window:{};var BrowserMutationObserver=browserGlobal.MutationObserver||browserGlobal.WebKitMutationObserver;var local=typeof global!=='undefined'?global:this===undefined?window:this; // node
function useNextTick(){return function(){process.nextTick(flush);};}function useMutationObserver(){var iterations=0;var observer=new BrowserMutationObserver(flush);var node=document.createTextNode('');observer.observe(node,{characterData:true});return function(){node.data=iterations=++iterations%2;};}function useSetTimeout(){return function(){local.setTimeout(flush,1);};}var queue=[];function flush(){for(var i=0;i<queue.length;i++){var tuple=queue[i];var callback=tuple[0],arg=tuple[1];callback(arg);}queue=[];}var scheduleFlush; // Decide what async method to use to triggering processing of queued callbacks:
if(typeof process!=='undefined'&&{}.toString.call(process)==='[object process]'){scheduleFlush=useNextTick();}else if(BrowserMutationObserver){scheduleFlush=useMutationObserver();}else {scheduleFlush=useSetTimeout();}function asap(callback,arg){var length=queue.push([callback,arg]);if(length===1){ // If length is 1, that means that we need to schedule an async flush.
// If additional callbacks are queued before the queue is flushed, they
// will be processed by this flush that we are scheduling.
scheduleFlush();}}__exports__.asap=asap;});define("promise/config",["exports"],function(__exports__){"use strict";var config={instrument:false};function configure(name,value){if(arguments.length===2){config[name]=value;}else {return config[name];}}__exports__.config=config;__exports__.configure=configure;});define("promise/polyfill",["./promise","./utils","exports"],function(__dependency1__,__dependency2__,__exports__){"use strict"; /*global self*/var RSVPPromise=__dependency1__.Promise;var isFunction=__dependency2__.isFunction;function polyfill(){var local;if(typeof global!=='undefined'){local=global;}else if(typeof window!=='undefined'&&window.document){local=window;}else {local=self;}var es6PromiseSupport="Promise" in local&& // Some of these methods are missing from
// Firefox/Chrome experimental implementations
"resolve" in local.Promise&&"reject" in local.Promise&&"all" in local.Promise&&"race" in local.Promise&& // Older version of the spec had a resolver object
// as the arg rather than a function
function(){var resolve;new local.Promise(function(r){resolve=r;});return isFunction(resolve);}();if(!es6PromiseSupport){local.Promise=RSVPPromise;}}__exports__.polyfill=polyfill;});define("promise/promise",["./config","./utils","./all","./race","./resolve","./reject","./asap","exports"],function(__dependency1__,__dependency2__,__dependency3__,__dependency4__,__dependency5__,__dependency6__,__dependency7__,__exports__){"use strict";var config=__dependency1__.config;var configure=__dependency1__.configure;var objectOrFunction=__dependency2__.objectOrFunction;var isFunction=__dependency2__.isFunction;var now=__dependency2__.now;var all=__dependency3__.all;var race=__dependency4__.race;var staticResolve=__dependency5__.resolve;var staticReject=__dependency6__.reject;var asap=__dependency7__.asap;var counter=0;config.async=asap; // default async is asap;
function Promise(resolver){if(!isFunction(resolver)){throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');}if(!(this instanceof Promise)){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");}this._subscribers=[];invokeResolver(resolver,this);}function invokeResolver(resolver,promise){function resolvePromise(value){resolve(promise,value);}function rejectPromise(reason){reject(promise,reason);}try{resolver(resolvePromise,rejectPromise);}catch(e){rejectPromise(e);}}function invokeCallback(settled,promise,callback,detail){var hasCallback=isFunction(callback),value,error,succeeded,failed;if(hasCallback){try{value=callback(detail);succeeded=true;}catch(e){failed=true;error=e;}}else {value=detail;succeeded=true;}if(handleThenable(promise,value)){return;}else if(hasCallback&&succeeded){resolve(promise,value);}else if(failed){reject(promise,error);}else if(settled===FULFILLED){resolve(promise,value);}else if(settled===REJECTED){reject(promise,value);}}var PENDING=void 0;var SEALED=0;var FULFILLED=1;var REJECTED=2;function subscribe(parent,child,onFulfillment,onRejection){var subscribers=parent._subscribers;var length=subscribers.length;subscribers[length]=child;subscribers[length+FULFILLED]=onFulfillment;subscribers[length+REJECTED]=onRejection;}function publish(promise,settled){var child,callback,subscribers=promise._subscribers,detail=promise._detail;for(var i=0;i<subscribers.length;i+=3){child=subscribers[i];callback=subscribers[i+settled];invokeCallback(settled,child,callback,detail);}promise._subscribers=null;}Promise.prototype={constructor:Promise,_state:undefined,_detail:undefined,_subscribers:undefined,then:function then(onFulfillment,onRejection){var promise=this;var thenPromise=new this.constructor(function(){});if(this._state){var callbacks=arguments;config.async(function invokePromiseCallback(){invokeCallback(promise._state,thenPromise,callbacks[promise._state-1],promise._detail);});}else {subscribe(this,thenPromise,onFulfillment,onRejection);}return thenPromise;},'catch':function _catch(onRejection){return this.then(null,onRejection);}};Promise.all=all;Promise.race=race;Promise.resolve=staticResolve;Promise.reject=staticReject;function handleThenable(promise,value){var then=null,resolved;try{if(promise===value){throw new TypeError("A promises callback cannot return that same promise.");}if(objectOrFunction(value)){then=value.then;if(isFunction(then)){then.call(value,function(val){if(resolved){return true;}resolved=true;if(value!==val){resolve(promise,val);}else {fulfill(promise,val);}},function(val){if(resolved){return true;}resolved=true;reject(promise,val);});return true;}}}catch(error){if(resolved){return true;}reject(promise,error);return true;}return false;}function resolve(promise,value){if(promise===value){fulfill(promise,value);}else if(!handleThenable(promise,value)){fulfill(promise,value);}}function fulfill(promise,value){if(promise._state!==PENDING){return;}promise._state=SEALED;promise._detail=value;config.async(publishFulfillment,promise);}function reject(promise,reason){if(promise._state!==PENDING){return;}promise._state=SEALED;promise._detail=reason;config.async(publishRejection,promise);}function publishFulfillment(promise){publish(promise,promise._state=FULFILLED);}function publishRejection(promise){publish(promise,promise._state=REJECTED);}__exports__.Promise=Promise;});define("promise/race",["./utils","exports"],function(__dependency1__,__exports__){"use strict"; /* global toString */var isArray=__dependency1__.isArray; /**
      `RSVP.race` allows you to watch a series of promises and act as soon as the
      first promise given to the `promises` argument fulfills or rejects.

      Example:

      ```javascript
      var promise1 = new RSVP.Promise(function(resolve, reject){
        setTimeout(function(){
          resolve("promise 1");
        }, 200);
      });

      var promise2 = new RSVP.Promise(function(resolve, reject){
        setTimeout(function(){
          resolve("promise 2");
        }, 100);
      });

      RSVP.race([promise1, promise2]).then(function(result){
        // result === "promise 2" because it was resolved before promise1
        // was resolved.
      });
      ```

      `RSVP.race` is deterministic in that only the state of the first completed
      promise matters. For example, even if other promises given to the `promises`
      array argument are resolved, but the first completed promise has become
      rejected before the other promises became fulfilled, the returned promise
      will become rejected:

      ```javascript
      var promise1 = new RSVP.Promise(function(resolve, reject){
        setTimeout(function(){
          resolve("promise 1");
        }, 200);
      });

      var promise2 = new RSVP.Promise(function(resolve, reject){
        setTimeout(function(){
          reject(new Error("promise 2"));
        }, 100);
      });

      RSVP.race([promise1, promise2]).then(function(result){
        // Code here never runs because there are rejected promises!
      }, function(reason){
        // reason.message === "promise2" because promise 2 became rejected before
        // promise 1 became fulfilled
      });
      ```

      @method race
      @for RSVP
      @param {Array} promises array of promises to observe
      @param {String} label optional string for describing the promise returned.
      Useful for tooling.
      @return {Promise} a promise that becomes fulfilled with the value the first
      completed promises is resolved with if the first completed promise was
      fulfilled, or rejected with the reason that the first completed promise
      was rejected with.
    */function race(promises){ /*jshint validthis:true */var Promise=this;if(!isArray(promises)){throw new TypeError('You must pass an array to race.');}return new Promise(function(resolve,reject){var results=[],promise;for(var i=0;i<promises.length;i++){promise=promises[i];if(promise&&typeof promise.then==='function'){promise.then(resolve,reject);}else {resolve(promise);}}});}__exports__.race=race;});define("promise/reject",["exports"],function(__exports__){"use strict"; /**
      `RSVP.reject` returns a promise that will become rejected with the passed
      `reason`. `RSVP.reject` is essentially shorthand for the following:

      ```javascript
      var promise = new RSVP.Promise(function(resolve, reject){
        reject(new Error('WHOOPS'));
      });

      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```

      Instead of writing the above, your code now simply becomes the following:

      ```javascript
      var promise = RSVP.reject(new Error('WHOOPS'));

      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```

      @method reject
      @for RSVP
      @param {Any} reason value that the returned promise will be rejected with.
      @param {String} label optional string for identifying the returned promise.
      Useful for tooling.
      @return {Promise} a promise that will become rejected with the given
      `reason`.
    */function reject(reason){ /*jshint validthis:true */var Promise=this;return new Promise(function(resolve,reject){reject(reason);});}__exports__.reject=reject;});define("promise/resolve",["exports"],function(__exports__){"use strict";function resolve(value){ /*jshint validthis:true */if(value&&(typeof value==="undefined"?"undefined":_typeof(value))==='object'&&value.constructor===this){return value;}var Promise=this;return new Promise(function(resolve){resolve(value);});}__exports__.resolve=resolve;});define("promise/utils",["exports"],function(__exports__){"use strict";function objectOrFunction(x){return isFunction(x)||(typeof x==="undefined"?"undefined":_typeof(x))==="object"&&x!==null;}function isFunction(x){return typeof x==="function";}function isArray(x){return Object.prototype.toString.call(x)==="[object Array]";} // Date.now is not available in browsers < IE9
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now#Compatibility
var now=Date.now||function(){return new Date().getTime();};__exports__.objectOrFunction=objectOrFunction;__exports__.isFunction=isFunction;__exports__.isArray=isArray;__exports__.now=now;});_requireModule('promise/polyfill').polyfill();})();(function webpackUniversalModuleDefinition(root,factory){if((typeof exports==="undefined"?"undefined":_typeof(exports))==='object'&&(typeof module==="undefined"?"undefined":_typeof(module))==='object')module.exports=factory();else if(typeof define==='function'&&define.amd)define([],factory);else if((typeof exports==="undefined"?"undefined":_typeof(exports))==='object')exports["localforage"]=factory();else root["localforage"]=factory();})(this,function(){return  (/******/function(modules){ // webpackBootstrap
/******/ // The module cache
/******/var installedModules={}; /******/ // The require function
/******/function __webpack_require__(moduleId){ /******/ // Check if module is in cache
/******/if(installedModules[moduleId]) /******/return installedModules[moduleId].exports; /******/ // Create a new module (and put it into the cache)
/******/var module=installedModules[moduleId]={ /******/exports:{}, /******/id:moduleId, /******/loaded:false /******/}; /******/ // Execute the module function
/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__); /******/ // Flag the module as loaded
/******/module.loaded=true; /******/ // Return the exports of the module
/******/return module.exports; /******/} /******/ // expose the modules object (__webpack_modules__)
/******/__webpack_require__.m=modules; /******/ // expose the module cache
/******/__webpack_require__.c=installedModules; /******/ // __webpack_public_path__
/******/__webpack_require__.p=""; /******/ // Load entry module and return exports
/******/return __webpack_require__(0); /******/}( /************************************************************************/ /******/[ /* 0 */ /***/function(module,exports,__webpack_require__){'use strict';exports.__esModule=true;function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var localForage=function(globalObject){'use strict'; // Custom drivers are stored here when `defineDriver()` is called.
// They are shared across all instances of localForage.
var CustomDrivers={};var DriverType={INDEXEDDB:'asyncStorage',LOCALSTORAGE:'localStorageWrapper',WEBSQL:'webSQLStorage'};var DefaultDriverOrder=[DriverType.INDEXEDDB,DriverType.WEBSQL,DriverType.LOCALSTORAGE];var LibraryMethods=['clear','getItem','iterate','key','keys','length','removeItem','setItem'];var DefaultConfig={description:'',driver:DefaultDriverOrder.slice(),name:'localforage', // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
// we can use without a prompt.
size:4980736,storeName:'keyvaluepairs',version:1.0};var driverSupport=function(self){var result={}; // Check to see if IndexedDB is available and if it is the latest
// implementation; it's our preferred backend library. We use "_spec_test"
// as the name of the database because it's not the one we'll operate on,
// but it's useful to make sure its using the right spec.
// See: https://github.com/mozilla/localForage/issues/128
result[DriverType.INDEXEDDB]=!!function(){try{ // Initialize IndexedDB; fall back to vendor-prefixed versions
// if needed.
var indexedDB=indexedDB||self.indexedDB||self.webkitIndexedDB||self.mozIndexedDB||self.OIndexedDB||self.msIndexedDB; // We mimic PouchDB here; just UA test for Safari (which, as of
// iOS 8/Yosemite, doesn't properly support IndexedDB).
// IndexedDB support is broken and different from Blink's.
// This is faster than the test case (and it's sync), so we just
// do this. *SIGH*
// http://bl.ocks.org/nolanlawson/raw/c83e9039edf2278047e9/
//
// We test for openDatabase because IE Mobile identifies itself
// as Safari. Oh the lulz...
if(typeof self.openDatabase!=='undefined'&&self.navigator&&self.navigator.userAgent&&/Safari/.test(self.navigator.userAgent)&&!/Chrome/.test(self.navigator.userAgent)){return false;}return indexedDB&&typeof indexedDB.open==='function'&& // Some Samsung/HTC Android 4.0-4.3 devices
// have older IndexedDB specs; if this isn't available
// their IndexedDB is too old for us to use.
// (Replaces the onupgradeneeded test.)
typeof self.IDBKeyRange!=='undefined';}catch(e){return false;}}();result[DriverType.WEBSQL]=!!function(){try{return self.openDatabase;}catch(e){return false;}}();result[DriverType.LOCALSTORAGE]=!!function(){try{return self.localStorage&&'setItem' in self.localStorage&&self.localStorage.setItem;}catch(e){return false;}}();return result;}(globalObject);var isArray=Array.isArray||function(arg){return Object.prototype.toString.call(arg)==='[object Array]';};function callWhenReady(localForageInstance,libraryMethod){localForageInstance[libraryMethod]=function(){var _args=arguments;return localForageInstance.ready().then(function(){return localForageInstance[libraryMethod].apply(localForageInstance,_args);});};}function extend(){for(var i=1;i<arguments.length;i++){var arg=arguments[i];if(arg){for(var key in arg){if(arg.hasOwnProperty(key)){if(isArray(arg[key])){arguments[0][key]=arg[key].slice();}else {arguments[0][key]=arg[key];}}}}}return arguments[0];}function isLibraryDriver(driverName){for(var driver in DriverType){if(DriverType.hasOwnProperty(driver)&&DriverType[driver]===driverName){return true;}}return false;}var LocalForage=function(){function LocalForage(options){_classCallCheck(this,LocalForage);this.INDEXEDDB=DriverType.INDEXEDDB;this.LOCALSTORAGE=DriverType.LOCALSTORAGE;this.WEBSQL=DriverType.WEBSQL;this._defaultConfig=extend({},DefaultConfig);this._config=extend({},this._defaultConfig,options);this._driverSet=null;this._initDriver=null;this._ready=false;this._dbInfo=null;this._wrapLibraryMethodsWithReady();this.setDriver(this._config.driver);} // The actual localForage object that we expose as a module or via a
// global. It's extended by pulling in one of our other libraries.
// Set any config values for localForage; can be called anytime before
// the first API call (e.g. `getItem`, `setItem`).
// We loop through options so we don't overwrite existing config
// values.
LocalForage.prototype.config=function config(options){ // If the options argument is an object, we use it to set values.
// Otherwise, we return either a specified config value or all
// config values.
if((typeof options==="undefined"?"undefined":_typeof(options))==='object'){ // If localforage is ready and fully initialized, we can't set
// any new configuration values. Instead, we return an error.
if(this._ready){return new Error("Can't call config() after localforage "+'has been used.');}for(var i in options){if(i==='storeName'){options[i]=options[i].replace(/\W/g,'_');}this._config[i]=options[i];} // after all config options are set and
// the driver option is used, try setting it
if('driver' in options&&options.driver){this.setDriver(this._config.driver);}return true;}else if(typeof options==='string'){return this._config[options];}else {return this._config;}}; // Used to define a custom driver, shared across all instances of
// localForage.
LocalForage.prototype.defineDriver=function defineDriver(driverObject,callback,errorCallback){var promise=new Promise(function(resolve,reject){try{var driverName=driverObject._driver;var complianceError=new Error('Custom driver not compliant; see '+'https://mozilla.github.io/localForage/#definedriver');var namingError=new Error('Custom driver name already in use: '+driverObject._driver); // A driver name should be defined and not overlap with the
// library-defined, default drivers.
if(!driverObject._driver){reject(complianceError);return;}if(isLibraryDriver(driverObject._driver)){reject(namingError);return;}var customDriverMethods=LibraryMethods.concat('_initStorage');for(var i=0;i<customDriverMethods.length;i++){var customDriverMethod=customDriverMethods[i];if(!customDriverMethod||!driverObject[customDriverMethod]||typeof driverObject[customDriverMethod]!=='function'){reject(complianceError);return;}}var supportPromise=Promise.resolve(true);if('_support' in driverObject){if(driverObject._support&&typeof driverObject._support==='function'){supportPromise=driverObject._support();}else {supportPromise=Promise.resolve(!!driverObject._support);}}supportPromise.then(function(supportResult){driverSupport[driverName]=supportResult;CustomDrivers[driverName]=driverObject;resolve();},reject);}catch(e){reject(e);}});promise.then(callback,errorCallback);return promise;};LocalForage.prototype.driver=function driver(){return this._driver||null;};LocalForage.prototype.getDriver=function getDriver(driverName,callback,errorCallback){var self=this;var getDriverPromise=function(){if(isLibraryDriver(driverName)){switch(driverName){case self.INDEXEDDB:return new Promise(function(resolve,reject){resolve(__webpack_require__(1));});case self.LOCALSTORAGE:return new Promise(function(resolve,reject){resolve(__webpack_require__(2));});case self.WEBSQL:return new Promise(function(resolve,reject){resolve(__webpack_require__(4));});}}else if(CustomDrivers[driverName]){return Promise.resolve(CustomDrivers[driverName]);}return Promise.reject(new Error('Driver not found.'));}();getDriverPromise.then(callback,errorCallback);return getDriverPromise;};LocalForage.prototype.getSerializer=function getSerializer(callback){var serializerPromise=new Promise(function(resolve,reject){resolve(__webpack_require__(3));});if(callback&&typeof callback==='function'){serializerPromise.then(function(result){callback(result);});}return serializerPromise;};LocalForage.prototype.ready=function ready(callback){var self=this;var promise=self._driverSet.then(function(){if(self._ready===null){self._ready=self._initDriver();}return self._ready;});promise.then(callback,callback);return promise;};LocalForage.prototype.setDriver=function setDriver(drivers,callback,errorCallback){var self=this;if(!isArray(drivers)){drivers=[drivers];}var supportedDrivers=this._getSupportedDrivers(drivers);function setDriverToConfig(){self._config.driver=self.driver();}function initDriver(supportedDrivers){return function(){var currentDriverIndex=0;function driverPromiseLoop(){while(currentDriverIndex<supportedDrivers.length){var driverName=supportedDrivers[currentDriverIndex];currentDriverIndex++;self._dbInfo=null;self._ready=null;return self.getDriver(driverName).then(function(driver){self._extend(driver);setDriverToConfig();self._ready=self._initStorage(self._config);return self._ready;})['catch'](driverPromiseLoop);}setDriverToConfig();var error=new Error('No available storage method found.');self._driverSet=Promise.reject(error);return self._driverSet;}return driverPromiseLoop();};} // There might be a driver initialization in progress
// so wait for it to finish in order to avoid a possible
// race condition to set _dbInfo
var oldDriverSetDone=this._driverSet!==null?this._driverSet['catch'](function(){return Promise.resolve();}):Promise.resolve();this._driverSet=oldDriverSetDone.then(function(){var driverName=supportedDrivers[0];self._dbInfo=null;self._ready=null;return self.getDriver(driverName).then(function(driver){self._driver=driver._driver;setDriverToConfig();self._wrapLibraryMethodsWithReady();self._initDriver=initDriver(supportedDrivers);});})['catch'](function(){setDriverToConfig();var error=new Error('No available storage method found.');self._driverSet=Promise.reject(error);return self._driverSet;});this._driverSet.then(callback,errorCallback);return this._driverSet;};LocalForage.prototype.supports=function supports(driverName){return !!driverSupport[driverName];};LocalForage.prototype._extend=function _extend(libraryMethodsAndProperties){extend(this,libraryMethodsAndProperties);};LocalForage.prototype._getSupportedDrivers=function _getSupportedDrivers(drivers){var supportedDrivers=[];for(var i=0,len=drivers.length;i<len;i++){var driverName=drivers[i];if(this.supports(driverName)){supportedDrivers.push(driverName);}}return supportedDrivers;};LocalForage.prototype._wrapLibraryMethodsWithReady=function _wrapLibraryMethodsWithReady(){ // Add a stub for each driver API method that delays the call to the
// corresponding driver method until localForage is ready. These stubs
// will be replaced by the driver methods as soon as the driver is
// loaded, so there is no performance impact.
for(var i=0;i<LibraryMethods.length;i++){callWhenReady(this,LibraryMethods[i]);}};LocalForage.prototype.createInstance=function createInstance(options){return new LocalForage(options);};return LocalForage;}();return new LocalForage();}(typeof window!=='undefined'?window:self);exports['default']=localForage;module.exports=exports['default']; /***/}, /* 1 */ /***/function(module,exports){ // Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).
'use strict';exports.__esModule=true;var asyncStorage=function(globalObject){'use strict'; // Initialize IndexedDB; fall back to vendor-prefixed versions if needed.
var indexedDB=indexedDB||globalObject.indexedDB||globalObject.webkitIndexedDB||globalObject.mozIndexedDB||globalObject.OIndexedDB||globalObject.msIndexedDB; // If IndexedDB isn't available, we get outta here!
if(!indexedDB){return;}var DETECT_BLOB_SUPPORT_STORE='local-forage-detect-blob-support';var supportsBlobs;var dbContexts; // Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
function _createBlob(parts,properties){parts=parts||[];properties=properties||{};try{return new Blob(parts,properties);}catch(e){if(e.name!=='TypeError'){throw e;}var BlobBuilder=globalObject.BlobBuilder||globalObject.MSBlobBuilder||globalObject.MozBlobBuilder||globalObject.WebKitBlobBuilder;var builder=new BlobBuilder();for(var i=0;i<parts.length;i+=1){builder.append(parts[i]);}return builder.getBlob(properties.type);}} // Transform a binary string to an array buffer, because otherwise
// weird stuff happens when you try to work with the binary string directly.
// It is known.
// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function _binStringToArrayBuffer(bin){var length=bin.length;var buf=new ArrayBuffer(length);var arr=new Uint8Array(buf);for(var i=0;i<length;i++){arr[i]=bin.charCodeAt(i);}return buf;} // Fetch a blob using ajax. This reveals bugs in Chrome < 43.
// For details on all this junk:
// https://github.com/nolanlawson/state-of-binary-data-in-the-browser#readme
function _blobAjax(url){return new Promise(function(resolve,reject){var xhr=new XMLHttpRequest();xhr.open('GET',url);xhr.withCredentials=true;xhr.responseType='arraybuffer';xhr.onreadystatechange=function(){if(xhr.readyState!==4){return;}if(xhr.status===200){return resolve({response:xhr.response,type:xhr.getResponseHeader('Content-Type')});}reject({status:xhr.status,response:xhr.response});};xhr.send();});} //
// Detect blob support. Chrome didn't support it until version 38.
// In version 37 they had a broken version where PNGs (and possibly
// other binary types) aren't stored correctly, because when you fetch
// them, the content type is always null.
//
// Furthermore, they have some outstanding bugs where blobs occasionally
// are read by FileReader as null, or by ajax as 404s.
//
// Sadly we use the 404 bug to detect the FileReader bug, so if they
// get fixed independently and released in different versions of Chrome,
// then the bug could come back. So it's worthwhile to watch these issues:
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
function _checkBlobSupportWithoutCaching(idb){return new Promise(function(resolve,reject){var blob=_createBlob([''],{type:'image/png'});var txn=idb.transaction([DETECT_BLOB_SUPPORT_STORE],'readwrite');txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob,'key');txn.oncomplete=function(){ // have to do it in a separate transaction, else the correct
// content type is always returned
var blobTxn=idb.transaction([DETECT_BLOB_SUPPORT_STORE],'readwrite');var getBlobReq=blobTxn.objectStore(DETECT_BLOB_SUPPORT_STORE).get('key');getBlobReq.onerror=reject;getBlobReq.onsuccess=function(e){var storedBlob=e.target.result;var url=URL.createObjectURL(storedBlob);_blobAjax(url).then(function(res){resolve(!!(res&&res.type==='image/png'));},function(){resolve(false);}).then(function(){URL.revokeObjectURL(url);});};};txn.onerror=txn.onabort=reject;})['catch'](function(){return false; // error, so assume unsupported
});}function _checkBlobSupport(idb){if(typeof supportsBlobs==='boolean'){return Promise.resolve(supportsBlobs);}return _checkBlobSupportWithoutCaching(idb).then(function(value){supportsBlobs=value;return supportsBlobs;});} // encode a blob for indexeddb engines that don't support blobs
function _encodeBlob(blob){return new Promise(function(resolve,reject){var reader=new FileReader();reader.onerror=reject;reader.onloadend=function(e){var base64=btoa(e.target.result||'');resolve({__local_forage_encoded_blob:true,data:base64,type:blob.type});};reader.readAsBinaryString(blob);});} // decode an encoded blob
function _decodeBlob(encodedBlob){var arrayBuff=_binStringToArrayBuffer(atob(encodedBlob.data));return _createBlob([arrayBuff],{type:encodedBlob.type});} // is this one of our fancy encoded blobs?
function _isEncodedBlob(value){return value&&value.__local_forage_encoded_blob;} // Specialize the default `ready()` function by making it dependent
// on the current database operations. Thus, the driver will be actually
// ready when it's been initialized (default) *and* there are no pending
// operations on the database (initiated by some other instances).
function _fullyReady(callback){var self=this;var promise=self._initReady().then(function(){var dbContext=dbContexts[self._dbInfo.name];if(dbContext&&dbContext.dbReady){return dbContext.dbReady;}});promise.then(callback,callback);return promise;}function _deferReadiness(dbInfo){var dbContext=dbContexts[dbInfo.name]; // Create a deferred object representing the current database operation.
var deferredOperation={};deferredOperation.promise=new Promise(function(resolve){deferredOperation.resolve=resolve;}); // Enqueue the deferred operation.
dbContext.deferredOperations.push(deferredOperation); // Chain its promise to the database readiness.
if(!dbContext.dbReady){dbContext.dbReady=deferredOperation.promise;}else {dbContext.dbReady=dbContext.dbReady.then(function(){return deferredOperation.promise;});}}function _advanceReadiness(dbInfo){var dbContext=dbContexts[dbInfo.name]; // Dequeue a deferred operation.
var deferredOperation=dbContext.deferredOperations.pop(); // Resolve its promise (which is part of the database readiness
// chain of promises).
if(deferredOperation){deferredOperation.resolve();}} // Open the IndexedDB database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage(options){var self=this;var dbInfo={db:null};if(options){for(var i in options){dbInfo[i]=options[i];}} // Initialize a singleton container for all running localForages.
if(!dbContexts){dbContexts={};} // Get the current context of the database;
var dbContext=dbContexts[dbInfo.name]; // ...or create a new context.
if(!dbContext){dbContext={ // Running localForages sharing a database.
forages:[], // Shared database.
db:null, // Database readiness (promise).
dbReady:null, // Deferred operations on the database.
deferredOperations:[]}; // Register the new context in the global container.
dbContexts[dbInfo.name]=dbContext;} // Register itself as a running localForage in the current context.
dbContext.forages.push(self); // Replace the default `ready()` function with the specialized one.
if(!self._initReady){self._initReady=self.ready;self.ready=_fullyReady;} // Create an array of initialization states of the related localForages.
var initPromises=[];function ignoreErrors(){ // Don't handle errors here,
// just makes sure related localForages aren't pending.
return Promise.resolve();}for(var j=0;j<dbContext.forages.length;j++){var forage=dbContext.forages[j];if(forage!==self){ // Don't wait for itself...
initPromises.push(forage._initReady()['catch'](ignoreErrors));}} // Take a snapshot of the related localForages.
var forages=dbContext.forages.slice(0); // Initialize the connection process only when
// all the related localForages aren't pending.
return Promise.all(initPromises).then(function(){dbInfo.db=dbContext.db; // Get the connection or open a new one without upgrade.
return _getOriginalConnection(dbInfo);}).then(function(db){dbInfo.db=db;if(_isUpgradeNeeded(dbInfo,self._defaultConfig.version)){ // Reopen the database for upgrading.
return _getUpgradedConnection(dbInfo);}return db;}).then(function(db){dbInfo.db=dbContext.db=db;self._dbInfo=dbInfo; // Share the final connection amongst related localForages.
for(var k=0;k<forages.length;k++){var forage=forages[k];if(forage!==self){ // Self is already up-to-date.
forage._dbInfo.db=dbInfo.db;forage._dbInfo.version=dbInfo.version;}}});}function _getOriginalConnection(dbInfo){return _getConnection(dbInfo,false);}function _getUpgradedConnection(dbInfo){return _getConnection(dbInfo,true);}function _getConnection(dbInfo,upgradeNeeded){return new Promise(function(resolve,reject){if(dbInfo.db){if(upgradeNeeded){_deferReadiness(dbInfo);dbInfo.db.close();}else {return resolve(dbInfo.db);}}var dbArgs=[dbInfo.name];if(upgradeNeeded){dbArgs.push(dbInfo.version);}var openreq=indexedDB.open.apply(indexedDB,dbArgs);if(upgradeNeeded){openreq.onupgradeneeded=function(e){var db=openreq.result;try{db.createObjectStore(dbInfo.storeName);if(e.oldVersion<=1){ // Added when support for blob shims was added
db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);}}catch(ex){if(ex.name==='ConstraintError'){globalObject.console.warn('The database "'+dbInfo.name+'"'+' has been upgraded from version '+e.oldVersion+' to version '+e.newVersion+', but the storage "'+dbInfo.storeName+'" already exists.');}else {throw ex;}}};}openreq.onerror=function(){reject(openreq.error);};openreq.onsuccess=function(){resolve(openreq.result);_advanceReadiness(dbInfo);};});}function _isUpgradeNeeded(dbInfo,defaultVersion){if(!dbInfo.db){return true;}var isNewStore=!dbInfo.db.objectStoreNames.contains(dbInfo.storeName);var isDowngrade=dbInfo.version<dbInfo.db.version;var isUpgrade=dbInfo.version>dbInfo.db.version;if(isDowngrade){ // If the version is not the default one
// then warn for impossible downgrade.
if(dbInfo.version!==defaultVersion){globalObject.console.warn('The database "'+dbInfo.name+'"'+' can\'t be downgraded from version '+dbInfo.db.version+' to version '+dbInfo.version+'.');} // Align the versions to prevent errors.
dbInfo.version=dbInfo.db.version;}if(isUpgrade||isNewStore){ // If the store is new then increment the version (if needed).
// This will trigger an "upgradeneeded" event which is required
// for creating a store.
if(isNewStore){var incVersion=dbInfo.db.version+1;if(incVersion>dbInfo.version){dbInfo.version=incVersion;}}return true;}return false;}function getItem(key,callback){var self=this; // Cast the key to a string, as that's all we can set as a key.
if(typeof key!=='string'){globalObject.console.warn(key+' used as a key, but it is not a string.');key=String(key);}var promise=new Promise(function(resolve,reject){self.ready().then(function(){var dbInfo=self._dbInfo;var store=dbInfo.db.transaction(dbInfo.storeName,'readonly').objectStore(dbInfo.storeName);var req=store.get(key);req.onsuccess=function(){var value=req.result;if(value===undefined){value=null;}if(_isEncodedBlob(value)){value=_decodeBlob(value);}resolve(value);};req.onerror=function(){reject(req.error);};})['catch'](reject);});executeCallback(promise,callback);return promise;} // Iterate over all items stored in database.
function iterate(iterator,callback){var self=this;var promise=new Promise(function(resolve,reject){self.ready().then(function(){var dbInfo=self._dbInfo;var store=dbInfo.db.transaction(dbInfo.storeName,'readonly').objectStore(dbInfo.storeName);var req=store.openCursor();var iterationNumber=1;req.onsuccess=function(){var cursor=req.result;if(cursor){var value=cursor.value;if(_isEncodedBlob(value)){value=_decodeBlob(value);}var result=iterator(value,cursor.key,iterationNumber++);if(result!==void 0){resolve(result);}else {cursor['continue']();}}else {resolve();}};req.onerror=function(){reject(req.error);};})['catch'](reject);});executeCallback(promise,callback);return promise;}function setItem(key,value,callback){var self=this; // Cast the key to a string, as that's all we can set as a key.
if(typeof key!=='string'){globalObject.console.warn(key+' used as a key, but it is not a string.');key=String(key);}var promise=new Promise(function(resolve,reject){var dbInfo;self.ready().then(function(){dbInfo=self._dbInfo;if(value instanceof Blob){return _checkBlobSupport(dbInfo.db).then(function(blobSupport){if(blobSupport){return value;}return _encodeBlob(value);});}return value;}).then(function(value){var transaction=dbInfo.db.transaction(dbInfo.storeName,'readwrite');var store=transaction.objectStore(dbInfo.storeName); // The reason we don't _save_ null is because IE 10 does
// not support saving the `null` type in IndexedDB. How
// ironic, given the bug below!
// See: https://github.com/mozilla/localForage/issues/161
if(value===null){value=undefined;}transaction.oncomplete=function(){ // Cast to undefined so the value passed to
// callback/promise is the same as what one would get out
// of `getItem()` later. This leads to some weirdness
// (setItem('foo', undefined) will return `null`), but
// it's not my fault localStorage is our baseline and that
// it's weird.
if(value===undefined){value=null;}resolve(value);};transaction.onabort=transaction.onerror=function(){var err=req.error?req.error:req.transaction.error;reject(err);};var req=store.put(value,key);})['catch'](reject);});executeCallback(promise,callback);return promise;}function removeItem(key,callback){var self=this; // Cast the key to a string, as that's all we can set as a key.
if(typeof key!=='string'){globalObject.console.warn(key+' used as a key, but it is not a string.');key=String(key);}var promise=new Promise(function(resolve,reject){self.ready().then(function(){var dbInfo=self._dbInfo;var transaction=dbInfo.db.transaction(dbInfo.storeName,'readwrite');var store=transaction.objectStore(dbInfo.storeName); // We use a Grunt task to make this safe for IE and some
// versions of Android (including those used by Cordova).
// Normally IE won't like `.delete()` and will insist on
// using `['delete']()`, but we have a build step that
// fixes this for us now.
var req=store['delete'](key);transaction.oncomplete=function(){resolve();};transaction.onerror=function(){reject(req.error);}; // The request will be also be aborted if we've exceeded our storage
// space.
transaction.onabort=function(){var err=req.error?req.error:req.transaction.error;reject(err);};})['catch'](reject);});executeCallback(promise,callback);return promise;}function clear(callback){var self=this;var promise=new Promise(function(resolve,reject){self.ready().then(function(){var dbInfo=self._dbInfo;var transaction=dbInfo.db.transaction(dbInfo.storeName,'readwrite');var store=transaction.objectStore(dbInfo.storeName);var req=store.clear();transaction.oncomplete=function(){resolve();};transaction.onabort=transaction.onerror=function(){var err=req.error?req.error:req.transaction.error;reject(err);};})['catch'](reject);});executeCallback(promise,callback);return promise;}function length(callback){var self=this;var promise=new Promise(function(resolve,reject){self.ready().then(function(){var dbInfo=self._dbInfo;var store=dbInfo.db.transaction(dbInfo.storeName,'readonly').objectStore(dbInfo.storeName);var req=store.count();req.onsuccess=function(){resolve(req.result);};req.onerror=function(){reject(req.error);};})['catch'](reject);});executeCallback(promise,callback);return promise;}function key(n,callback){var self=this;var promise=new Promise(function(resolve,reject){if(n<0){resolve(null);return;}self.ready().then(function(){var dbInfo=self._dbInfo;var store=dbInfo.db.transaction(dbInfo.storeName,'readonly').objectStore(dbInfo.storeName);var advanced=false;var req=store.openCursor();req.onsuccess=function(){var cursor=req.result;if(!cursor){ // this means there weren't enough keys
resolve(null);return;}if(n===0){ // We have the first key, return it if that's what they
// wanted.
resolve(cursor.key);}else {if(!advanced){ // Otherwise, ask the cursor to skip ahead n
// records.
advanced=true;cursor.advance(n);}else { // When we get here, we've got the nth key.
resolve(cursor.key);}}};req.onerror=function(){reject(req.error);};})['catch'](reject);});executeCallback(promise,callback);return promise;}function keys(callback){var self=this;var promise=new Promise(function(resolve,reject){self.ready().then(function(){var dbInfo=self._dbInfo;var store=dbInfo.db.transaction(dbInfo.storeName,'readonly').objectStore(dbInfo.storeName);var req=store.openCursor();var keys=[];req.onsuccess=function(){var cursor=req.result;if(!cursor){resolve(keys);return;}keys.push(cursor.key);cursor['continue']();};req.onerror=function(){reject(req.error);};})['catch'](reject);});executeCallback(promise,callback);return promise;}function executeCallback(promise,callback){if(callback){promise.then(function(result){callback(null,result);},function(error){callback(error);});}}var asyncStorage={_driver:'asyncStorage',_initStorage:_initStorage,iterate:iterate,getItem:getItem,setItem:setItem,removeItem:removeItem,clear:clear,length:length,key:key,keys:keys};return asyncStorage;}(typeof window!=='undefined'?window:self);exports['default']=asyncStorage;module.exports=exports['default']; /***/}, /* 2 */ /***/function(module,exports,__webpack_require__){ // If IndexedDB isn't available, we'll fall back to localStorage.
// Note that this will have considerable performance and storage
// side-effects (all data will be serialized on save and only data that
// can be converted to a string via `JSON.stringify()` will be saved).
'use strict';exports.__esModule=true;var localStorageWrapper=function(globalObject){'use strict';var localStorage=null; // If the app is running inside a Google Chrome packaged webapp, or some
// other context where localStorage isn't available, we don't use
// localStorage. This feature detection is preferred over the old
// `if (window.chrome && window.chrome.runtime)` code.
// See: https://github.com/mozilla/localForage/issues/68
try{ // If localStorage isn't available, we get outta here!
// This should be inside a try catch
if(!globalObject.localStorage||!('setItem' in globalObject.localStorage)){return;} // Initialize localStorage and create a variable to use throughout
// the code.
localStorage=globalObject.localStorage;}catch(e){return;} // Config the localStorage backend, using options set in the config.
function _initStorage(options){var self=this;var dbInfo={};if(options){for(var i in options){dbInfo[i]=options[i];}}dbInfo.keyPrefix=dbInfo.name+'/';if(dbInfo.storeName!==self._defaultConfig.storeName){dbInfo.keyPrefix+=dbInfo.storeName+'/';}self._dbInfo=dbInfo;return new Promise(function(resolve,reject){resolve(__webpack_require__(3));}).then(function(lib){dbInfo.serializer=lib;return Promise.resolve();});} // Remove all keys from the datastore, effectively destroying all data in
// the app's key/value store!
function clear(callback){var self=this;var promise=self.ready().then(function(){var keyPrefix=self._dbInfo.keyPrefix;for(var i=localStorage.length-1;i>=0;i--){var key=localStorage.key(i);if(key.indexOf(keyPrefix)===0){localStorage.removeItem(key);}}});executeCallback(promise,callback);return promise;} // Retrieve an item from the store. Unlike the original async_storage
// library in Gaia, we don't modify return values at all. If a key's value
// is `undefined`, we pass that value to the callback function.
function getItem(key,callback){var self=this; // Cast the key to a string, as that's all we can set as a key.
if(typeof key!=='string'){globalObject.console.warn(key+' used as a key, but it is not a string.');key=String(key);}var promise=self.ready().then(function(){var dbInfo=self._dbInfo;var result=localStorage.getItem(dbInfo.keyPrefix+key); // If a result was found, parse it from the serialized
// string into a JS object. If result isn't truthy, the key
// is likely undefined and we'll pass it straight to the
// callback.
if(result){result=dbInfo.serializer.deserialize(result);}return result;});executeCallback(promise,callback);return promise;} // Iterate over all items in the store.
function iterate(iterator,callback){var self=this;var promise=self.ready().then(function(){var dbInfo=self._dbInfo;var keyPrefix=dbInfo.keyPrefix;var keyPrefixLength=keyPrefix.length;var length=localStorage.length; // We use a dedicated iterator instead of the `i` variable below
// so other keys we fetch in localStorage aren't counted in
// the `iterationNumber` argument passed to the `iterate()`
// callback.
//
// See: github.com/mozilla/localForage/pull/435#discussion_r38061530
var iterationNumber=1;for(var i=0;i<length;i++){var key=localStorage.key(i);if(key.indexOf(keyPrefix)!==0){continue;}var value=localStorage.getItem(key); // If a result was found, parse it from the serialized
// string into a JS object. If result isn't truthy, the
// key is likely undefined and we'll pass it straight
// to the iterator.
if(value){value=dbInfo.serializer.deserialize(value);}value=iterator(value,key.substring(keyPrefixLength),iterationNumber++);if(value!==void 0){return value;}}});executeCallback(promise,callback);return promise;} // Same as localStorage's key() method, except takes a callback.
function key(n,callback){var self=this;var promise=self.ready().then(function(){var dbInfo=self._dbInfo;var result;try{result=localStorage.key(n);}catch(error){result=null;} // Remove the prefix from the key, if a key is found.
if(result){result=result.substring(dbInfo.keyPrefix.length);}return result;});executeCallback(promise,callback);return promise;}function keys(callback){var self=this;var promise=self.ready().then(function(){var dbInfo=self._dbInfo;var length=localStorage.length;var keys=[];for(var i=0;i<length;i++){if(localStorage.key(i).indexOf(dbInfo.keyPrefix)===0){keys.push(localStorage.key(i).substring(dbInfo.keyPrefix.length));}}return keys;});executeCallback(promise,callback);return promise;} // Supply the number of keys in the datastore to the callback function.
function length(callback){var self=this;var promise=self.keys().then(function(keys){return keys.length;});executeCallback(promise,callback);return promise;} // Remove an item from the store, nice and simple.
function removeItem(key,callback){var self=this; // Cast the key to a string, as that's all we can set as a key.
if(typeof key!=='string'){globalObject.console.warn(key+' used as a key, but it is not a string.');key=String(key);}var promise=self.ready().then(function(){var dbInfo=self._dbInfo;localStorage.removeItem(dbInfo.keyPrefix+key);});executeCallback(promise,callback);return promise;} // Set a key's value and run an optional callback once the value is set.
// Unlike Gaia's implementation, the callback function is passed the value,
// in case you want to operate on that value only after you're sure it
// saved, or something like that.
function setItem(key,value,callback){var self=this; // Cast the key to a string, as that's all we can set as a key.
if(typeof key!=='string'){globalObject.console.warn(key+' used as a key, but it is not a string.');key=String(key);}var promise=self.ready().then(function(){ // Convert undefined values to null.
// https://github.com/mozilla/localForage/pull/42
if(value===undefined){value=null;} // Save the original value to pass to the callback.
var originalValue=value;return new Promise(function(resolve,reject){var dbInfo=self._dbInfo;dbInfo.serializer.serialize(value,function(value,error){if(error){reject(error);}else {try{localStorage.setItem(dbInfo.keyPrefix+key,value);resolve(originalValue);}catch(e){ // localStorage capacity exceeded.
// TODO: Make this a specific error/event.
if(e.name==='QuotaExceededError'||e.name==='NS_ERROR_DOM_QUOTA_REACHED'){reject(e);}reject(e);}}});});});executeCallback(promise,callback);return promise;}function executeCallback(promise,callback){if(callback){promise.then(function(result){callback(null,result);},function(error){callback(error);});}}var localStorageWrapper={_driver:'localStorageWrapper',_initStorage:_initStorage, // Default API, from Gaia/localStorage.
iterate:iterate,getItem:getItem,setItem:setItem,removeItem:removeItem,clear:clear,length:length,key:key,keys:keys};return localStorageWrapper;}(typeof window!=='undefined'?window:self);exports['default']=localStorageWrapper;module.exports=exports['default']; /***/}, /* 3 */ /***/function(module,exports){'use strict';exports.__esModule=true;var localforageSerializer=function(globalObject){'use strict'; // Sadly, the best way to save binary data in WebSQL/localStorage is serializing
// it to Base64, so this is how we store it to prevent very strange errors with less
// verbose ways of binary <-> string data storage.
var BASE_CHARS='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';var BLOB_TYPE_PREFIX='~~local_forage_type~';var BLOB_TYPE_PREFIX_REGEX=/^~~local_forage_type~([^~]+)~/;var SERIALIZED_MARKER='__lfsc__:';var SERIALIZED_MARKER_LENGTH=SERIALIZED_MARKER.length; // OMG the serializations!
var TYPE_ARRAYBUFFER='arbf';var TYPE_BLOB='blob';var TYPE_INT8ARRAY='si08';var TYPE_UINT8ARRAY='ui08';var TYPE_UINT8CLAMPEDARRAY='uic8';var TYPE_INT16ARRAY='si16';var TYPE_INT32ARRAY='si32';var TYPE_UINT16ARRAY='ur16';var TYPE_UINT32ARRAY='ui32';var TYPE_FLOAT32ARRAY='fl32';var TYPE_FLOAT64ARRAY='fl64';var TYPE_SERIALIZED_MARKER_LENGTH=SERIALIZED_MARKER_LENGTH+TYPE_ARRAYBUFFER.length; // Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
function _createBlob(parts,properties){parts=parts||[];properties=properties||{};try{return new Blob(parts,properties);}catch(err){if(err.name!=='TypeError'){throw err;}var BlobBuilder=globalObject.BlobBuilder||globalObject.MSBlobBuilder||globalObject.MozBlobBuilder||globalObject.WebKitBlobBuilder;var builder=new BlobBuilder();for(var i=0;i<parts.length;i+=1){builder.append(parts[i]);}return builder.getBlob(properties.type);}} // Serialize a value, afterwards executing a callback (which usually
// instructs the `setItem()` callback/promise to be executed). This is how
// we store binary data with localStorage.
function serialize(value,callback){var valueString='';if(value){valueString=value.toString();} // Cannot use `value instanceof ArrayBuffer` or such here, as these
// checks fail when running the tests using casper.js...
//
// TODO: See why those tests fail and use a better solution.
if(value&&(value.toString()==='[object ArrayBuffer]'||value.buffer&&value.buffer.toString()==='[object ArrayBuffer]')){ // Convert binary arrays to a string and prefix the string with
// a special marker.
var buffer;var marker=SERIALIZED_MARKER;if(value instanceof ArrayBuffer){buffer=value;marker+=TYPE_ARRAYBUFFER;}else {buffer=value.buffer;if(valueString==='[object Int8Array]'){marker+=TYPE_INT8ARRAY;}else if(valueString==='[object Uint8Array]'){marker+=TYPE_UINT8ARRAY;}else if(valueString==='[object Uint8ClampedArray]'){marker+=TYPE_UINT8CLAMPEDARRAY;}else if(valueString==='[object Int16Array]'){marker+=TYPE_INT16ARRAY;}else if(valueString==='[object Uint16Array]'){marker+=TYPE_UINT16ARRAY;}else if(valueString==='[object Int32Array]'){marker+=TYPE_INT32ARRAY;}else if(valueString==='[object Uint32Array]'){marker+=TYPE_UINT32ARRAY;}else if(valueString==='[object Float32Array]'){marker+=TYPE_FLOAT32ARRAY;}else if(valueString==='[object Float64Array]'){marker+=TYPE_FLOAT64ARRAY;}else {callback(new Error('Failed to get type for BinaryArray'));}}callback(marker+bufferToString(buffer));}else if(valueString==='[object Blob]'){ // Conver the blob to a binaryArray and then to a string.
var fileReader=new FileReader();fileReader.onload=function(){ // Backwards-compatible prefix for the blob type.
var str=BLOB_TYPE_PREFIX+value.type+'~'+bufferToString(this.result);callback(SERIALIZED_MARKER+TYPE_BLOB+str);};fileReader.readAsArrayBuffer(value);}else {try{callback(JSON.stringify(value));}catch(e){console.error("Couldn't convert value into a JSON string: ",value);callback(null,e);}}} // Deserialize data we've inserted into a value column/field. We place
// special markers into our strings to mark them as encoded; this isn't
// as nice as a meta field, but it's the only sane thing we can do whilst
// keeping localStorage support intact.
//
// Oftentimes this will just deserialize JSON content, but if we have a
// special marker (SERIALIZED_MARKER, defined above), we will extract
// some kind of arraybuffer/binary data/typed array out of the string.
function deserialize(value){ // If we haven't marked this string as being specially serialized (i.e.
// something other than serialized JSON), we can just return it and be
// done with it.
if(value.substring(0,SERIALIZED_MARKER_LENGTH)!==SERIALIZED_MARKER){return JSON.parse(value);} // The following code deals with deserializing some kind of Blob or
// TypedArray. First we separate out the type of data we're dealing
// with from the data itself.
var serializedString=value.substring(TYPE_SERIALIZED_MARKER_LENGTH);var type=value.substring(SERIALIZED_MARKER_LENGTH,TYPE_SERIALIZED_MARKER_LENGTH);var blobType; // Backwards-compatible blob type serialization strategy.
// DBs created with older versions of localForage will simply not have the blob type.
if(type===TYPE_BLOB&&BLOB_TYPE_PREFIX_REGEX.test(serializedString)){var matcher=serializedString.match(BLOB_TYPE_PREFIX_REGEX);blobType=matcher[1];serializedString=serializedString.substring(matcher[0].length);}var buffer=stringToBuffer(serializedString); // Return the right type based on the code/type set during
// serialization.
switch(type){case TYPE_ARRAYBUFFER:return buffer;case TYPE_BLOB:return _createBlob([buffer],{type:blobType});case TYPE_INT8ARRAY:return new Int8Array(buffer);case TYPE_UINT8ARRAY:return new Uint8Array(buffer);case TYPE_UINT8CLAMPEDARRAY:return new Uint8ClampedArray(buffer);case TYPE_INT16ARRAY:return new Int16Array(buffer);case TYPE_UINT16ARRAY:return new Uint16Array(buffer);case TYPE_INT32ARRAY:return new Int32Array(buffer);case TYPE_UINT32ARRAY:return new Uint32Array(buffer);case TYPE_FLOAT32ARRAY:return new Float32Array(buffer);case TYPE_FLOAT64ARRAY:return new Float64Array(buffer);default:throw new Error('Unkown type: '+type);}}function stringToBuffer(serializedString){ // Fill the string into a ArrayBuffer.
var bufferLength=serializedString.length*0.75;var len=serializedString.length;var i;var p=0;var encoded1,encoded2,encoded3,encoded4;if(serializedString[serializedString.length-1]==='='){bufferLength--;if(serializedString[serializedString.length-2]==='='){bufferLength--;}}var buffer=new ArrayBuffer(bufferLength);var bytes=new Uint8Array(buffer);for(i=0;i<len;i+=4){encoded1=BASE_CHARS.indexOf(serializedString[i]);encoded2=BASE_CHARS.indexOf(serializedString[i+1]);encoded3=BASE_CHARS.indexOf(serializedString[i+2]);encoded4=BASE_CHARS.indexOf(serializedString[i+3]); /*jslint bitwise: true */bytes[p++]=encoded1<<2|encoded2>>4;bytes[p++]=(encoded2&15)<<4|encoded3>>2;bytes[p++]=(encoded3&3)<<6|encoded4&63;}return buffer;} // Converts a buffer to a string to store, serialized, in the backend
// storage library.
function bufferToString(buffer){ // base64-arraybuffer
var bytes=new Uint8Array(buffer);var base64String='';var i;for(i=0;i<bytes.length;i+=3){ /*jslint bitwise: true */base64String+=BASE_CHARS[bytes[i]>>2];base64String+=BASE_CHARS[(bytes[i]&3)<<4|bytes[i+1]>>4];base64String+=BASE_CHARS[(bytes[i+1]&15)<<2|bytes[i+2]>>6];base64String+=BASE_CHARS[bytes[i+2]&63];}if(bytes.length%3===2){base64String=base64String.substring(0,base64String.length-1)+'=';}else if(bytes.length%3===1){base64String=base64String.substring(0,base64String.length-2)+'==';}return base64String;}var localforageSerializer={serialize:serialize,deserialize:deserialize,stringToBuffer:stringToBuffer,bufferToString:bufferToString};return localforageSerializer;}(typeof window!=='undefined'?window:self);exports['default']=localforageSerializer;module.exports=exports['default']; /***/}, /* 4 */ /***/function(module,exports,__webpack_require__){ /*
	 * Includes code from:
	 *
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */'use strict';exports.__esModule=true;var webSQLStorage=function(globalObject){'use strict';var openDatabase=globalObject.openDatabase; // If WebSQL methods aren't available, we can stop now.
if(!openDatabase){return;} // Open the WebSQL database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage(options){var self=this;var dbInfo={db:null};if(options){for(var i in options){dbInfo[i]=typeof options[i]!=='string'?options[i].toString():options[i];}}var dbInfoPromise=new Promise(function(resolve,reject){ // Open the database; the openDatabase API will automatically
// create it for us if it doesn't exist.
try{dbInfo.db=openDatabase(dbInfo.name,String(dbInfo.version),dbInfo.description,dbInfo.size);}catch(e){return reject(e);} // Create our key/value table if it doesn't exist.
dbInfo.db.transaction(function(t){t.executeSql('CREATE TABLE IF NOT EXISTS '+dbInfo.storeName+' (id INTEGER PRIMARY KEY, key unique, value)',[],function(){self._dbInfo=dbInfo;resolve();},function(t,error){reject(error);});});});return new Promise(function(resolve,reject){resolve(__webpack_require__(3));}).then(function(lib){dbInfo.serializer=lib;return dbInfoPromise;});}function getItem(key,callback){var self=this; // Cast the key to a string, as that's all we can set as a key.
if(typeof key!=='string'){globalObject.console.warn(key+' used as a key, but it is not a string.');key=String(key);}var promise=new Promise(function(resolve,reject){self.ready().then(function(){var dbInfo=self._dbInfo;dbInfo.db.transaction(function(t){t.executeSql('SELECT * FROM '+dbInfo.storeName+' WHERE key = ? LIMIT 1',[key],function(t,results){var result=results.rows.length?results.rows.item(0).value:null; // Check to see if this is serialized content we need to
// unpack.
if(result){result=dbInfo.serializer.deserialize(result);}resolve(result);},function(t,error){reject(error);});});})['catch'](reject);});executeCallback(promise,callback);return promise;}function iterate(iterator,callback){var self=this;var promise=new Promise(function(resolve,reject){self.ready().then(function(){var dbInfo=self._dbInfo;dbInfo.db.transaction(function(t){t.executeSql('SELECT * FROM '+dbInfo.storeName,[],function(t,results){var rows=results.rows;var length=rows.length;for(var i=0;i<length;i++){var item=rows.item(i);var result=item.value; // Check to see if this is serialized content
// we need to unpack.
if(result){result=dbInfo.serializer.deserialize(result);}result=iterator(result,item.key,i+1); // void(0) prevents problems with redefinition
// of `undefined`.
if(result!==void 0){resolve(result);return;}}resolve();},function(t,error){reject(error);});});})['catch'](reject);});executeCallback(promise,callback);return promise;}function setItem(key,value,callback){var self=this; // Cast the key to a string, as that's all we can set as a key.
if(typeof key!=='string'){globalObject.console.warn(key+' used as a key, but it is not a string.');key=String(key);}var promise=new Promise(function(resolve,reject){self.ready().then(function(){ // The localStorage API doesn't return undefined values in an
// "expected" way, so undefined is always cast to null in all
// drivers. See: https://github.com/mozilla/localForage/pull/42
if(value===undefined){value=null;} // Save the original value to pass to the callback.
var originalValue=value;var dbInfo=self._dbInfo;dbInfo.serializer.serialize(value,function(value,error){if(error){reject(error);}else {dbInfo.db.transaction(function(t){t.executeSql('INSERT OR REPLACE INTO '+dbInfo.storeName+' (key, value) VALUES (?, ?)',[key,value],function(){resolve(originalValue);},function(t,error){reject(error);});},function(sqlError){ // The transaction failed; check
// to see if it's a quota error.
if(sqlError.code===sqlError.QUOTA_ERR){ // We reject the callback outright for now, but
// it's worth trying to re-run the transaction.
// Even if the user accepts the prompt to use
// more storage on Safari, this error will
// be called.
//
// TODO: Try to re-run the transaction.
reject(sqlError);}});}});})['catch'](reject);});executeCallback(promise,callback);return promise;}function removeItem(key,callback){var self=this; // Cast the key to a string, as that's all we can set as a key.
if(typeof key!=='string'){globalObject.console.warn(key+' used as a key, but it is not a string.');key=String(key);}var promise=new Promise(function(resolve,reject){self.ready().then(function(){var dbInfo=self._dbInfo;dbInfo.db.transaction(function(t){t.executeSql('DELETE FROM '+dbInfo.storeName+' WHERE key = ?',[key],function(){resolve();},function(t,error){reject(error);});});})['catch'](reject);});executeCallback(promise,callback);return promise;} // Deletes every item in the table.
// TODO: Find out if this resets the AUTO_INCREMENT number.
function clear(callback){var self=this;var promise=new Promise(function(resolve,reject){self.ready().then(function(){var dbInfo=self._dbInfo;dbInfo.db.transaction(function(t){t.executeSql('DELETE FROM '+dbInfo.storeName,[],function(){resolve();},function(t,error){reject(error);});});})['catch'](reject);});executeCallback(promise,callback);return promise;} // Does a simple `COUNT(key)` to get the number of items stored in
// localForage.
function length(callback){var self=this;var promise=new Promise(function(resolve,reject){self.ready().then(function(){var dbInfo=self._dbInfo;dbInfo.db.transaction(function(t){ // Ahhh, SQL makes this one soooooo easy.
t.executeSql('SELECT COUNT(key) as c FROM '+dbInfo.storeName,[],function(t,results){var result=results.rows.item(0).c;resolve(result);},function(t,error){reject(error);});});})['catch'](reject);});executeCallback(promise,callback);return promise;} // Return the key located at key index X; essentially gets the key from a
// `WHERE id = ?`. This is the most efficient way I can think to implement
// this rarely-used (in my experience) part of the API, but it can seem
// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
// the ID of each key will change every time it's updated. Perhaps a stored
// procedure for the `setItem()` SQL would solve this problem?
// TODO: Don't change ID on `setItem()`.
function key(n,callback){var self=this;var promise=new Promise(function(resolve,reject){self.ready().then(function(){var dbInfo=self._dbInfo;dbInfo.db.transaction(function(t){t.executeSql('SELECT key FROM '+dbInfo.storeName+' WHERE id = ? LIMIT 1',[n+1],function(t,results){var result=results.rows.length?results.rows.item(0).key:null;resolve(result);},function(t,error){reject(error);});});})['catch'](reject);});executeCallback(promise,callback);return promise;}function keys(callback){var self=this;var promise=new Promise(function(resolve,reject){self.ready().then(function(){var dbInfo=self._dbInfo;dbInfo.db.transaction(function(t){t.executeSql('SELECT key FROM '+dbInfo.storeName,[],function(t,results){var keys=[];for(var i=0;i<results.rows.length;i++){keys.push(results.rows.item(i).key);}resolve(keys);},function(t,error){reject(error);});});})['catch'](reject);});executeCallback(promise,callback);return promise;}function executeCallback(promise,callback){if(callback){promise.then(function(result){callback(null,result);},function(error){callback(error);});}}var webSQLStorage={_driver:'webSQLStorage',_initStorage:_initStorage,iterate:iterate,getItem:getItem,setItem:setItem,removeItem:removeItem,clear:clear,length:length,key:key,keys:keys};return webSQLStorage;}(typeof window!=='undefined'?window:self);exports['default']=webSQLStorage;module.exports=exports['default']; /***/} /******/]));});;}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"_process":13}],23:[function(require,module,exports){ /**
 * Module dependencies.
 */var Emitter=require('emitter');var reduce=require('reduce');var requestBase=require('./request-base');var isObject=require('./is-object'); /**
 * Root reference for iframes.
 */var root;if(typeof window!=='undefined'){ // Browser window
root=window;}else if(typeof self!=='undefined'){ // Web Worker
root=self;}else { // Other environments
root=this;} /**
 * Noop.
 */function noop(){}; /**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */function isHost(obj){var str={}.toString.call(obj);switch(str){case '[object File]':case '[object Blob]':case '[object FormData]':return true;default:return false;}} /**
 * Expose `request`.
 */var request=module.exports=require('./request').bind(null,Request); /**
 * Determine XHR.
 */request.getXHR=function(){if(root.XMLHttpRequest&&(!root.location||'file:'!=root.location.protocol||!root.ActiveXObject)){return new XMLHttpRequest();}else {try{return new ActiveXObject('Microsoft.XMLHTTP');}catch(e){}try{return new ActiveXObject('Msxml2.XMLHTTP.6.0');}catch(e){}try{return new ActiveXObject('Msxml2.XMLHTTP.3.0');}catch(e){}try{return new ActiveXObject('Msxml2.XMLHTTP');}catch(e){}}return false;}; /**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */var trim=''.trim?function(s){return s.trim();}:function(s){return s.replace(/(^\s*|\s*$)/g,'');}; /**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */function serialize(obj){if(!isObject(obj))return obj;var pairs=[];for(var key in obj){if(null!=obj[key]){pushEncodedKeyValuePair(pairs,key,obj[key]);}}return pairs.join('&');} /**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */function pushEncodedKeyValuePair(pairs,key,val){if(Array.isArray(val)){return val.forEach(function(v){pushEncodedKeyValuePair(pairs,key,v);});}pairs.push(encodeURIComponent(key)+'='+encodeURIComponent(val));} /**
 * Expose serialization method.
 */request.serializeObject=serialize; /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */function parseString(str){var obj={};var pairs=str.split('&');var parts;var pair;for(var i=0,len=pairs.length;i<len;++i){pair=pairs[i];parts=pair.split('=');obj[decodeURIComponent(parts[0])]=decodeURIComponent(parts[1]);}return obj;} /**
 * Expose parser.
 */request.parseString=parseString; /**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */request.types={html:'text/html',json:'application/json',xml:'application/xml',urlencoded:'application/x-www-form-urlencoded','form':'application/x-www-form-urlencoded','form-data':'application/x-www-form-urlencoded'}; /**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */request.serialize={'application/x-www-form-urlencoded':serialize,'application/json':JSON.stringify}; /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */request.parse={'application/x-www-form-urlencoded':parseString,'application/json':JSON.parse}; /**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */function parseHeader(str){var lines=str.split(/\r?\n/);var fields={};var index;var line;var field;var val;lines.pop(); // trailing CRLF
for(var i=0,len=lines.length;i<len;++i){line=lines[i];index=line.indexOf(':');field=line.slice(0,index).toLowerCase();val=trim(line.slice(index+1));fields[field]=val;}return fields;} /**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */function isJSON(mime){return (/[\/+]json\b/.test(mime));} /**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */function type(str){return str.split(/ *; */).shift();}; /**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */function params(str){return reduce(str.split(/ *; */),function(obj,str){var parts=str.split(/ *= */),key=parts.shift(),val=parts.shift();if(key&&val)obj[key]=val;return obj;},{});}; /**
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
 */function Response(req,options){options=options||{};this.req=req;this.xhr=this.req.xhr; // responseText is accessible only if responseType is '' or 'text' and on older browsers
this.text=this.req.method!='HEAD'&&(this.xhr.responseType===''||this.xhr.responseType==='text')||typeof this.xhr.responseType==='undefined'?this.xhr.responseText:null;this.statusText=this.req.xhr.statusText;this.setStatusProperties(this.xhr.status);this.header=this.headers=parseHeader(this.xhr.getAllResponseHeaders()); // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
// getResponseHeader still works. so we get content-type even if getting
// other headers fails.
this.header['content-type']=this.xhr.getResponseHeader('content-type');this.setHeaderProperties(this.header);this.body=this.req.method!='HEAD'?this.parseBody(this.text?this.text:this.xhr.response):null;} /**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */Response.prototype.get=function(field){return this.header[field.toLowerCase()];}; /**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */Response.prototype.setHeaderProperties=function(header){ // content-type
var ct=this.header['content-type']||'';this.type=type(ct); // params
var obj=params(ct);for(var key in obj){this[key]=obj[key];}}; /**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */Response.prototype.parseBody=function(str){var parse=request.parse[this.type];return parse&&str&&(str.length||str instanceof Object)?parse(str):null;}; /**
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
 */Response.prototype.setStatusProperties=function(status){ // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
if(status===1223){status=204;}var type=status/100|0; // status / class
this.status=this.statusCode=status;this.statusType=type; // basics
this.info=1==type;this.ok=2==type;this.clientError=4==type;this.serverError=5==type;this.error=4==type||5==type?this.toError():false; // sugar
this.accepted=202==status;this.noContent=204==status;this.badRequest=400==status;this.unauthorized=401==status;this.notAcceptable=406==status;this.notFound=404==status;this.forbidden=403==status;}; /**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */Response.prototype.toError=function(){var req=this.req;var method=req.method;var url=req.url;var msg='cannot '+method+' '+url+' ('+this.status+')';var err=new Error(msg);err.status=this.status;err.method=method;err.url=url;return err;}; /**
 * Expose `Response`.
 */request.Response=Response; /**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */function Request(method,url){var self=this;this._query=this._query||[];this.method=method;this.url=url;this.header={}; // preserves header name case
this._header={}; // coerces header names to lowercase
this.on('end',function(){var err=null;var res=null;try{res=new Response(self);}catch(e){err=new Error('Parser is unable to parse the response');err.parse=true;err.original=e; // issue #675: return the raw response if the response parsing fails
err.rawResponse=self.xhr&&self.xhr.responseText?self.xhr.responseText:null; // issue #876: return the http status code if the response parsing fails
err.statusCode=self.xhr&&self.xhr.status?self.xhr.status:null;return self.callback(err);}self.emit('response',res);if(err){return self.callback(err,res);}if(res.status>=200&&res.status<300){return self.callback(err,res);}var new_err=new Error(res.statusText||'Unsuccessful HTTP response');new_err.original=err;new_err.response=res;new_err.status=res.status;self.callback(new_err,res);});} /**
 * Mixin `Emitter` and `requestBase`.
 */Emitter(Request.prototype);for(var key in requestBase){Request.prototype[key]=requestBase[key];} /**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */Request.prototype.abort=function(){if(this.aborted)return;this.aborted=true;this.xhr.abort();this.clearTimeout();this.emit('abort');return this;}; /**
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
 */Request.prototype.type=function(type){this.set('Content-Type',request.types[type]||type);return this;}; /**
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
 */Request.prototype.responseType=function(val){this._responseType=val;return this;}; /**
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
 */Request.prototype.accept=function(type){this.set('Accept',request.types[type]||type);return this;}; /**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */Request.prototype.auth=function(user,pass,options){if(!options){options={type:'basic'};}switch(options.type){case 'basic':var str=btoa(user+':'+pass);this.set('Authorization','Basic '+str);break;case 'auto':this.username=user;this.password=pass;break;}return this;}; /**
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
*/Request.prototype.query=function(val){if('string'!=typeof val)val=serialize(val);if(val)this._query.push(val);return this;}; /**
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
 */Request.prototype.attach=function(field,file,filename){if(!this._formData)this._formData=new root.FormData();this._formData.append(field,file,filename||file.name);return this;}; /**
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
 */Request.prototype.send=function(data){var obj=isObject(data);var type=this._header['content-type']; // merge
if(obj&&isObject(this._data)){for(var key in data){this._data[key]=data[key];}}else if('string'==typeof data){if(!type)this.type('form');type=this._header['content-type'];if('application/x-www-form-urlencoded'==type){this._data=this._data?this._data+'&'+data:data;}else {this._data=(this._data||'')+data;}}else {this._data=data;}if(!obj||isHost(data))return this;if(!type)this.type('json');return this;}; /**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */Request.prototype.callback=function(err,res){var fn=this._callback;this.clearTimeout();fn(err,res);}; /**
 * Invoke callback with x-domain error.
 *
 * @api private
 */Request.prototype.crossDomainError=function(){var err=new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');err.crossDomain=true;err.status=this.status;err.method=this.method;err.url=this.url;this.callback(err);}; /**
 * Invoke callback with timeout error.
 *
 * @api private
 */Request.prototype.timeoutError=function(){var timeout=this._timeout;var err=new Error('timeout of '+timeout+'ms exceeded');err.timeout=timeout;this.callback(err);}; /**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */Request.prototype.withCredentials=function(){this._withCredentials=true;return this;}; /**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */Request.prototype.end=function(fn){var self=this;var xhr=this.xhr=request.getXHR();var query=this._query.join('&');var timeout=this._timeout;var data=this._formData||this._data; // store callback
this._callback=fn||noop; // state change
xhr.onreadystatechange=function(){if(4!=xhr.readyState)return; // In IE9, reads to any property (e.g. status) off of an aborted XHR will
// result in the error "Could not complete the operation due to error c00c023f"
var status;try{status=xhr.status;}catch(e){status=0;}if(0==status){if(self.timedout)return self.timeoutError();if(self.aborted)return;return self.crossDomainError();}self.emit('end');}; // progress
var handleProgress=function handleProgress(e){if(e.total>0){e.percent=e.loaded/e.total*100;}e.direction='download';self.emit('progress',e);};if(this.hasListeners('progress')){xhr.onprogress=handleProgress;}try{if(xhr.upload&&this.hasListeners('progress')){xhr.upload.onprogress=handleProgress;}}catch(e){} // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
// Reported here:
// https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
// timeout
if(timeout&&!this._timer){this._timer=setTimeout(function(){self.timedout=true;self.abort();},timeout);} // querystring
if(query){query=request.serializeObject(query);this.url+=~this.url.indexOf('?')?'&'+query:'?'+query;} // initiate request
if(this.username&&this.password){xhr.open(this.method,this.url,true,this.username,this.password);}else {xhr.open(this.method,this.url,true);} // CORS
if(this._withCredentials)xhr.withCredentials=true; // body
if('GET'!=this.method&&'HEAD'!=this.method&&'string'!=typeof data&&!isHost(data)){ // serialize stuff
var contentType=this._header['content-type'];var serialize=this._parser||request.serialize[contentType?contentType.split(';')[0]:''];if(!serialize&&isJSON(contentType))serialize=request.serialize['application/json'];if(serialize)data=serialize(data);} // set header fields
for(var field in this.header){if(null==this.header[field])continue;xhr.setRequestHeader(field,this.header[field]);}if(this._responseType){xhr.responseType=this._responseType;} // send stuff
this.emit('request',this); // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
// We need null here if data is undefined
xhr.send(typeof data!=='undefined'?data:null);return this;}; /**
 * Expose `Request`.
 */request.Request=Request; /**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */request.get=function(url,data,fn){var req=request('GET',url);if('function'==typeof data)fn=data,data=null;if(data)req.query(data);if(fn)req.end(fn);return req;}; /**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */request.head=function(url,data,fn){var req=request('HEAD',url);if('function'==typeof data)fn=data,data=null;if(data)req.send(data);if(fn)req.end(fn);return req;}; /**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */function del(url,fn){var req=request('DELETE',url);if(fn)req.end(fn);return req;};request['del']=del;request['delete']=del; /**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */request.patch=function(url,data,fn){var req=request('PATCH',url);if('function'==typeof data)fn=data,data=null;if(data)req.send(data);if(fn)req.end(fn);return req;}; /**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */request.post=function(url,data,fn){var req=request('POST',url);if('function'==typeof data)fn=data,data=null;if(data)req.send(data);if(fn)req.end(fn);return req;}; /**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */request.put=function(url,data,fn){var req=request('PUT',url);if('function'==typeof data)fn=data,data=null;if(data)req.send(data);if(fn)req.end(fn);return req;};},{"./is-object":24,"./request":26,"./request-base":25,"emitter":27,"reduce":29}],24:[function(require,module,exports){ /**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */function isObject(obj){return null!=obj&&'object'==(typeof obj==="undefined"?"undefined":_typeof(obj));}module.exports=isObject;},{}],25:[function(require,module,exports){ /**
 * Module of mixed-in functions shared between node and client code
 */var isObject=require('./is-object'); /**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */exports.clearTimeout=function _clearTimeout(){this._timeout=0;clearTimeout(this._timer);return this;}; /**
 * Force given parser
 *
 * Sets the body parser no matter type.
 *
 * @param {Function}
 * @api public
 */exports.parse=function parse(fn){this._parser=fn;return this;}; /**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */exports.timeout=function timeout(ms){this._timeout=ms;return this;}; /**
 * Faux promise support
 *
 * @param {Function} fulfill
 * @param {Function} reject
 * @return {Request}
 */exports.then=function then(fulfill,reject){return this.end(function(err,res){err?reject(err):fulfill(res);});}; /**
 * Allow for extension
 */exports.use=function use(fn){fn(this);return this;}; /**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */exports.get=function(field){return this._header[field.toLowerCase()];}; /**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */exports.getHeader=exports.get; /**
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
 */exports.set=function(field,val){if(isObject(field)){for(var key in field){this.set(key,field[key]);}return this;}this._header[field.toLowerCase()]=val;this.header[field]=val;return this;}; /**
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
 */exports.unset=function(field){delete this._header[field.toLowerCase()];delete this.header[field];return this;}; /**
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
 */exports.field=function(name,val){if(!this._formData){var FormData=require('form-data'); // browserify compatible. May throw if FormData is not supported natively.
this._formData=new FormData();}this._formData.append(name,val);return this;};},{"./is-object":24,"form-data":28}],26:[function(require,module,exports){ // The node and browser modules expose versions of this with the
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
 */function request(RequestConstructor,method,url){ // callback
if('function'==typeof url){return new RequestConstructor('GET',method).end(url);} // url first
if(2==arguments.length){return new RequestConstructor('GET',method);}return new RequestConstructor(method,url);}module.exports=request;},{}],27:[function(require,module,exports){ /**
 * Expose `Emitter`.
 */module.exports=Emitter; /**
 * Initialize a new `Emitter`.
 *
 * @api public
 */function Emitter(obj){if(obj)return mixin(obj);}; /**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */function mixin(obj){for(var key in Emitter.prototype){obj[key]=Emitter.prototype[key];}return obj;} /**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */Emitter.prototype.on=Emitter.prototype.addEventListener=function(event,fn){this._callbacks=this._callbacks||{};(this._callbacks['$'+event]=this._callbacks['$'+event]||[]).push(fn);return this;}; /**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */Emitter.prototype.once=function(event,fn){function on(){this.off(event,on);fn.apply(this,arguments);}on.fn=fn;this.on(event,on);return this;}; /**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(event,fn){this._callbacks=this._callbacks||{}; // all
if(0==arguments.length){this._callbacks={};return this;} // specific event
var callbacks=this._callbacks['$'+event];if(!callbacks)return this; // remove all handlers
if(1==arguments.length){delete this._callbacks['$'+event];return this;} // remove specific handler
var cb;for(var i=0;i<callbacks.length;i++){cb=callbacks[i];if(cb===fn||cb.fn===fn){callbacks.splice(i,1);break;}}return this;}; /**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */Emitter.prototype.emit=function(event){this._callbacks=this._callbacks||{};var args=[].slice.call(arguments,1),callbacks=this._callbacks['$'+event];if(callbacks){callbacks=callbacks.slice(0);for(var i=0,len=callbacks.length;i<len;++i){callbacks[i].apply(this,args);}}return this;}; /**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */Emitter.prototype.listeners=function(event){this._callbacks=this._callbacks||{};return this._callbacks['$'+event]||[];}; /**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */Emitter.prototype.hasListeners=function(event){return !!this.listeners(event).length;};},{}],28:[function(require,module,exports){module.exports=FormData;},{}],29:[function(require,module,exports){ /**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */module.exports=function(arr,fn,initial){var idx=0;var len=arr.length;var curr=arguments.length==3?initial:arr[idx++];while(idx<len){curr=fn.call(null,curr,arr[idx],++idx,arr);}return curr;};},{}]},{},[1]);
