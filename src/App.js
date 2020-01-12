
import React, { Component } from 'react'
import './App.css';
import Form from './Form'
import Title from './Title';
import Weather from "./Weather"


const API_KEY ="93a689cd023f38d34187fc62795caedd";//TODO
var UNITS = 'metric'

class App extends Component {

  state={
    temperature:undefined,
    humidity:undefined,
    city:undefined,
    country:undefined,
    description:undefined,
    error:undefined
  }

  setUnits = (e)=> {
    UNITS = UNITS==='metric'?'imperial':'metric';
    if(UNITS==='imperial'){
      this.setState({
          temperature:9/5*this.state.temperature + 32,
          humidity:this.state.humidity,
          city:this.state.city,
          country:this.state.country,
          description:this.state.description,
          error:""
        }
      )
    }
    else{
      this.setState({
        temperature:5/9*(this.state.temperature-32),
        humidity:this.state.humidity,
        city:this.state.city,
        country:this.state.country,
        description:this.state.description,
        error:""
      }
    )
    }
    console.log(this.state.temperature)
    console.log('here')
  }


  getWeather= async(e)=>  {
    e.preventDefault()
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=${UNITS}`)
    const data = await api_call.json()
    
    if(city && country){
      this.setState({
        temperature:data.main.temp,
        humidity:data.main.humidity,
        city:data.name,
        country:data.sys.country,
        description:data.weather[0].description,
        error:""
      })
    }
    else{
      this.setState({
        temperature:undefined,
        humidity:undefined,
        city:undefined,
        country:undefined,
        description:undefined,
        error:"Please enter the location details"
      })
    }

  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row"></div>
                <div className="col-xs-5 title-container">
                  <Title/>
                </div>
                <div className="col-xs-7 form-container">
                      <Form getWeather={this.getWeather} />
                      <Weather 
                      temperature={this.state.temperature}
                      city={this.state.city} 
                      country={this.state.country} 
                      humidity={this.state.humidity} 
                      description={this.state.description} 
                      error={this.state.error} 
                      setUnits={this.setUnits}
                      />
                  </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
