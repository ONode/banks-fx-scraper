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

var CAE = function (_Bank) {
  (0, _inherits3.default)(CAE, _Bank);

  function CAE() {
    (0, _classCallCheck3.default)(this, CAE);

    var url = 'https://www.ca-egypt.com/en/personal-banking/';
    return (0, _possibleConstructorReturn3.default)(this, (CAE.__proto__ || (0, _getPrototypeOf2.default)(CAE)).call(this, _banks_names.banksNames.CAE, url));
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */


  (0, _createClass3.default)(CAE, [{
    key: 'scraper',
    value: function scraper(html) {
      var $ = _cheerio2.default.load(html);
      var table = $('#f_box');
      var rows = table.find($('option'));

      var rates = [];
      for (var i = 0; i < rows.length; i += 1) {
        var currencyCode = rows.eq(i).text().trim();
        var buyRate = rows.eq(i).attr('data-buy').trim();
        var sellRate = rows.eq(i).attr('data-sell').trim();

        // Fix JPY rate to be for 100 notes
        if (currencyCode === 'JPY') {
          buyRate *= 100;
          sellRate *= 100;
        }

        rates.push({
          code: currencyCode,
          buy: Number(buyRate),
          sell: Number(sellRate)
        });
      }
      return rates;
    }
  }]);
  return CAE;
}(_Bank3.default); /* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

exports.default = CAE;