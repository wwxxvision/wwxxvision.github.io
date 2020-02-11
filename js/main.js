import AOS from 'aos';


console.log(AOS)

window.scrollTo(0, 0);

function normalizeDecorCurve() {
  const heightScreen = document.querySelector('.screen__portfolio').getBoundingClientRect().height;
  const startPointCurve = document.querySelector('.decor__circle').getBoundingClientRect().bottom;
  const curve = document.querySelector('.curve');

  curve.style.height = heightScreen + 'px';
  curve.style.top = startPointCurve / 1.3 + 'px';
}

window.addEventListener('scroll', function (e) {
  if (this.pageYOffset > 2) {
    document.querySelector('nav').style.transform = `translateX(-300)px`;
  }
  this.pageYOffset > 10 ? document.querySelector('.nav').classList.add('active ')
    : document.querySelector('.nav').classList.remove('active');
  
});


//block for tabs

function initTabs() {
  const projectTabs = document.querySelectorAll('.list__item');
  const allProjects = document.querySelectorAll('.project__page');

  if (projectTabs.length) {
    const clear = (allTabs) => allTabs.forEach((tab) => {
      const textName = tab.childNodes[3];
      tab.dataset.active = false;
      tab.firstChild.nextSibling.classList.remove('select__active');
      textName.classList.remove('tab__active');
    });

    const select = (tab) => {
      allProjects.forEach((project) => project.dataset.active = false);

      if (tab.dataset.active) {
        const textName = tab.childNodes[3];

        tab.firstChild.nextSibling.classList.add('select__active');
        textName.classList.add('tab__active');

        allProjects.forEach((project) => {
          if (tab.dataset.project_id === project.dataset.project_id) {
            project.dataset.active = true;
            AOS.init();

            let topPos = project.getBoundingClientRect().top + window.scrollY - 100;
            console.log(project.getBoundingClientRect())
            window.scroll({
              top: topPos,
              behavior: 'smooth'
            });
          }
        });
      }
    }

    projectTabs.forEach((tab, i) => {
      tab.dataset.id = i;
      tab.addEventListener('click', (e) => {
        let _this = e.currentTarget;

        clear(projectTabs);

        _this.dataset.active = true;
        select(tab);
      });

    });


  }
  else {
    console.error('Undefined selector by list__item');
  }
}
window.addEventListener('resize', (e) => {
  initTabs();
  normalizeDecorCurve();
});


initTabs();
normalizeDecorCurve();