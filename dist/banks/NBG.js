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

var NBG = function (_Bank) {
  (0, _inherits3.default)(NBG, _Bank);

  function NBG() {
    (0, _classCallCheck3.default)(this, NBG);

    var url = 'http://www.nbg.com.eg/en/exchange-rates';
    return (0, _possibleConstructorReturn3.default)(this, (NBG.__proto__ || (0, _getPrototypeOf2.default)(NBG)).call(this, _banks_names.banksNames.NBG, url));
  }

  /**
   * Scrape rates from html
   * @param {Object} html html of bank web page to scrape
   */


  (0, _createClass3.default)(NBG, [{
    key: 'scraper',
    value: function scraper(html) {
      var $ = _cheerio2.default.load(html);
      var table = $('#exchange').eq(1);
      var rows = table.find($('tr'));

      var rates = [];
      rows.each(function (index, row) {
        if (index === 0) return;

        var currencyCode = $(row).children().eq(1).text().trim();
        var buyRate = $(row).children().eq(2).text().trim();
        var sellRate = $(row).children().eq(3).text().trim();

        rates.push({
          code: currencyCode,
          buy: Number(buyRate),
          sell: Number(sellRate)
        });
      });
      return rates;
    }
  }]);
  return NBG;
}(_Bank3.default); /* eslint class-methods-use-this: ["error", { "exceptMethods": ["scraper"] }] */

exports.default = NBG;