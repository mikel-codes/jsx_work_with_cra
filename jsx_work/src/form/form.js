import React, {Component} from 'react'
import validator from 'validator'
import {Button, Form, Grid, Container, Segment, Input} from 'semantic-ui-react';
// create context first

export const ValidateContext = React.createContext({
  getMessagesforField: (field) => []
})

// create a Validation mechanism function
export const ValidateDataByRules = (data, rules) => {
  let errors = {}

  Object.keys(data).forEach(field => {
    // lets ensure the rules holds a key for the required field checked
    // the rules  is a dictionary with a key of the field name
    // which holds a value of it constraints
    if (rules.hasOwnProperty(field)){
      let field_errors = []
      let val = data[field]
      if (rules[field].true){
        // this is a boolean field so ! means that the field has not been checked == true
        if(!val){
          field_errors.push('need to agree to terms here')
        }
      }
      else{
        if(rules[field].required && validator.isEmpty(val))
          field_errors.push(`${field} is required`)
          if (!validator.isEmpty(val)){
            if(rules[field].minlength && !validator.isLength(val, rules[field].minlength)){
              field_errors.push(`minimum characters is ${rules[field].minlength}`)

            }
          if(rules[field].alpha && !validator.isAlpha(val)){
            field_errors.push('unwanted charcters used , only use alphabelts')
          }
          if (rules[field].email && !validator.isEmail(val)){
            field_errors.push('Email is invalid')
          }
        }
      if(rules[field].equals && !validator.equals(val, data[rules[field].equals]))
          field_errors.push('values dont match')

      }
        if(field_errors.length > 0)
            errors[field] = field_errors

      }
    }
    )
        // dictionary holds the key reffered as the dirty field
        // the errors as as an array of reported issues it can easily iterate through

        return errors
}


//create Live form Editor
let counter = 0
export  class FormLive extends Component{

  constructor(props){
    super(props)
    this.state = {
      errors: {},
      dirty: {},
      submitted: false,
      mas : {},
      getMessagesforField: this.getMessagesforField
    }
  }

  static getDerivedStateFromProps(props, state){
    return {
      errors: ValidateDataByRules(props.data, props.rules)
    }
  }

  get formValid() {
    return Object.keys(this.state.errors).length === 0
  }

  getButtonClasses = () => {
    return (this.state.submitted && this.formValid) ? 'primary' : 'warning'
  }

  toggleError(f){

    try
    {

      if (this.state.errors[f]){
        this.state.mas[f] ='error'
        if (f == 'pass' || f == 'pass_confirm'){
          this.state.mas['pass'] = 'error'
          this.state.mas['pass_confirm'] = 'error'
        }
      }

      else {
        this.state.mas[f] = ''
      }
      }
      catch (e) {
        throw(e)
      }
    }

  handleChildrenUpdates = (ev) => {
    ev.persist()
    let name = ev.target.name
    this.setState(state => state.dirty[name] = true)
  this.toggleError(ev.target.name)
  }


  handleClick = (ev) => {
    ev.persist()
    this.setState(() => this.state.submitted = true,
      () => {
        if (this.formValid)
          this.props.submit(this.state)})


            if (!this.formValid)
            {            Object.keys(this.state.errors).map(i => {
              this.state.mas[i.toString()] =  'error'
            })

          }
      }

  getMessagesforField = (field) => {
    return (this.state.submitted || this.state.dirty[field]) ? this.state.errors[field] || [] : [];
  }

  render() {
    const stats = Object.values(this.props.children)
    console.log((stats[0].props.name).toString())
    //console.log(stats[0].props.children[0].props.name)
    return (
      <React.Fragment>
        <Container>
          <Grid centered columns={1}>
            <Grid.Column>
              <div className='ui raised segment'>
                <Segment>
                  <Form size="large">
                    <ValidateContext.Provider value={this.state}>
                      <div onChange={this.handleChildrenUpdates}>
                        { stats && stats.map((c, i) => {


                            return(
                              <div>

                              <div
                                key={stats[i].props.name}
                                className={`${this.state.mas[stats[i].props.name]} field`}>
                                <Form.Group size='large'>
                                  <Form.Field>
                                    {c}
                                  </Form.Field>


                                </Form.Group>


                                <ValidateMsg field={stats[i].props.name} />
                              </div>

                            </div>
                            )

                          })
                        }


                      </div>
                    </ValidateContext.Provider>
                    <Form.Group>
                      <Button
                        className='primary'
                        onClick={this.handleClick}
                        disabled={this.state.submitted && !this.formValid}
                        >
                        Submit
                      </Button>
                    </Form.Group>
                  </Form>
                </Segment>
              </div>

            </Grid.Column>
          </Grid>
        </Container>


      </React.Fragment>

    );
  }
}


export class ValidateMsg extends Component{
  static contextType = ValidateContext;

  render() {
    return(

      this.context.getMessagesforField(this.props.field).map( err =>
        <div className="ui left pointing error prompt label"
          key={err}>
        {err}
        </div>
      )


    );
  }
}

export  class MainEditor extends Component{
  static contextType = ValidateContext
  constructor(props){
    super(props)

    this.state = {
      name: '',
      order: '',
      email: '',
      pass: '',
      pass_confirm: '',
      terms: false
    }
    this.rules = {
        name: {required: true, alpha: true, minlength: 4},
        email: {required: true, email: true},
        order: {required: true},
        terms: {true: true},
        pass: {required: true,  equals: 'pass_confirm'},
        pass_confirm: {equals: 'pass'},


    }
  }
  updateFormValue= (event) => {
		this.setState({[event.target.name]: event.target.value})

	}

  updateFormCheck = (ev) => {
    this.setState({[ev.target.name]: ev.target.checked})
  }

  render() {
    return (
      <div>

        <FormLive
          data={this.state }
          rules={this.rules}
          submit={this.props.submit}>

          <Form.Input
            type='text'
            name='name'
            label='Name'
            value={this.state.name}
            onChange={this.updateFormValue} />

          <Form.Input
            name='pass'
            label='Password'
            value={this.state.pass}
            onChange={this.updateFormValue} />

          <Form.Input
            className='float-left'
            name='pass_confirm'
            label='Password Confirmation'
            value={this.state.pass_confirm}
            onChange={this.updateFormValue} />


          <Form.Input
            type="text"
            name='email'
            value={this.state.email}
            label='Email: '
            onChange={this.updateFormValue}
            />

          <Form.TextArea
            rows={4}
            cols={5}

            label='Order: '
            name='order'
            onChange={this.updateFormValue}/>

          <Form.Checkbox

            label="Agree to terms and conditions"
            name='terms'
            onChange={this.updateFormCheck}
            checked = {this.state.terms}

            />


        </FormLive>
      </div>


    );
  }

}
