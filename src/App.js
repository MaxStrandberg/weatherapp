import React, { Component } from 'react';
import './App.css';
import Titles from './components/titles';
import Form from './components/form';
import Weather from './components/weather';


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
       
       <div className="container">
        <div className="jumbotron">
              <Titles />
        </div>


        <div className="row" id="mainRow">
        <div className="col-sm-4">

              <Form loadWeather={this.getWeather} />
        </div>

        <div className="col-sm-8">        
              <Weather
                temperature={this.state.temperature}
                city={this.state.city}
                country={this.state.country}
                error={this.state.error}
              />
            
            {!this.state.isHidden && <Savebutton />}
            
        
        </div>
        
        <div className="row" id="saveRow">
        <table className="table">

        <thead>
          <tr>
            <th>Maa</th>
            <th>Kaupunki</th>
            <th>Lämpötila</th>
          </tr>
        </thead>
            
            {this.state.list.map(item => {
              return (
                <tbody>
                  <tr className="success">
                  <td>{item.country}</td>
                  <td>{item.city}</td>
                  <td>{item.temperature}</td>
                  </tr>
               </tbody> 
              );
            })}
          </table>
        </div>
        </div>
      </div>
     </div>
          

    );
  }
  

  

  
}


export default App;
