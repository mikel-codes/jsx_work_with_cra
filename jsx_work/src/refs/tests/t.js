import React from 'react'
import PropTypes from 'prop-types'

const Result = (props) => {
  return (

    <div className='ui container'>
      <div className='ui grid'>
        <div className='six columns wide'>
          <div className='ui segment'>
            <div className='ui header'>
              { props.result || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}






export class  ValueInput extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      fieldValue: 0
    }
  }

  handleChange = (ev) => {
    this.setState({fieldValue: ev.target.value}, () => this.props.changeCallback(this.props.id, this.state.fieldValue))
  }

  render () {
    return (
      <div className='ui raised segment'>
        <div className='ui field'>
          <label className='ui label'>
            Value #{this.props.id}
          </label>
          <div className='ui text input'>
            <input
              type='text'

              value={this.state.fieldValue}
              onChange={this.handleChange} />
          </div>
        </div>
      </div>

    );
  }
}




export class Compound extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: this.props.title || 'A simple test component',
      fieldValues:[],
      total: 0

    }
  }
  updateFieldValues = (id, value) => {
    // creates a container per field in valueinput component
    this.setState(state => state.fieldValues[id] = Number(value))
  }

  updateTotal = () => {
    this.setState({total: this.state.fieldValues.reduce((total, val) => total += val, 0)})


  }
  render () {
    const totalVal = this.state.total
    const computeFieldArray = this.updateFieldValues

    return (
      <div>
        <Result result={totalVal} />

        <ValueInput
          id='1'
          changeCallback={computeFieldArray}/>
        <ValueInput
          id='2'
          changeCallback={computeFieldArray}/>
        <button className='ui brown button'
          onClick={this.updateTotal}
          >Calculate Total</button>
      </div>

    );

  }
}
