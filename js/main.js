const heightScreen = document.querySelector('.screen__portfolio').getBoundingClientRect().height;
const startPointCurve = document.querySelector('.decor__circle').getBoundingClientRect().bottom;
const curve = document.querySelector('.curve');
const widthChooseBlock = document.querySelector('.screen__portfolio').getBoundingClientRect().width / 2;

curve.style.height = heightScreen + 'px';
curve.style.top = startPointCurve / 1.3   + 'px';

window.addEventListener('scroll', function(e) {

  this.pageYOffset > 60  ? document.querySelector('.nav').classList.add('active') 
    : document.querySelector('.nav').classList.remove('active')  

});

