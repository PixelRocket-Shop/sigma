(function() {

    const CSS_SCROLL_CLASS = 'is-scrolling';

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            document.body.classList.add(CSS_SCROLL_CLASS);
            return;
        }

        document.body.classList.remove(CSS_SCROLL_CLASS);
    });

})();