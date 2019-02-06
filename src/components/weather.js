import React from 'react';
class Weather extends React.Component{

render(){
  return(
       <div>
            {
                this.props.country && this.props.city && <p>Kaupunki ja maa:
                {this.props.city},    {this.props.country}</p>
            }
            
            {
                this.props.temperature && <p>Lämpötila: 
                {this.props.temperature}&#8451;</p>
            }

            {this.props.error && <p>{this.props.error}</p>}


          
       </div>
   )
}
}
export default Weather;