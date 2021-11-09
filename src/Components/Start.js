import Component from '../lib/Component';
import Elements from '../lib/Elements';

class StartComponent extends Component {
  constructor() {
    super({
      name: 'start',
      model: {
        userType: 'client',
      },
      routerPath: '/',
    });
  }

  klant() {
    this.model.userType = 'client';
  }

  zaak() {
    this.model.userType = 'business';
  }

  render() {
    const { userType } = this.model;

    const startContainer = Elements.createDiv({
      id: 'start',
      classList: 'startContainer',
    });

    const loginDiv = startContainer.appendChild(
      Elements.createDiv({
        id: 'loginBtn',
        classList: 'startContainer__login',
      })
    );

    loginDiv.appendChild(
      Elements.createButton({
        id: 'primary',
        textContent: 'Inloggen',
        className: 'startContainer__login__button',
        onClick: () => (window.location.href = '/login'),
      })
    );

    const registerDiv = startContainer.appendChild(
      Elements.createDiv({
        id: 'registerBtn',
        classList: 'startContainer__register',
      })
    );

    const switcher = startContainer.appendChild(
      Elements.createDiv({
        id: 'switcher',
        classList: 'startContainer__switcher',
      })
    );

    if (userType === 'client') {
      registerDiv.appendChild(
        Elements.createButton({
          id: 'secondary',
          textContent: 'Registreren',
          onClick: () => (window.location.href = '/register'),
        })
      );

      const clientSwitcher = switcher.appendChild(
        Elements.createButton({
          className: 'startContainer__switcher__client',
          textContent: 'klant',
          id: 'primarySmallLeft',
          onClick: () => this.klant(),
        })
      );

      clientSwitcher.classList.add('active');

      const cafeSwitcher = switcher.appendChild(
        Elements.createButton({
          className: 'startContainer__switcher__business',
          textContent: 'zaakvoerder',
          id: 'secondarySmallRight',
          onClick: () => this.zaak(),
        })
      );
    } else {
      registerDiv.appendChild(
        Elements.createButton({
          id: 'secondary',
          textContent: 'Registreren',
          onClick: () => (window.location.href = '/registerbusprofile'),
        })
      );

      const clientSwitcher = switcher.appendChild(
        Elements.createButton({
          className: 'startContainer__switcher__client',
          textContent: 'klant',
          id: 'secondarySmallLeft',
          onClick: () => this.klant(),
        })
      );

      const cafeSwitcher = switcher.appendChild(
        Elements.createButton({
          className: 'startContainer__switcher__business',
          textContent: 'zaakvoerder',
          id: 'primarySmallRight',
          onClick: () => this.zaak(),
        })
      );

      cafeSwitcher.classList.add('active');
    }

    return startContainer;
  }
}

export default StartComponent;
