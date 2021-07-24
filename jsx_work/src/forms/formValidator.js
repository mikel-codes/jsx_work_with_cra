import React, {Component} from 'react'
import {validatorContext} from './validators/validatoContext'
import {ValidateData} from './validators/validate'


export class FormValidator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      dirty: {},
      submitted: false,
      getMessagesforField: this.getMessagesforField
    }
  }

  static getDerivedStateFromProps(props, state){
    return{
      errors: ValidateData(props.data, props.rules)
    };
  }

  get formValid(){
    return Object.keys(this.state.errors).length === 0
  }
  handleChange = (ev) => {
    let name = ev.target.name;
    this.setState(state => state.dirty[name] = true)
  }
  handleClick(ev){
    this.setState({submitted: true},()=> {
      if (this.formValid) {
        this.props.submit(this.props.data)
      }
    })

  }
  getButtonClasses(){
    return this.state.submitted && !this.formValid ? 'btn-danger' : 'btn-primary'
  }

  getMessagesforField = (field) => {
    return (this.state.submitted || this.state.dirty[field]) ?
    this.state.errors[field] || [] : [];
  }

  

  render() {
    return (
      <React.Fragment>
      <validatorContext.Provider value={this.state}>
        <div onChange={this.handleChange}>
            {this.props.children}
        </div>
      </validatorContext.Provider>
      <div className="text-center">
      <button className={`btn ${this.getButtonClasses()}`}
        onClick={()=>this.handleClick()}
        disabled={this.state.submitted && !this.formValid}>
        submit
      </button>
    </div>
  </React.Fragment>
    );
  }
}
