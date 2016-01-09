'use strict';

(function() {
    let template = `
        <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto:400,300');
            @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css');
            @import '/src/css/css/osb-news-feed-reader.css';
        </style>
        <main class="osb-news-feed-reader-holder">
            <h2>News <i class="fa fa-newspaper-o"></i></h2>
            <h3 class="feed-title">Powered by: <span></span></h3>
            <ul class="feed-list"></ul>
        </main>`;
    class osbNewsFeedReader extends HTMLElement {
        createdCallback() {
            this.createShadowRoot().innerHTML = template;
            var newsFeed = 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk';
            this.$holder = this.shadowRoot.querySelector('.osb-news-feed-reader-holder');
            this.$feedHolder = this.shadowRoot.querySelector('.feed-list');
            this.$feedTitle = this.shadowRoot.querySelector('.feed-title');

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
            this.$feedTitle.querySelector('span').innerHTML = feed.title;
            feed.entries.forEach(function(element, index, array) {
                templateHolder.innerHTML +=
                    '<li><h3>' + element.title + '</h3>' +
                    '<p>' + element.content + '</p>' +
                    '<small>' + element.publishedDate.slice(0, 17) + '</small>' +
                    '</li>';
            });
        };

        getNewsFeed(feed) {
            console.log(feed);
            var holder = this;
            fetchJsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&q=' + feed)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    console.log(json.responseData.feed);
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