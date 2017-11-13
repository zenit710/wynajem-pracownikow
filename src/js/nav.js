let nav = document.getElementsByClassName('navbar')[0],
    barsButton = nav.getElementsByClassName('mobile-bars')[0],
    linkSection = nav.getElementsByClassName('links')[0];

barsButton.addEventListener('click', function () {
    linkSection.classList.toggle('show');
    barsButton.classList.toggle('active');
});
