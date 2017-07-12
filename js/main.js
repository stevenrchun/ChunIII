particlesJS.load('particles-js', 'js/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

$(document).ready(function() {
  $(".hello").addClass("visible animated fadeInDown");
  $(".subtitle").addClass("visible animated fadeInDown");
  $(".tiny").addClass("visible animated fadeInDown");
});
