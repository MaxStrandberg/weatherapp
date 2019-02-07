import React from 'react';

class Form extends React.Component{

render(){
  return (
    <form onSubmit = {this.props.loadWeather}>
        <input type="text" name="city" placeholder="Kaupunki..."/>
        <input type="text" name="country" placeholder="Maa..."/>
        <button>Hae</button>
    </form>
  )
    }
}
export default Form;