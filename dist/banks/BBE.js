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

var BBE = function (_Bank) {
  (0, _inherits3.default)(BBE, _Bank);

  function BBE() {
    (0, _classCallCheck3.default)(this, BBE);

    var url = 'http://www.blombankegypt.com/BlomEgypt/Exchange-rates';
    return (0, _possibleConstructorReturn3.default)(this, (BBE.__proto__ || (0, _getPrototypeOf2.default)(BBE)).call(this, _banks_names.banksNames.BBE, url));
  }

  (0, _createClass3.default)(BBE, [{
    key: 'scraper',


    /**
     * Scrape rates from html
     * @param {Object} html html of bank web page to scrape
     */
    value: function scraper(html) {
      var $ = _cheerio2.default.load(html);
      var tableRows = $('.tableHolder table tbody').eq(0).children();
      var rates = [];
      tableRows.each(function (index, row) {
        if (index === 0 || index === 1) return;
        var currencyName = $(row).children().eq(0).text().trim();
        var buyRate = $(row).children().eq(4).text().trim();
        var sellRate = $(row).children().eq(5).text().trim();
        rates.push({
          code: BBE.getCurrencyCode(currencyName),
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
        'USD   02': 'USD',
        'GBP   03': 'GBP',
        'EURO   30': 'EUR',
        'CHF   05': 'CHF',
        '100JPY   09': 'JPY',
        'DKK   13': 'DKK',
        'SEK   11': 'SEK',
        'NOK   22': 'NOK',
        'CAD   15': 'CAD',
        'KWD   21': 'KWD',
        'BHD   23': 'BHD',
        'SAR   07': 'SAR',
        'AED   16': 'AED',
        'QAR   20': 'QAR'
      };
      return dict[name];
    }
  }]);
  return BBE;
}(_Bank3.default); /* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

exports.default = BBE;