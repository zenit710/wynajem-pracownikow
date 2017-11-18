let PhotoModal = function (selector) {
    this.selector = selector;
    this.imgArray = JSON.parse(selector.dataset.items);
    this.title = selector.attributes.alt.value;
    this.initialized = false;

    this.init();
};

PhotoModal.prototype.init = function () {
    if (!this.initialized) {
        this.attachClickEvent();

        this.initialized = true;
    }
};

PhotoModal.prototype.attachClickEvent = function () {
    this.selector.addEventListener("click", () => {
        let pswpElement = document.querySelectorAll('.pswp')[0],
            options = {
                index: 0
            },
            photoSwiper = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, this.imgArray, options);

        photoSwiper.init();
    });
};

let photos = document.querySelectorAll('img[data-items]');

for (let i = 0; i < photos.length; i++) {
    new PhotoModal(photos[i]);
}