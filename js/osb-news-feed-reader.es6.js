"use strict";

(function() {
    let template = `
        <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto:400,300');
            @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css');
            @import '/css/osb-news-feed-reader.css';
        </style>
        <main>
            <h2>News <i class="fa fa-newspaper-o"></i></h2>
            <ul class="feed-list"></ul>
        </main>`;
    class osbNewsFeedReader extends HTMLElement {
        createdCallback() {
            this.createShadowRoot().innerHTML = template;
            this.getNewsFeed();
        };

        attachedCallback() {
        };

        attributeChangedCallback(attrName, oldVal, newVal) {

        };

        getNewsFeed(feed) {
            console.log(feed);
            fetch('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=')
                .then(function() {

                });
        };

    }
    // Register Element
    document.registerElement('osb-news-feed-reader', osbNewsFeedReader);
})();