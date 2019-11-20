import React, {Component} from 'react';
import ScrollTrigger from 'react-scroll-trigger';

export default class animateOnScroll extends Component {

  constructor(props) {
    super(props);

    this.onEnterViewport = this.onEnterViewport.bind(this);
    // this.onExitViewport = this.onExitViewport.bind(this);

    this.state={
      visible:false,
    }
  }

  onEnterViewport() {
  this.setState({
    visible: true,
  });
  }

  // onExitViewport() {
  // this.setState({
  //   visible: false,
  // });
  // }

  render() {
    return (
      <ScrollTrigger onEnter={this.onEnterViewport} onExit={this.onExitViewport}>
        <div className={`element ${this.state.visible === true ? 'element-animate' : ''}`}>
        {this.props.children}
        </div>
      </ScrollTrigger>
    );
  }
}
