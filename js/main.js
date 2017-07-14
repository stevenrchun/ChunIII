$(window).load(function() {
  $(".hello").addClass("visible animated fadeInDown");
  $(".subtitle").addClass("visible animated fadeInDown");
  $(".tiny").addClass("visible animated fadeInDown");

  particlesJS.load('particles-js', 'js/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });

});
