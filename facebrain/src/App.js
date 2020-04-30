import React, { Component } from 'react';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/logo/Logo';
import ImageLink from './component/imagelink /ImageLink';
import Rank from './rank/Rank';
import Face from './Face'
import './App.css';
import Particles from 'react-particles-js';
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '58ac350b99614bf4a5d9ddcf35e8d5d3'
});

const particleOptions = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 900
            }
        }
    }
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            input: '',
            imageUrl: ''
        }
    }
    onInputchange = (event) => {
        this.setState({ input: event.target.value })
    }
    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        app.models.predict(
                Clarifai.FACE_DETECT_MODEL,
                this.state.input)
            .then(
                function(response) {
                    console.log(response)
                },
                function(err) {
                    // there was an error
                }
            );
    }
    render() {
        return ( <
            div className = "App" >
            <
            Particles className = 'particles'
            params = { particleOptions }
            />  <
            Navigation / >
            <
            Logo / >
            <
            Rank / >
            <
            ImageLink onInputchange = { this.onInputchange }
            onButtonSubmit = { this.onButtonSubmit }
            / >   <
            Face imageUrl = { this.state.imageUrl }
            / >  < /
            div >
        );
    }
}
export default App;