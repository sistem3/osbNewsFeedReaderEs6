"use strict";

(function() {
    let template = ``;
    class osbNewsFeedReader extends HTMLElement {
        createdCallback() {
            this.createShadowRoot().innerHTML = template;
        };

        attachedCallback() {
        };

        attributeChangedCallback(attrName, oldVal, newVal) {

        };

    }
    // Register Element
    document.registerElement('osb-news-feed-reader', osbNewsFeedReader);
})();