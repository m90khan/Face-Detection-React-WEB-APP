import React, {Component} from 'react';
import Navigation from './components/Nav/Nav';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImgLinkForm from './components/ImgLinkForm/ImgLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import 'tachyons';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';

import './App.css';

//clarifai apiKey
const app = new Clarifai.App({apiKey: '2d3f3bcf355d407a949f86b2ef07f4bc'});

//particles
const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }

  }
}
// we need a state everytime user changes so we know and to do that we use constructor
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin', //determine where we are in the app
      isSignedIn: false
    }
  }
  //to display box on dectection
  calculateFaceLocation = (data) => {
    const clarifaiF = data.outputs[0].data.regions[0].region_info.bounding_box;
    //grabbing the height and width of the image
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // return an object which going to be the whats inside in box at a state
    // identify four dots and wrap in a border
    return {
      leftCol: clarifaiF.left_col *width,
      topRow: clarifaiF.top_row * height,
      rightCol: width - (clarifaiF.right_col * width),
      bottomRow: height - (clarifaiF.bottom_row * height)
    }
  }

  displayBox = (box) => {
    this.setState({box: box})
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onSubmit = () => {
    console.log('clicked');
    this.setState({imageURL: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(response => this.displayBox(this.calculateFaceLocation(response))).catch((err) => console.log(err))
  }
  onRouteChange=(route)=>{
    if(route === 'signout'){
        this.setState({isSignedIn: false});
    } else if (route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }
  render() {
    const { isSignedIn, imageURL, route, box } = this.state;
    return (
      <div className="App">
      <Particles className='particles' params={particlesOptions}/>
    <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/> {
        this.state.route === 'home'
          ?
          <div>
            <Logo />
           <Rank />
          <ImgLinkForm onButtonSubmit={this.onSubmit} onInputChange={this.onInputChange} />
        <FaceRecognition box = { box} imageURL = { imageURL} />
    </div>
:( route === 'signin'
  ?  <Signin onRouteChange={this.onRouteChange} />
: <Register />   )
  }
    </div>);
  }
}

export default App;
