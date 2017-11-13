let Navigation = function (navbar) {
    this.navbar = navbar;
    this.barsButton = navbar.getElementsByClassName('mobile-bars')[0];
    this.linkSection = navbar.getElementsByClassName('links')[0];
    this.initialized = false;

    this.init();
};

Navigation.prototype.init = function () {
    if (!this.initialized) {
        let bindBarButtonEvents = () => {
            this.barsButton.addEventListener('click', () => {
                this.linkSection.classList.toggle('show');
                this.barsButton.classList.toggle('active');
            });
        };

        bindBarButtonEvents();

        this.initialized = true;
    }
};

let navbars = document.getElementsByClassName('navbar'),
    nav = null;

if (navbars.length) {
    nav = new Navigation(navbars[0]);
}