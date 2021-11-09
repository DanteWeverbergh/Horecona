const Elements = {
  // heading
  createHeader({ size = 1, textContent = '', id = '', classList = '' }) {
    const header = document.createElement(`h${size}`);
    header.textContent = textContent;
    header.id = id;
    header.classList = classList;
    return header;
  },

  // button
  createButton({ textContent = '', onClick = null, id = '', className = '' }) {
    const button = document.createElement('button');
    button.textContent = textContent;
    button.id = id;
    button.className = className;

    if (onClick) {
      button.addEventListener('click', () => {
        onClick();
      });
    }
    return button;
  },

  // image
  createImg({ src = '', alt = '' }) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    return img;
  },

  // div
  createDiv({ id = '', classList = '' }) {
    const div = document.createElement('div');
    div.id = id;
    div.classList = classList;
    return div;
  },

  // link
  createLink({ href = '#', textContent = '', target = '_self', id = '' }) {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = textContent;
    a.target = target;
    a.id = id;
    return a;
  },

  // list
  createList({ items = [], ordered = false }) {
    const list = document.createElement(ordered ? 'ol' : 'ul');
    items.forEach(({ textContent, href }) => {
      const li = document.createElement('li');
      if (!href) {
        li.textContent = textContent;
      } else {
        li.appendChild(
          Elements.createLink({
            textContent,
            href,
          })
        );
      }
      list.appendChild(li);
    });
    return list;
  },

  //input field
  createInput({
    placeholder = '',
    id = '',
    type = '',
    value = '',
    className = '',
  }) {
    const input = document.createElement('input');
    input.placeholder = placeholder;
    input.id = id;
    input.type = type;
    input.value = value;
    input.className = className;
    return input;
  },

  //input field
  createRatingInput({
    placeholder = '',
    id = '',
    value = '',
    min = 1,
    max = 5,
  }) {
    const input = document.createElement('input');
    input.placeholder = placeholder;
    input.id = id;
    input.type = 'number';
    input.value = value;
    input.className = 'checkoutContainer__form__inputItem';
    input.min = min;
    input.max = max;
    return input;
  },

  //label
  createLabel({ id = '', textContent = '' }) {
    const label = document.createElement('label');
    label.id = id;
    label.textContent = textContent;
    return label;
  },

  // dashboard nav
  createCard({ textContent, onClick, id }) {
    const card = Elements.createDiv({
      id: 'card',
      classList: 'dashboardContainer__div',
    });

    card.appendChild(
      Elements.createButton({
        textContent: textContent,
        onClick: onClick,
        id: id,
        className: 'dashboardContainer__div__button',
      })
    );
    return card;
  },

  createQrDiv({ id = '', style = '' }) {
    const qrdiv = document.createElement('div');

    qrdiv.id = id;
    qrdiv.style = style;

    return qrdiv;
  },

  createArrow() {
    const arrow = document.createElement('i');

    arrow.classList.add('back');

    return arrow;
  },

  createBack() {
    const back = Elements.createLink({
      href: '/dashboard',
    });

    back.appendChild(Elements.createArrow());

    return back;
  },

  createRestaurantItem({ name, adres, onClick }) {
    const button = Elements.createButton({
      onClick: onClick,
      id: 'restaurant',
    });

    const naam = button.appendChild(
      Elements.createHeader({
        textContent: name,
        size: 3,
      })
    );

    const adress = button.appendChild(
      Elements.createHeader({
        textContent: adres,
        size: 4,
      })
    );

    return button;
  },

  createText({ className = '', id = '', textContent = '' }) {
    const p = document.createElement('p');
    p.textContent = textContent;
    p.className = className;
    p.id = id;

    return p;
  },
};

export default Elements;
