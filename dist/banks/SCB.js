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

var SCB = function (_Bank) {
  (0, _inherits3.default)(SCB, _Bank);

  function SCB() {
    (0, _classCallCheck3.default)(this, SCB);

    var url = 'http://scbank.com.eg/CurrencyAll.aspx';
    return (0, _possibleConstructorReturn3.default)(this, (SCB.__proto__ || (0, _getPrototypeOf2.default)(SCB)).call(this, _banks_names.banksNames.SCB, url));
  }

  /**
   * Convert currency name to its ISO code
   * @param {string} currency name to get its ISO code
   */


  (0, _createClass3.default)(SCB, [{
    key: 'scraper',


    /**
     * Scrape rates from html
     * @param {Object} html html of bank web page to scrape
     */
    value: function scraper(html) {
      var $ = _cheerio2.default.load(html);
      var tableRows = $('#Table_01 tr:nth-child(4) > td:nth-child(2) > table tr');
      var rates = [];
      tableRows.each(function (index, row) {
        if (index < 2) return;
        var currencyName = $(row).children().eq(1).text().trim();
        var buyRate = $(row).children().eq(2).text().trim();
        var sellRate = $(row).children().eq(3).text().trim();
        rates.push({
          code: SCB.getCurrencyCode(currencyName),
          buy: Number(buyRate),
          sell: Number(sellRate)
        });
      });
      return rates;
    }
  }], [{
    key: 'getCurrencyCode',
    value: function getCurrencyCode(name) {
      var dict = {
        'US Dollar': 'USD',
        'Sterling Pound': 'GBP',
        'Australian Dollar': 'AUD',
        EUR: 'EUR',
        'Canadian Dollar': 'CAD',
        'Danish Krone': 'DKK',
        'Norwegian Krone': 'NOK',
        'Swedish Krone': 'SEK',
        'Swiss Franc': 'CHF',
        YEN: 'JPY',
        'Saudi Rial': 'SAR',
        'Kuwaiti Dinar': 'KWD',
        'UAE Dirham': 'AED'
      };

      return dict[name];
    }
  }]);
  return SCB;
}(_Bank3.default); /* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

exports.default = SCB;