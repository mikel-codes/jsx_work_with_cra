import React, {Component} from 'react'
export class Display extends Component{
	constructor(props){
		super(props)
		this.state = {counter: 1}
	}

	incrementCounter = () => {
		this.setState({counter: this.state.counter + 1})
	}

	toggleCity = () => {
      debugger
      this.setState({city: this.props.value === "London" ? "Isreal" : "London"})
    }


	render(){
		return(
		<div>
		<h2 className="bg-primary text-white text-center">
			<div>Props Value: {this.props.value}</div>
			<div>Local value: {this.state.counter}</div>
		</h2>
		<div className="text-center">
			<button className="btn btn-primary m-2">
				Parent
			</button>
			<button className="btn btn-large btn-secondary m-2" onClick={this.incrementCounter}>
				Local
			</button>
			</div>
		</div>
		)
	}
}