import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

// Heavily inspired by
// https://github.com/callemall/material-ui/blob/master/src/popover/popover.jsx

export default class Popover extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: this.props.initiallyOpen
    };
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  componentDidUpdate() {
    this.setPlacement();
  }

  renderChildren() {
    return React.cloneElement(this.props.children, {
      ref: 'children',
      style: {
        position: 'fixed',
        padding: 15,
        border: 'solid 1px #cccccc',
        backgroundColor: '#ffffff'
      }
    });
  }

  render() {
    if (this.state.open) {
      return <div>{this.renderChildren()}</div>;
    } else {
      return null;
    }
  }

  getAnchorPosition(el) {
    if (!el) {
      el = ReactDOM.findDOMNode(this);
    }

    const rect = el.getBoundingClientRect();

    const a = {
      top: rect.top,
      left: rect.left,
      width: el.offsetWidth,
      height: el.offsetHeight
    };

    a.right = rect.right || a.left + a.width;
    a.bottom = rect.bottom || a.top + a.height;
    a.middle = a.left + ((a.right - a.left) / 2);
    a.center = a.top + ((a.bottom - a.top) / 2);

    return a;
  }

  getTargetPosition(el) {
    return {
      top: 0,
      center: el.offsetHeight / 2,
      bottom: el.offsetHeight,
      left: 0,
      middle: el.offsetWidth / 2,
      right: el.offsetWidth
    };
  }

  setPlacement() {
    if (!this.state.open) {
      return;
    }

    const {
      anchorEl,
      targetOrigin,
      anchorOrigin
    } = this.props;

    const targetEl = this.refs.children;

    const anchor = this.getAnchorPosition(anchorEl);
    const target = this.getTargetPosition(targetEl);

    const targetPosition = {
      top: anchor[anchorOrigin.vertical] - target[targetOrigin.vertical],
      left: anchor[anchorOrigin.horizontal] - target[targetOrigin.horizontal]
    };

    targetEl.style.top = Math.max(0, targetPosition.top) + 'px';
    targetEl.style.left = Math.max(0, targetPosition.left) + 'px';
    targetEl.style.maxHeight = window.innerHeight + 'px';
  }

}

Popover.propTypes = {
  anchorEl: PropTypes.object,
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['left', 'middle', 'right']),
    vertical: PropTypes.oneOf(['top', 'center', 'bottom'])
  }),
  children: PropTypes.object,
  initiallyOpen: PropTypes.bool,
  targetOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['left', 'middle', 'right']),
    vertical: PropTypes.oneOf(['top', 'center', 'bottom'])
  })
};

Popover.defaultProps = {
  anchorOrigin: {
    horizontal: 'left',
    vertical: 'bottom'
  },
  initiallyOpen: false
};
