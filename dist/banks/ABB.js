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

var ABB = function (_Bank) {
  (0, _inherits3.default)(ABB, _Bank);

  function ABB() {
    (0, _classCallCheck3.default)(this, ABB);

    var url = 'http://www.albaraka-bank.com.eg/banking-services/exchange-rates.aspx';
    return (0, _possibleConstructorReturn3.default)(this, (ABB.__proto__ || (0, _getPrototypeOf2.default)(ABB)).call(this, _banks_names.banksNames.ABB, url));
  }

  /**
   * Convert currency name to its ISO code
   * @param {string} currency name to get its ISO code
   */


  (0, _createClass3.default)(ABB, [{
    key: 'scraper',


    /**
     * Scrape rates from html
     * @param {Object} html html of bank web page to scrape
     */
    value: function scraper(html) {
      var $ = _cheerio2.default.load(html);
      var table = $('#hr-border').children();

      var rates = [];
      table.each(function (index, row) {
        if (index < 1) return;
        var currencyName = $(row).children().eq(0).text().trim();
        var buyRate = $(row).children().eq(1).text().trim();
        var sellRate = $(row).children().eq(2).text().trim();

        rates.push({
          code: ABB.getCurrencyCode(currencyName),
          buy: +(Number(buyRate) / 100).toFixed(4),
          sell: +(Number(sellRate) / 100).toFixed(4)
        });
      });
      return rates;
    }
  }], [{
    key: 'getCurrencyCode',
    value: function getCurrencyCode(name) {
      var dict = {
        USD: 'USD',
        GBP: 'GBP',
        EURO: 'EUR',
        CHF: 'CHF',
        '100 JPY': 'JPY',
        SAR: 'SAR',
        BHD: 'BHD'
      };

      return dict[name];
    }
  }]);
  return ABB;
}(_Bank3.default); /* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

exports.default = ABB;