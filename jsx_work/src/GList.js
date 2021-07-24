import React, {Component, useState} from 'react'
import {ActionButton} from './lifecycle'

export class Glist extends Component{


	render(){
		return(
		<div>
			<div class='bg-info m-1 p-3 text-center'>
				<h5 class="h3 text-black">Socialist</h5>
			</div>
			<div className={`bg-${this.props.theme} text-white p-2`}>
                { this.props.list.map((item, index) =>
                    <div key={ item }>{ index + 1 }: { item }</div>
                )}
            </div>
        </div>
        )
	}
}

export class Sortedlist extends Component{
	constructor(props){
		super(props)
		this.state = {
			sort: false
		}
	}
	getList(){
		return this.state.sort ? [...this.props.list].sort() : this.props.list;
	}

	toggleSort(){
		this.setState({sort: !this.state.sort})
	}


	render(){
		return(
			<div>
			<Glist list={this.getList()} theme="info" />
			 <div className="text-center m-2">
                    <ActionButton theme="primary" text="Sort" callback={() => this.toggleSort()} />
                </div>
</div>
		)
	}
}

export  function United(props) {
	const [names, setNames] = useState(['logo', 'Muchin', 'Russia', 'France', 'Australia'])
	const [proMode, setproMode] = useState(false)
	let toggleProMode = () => {
		setproMode(!proMode)
	}
	return(
		 <div className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        <Glist list={ names } theme="primary" />
                    </div>
                    <div className="col-6">
                        <Sortedlist list={ names } />
                    </div>
                </div>
                <div className="row">
                	<div className="col-12 text-center p-2">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input"
                                value={ proMode }
                                onChange={ toggleProMode } />
                            <label className="form-check-label">Pro Mode</label>
                        </div>
                    </div>
                	<div class="offset-4 col-4">
                		<ProList list={names} pro={proMode} />
                	</div>
                </div>
            </div>
	)
}

export function ProFeature(FeatureComponent){
	return function(props){
		if (props.pro){
			let {pro,...childProps} = props
			return <FeatureComponent {...childProps} />
		}

		else{
			return (
				<div className='jumbotron bg-light text-center'>
					<div class='h3 m-1 p-1 text-black'>
						This is profeature
					</div>
				</div>

			)
		}
	}
}


const ProList  = ProFeature(Sortedlist)
