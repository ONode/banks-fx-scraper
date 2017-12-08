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

var ADIB = function (_Bank) {
  (0, _inherits3.default)(ADIB, _Bank);

  function ADIB() {
    (0, _classCallCheck3.default)(this, ADIB);

    var url = 'https://www.adib.eg/Foreign-Currencies';
    return (0, _possibleConstructorReturn3.default)(this, (ADIB.__proto__ || (0, _getPrototypeOf2.default)(ADIB)).call(this, _banks_names.banksNames.ADIB, url));
  }

  (0, _createClass3.default)(ADIB, [{
    key: 'scraper',


    /**
     * Scrape rates from html
     * @param {Object} html html of bank web page to scrape
     */
    value: function scraper(html) {
      var $ = _cheerio2.default.load(html);
      var tableRows = $('.tbl-analyst tbody').children();
      var rates = [];
      tableRows.each(function (index, row) {
        if (index === 0) return;
        var currencyName = $(row).children().eq(0).text().trim();
        var buyRate = $(row).children().eq(1).text().trim();
        var sellRate = $(row).children().eq(2).text().trim();

        // Fix JPY rate to be for 100 notes
        if (ADIB.getCurrencyCode(currencyName) === 'JPY') {
          buyRate *= 100;
          sellRate *= 100;
        }

        rates.push({
          code: ADIB.getCurrencyCode(currencyName),
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
        'US Dollars': 'USD',
        'British Pound': 'GBP',
        Euro: 'EUR',
        'Swiss Franc': 'CHF',
        'Japanese Yen': 'JPY',
        'Thai Baht': 'THB',
        'Australian Dollar': 'AUD',
        'Danish Krone': 'DKK',
        'Swidish Krone': 'SEK',
        'Norwegian Krone': 'NOK',
        'Canadian Dollar': 'CAD',
        'Kuwaiti Dinar': 'KWD',
        'Omani Rial': 'OMR',
        'Bahraini Dinar': 'BHD',
        'Saudi Rial': 'SAR',
        'Emirati Dirham': 'AED',
        'Qatari Rial': 'QAR'
      };
      return dict[name];
    }
  }]);
  return ADIB;
}(_Bank3.default); /* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

exports.default = ADIB;