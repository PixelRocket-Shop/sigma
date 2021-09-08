import Typed from 'typed.js';

(function () {
    const typedElems = document.querySelectorAll('[data-typed]') || [];

    typedElems.forEach(elem => {
      const elemOptions = elem.dataset.typed ? JSON.parse(elem.dataset.typed) : {};

      const defaultOptions = {
        typeSpeed: 50,
        backSpeed: 35,
        backDelay: 1000,
        loop: true,
      };
      const options = {
        ...defaultOptions,
        ...elemOptions
      };
      new Typed(elem, options);
    });
})();