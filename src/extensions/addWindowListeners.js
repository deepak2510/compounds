import { Component } from 'react';

const addWindowListeners = events => WrappedComponent => class extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { wrappedComponent } = this;
    const listeners = this.listeners = [];

    Object.keys(events).forEach(eventName => {
      const callbackName = events[eventName];
      const listener = {
        eventName,
        callback: wrappedComponent[callbackName].bind(wrappedComponent)
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
    return <WrappedComponent {...this.props} ref={ref => this.wrappedComponent = ref} />
  }

}

export default addWindowListeners;
