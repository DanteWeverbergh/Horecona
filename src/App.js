import Component from './lib/Component';
import Router from './Router';
import initFirebase from './lib/Firebase';
import firebase from 'firebase/app';
import 'firebase/auth';

class App {
  constructor(parent) {
    this.parent = parent;
    this.components = [];
    initFirebase();
  }

  clearParent() {
    while (this.parent.firstChild) {
      this.parent.removeChild(this.parent.lastChild);
    }
  }

  addComponent(component) {
    if (!(component instanceof Component)) return;

    //get name from component
    const { name, routerPath } = component;

    component.reRender = () => this.showComponent(component);
    //add to internal class
    this.components.push(component);

    Router.getRouter()
      .on(routerPath, (props) => {
        this.showComponent({
          name,
          props,
        });
      })
      .resolve();
  }

  showComponent({ name, props }) {
    const foundComponent = this.components.find(
      (component) => component.name === name
    );
    if (!foundComponent) return;
    this.clearParent();
    if (props) foundComponent.props = props;
    this.parent.appendChild(foundComponent.render());
  }
}

export default App;
