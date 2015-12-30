import { Component } from 'react';

const addWindowListeners = (OuterComponent, events) => class extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { outerComponent } = this;
    const listeners = this.listeners = [];

    Object.keys(events).forEach(eventName => {
      const callbackName = events[eventName];
      const listener = {
        eventName,
        callback: outerComponent[callbackName].bind(outerComponent)
      };

      window.addEventListener(listener.eventName, listener.callback);
      listeners.push(listener);
    });
  }

  componentWillUnmount() {
    this.listeners.forEach(listener => {
      window.removeEventListener(listener.eventName, listener.callback);
    });
  }

  render() {
    return <OuterComponent {...this.props} ref={ref => this.outerComponent = ref} />
  }

}

export default addWindowListeners;
