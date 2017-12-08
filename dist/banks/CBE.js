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

var CBE = function (_Bank) {
  (0, _inherits3.default)(CBE, _Bank);

  function CBE() {
    (0, _classCallCheck3.default)(this, CBE);

    var url = 'http://www.cbe.org.eg/en/EconomicResearch/Statistics/Pages/ExchangeRatesListing.aspx';
    return (0, _possibleConstructorReturn3.default)(this, (CBE.__proto__ || (0, _getPrototypeOf2.default)(CBE)).call(this, _banks_names.banksNames.CBE, url));
  }

  (0, _createClass3.default)(CBE, [{
    key: 'scraper',


    /**
     * Scrape rates from html
     * @param {Object} html html of bank web page to scrape
     */
    value: function scraper(html) {
      var $ = _cheerio2.default.load(html);
      var tableRows = $('tbody').last().children();
      var rates = [];
      tableRows.each(function (index, row) {
        var currencyName = $(row).children().eq(0).text().trim();
        var currencyBuy = $(row).children().eq(1).text().trim();
        var currencySell = $(row).children().eq(2).text().trim();

        rates.push({
          code: CBE.getCurrencyCode(currencyName),
          buy: Number(currencyBuy),
          sell: Number(currencySell)
        });
      });
      return rates;
    }
  }], [{
    key: 'getCurrencyCode',
    value: function getCurrencyCode(name) {
      var dict = {
        'US Dollar​': 'USD',
        'Euro​': 'EUR',
        'Pound Sterling​': 'GBP',
        'Swiss Franc​': 'CHF',
        'Japanese Yen 100​': 'JPY',
        'Saudi Riyal​': 'SAR',
        'Kuwaiti Dinar​': 'KWD',
        'UAE Dirham​': 'AED',
        'Chinese yuan​': 'CNY'
      };

      return dict[name];
    }
  }]);
  return CBE;
}(_Bank3.default); /* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

exports.default = CBE;