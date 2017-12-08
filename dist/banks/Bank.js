'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('request');

var Bank = function () {
  /**
   * @param {Object} bankName names of the bank acronym, english,
   * arabic, etc
   * @param {String} url of the bank exchange rates web page
   */
  function Bank(bankName, bankURL) {
    (0, _classCallCheck3.default)(this, Bank);

    this.name = bankName;
    this.url = bankURL;
  }

  /**
   * Request then pass html to scraper function for scraping
   * @param {function} finish callback to pass rates to when finish scraping
   */


  (0, _createClass3.default)(Bank, [{
    key: 'scrape',
    value: function scrape(finish) {
      var _this = this;

      request(this.url, function (error, response, html) {
        /**
         * [rates description]
         * @type {Array} rates [
         *                      {
         *                        code: USD, //currency iso code
         *                        buy: 20.4,
         *                        sell: 18.25
         *                      },
         *                      {
         *                        code: EUR,
         *                        buy: 18,
         *                        sell: 16.5
         *                      }
         *                     ]
         */
        var rates = null;
        if (!error && response.statusCode === 200) {
          rates = _this.scraper(html);
          finish(null, rates);
        } else {
          finish(new Error('Error requisting ' + _this.name));
        }
      });
    }
  }]);
  return Bank;
}();

exports.default = Bank;