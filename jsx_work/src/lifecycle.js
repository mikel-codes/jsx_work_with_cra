import React, {useState, Component, useEffect} from 'react'
import {Theme} from './themes'
import {ProModeContext} from './logToConsole'

export function LifeCycle(props){
	        //console.log(`Render ActionButton (${props.text = 'LifeCycle'}) Component `);

	    const [counter, setCounter] = useState(0)
	    const [showMessage, setShowMessage] = useState(false)

	    useEffect(() => {console.log("Invoked a lifecycle method")
	    	return () => console.log("useEffct cleanUp")})

	   const  incrementCounter = () => {
        setCounter( counter + 1);
    }
    const handleChange = (event) => {
        setShowMessage(!showMessage)
        //props.callback(event)
    }

        return (
        	 <div className="container text-center">
        	 <div className="row">
        	 <div className="offset-3 col-6 offset-3">

                                           <div className="form-check">
                            <input type="checkbox" className="form-check-input"
                                                 checked={ incrementCounter }
                                onChange={ handleChange } />
                            <label className="form-check-label">Show</label>
        	 </div>
        	 </div>
        	 </div>
        	 <div className='row'>
        	  <div className="m-2 text-center">
                    <Theme>
                        <Msg theme='primary'
                            message={ `Counter: ${counter}`} />
                        <ActionButton theme="secondary"
                            text="Increment" callback={ incrementCounter } />
                    </Theme>
                </div>
                </div>
        	<div className="row">
        		<div className="col-4">
        			<Listo />
        		</div>

        		<div className="col-4">
        		<ExternalCounter />
        		</div>

        		<div className="col-4">
        		<Msg message='comming up'/>
        		{props.message}
        		</div>

        		</div>
        	</div>
        )

}



export function Msg(props){

    const [showSpan, setshowSpan] =useState(false)


    const handleClick = (event) => {
        setshowSpan(!showSpan)
        //props.callback(event)
    }

    const getMessageElement = () => {
        let div = <div id="messageDiv" className="h5 text-center p-2">
                        { props.message }
                  </div>
        return showSpan ? <span>{ div } </span> : div;
    }
	return(
		<div>
		<ActionButton theme='primary' text='msg button' {...props} />
		        <div className="h5 text-center p-2">
                    { getMessageElement()
                     }
                </div>
        </div>
		)
}

export function List(props){
	const [names, setNames] = useState(['peter', 'james', 'john'])
	const changeNames = (ev) => {
		setNames(names.reverse());
		console.log('List Component names reversed', names)
	}
	return(
		<div>
		<button className="btn btn-round" onClick={changeNames}> Change</button>
		<ActionButton callback={changeNames}  text="Reverse Names" />
		{ names.map((name, index) => {
			return <h5 key={index}>{index} => {name}</h5>
		}
		)}
		</div>
	)
}

export function ActionButton(props){
let getClasses  = (proMode) => {
		let col = props.proMode ? props.theme : 'danger'
		return `btn btn-${col} m-2`;
	}
	return(
		<ProModeContext.Consumer>
		{ contextData =>
	<button className={getClasses(contextData.proMode)}
             disabled={!contextData.proMode}          onClick={ props.callback }>
                            { props.text }
                </button>
            }
            </ProModeContext.Consumer>
	)

}

let counter = 0
export class ExternalCounter extends Component{
	constructor(props){
		super(props)
	}
	incrementCounter = () => {
		counter++;
		this.forceUpdate()
	}


	render(){
		console.log('Render External Counter Component')
		return(
			<div>
				<ActionButton callback={this.incrementCounter}
				text="External Counter" />
				<div className='h5 text-center p-2'>
					External: {counter}
				</div>
			</div>
		)
	}
	componentDidMount(){
		console.log('done mounting the external counter component')
	}
}
export class Listo extends Component{
	constructor(props){
		super(props)
		this.state={
			names: ['Love', 'Like', 'Luke']
		}
	}

	reverseList = () =>{
		this.setState({names: this.state.names.reverse()})
	}
	render(){
		return(
			<div>
		<ActionButton  {...this.props} callback={this.reverseList}  text="Reverse Names" />
					{this.state.names.map((name, index) =>{
						return <h5 key={name} id={name.toLowerCase()}>{name}</h5>
					})}
			</div>
		)
	}
}
