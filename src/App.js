import logo from './logo.svg';
import './App.css';
import createChart from "./d3"
import React from 'react';
import rd3 from 'react-d3-library'
import energyData from "./data.json"

const RD3Component = rd3.Component;

// TODO try this on another page https://bl.ocks.org/emeeks/e9d64d27f286e61493c9
// note how the x axis is very secure, and it's clear where the skips are. Key features for our use
// case. 
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {d3: ''}
    this.refreshChart = this.refreshChart.bind(this)
    this.transformData = this.transformData.bind(this)
  }

  addSome(data, base, incrementer = 1) {
    let makeNewItem = (source, target) => {
      return 
    }

    for (let i = base; i < base + 20; i++) {
      let src = i + incrementer
      //let target = src + parseInt(Math.random(3) * 10)
      let chanceNum = parseInt(Math.random() * 10) 
      let isBigger = chanceNum > 6
      let target = isBigger ? src + chanceNum :  src + 1
      if (chanceNum > 10) {
        target = "All Nations Worshipping Christ.Rev"
      }
      let chanceNum2 = parseInt(Math.random() * 10) 
      if (chanceNum2 > 8) {
        // only do if big
        if (src > 20) {
          target = `${target}a`
        }

        src = `${src}a`
      } else if (chanceNum2 < 3) {
        if (src > 20) {
          target = `${target}b`
        }
        src = `${src}b`
      }


      let valBase = Math.random()*3
      if (valBase > 2.3) {
        // just to get bigger fluctuation
        valBase = valBase * Math.random()*2
      }

      let newItem = { "source": String(src), "target": String(target), "value": valBase }

      console.log("adding", newItem)

      data.push(newItem)
    }
  }
  transformData (rawData) {
    
    for (let i = 0; i < 4; i++) {
      this.addSome(rawData, 1)
      this.addSome(rawData, 1)
      this.addSome(rawData, 1)
      this.addSome(rawData, 1)
      this.addSome(rawData, 1)
      this.addSome(rawData, 20, 20)
      this.addSome(rawData, 1, 10)
      this.addSome(rawData, 15)
      this.addSome(rawData, 20)
      this.addSome(rawData, 20)
      this.addSome(rawData, 20)
      this.addSome(rawData, 20)
      this.addSome(rawData, 20)
      this.addSome(rawData, 20)
      this.addSome(rawData, 20)
      this.addSome(rawData, 20)
      this.addSome(rawData, 20)
      this.addSome(rawData, 20)
      this.addSome(rawData, 20)
      this.addSome(rawData, 20)
      this.addSome(rawData, 20)
      this.addSome(rawData, 30)
      this.addSome(rawData, 30)
      this.addSome(rawData, 31)
      this.addSome(rawData, 40)
      this.addSome(rawData, 40)
      this.addSome(rawData, 40)
      this.addSome(rawData, 40)
      this.addSome(rawData, 40)
      this.addSome(rawData, 40)
      this.addSome(rawData, 40)
      this.addSome(rawData, 40)
      this.addSome(rawData, 50)
      this.addSome(rawData, 50)
      this.addSome(rawData, 50)
      this.addSome(rawData, 50)
      this.addSome(rawData, 50)
      this.addSome(rawData, 50)
      this.addSome(rawData, 50)
      this.addSome(rawData, 50)
      this.addSome(rawData, 50)
    }

    const transformedData = rawData.map(item => {
      return item
    })
    

    return transformedData
  }

  refreshChart () {

    //const rawData = energyData
    const rawData = []
    const finalData = this.transformData(rawData)
    const chart = createChart(finalData)

    window.data = finalData
    window.chart = chart

    // this works, but is not good react
    //const chartContainer = document.getElementById("d3-chart")
    //chartContainer.appendChild(chart)

    this.setState({
      d3: chart,
    })
  }

  componentDidMount() {
    //this.setState({d3: chart});
    this.refreshChart()
  }

  render () {
    return (
      <div className="App">
        <div className="horizontal-scroll-container">
          <div id="d3-chart">
            <RD3Component data={this.state.d3} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

