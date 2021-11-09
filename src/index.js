import './sass/main.scss';

import App from './App';
import {
  LoginComponent,
  StartComponent,
  RegisterClientComponent,
  DashboardComponent,
  CreatQRComponent,
  CheckinComponent,
  RegisterClientInfoComponent,
  ProfileComponent,
  RegisterBusinessComponent,
  RegisterBusProfileComponent,
  RegisterBusInfoComponent,
  VisitorComponent,
  CheckoutComponent,
  CafesComponent,
  HistoryClientComponent,
  HistoryBusinessComponent,
  CheckOutComponent,
} from './Components';

const initApp = () => {
  const appContainer = document.getElementById('appContainer');

  const app = new App(appContainer);

  app.addComponent(new LoginComponent());
  app.addComponent(new StartComponent());
  app.addComponent(new RegisterClientComponent());
  app.addComponent(new RegisterClientInfoComponent());
  app.addComponent(new DashboardComponent());
  app.addComponent(new CreatQRComponent());
  app.addComponent(new CheckinComponent());
  app.addComponent(new ProfileComponent());
  app.addComponent(new RegisterBusinessComponent());
  app.addComponent(new RegisterBusProfileComponent());
  app.addComponent(new RegisterBusInfoComponent());
  app.addComponent(new VisitorComponent());

  app.addComponent(new CafesComponent());
  app.addComponent(new HistoryClientComponent());
  app.addComponent(new HistoryBusinessComponent());
  app.addComponent(new CheckOutComponent());

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
};

window.addEventListener('load', initApp);
