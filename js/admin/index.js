const app = {
  appSelector: document.querySelector('.page'),
  store: {
    auth: {
      name: '',
      password: '',
    },
    error: '',
    creator: {
      name: '',
      date: '',
      mainDescription: '',
      subDescription: '',
      imgBanner: '',
      imgAll: []
    }
  },
  routeTo: function (templateName) {
    this.appSelector.innerHTML = templateName;
  },
  initEvent: function () {
    let allButtons = document.querySelectorAll('.button');
    let triggerInputs = document.querySelectorAll('.input__view');
    let creatorsInputs = document.querySelectorAll('.input');
    //triggerInputs
    triggerInputs.forEach((input) => {
      const { auth } = this.store;

      input.addEventListener('input', (e) => {
        switch (input.dataset.trigger) {
          case 'login':
            auth.name = e.target.value;
            break;
          case 'password':
            auth.password = e.target.value;
          default:
        }
      });
    });
    //creators inputs
    creatorsInputs.forEach((input) => {
      let _this = input;
      let { creator } = this.store;

      _this.addEventListener('onchange', (e) => {
        e.target.value ? _this.dataset.fit = true : _this.dataset.fit = false;

        switch (_this.dataset.field) {
          case 'name':
            creator.name = e.target.value;
            break;
          case 'date':
            creator.date = e.target.value;
            break;
          case 'main_description':
            creator.mainDescription = e.target.value;
            break;
          case 'sub_description':
            creator.subDescription = e.target.value;
            break;
          case 'img_baner':
            break;
          case 'img_all':
            break;
        }
      });
    })
    //buttons
    allButtons.forEach((button) => {
      let _this = button;
      let { auth, error } = this.store;

      switch (_this.dataset.event_type) {
        case 'auth':
          _this.addEventListener('click', (e) => {
            if (auth.name && auth.password) {
              fetch('http://localhost:3000/auth', {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
                body: JSON.stringify(auth)
              }).then(res => res.json()).then(res => {
                res.auth
                  ?
                  this.routeTo(this.template.controlls)
                  :
                  error = res.error;

                if (error) {
                  document.querySelector('.error__catch').innerHTML = error;
                }

              });
            }
          });
          break;
        default:
      }
    });
  },
  template: {
    login: `
        <div class="modal">
          <div class="modal__wrapper">
            <div class="modal__title">
              Авторизация
            </div>
            <div class="input__data_block">
              <input data-trigger="login" placeholder="name" type="text" class="input__view" />
              <input data-trigger="password" placeholder="*******" type="password" class="input__view" />
            </div>
            <div data-event_type="auth" class="button">
              login
            </div>
            <div class="error__catch"></div>  
          </div>
        </div>
    `,
    controlls:
      `
        <div class="main">
          <div class="wrapper">
            <div class="title">Добавление проекта</div>
            <div class="block">
              <label class="label">
                Название проекта
                <input data-field="name" class="input" type="text"  />
              </label>
              <label class="label">
                Дата проекта
                <input data-field="date" class="input" type="text"  />
              </label>
              <label class="label">
                Главное описание 
                <input data-field="main_description" class="input" type="text"  />
              </label>
              <label class="label">
                Баннер
                <input data-field="img_baner" class="input" type="file"  />
              </label>
              <label class="label">
                Второстепенное описание 
                <input data-field="sub_description" class="input" type="text"  />
              </label>
              <label class="label">
                Изображения
                <input data-field="img_all" multiple class="input" type="file"  />
              </label>
            </div>
          </div>
        </div>
      `
  },
  init: function (chooseTemplate) {
    chooseTemplate = this.appSelector;
    fetch('http://localhost:3000/isAuth', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
    }).then(res => res.json()).then(res => {
      if (res.userIsAuth) {
        chooseTemplate.innerHTML = this.template.controlls;
      }
      else {
        chooseTemplate.innerHTML = this.template.login;
      }
      this.initEvent();
    });
  }
}
app.init();