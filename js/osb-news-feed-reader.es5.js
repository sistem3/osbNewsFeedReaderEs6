"use strict";

var _temporalUndefined = {};

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _temporalAssertDefined(val, name, undef) { if (val === undef) { throw new ReferenceError(name + ' is not defined - temporal dead zone'); } return true; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
    var template = _temporalUndefined;
    var osbNewsFeedReader = _temporalUndefined;

    // Register Element
    template = '\n        <style>\n            @import url(\'https://fonts.googleapis.com/css?family=Roboto:400,300\');\n            @import url(\'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css\');\n            @import \'/css/osb-news-feed-reader.css\';\n        </style>\n        <main class="osb-news-feed-reader-holder">\n            <h2>News <i class="fa fa-newspaper-o"></i></h2>\n            <ul class="feed-list"></ul>\n        </main>';

    osbNewsFeedReader = (function (_HTMLElement) {
        _inherits(_temporalAssertDefined(osbNewsFeedReader, 'osbNewsFeedReader', _temporalUndefined) && osbNewsFeedReader, _HTMLElement);

        function osbNewsFeedReader() {
            _classCallCheck(this, _temporalAssertDefined(osbNewsFeedReader, 'osbNewsFeedReader', _temporalUndefined) && osbNewsFeedReader);

            _get(Object.getPrototypeOf((_temporalAssertDefined(osbNewsFeedReader, 'osbNewsFeedReader', _temporalUndefined) && osbNewsFeedReader).prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(_temporalAssertDefined(osbNewsFeedReader, 'osbNewsFeedReader', _temporalUndefined) && osbNewsFeedReader, [{
            key: 'createdCallback',
            value: function createdCallback() {
                this.createShadowRoot().innerHTML = _temporalAssertDefined(template, 'template', _temporalUndefined) && template;
                var newsFeed = 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk';
                this.$holder = this.shadowRoot.querySelector('.osb-news-feed-reader-holder');
                this.$feedHolder = this.shadowRoot.querySelector('.feed-list');

                this.getNewsFeed(newsFeed);
            }
        }, {
            key: 'attachedCallback',
            value: function attachedCallback() {}
        }, {
            key: 'attributeChangedCallback',
            value: function attributeChangedCallback(attrName, oldVal, newVal) {
                if (attrName === 'feed') {
                    var feedData = JSON.parse(newVal);
                    this.renderTemplate(feedData);
                }
            }
        }, {
            key: 'renderTemplate',
            value: function renderTemplate(feed) {
                var templateHolder = this.$feedHolder;
                feed.entries.forEach(function (element, index, array) {
                    templateHolder.innerHTML += '<li><h3>' + element.title + '</h3></li>';
                });
            }
        }, {
            key: 'getNewsFeed',
            value: function getNewsFeed(feed) {
                console.log(feed);
                var holder = this;
                fetchJsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&q=' + feed).then(function (response) {
                    return response.json();
                }).then(function (json) {
                    console.log(json.responseData.feed);
                    var feed = JSON.stringify(json.responseData.feed);
                    return holder.setAttribute('feed', feed);
                })['catch'](function (ex) {
                    console.log('parsing failed', ex);
                });
            }
        }]);

        return _temporalAssertDefined(osbNewsFeedReader, 'osbNewsFeedReader', _temporalUndefined) && osbNewsFeedReader;
    })(HTMLElement);

    document.registerElement('osb-news-feed-reader', _temporalAssertDefined(osbNewsFeedReader, 'osbNewsFeedReader', _temporalUndefined) && osbNewsFeedReader);
})();