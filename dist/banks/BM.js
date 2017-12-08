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

var BM = function (_Bank) {
  (0, _inherits3.default)(BM, _Bank);

  function BM() {
    (0, _classCallCheck3.default)(this, BM);

    var url = 'http://www.banquemisr.com/en/exchangerates';
    return (0, _possibleConstructorReturn3.default)(this, (BM.__proto__ || (0, _getPrototypeOf2.default)(BM)).call(this, _banks_names.banksNames.BM, url));
  }

  /**
   * Convert currency name to its ISO code
   * @param {string} currency name to get its ISO code
   */


  (0, _createClass3.default)(BM, [{
    key: 'scraper',


    /**
     * Scrape rates from html
     * @param {Object} html html of bank web page to scrape
     */
    value: function scraper(html) {
      var $ = _cheerio2.default.load(html);
      var tableRows = $('.exchangeRates tbody tr');

      var rates = [];
      tableRows.each(function (index, row) {
        if (index < 2 || index > 18) return;

        var currencyName = $(row).children().eq(0).text();
        var buyRate = $(row).children().eq(1).text();
        var sellRate = $(row).children().eq(2).text();

        rates.push({
          code: BM.getCurrencyCode(currencyName),
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
        'US DOLLAR': 'USD',
        EURO: 'EUR',
        'GB POUND': 'GBP',
        'SWISS FRANC': 'CHF',
        'DENMARK KRONE': 'DKK',
        'KUWAIT DINAR': 'KWD',
        'SAUDI RIYAL': 'SAR',
        'JORDANIAN DINAR': 'JOD',
        'BAHRAIN DINAR': 'BHD',
        'QATARI RIAL': 'QAR',
        'OMAN RIYAL': 'OMR',
        'UAE DIRHAM': 'AED',
        'SWEDISH KRONA': 'SEK',
        'NORWAY KRONE': 'NOK',
        'CANADA DOLLAR': 'CAD',
        'AUSTRALIA DOLLAR': 'AUD',
        'JAPAN YEN': 'JPY'
      };

      return dict[name];
    }
  }]);
  return BM;
}(_Bank3.default); /* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

exports.default = BM;