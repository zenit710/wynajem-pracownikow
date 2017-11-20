let Navigation = function (navbar) {
    this.NAV_SCROLL_LIMIT = 50;

    this.navbar = navbar;
    this.navbarHeight = navbar.getBoundingClientRect().height;
    this.barsButton = navbar.getElementsByClassName('mobile-bars')[0];
    this.linkSection = navbar.getElementsByClassName('links')[0];
    this.links = this.linkSection.getElementsByTagName('a');
    this.internalLinks = [];
    this.initialized = false;

    this.init();
};

Navigation.prototype.init = function () {
    if (!this.initialized) {
        let bindBarButtonClick = () => {
            this.barsButton.addEventListener('click', () => {
                this.linkSection.classList.toggle('show');
                this.barsButton.classList.toggle('active');
            });
        };

        let initInternalLinks = () => {
            for (let i = 0; i < this.links.length; i++) {
                let hash = this.links[i].attributes.href.value,
                    destination,
                    offsetTop,
                    destinationHeight;

                if (hash.length > 1 && hash.substr(0,1) === '#') {
                    destination = document.querySelector(hash);
                    offsetTop = destination.offsetTop - this.navbarHeight;
                    destinationHeight = destination.getBoundingClientRect().height;

                    this.internalLinks.push({
                        element: this.links[i],
                        start: offsetTop,
                        end: offsetTop + destinationHeight
                    });
                }
            }
        };

        let bindScrollEvent = () => {
            document.addEventListener('scroll', () => {
                this.navbar.classList.toggle('scrolled', window.pageYOffset > this.NAV_SCROLL_LIMIT);

                for (let i = 0; i < this.internalLinks.length; i++) {
                    this.internalLinks[i].element.classList.remove('active');

                    if (this.internalLinks[i].start <= window.scrollY && this.internalLinks[i].end > window.scrollY) {
                        this.internalLinks[i].element.classList.add('active');
                    }
                }
            });
        };

        let bindResizeEvent = () => {
            window.addEventListener('resize', () => {
                this.internalLinks = [];
                initInternalLinks();
            });
        };

        bindBarButtonClick();
        initInternalLinks();
        bindScrollEvent();
        bindResizeEvent();

        this.initialized = true;
    }
};

let navbars = document.getElementsByClassName('navbar'),
    nav = null;

if (navbars.length) {
    nav = new Navigation(navbars[0]);
}