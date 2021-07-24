import React, { Component, useState, Fragment as Fg } from 'react';

import logo from './logo.svg';
import './App.css';
//import { Display } from './display'
import { Eg, HooksButton, Defence } from './stateful'
import { ThemeButton } from './ThemeButton'
import  ReactDOM  from 'react-dom'
import { LifeCycle } from './lifecycle'
import {United, Sortedlist} from './GList'
import {Display} from './forms/Display'
import {Editor} from './forms/Editor'
import {MainEditor} from './form/form'
import {ProdHub} from './refs/prod'
//import {Compound}  from './tests/t'
let name = "Adama"
let country = "London"

export function SimpleButton(props){
  return (
    <button onClick={props.callback} className={props.className}>
      {props.text}
    </button>
    )
}
export class Logic extends Component {


    message = () => {
        return `Hello ${name} from '${country}'`
    }

    render() {
        return (
            <div className="text-center">
        <h4 className="bg-primary text-white text-center p-3">
            {this.message()}
        </h4>
        <img src={logo} alt="reactLogo" />
        <link rel="stylesheet" href={process.env.PUBLIC_URL+ '/index.css'} />
      </div>

        );
    }
}

export function Message(props) {
    return (
        <div className="bg-secondary text-right m-3">
      <h5 class="color-primary p-3"> {props.name} {props.value} </h5>
    </div>
    )
}


export function Summary(props) {

    return (
        <Fg>
        <td>{props.index}</td>
        <td>{props.name}</td>
        <td>{props.name.length}</td>
        <td>
            <Eg
                    className="btn btn-warning btn-sm m-1"
                    callback={ props.reverseCallback }
                    text={ `Reverse (${ props.name })`}
                />
              <HooksButton className="bg-dark m-1 p-1"
               callback={props.reverseCallback}
               text={ `Promote ${props.name}`} />
        </td>


      </Fg>
    )
}






let names = ["Bob", "Alice", "Dora"]

function reverseNames() {
    names.reverse()
    ReactDOM.render(<App />, document.getElementById('root'))
}

function promoteName(name) {
  names = [name, ...names.filter(val => val !== name)]
  ReactDOM.render(<App />, document.getElementById('root'))
}

export default function App(props) {

     const [message, setMessage] = useState({ message: 'policies', counter: 0, paypal: 'hello world', event_type: 'event'})
     const [cities, setCities] = useState(["London", "New York", "Paris", "Milan", "Boston"],)
     const [proMode, setproMode] = useState(true)
     const [formData, setFormData] = useState({})
     //const [toggle, settoggle]   = useState(() => message  === 'Ready' ? setmessage('Clicked') : setmessage('Ready'))
     //let [handleEvent, sethandleEvent] = useState((event) => `message: Event ${event.type}`)
     const handleEvent = (event) => {

       if (event.type === 'mouseup') {
         event.persist()
         setMessage(
           () => setMessage({...message, event_type: `world ${event.type}`}),
           {...message, paypal: 'MouseUp'}, )
       }
     }

     const submitData = (newData) => {
         setFormData(newData)
     }

     const toggleSort = () => {
     	setproMode(!proMode)
     	if (proMode){
     		alert('done pro' + `${proMode}`)

     		return
     	}
     }
     const selectTheme = (newTheme) =>{
       setMessage({...message, message: `Theme: ${newTheme}`, theme: newTheme})
     }
     const handleBars = (ev) => {
     	console.log(`App Type: ${ev.type} \n`
     	     	+ `Target: ${ev.target.tagName}\n`
     	     	+ `CurrentTarget: ${ev.currentTarget.tagName}\n`)
     }

     return (

        <Fg>
         
          <ProdHub />
          <MainEditor />
            <div className="container-fluid">
            <div className="row p-2">
                <div className="col-6">
                    <Editor submit={ submitData } />
                </div>
                <div className="col-6">
                    <Display data={ formData } />
                </div>
            </div>
        </div>
        </Fg>
    );
}
