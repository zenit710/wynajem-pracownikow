let PhotoModal = function (selector, modal) {
    this.selector = selector;
    this.imgArray = JSON.parse(selector.dataset.items);
    this.title = selector.attributes.alt.value;
    this.modal = {
        selector: modal,
        title: modal.getElementsByClassName('modal-header')[0],
        body: modal.getElementsByTagName('main')[0],
        prevBtn: modal.getElementsByClassName('photo-modal-prev')[0],
        nextBtn: modal.getElementsByClassName('photo-modal-next')[0]
    };
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

let photos = document.querySelectorAll('img[data-items]'),
    modal = document.getElementById('photo-modal');

for (let i = 0; i < photos.length; i++) {
    new PhotoModal(photos[i], modal);
}