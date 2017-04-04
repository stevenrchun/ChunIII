particlesJS.load('particles-js', 'js/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

$(window).load(function() {
  $(".title").addClass("animated fadeInDown");
  $(".subtitle").addClass("animated fadeInDown");
  $(".tiny").addClass("animated fadeInDown");
});
