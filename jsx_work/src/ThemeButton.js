import React, {Component} from 'react'

export class ThemeButton extends Component{
	handleClick = (ev) => {
		console.log(`themebtn event type: ${ev.type}
			Target: ${ev.target.tagName},
			currentTarget: ${ev.currentTarget.tagName}`
		)
		this.props.callback(this.props.theme)
	}
	render() {
		return (
			<span className="m-1" onClick={ this.handleClick } onClickCapture={this.handleClick}>
                    <button className={`btn btn-${this.props.theme}`}
                        onClick={ this.handleClick }>
                            Select {this.props.theme } Theme
                    </button>
                </span>
		)
	}
}