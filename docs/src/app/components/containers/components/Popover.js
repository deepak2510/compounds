import React, { Component } from 'react';
import { Popover } from 'pearson-compounds';
import Demo from '../../Demo';
import ApiDocs from '../../ApiDocs';

const code = ``;

const apiData = [];

class PopoverContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      anchor: undefined,
      anchorOrigin: {
        horizontal: 'left',
        vertical: 'center'
      },
      open: true,
      targetOrigin: {
        horizontal: 'right',
        vertical: 'center'
      }
    };

    this.handleAnchorClick = this.handleAnchorClick.bind(this);
    this.handleChangeAnchorOriginHorizontal = this.handleChangeAnchorOriginHorizontal.bind(this);
    this.handleChangeAnchorOriginVertical = this.handleChangeAnchorOriginVertical.bind(this);
    this.handleChangeTargetOriginHorizontal = this.handleChangeTargetOriginHorizontal.bind(this);
    this.handleChangeTargetOriginVertical = this.handleChangeTargetOriginVertical.bind(this);
  }

  componentDidMount() {
    this.setState({ anchor: this.anchor });
  }

  handleAnchorClick() {
    this.popover.toggle();
  }

  handleChangeAnchorOriginHorizontal(event) {
    this.setState({
      anchorOrigin: {
        horizontal: event.target.value,
        vertical: this.state.anchorOrigin.vertical
      }
    });
  }

  handleChangeAnchorOriginVertical(event) {
    this.setState({
      anchorOrigin: {
        horizontal: this.state.anchorOrigin.horizontal,
        vertical: event.target.value
      }
    });
  }

  handleChangeTargetOriginHorizontal(event) {
    this.setState({
      targetOrigin: {
        horizontal: event.target.value,
        vertical: this.state.targetOrigin.vertical
      }
    });
  }

  handleChangeTargetOriginVertical(event) {
    this.setState({
      targetOrigin: {
        horizontal: this.state.targetOrigin.horizontal,
        vertical: event.target.value
      }
    });
  }

  renderOriginOptions() {
    const { anchorOrigin, targetOrigin } = this.state;

    return (
      <div>
        <label>Anchor origin, horizontal</label>
        <select
          name="anchor-origin-horizontal"
          onChange={this.handleChangeAnchorOriginHorizontal}
          defaultValue={anchorOrigin.horizontal}
        >
          <option value="left">Left</option>
          <option value="middle">Middle</option>
          <option value="right">Right</option>
        </select>

        <label>Anchor origin, vertical</label>
        <select
          name="anchor-origin-vertical"
          onChange={this.handleChangeAnchorOriginVertical}
          defaultValue={anchorOrigin.vertical}
        >
          <option value="top">Top</option>
          <option value="center">Center</option>
          <option value="bottom">Bottom</option>
        </select>

        <label>Target origin, horizontal</label>
        <select
          name="target-origin-horizontal"
          onChange={this.handleChangeTargetOriginHorizontal}
          defaultValue={targetOrigin.horizontal}
        >
          <option value="left">Left</option>
          <option value="middle">Middle</option>
          <option value="right">Right</option>
        </select>

        <label>Target origin, vertical</label>
        <select
          name="target-origin-vertical"
          onChange={this.handleChangeTargetOriginVertical}
          defaultValue={targetOrigin.vertical}
        >
          <option value="top">Top</option>
          <option value="center">Center</option>
          <option value="bottom">Bottom</option>
        </select>
      </div>

    );
  }

  render() {
    const styles = {
      anchor: {
        maxWidth: 200,
        margin: 'auto',
        marginTop: 75,
        padding: 15,
        border: 'solid 1px #cccccc',
        textAlign: 'center'
      }
    };

    const {
      anchor,
      anchorOrigin,
      targetOrigin
    } = this.state;

    return (
      <div>
        <Demo code={code}>
          {this.renderOriginOptions()}
          <div
            ref={ref => this.anchor = ref}
            style={styles.anchor}
            onClick={this.handleAnchorClick}
          >Anchor element</div>
          <Popover
            anchorEl={anchor}
            anchorOrigin={anchorOrigin}
            targetOrigin={targetOrigin}
            initiallyOpen={true}
            ref={ref => this.popover = ref}
          >
            <div>This is a basic popover. Foo Bar Baz.</div>
          </Popover>
        </Demo>
        <ApiDocs data={apiData} />
      </div>
    );
  }

}

export default PopoverContainer;
