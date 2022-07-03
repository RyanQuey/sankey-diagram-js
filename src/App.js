import logo from './logo.svg';
import './App.css';
import createChart from "./d3"
import React from 'react';
import rd3 from 'react-d3-library'
import energyData from "./data.json"

const RD3Component = rd3.Component;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {d3: ''}
    this.refreshChart = this.refreshChart.bind(this)
    this.transformData = this.transformData.bind(this)
  }

  addSome({data, base, incrementer = 1, forceTargetFinale}) {
    
    for (let i = base; i < base + 20; i++) {
      let src = i + incrementer
      let chanceNum = parseInt(Math.random() * 10) 
      let isBigger = chanceNum > 6
      let target = isBigger ? src + chanceNum :  src + 1
      
      console.log("forceTargetFinale", forceTargetFinale)

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



      if (forceTargetFinale) {
        target = "Christ's final victory"
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
    // large incrementers makes for some threads that span across the whole chart
    // base determines what int to start at
    // count for how many times to run this set
    // forceTargetFinal for some to have it all come together to one thing at the end
    const sets = [
      {base: 1, incrementer: 1, count: 5},
      {base: 1, incrementer: 10, count: 1},
      {base: 15, incrementer: 1, count: 4},
      {base: 20, incrementer: 20, count: 1},
      {base: 20, incrementer: 1, count: 15},
      {base: 30, incrementer: 1, count: 3},
      {base: 30, incrementer: 10, count: 5},
      {base: 40, incrementer: 1, count: 10},
      {base: 50, incrementer: 1, count: 10},
      {base: 60, incrementer: 1, count: 10},
      {base: 40, incrementer: 1, count: 3, forceTargetFinale: true},
      {base: 50, incrementer: 1, count: 3, forceTargetFinale: true},
      {base: 60, incrementer: 1, count: 10, forceTargetFinale: true},
    ]
    
    // this to add a quick multiplier effect
    for (let i = 0; i < 4; i++) {
      console.log("this even happening???\n\n\n\n")
      sets.forEach(set => {
        for (let i = 0; i < set.count; i++) {
          this.addSome({
            data: rawData, 
            base: set.base, 
            incrementer: set.incrementer, 
            forceTargetFinale: set.forceTargetFinale,
          })
        }
      })
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

