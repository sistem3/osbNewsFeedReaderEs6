"use strict";

(function() {
    let template = `
        <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto:400,300');
            @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css');
            @import '/css/osb-news-feed-reader.css';
        </style>
        <main class="osb-news-feed-reader-holder">
            <h2>News <i class="fa fa-newspaper-o"></i></h2>
            <ul class="feed-list"></ul>
        </main>`;
    class osbNewsFeedReader extends HTMLElement {
        createdCallback() {
            this.createShadowRoot().innerHTML = template;
            var newsFeed = 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk';
            this.$holder = this.shadowRoot.querySelector('.osb-news-feed-reader-holder');
            this.$feedHolder = this.shadowRoot.querySelector('.feed-list');

            this.getNewsFeed(newsFeed);
        };

        attachedCallback() {
        };

        attributeChangedCallback(attrName, oldVal, newVal) {
            if (attrName === 'feed') {
                var feedData = JSON.parse(newVal);
                this.renderTemplate(feedData);
            }
        };

        renderTemplate(feed) {
            var templateHolder = this.$feedHolder;
            feed.entries.forEach(function(element, index, array) {
                console.log(element);
                templateHolder.innerHTML += '<li>' + element.title + '</li>';
            });
        };

        getNewsFeed(feed) {
            console.log(feed);
            var holder = this;
            fetchJsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&q=' + feed)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    var feed = JSON.stringify(json.responseData.feed);
                    return holder.setAttribute('feed', feed);
                }).catch(function(ex) {
                    console.log('parsing failed', ex);
                });
        };

    }
    // Register Element
    document.registerElement('osb-news-feed-reader', osbNewsFeedReader);
})();