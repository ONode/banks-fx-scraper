'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _Bank2 = require('./Bank');

var _Bank3 = _interopRequireDefault(_Bank2);

var _banks_names = require('./banks_names');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CIB = function (_Bank) {
  (0, _inherits3.default)(CIB, _Bank);

  function CIB() {
    (0, _classCallCheck3.default)(this, CIB);

    var url = 'http://www.cibeg.com/_layouts/15/LINKDev.CIB.CurrenciesFunds/FundsCurrencies.aspx/GetCurrencies';
    return (0, _possibleConstructorReturn3.default)(this, (CIB.__proto__ || (0, _getPrototypeOf2.default)(CIB)).call(this, _banks_names.banksNames.CIB, url));
  }

  /**
   * Request then pass json to scraper
   * @param {function} finish callback to pass rates to when finish scraping
   */


  (0, _createClass3.default)(CIB, [{
    key: 'scrape',
    value: function scrape(finish) {
      var _this2 = this;

      (0, _request2.default)({
        url: this.url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: (0, _stringify2.default)(JSON.parse('{ "lang": "en" }'))
      }, function (error, response, body) {
        try {
          var currencyList = JSON.parse(body).d;
          var rates = _this2.scraper(currencyList);
          finish(null, rates);
        } catch (err) {
          finish(err);
        }
      });
    }

    /**
     * Scrape rates from html
     * @param {Object} currencyList list from the bank's raw json
     */

  }, {
    key: 'scraper',
    value: function scraper(currencyList) {
      var rates = [];
      currencyList.forEach(function (currency) {
        rates.push({
          code: currency.CurrencyID,
          buy: currency.BuyRate,
          sell: currency.SellRate
        });
      });
      return rates;
    }
  }]);
  return CIB;
}(_Bank3.default); /* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

exports.default = CIB;