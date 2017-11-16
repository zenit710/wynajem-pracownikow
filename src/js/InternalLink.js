let InternalLink = function (selector) {
    this.selector = selector;
    this.hash = selector.attributes.href.value;
    this.destination = null;
    this.initialized = false;

    this.init();
};

InternalLink.prototype.init = function () {
    if (!this.initialized) {
        if (this.hash.length > 1) {
            this.destination = document.querySelector(this.hash);
        }

        this.attachClickEvent();

        this.initialized = true;
    }
};

InternalLink.prototype.attachClickEvent = function () {
    if (!this.initialized) {
        this.selector.addEventListener("click", () => {
            this.go();
        });
    }
};

InternalLink.prototype.go = function () {
    animateScrollTo(this.destination || 0);
};

(function() {
    let links = document.querySelectorAll('a'),
        i,
        hash;

    for (i = 0; i < links.length; i++) {
        hash = links[i].attributes.href.value;

        if (hash.substr(0, 1) === '#') {
            new InternalLink(links[i]);
        }
    }
})();