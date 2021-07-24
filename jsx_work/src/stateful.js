import React, {Component, useState} from 'react'
//import ReactDOM from 'react-dom'

export class Eg extends Component{
	constructor(props){
		super(props)
		this.state = {
			counter: 0,
			hasButtonBeenClicked: false
		}
	}
	render(){
		return(
			<button onClick={this.handleClick} className={this.props.className} disabled={this.props.disabled === true || this.props.disabled === true}>
				{this.props.text} {this.state.counter}
				{this.state.hasButtonBeenClicked && 
					<button> Button Clicked </button>
				}
			</button>
		)
	}

	handleClick = () => {
		this.setState({counter: this.state.counter + 1, hasButtonBeenClicked: this.state.counter > 0})
		this.props.callback()

	}
}



export class Defence extends Component{
	constructor(props){
		super(props)
		this.state = {
			message: 'hello world',
			counter: 0,
			theme: 'secondary'
		}
	}
	handleClick = (ev, newTheme) => {
		ev.persist()
		this.setState({

			counter: this.state.counter + 1,
			theme: newTheme,
		}, ()  => this.setState({message: `${ev.type} ${this.state.counter}`}))
	}
	toggleCheckBox = (e) => {
		if (this.state.counter === 0)
			e.preventDefault()
	}
	render(){
		return(

		<div className="offset-md-4 col-md-4 jumbotron text-center">
			<div className="form-check">
                        <input className="form-check-input" type="checkbox"
                             onClick={ this.toggleCheckBox }/>
                        <label>This is a checkbox</label>
                    </div>
			<div className="card">
			<div className="card-title">
				<div className={`text-center h3 p-1 m-2 bg-${this.state.theme}`}>
					{this.state.message} &times; {this.state.counter}
				</div>
			</div>
			<div className="card-body">
				<button className="btn btn-lg btn-primary" onClick={(e) => this.handleClick(e, 'primary')}>
					Normal
				</button>
				<button className='btn btn-danger' onClick={e => this.handleClick(e, 'warning')}>
					Warning
				</button>
			</div>
			</div>
			</div>
		)
	}
}



// stateful functional (because it appears as a function) components via react Hooks 

export function HooksButton(props){
	const [counter, setCounter] = useState(0)
	const [hasButtonBeenClicked, setHasButtonClicked] = useState(false)

	const handleClick = () => {
		setCounter(counter + 4);
		setHasButtonClicked(true);
		props.callback();
	}

	return(
		<button onClick={handleClick} className={props.className}>
			{props.text} {counter}
			{hasButtonBeenClicked &&
				<div class="btn btn-sm btn-green"> Lov e it</div>}
		</button>
		)
}