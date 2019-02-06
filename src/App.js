import React, { Component } from 'react';
import './App.css';
import Titles from './components/titles';
import Form from './components/form';
import Weather from './components/weather';
import Savedweather from './components/savedweather';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: [],
      isHidden: false
    };
  }



  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    error: undefined
  }

  componentDidMount() {
    if (this.state.list !== null){

        this.setState({
          isHidden: !this.state.isHidden
        })
      }
     
  }


 
  getWeather = async (e) => {

    const city = e.target.elements.city.value;

    const country = e.target.elements.country.value;

    const api = "dd7b6962a4a4db4ea2ad5287cb7467f4";

    e.preventDefault();

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api}&units=metric`);
  
    const response = await api_call.json();
  
    console.log(response);

    if(city && country && response.name !== undefined ){

      this.setState({
        temperature: JSON.stringify(response.main.temp),
        city: response.name,
        country: response.sys.country,
        error: "",
        isHidden: false
    
      
      })
    }else{
      this.setState({
        error: "Anna kaupunki ja maa"
      })

    }  
  }

  addWeather() {

    const newInput = {
      id: 1+ Math.random(),
      country: this.state.country,
      city: this.state.city,
      temperature: this.state.temperature
    }

    const list = [...this.state.list];

    list.push(newInput);

    this.setState({
      list,
      newInput
    });
    
    console.log(list)

  }


  render() {

    const Savebutton = () =>(
      <div>
      <button id="saveButton" onClick={() => this.addWeather()}> Tallenna </button>
      </div> 
   )
  
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
            
            {!this.state.isHidden && <Savebutton />}
            
            </div>

            </div>
            <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>
                  Maa:{item.country}&nbsp;&nbsp;
                  Kaupunki:{item.city}&nbsp;&nbsp;
                  Lämpötila:{item.temperature}&#8451;
                </li>
              );
            })}
          </ul>
        </div>
        </div>
      </div>
    </div>

    );
  }
  

  

  
}


export default App;
