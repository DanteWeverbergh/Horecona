import Component from '../lib/Component';
import Elements from '../lib/Elements';
import { QRCode } from '../lib/qrcode';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

class CreatQRComponent extends Component {
  constructor() {
    super({
      name: 'qrcodecreator',
      model: {
        code: '',
      },
      routerPath: '/qrcodecreator',
    });
  }

  render() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const db = firebase.firestore();

        const docRef = db.collection('businesses').doc(user.uid);

        docRef.get().then((doc) => {
          if (doc.exists) {
            if (doc.data().checkinCode != null) {
              createQRContainer.appendChild(
                Elements.createHeader({
                  textContent: `Uw code is: ${doc.data().checkinCode}`,
                  size: 2,
                })
              );

              extraDiv.classList.add('hidden');
              check.classList.add('hidden');
            }
          }

          const compareCodes = () => {
            //vergelijk codes uit de database met de code uit de input

            const inputCode = qrcodeForm.value;

            if (inputCode === 1) {
              // code bestaat al => alert en vragen om opnieuw te proberen
              alert(`De code ${inputCode} besaat al probeer opnieuw.`);
            } else {
              // console.log(codes.includes(inputCode));

              // schrijf code naar de database
              const generate = () => {
                const QRContainer = qrcodeContainer;
                const input = qrcodeForm.value;

                const qrcode = new QRCode(QRContainer, {
                  text: input,
                  width: 128,
                  height: 128,
                  colorDark: '#3b3a41',
                  colorLight: '#FFFFFF',
                });

                // automatically appends the QR code
                qrcode.makeCode();
              };

              const generateCode = () => {
                const docData = {
                  checkinCode: qrcodeForm.value,
                };

                const db = firebase.firestore();

                return db
                  .collection('businesses')
                  .doc(user.uid)
                  .update(docData)
                  .then(() => {
                    alert(`Uw code: ${docData.checkinCode} is opgeslagen.`);
                  });
              };
              const codeQr = () => {
                generateCode();
                generate();
              };

              contentDiv.appendChild(
                Elements.createButton({
                  textContent: 'genereer je code',
                  id: 'primary',
                  onClick: () => codeQr(),
                })
              );

              console.log('unieke code');
            }
          };
          /*
          const generate = () => {
            const QRContainer = qrcodeContainer;
            const input = qrcodeForm.value;

            const qrcode = new QRCode(QRContainer, {
              text: input,
              width: 128,
              height: 128,
              colorDark: '#3b3a41',
              colorLight: '#FFFFFF',
            });

            // automatically appends the QR code
            qrcode.makeCode();
          };

          const generateCode = () => {
            const docData = {
              checkinCode: qrcodeForm.value,
            };

            const db = firebase.firestore();

            return db
              .collection('businesses')
              .doc(user.uid)
              .update(docData)
              .then(() => {
                alert(`Uw code: ${docData.checkinCode} is opgeslagen.`);
              });
          };
          const codeQr = () => {
            generateCode();
            generate();
          };
          */

          extraDiv.appendChild(
            Elements.createHeader({
              textContent: 'Maak QR code aan',
              id: 'qr',
            })
          );

          const contentDiv = extraDiv.appendChild(
            Elements.createDiv({
              id: 'login',
            })
          );

          contentDiv.classList.add('loginForm');

          const qrcodeForm = contentDiv.appendChild(
            Elements.createInput({
              type: 'number',
              id: 'input',
              placeholder: 'qrcode',
            })
          );

          const qrcodeContainer = extraDiv.appendChild(
            Elements.createDiv({
              id: 'qrcode',
            })
          );

          const check = createQRContainer.appendChild(
            Elements.createButton({
              textContent: 'Verifiër',
              id: 'primary',
              onClick: () => compareCodes(),
            })
          );
        });
      }
    });

    const createQRContainer = Elements.createDiv({
      id: 'createQR',
    });

    const extraDiv = createQRContainer.appendChild(Elements.createDiv({}));
    extraDiv.classList.add('createQr__div');

    const backLink = createQRContainer.appendChild(
      Elements.createLink({
        href: '/dashboard',
      })
    );

    backLink.appendChild(Elements.createArrow());

    return createQRContainer;
  }
}

export default CreatQRComponent;
