import React, {Component} from 'react'
import {ProFeature} from './GList'

export function LogToConsole(FeatureComp, label, logMount, logUnmount, logRender) {
	//const protectedFeature = ProFeature(FeatureComp)
	return class extends Component{
		componentDidMount(){
			if (logMount){
				console.log(`${label}: Mounted`)
			}

		}
		componentWillUnmount(){
			if(logUnmount){
				console.log(`${label}: Unmounted`)
			}
		}
		render(){
			if (logRender){
				console.log(`${label}: rendered contents`)
			}
			return (
				<FeatureComp {...this.props} />
			)

		}
	}
}

export function ProController(FeatureComponent){
	const ProtectedFeature = ProFeature(FeatureComponent)
	return class  extends Component{
		constructor(props){
			super(props)
			this.state ={
				proMode : false
			}
		}

		toggleProMode(event){
			this.setState({proMode: !this.state.proMode})
		}

		render(){
			return(
				<ProtectedFeature {...this.props} pro={this.state.proMode}/>
			)
		}
	}

}


export const ProModeContext = React.createContext({
	proMode: false
})