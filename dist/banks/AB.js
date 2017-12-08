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

var AB = function (_Bank) {
  (0, _inherits3.default)(AB, _Bank);

  function AB() {
    (0, _classCallCheck3.default)(this, AB);

    var url = 'https://www.alexbank.com/En/Home/ExchangeRates';
    return (0, _possibleConstructorReturn3.default)(this, (AB.__proto__ || (0, _getPrototypeOf2.default)(AB)).call(this, _banks_names.banksNames.AB, url));
  }

  /**
   * Convert currency name to its ISO code
   * @param {string} currency name to get its ISO code
   */


  (0, _createClass3.default)(AB, [{
    key: 'scraper',


    /**
     * Scrape rates from html
     * @param {Object} html html of bank web page to scrape
     */
    value: function scraper(html) {
      var $ = _cheerio2.default.load(html);
      var tableRows = $('.exchangerate-table tr');
      var rates = [];
      tableRows.each(function (index, row) {
        if (index < 1) return;
        var currencyName = $(row).children().eq(0).text().trim();
        var buyRate = $(row).children().eq(1).text().trim();
        var sellRate = $(row).children().eq(2).text().trim();

        rates.push({
          code: AB.getCurrencyCode(currencyName),
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
        'British Pound': 'GBP',
        'Swiss Franc': 'CHF',
        'Japanese Yen': 'JPY',
        'Canadian Dollar': 'CAD',
        'Saudi Rial': 'SAR',
        'Kuwaiti Dinar': 'KWD',
        'Jordanian Dinar': 'JOD',
        'Omani Rial': 'OMR',
        'Bahraini Dinar': 'BHD',
        'Qatari Rial': 'QAR',
        'UAE Dirham': 'AED',
        'Swidish Krone': 'SEK',
        'Norwegian Krone': 'NOK',
        'Danish Krone': 'DKK',
        'Australian Dollar': 'AUD',
        Euro: 'EUR'
      };

      return dict[name];
    }
  }]);
  return AB;
}(_Bank3.default); /* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

exports.default = AB;