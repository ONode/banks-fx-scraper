'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _Bank2 = require('./Bank');

var _Bank3 = _interopRequireDefault(_Bank2);

var _banks_names = require('./banks_names');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EDBE = function (_Bank) {
  (0, _inherits3.default)(EDBE, _Bank);

  function EDBE() {
    (0, _classCallCheck3.default)(this, EDBE);

    var url = 'http://www.edbebank.com/EN/BankingServices/TreasuryFiles/exchangerates.xml';
    return (0, _possibleConstructorReturn3.default)(this, (EDBE.__proto__ || (0, _getPrototypeOf2.default)(EDBE)).call(this, _banks_names.banksNames.EDBE, url));
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */


  (0, _createClass3.default)(EDBE, [{
    key: 'scraper',
    value: function scraper(xml) {
      var $ = _cheerio2.default.load(xml, { xmlMode: true });
      var ratesTag = $('rates');

      var rates = [];
      // USD
      rates.push({
        code: 'USD',
        buy: Number(ratesTag.attr('USDBbuy')),
        sell: Number(ratesTag.attr('USDBsell'))
      });
      // EUR
      rates.push({
        code: 'EUR',
        buy: Number(ratesTag.attr('EURBbuy')),
        sell: Number(ratesTag.attr('EURBsell'))
      });
      // GBP
      rates.push({
        code: 'GBP',
        buy: Number(ratesTag.attr('GBPBbuy')),
        sell: Number(ratesTag.attr('GBPBsell'))
      });
      // CHF
      rates.push({
        code: 'CHF',
        buy: Number(ratesTag.attr('CHFBbuy')),
        sell: Number(ratesTag.attr('CHFBsell'))
      });
      // JPY
      rates.push({
        code: 'JPY',
        // Fix JPY rate to be for 100 notes
        buy: Number(ratesTag.attr('JPYBbuy')) * 100,
        sell: Number(ratesTag.attr('JPYBsell')) * 100
      });
      return rates;
    }
  }]);
  return EDBE;
}(_Bank3.default); /* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

exports.default = EDBE;