import React, { Component } from 'react';
import './App.css';
import Titles from './components/titles';
import Form from './components/form';
import Weather from './components/weather';

class App extends Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    error: undefined
  }

  getWeather = async (e) => {

    const city = e.target.elements.city.value;

    const country = e.target.elements.country.value;

    const api = "dd7b6962a4a4db4ea2ad5287cb7467f4";

    e.preventDefault();

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api}&units=metric`);
  
    const response = await api_call.json();
  
    console.log(response);

    if(city && country){

      this.setState({
        temperature: JSON.stringify(response.main.temp),
        city: response.name,
        country: response.sys.country,
        error: ""
      })

    }else{
      this.setState({
        error: "Anna kaupunki ja maa"
      })

    }  
  }

  render() {
    return (
      <div>
        <div className="wrapper">
        <div className="main">
        <div class="container">
          <div class="row">
          <div class="col-xs-5 title-container">
              <Titles />
          </div>


          <div class="col-xs-7 form-container">
              <Form loadWeather={this.getWeather} />
                
              <Weather
                temperature={this.state.temperature}
                city={this.state.city}
                country={this.state.country}
                error={this.state.error}
              />
            </div>
         </div>
        </div>
        </div>
      </div>
    </div>

    );
  }

  

  
}


export default App;
