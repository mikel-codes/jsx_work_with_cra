import React, { Component } from "react";


export class Display extends Component{
	constructor(props){
		super(props)

	}
	formatValue = (data) => {
		return Array.isArray(data) ? data.join(',') : data.toString()
	}

	render(){
		let keys = Object.keys(this.props.data)
		if (keys.length === 0)
			return (
				<div className="bg-secondary text-white">
					<h3>No Data</h3>
				</div>
			)
		else
			return(
			<div className="card">
				<div className="card-body">
				{ keys.map(k =>
					<div  className='row h5'>
						<div className='col'>{k}</div>
						<div className="col"> :
						{this.formatValue(this.props.data[k])}
					</div>
				</div>

				)
			}
			</div>
		</div>
		)
	}

}
