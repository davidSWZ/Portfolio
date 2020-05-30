import React, {Component} from 'react';
import ScrollTrigger from 'react-scroll-trigger';

//Composant permettant d'animer un autre composant en fonction du scroll
export default class animateOnScroll extends Component {

  constructor(props) {
    super(props);

    this.onEnterViewport = this.onEnterViewport.bind(this);

    this.state={
      visible:false,
    }
  }

  onEnterViewport() {
  this.setState({
    visible: true,
  });
  }

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
