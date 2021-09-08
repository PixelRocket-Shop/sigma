import AOS from 'aos';

(function () {
  
  const options = {
    duration: 700,
    easing: 'ease-in',
    once: true,
    startEvent: 'load',
    disable: 'mobile'
  };

  AOS.init(options);

})();