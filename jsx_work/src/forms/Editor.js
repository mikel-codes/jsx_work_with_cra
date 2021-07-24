import React, { Component } from "react";
import {FormValidator} from './formValidator'
import {ValidationMessage} from './validationMsg'
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import {ValidateData} from './formValidator'

export class Editor extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: "Bob",
      email: '',
			order: '',
		}

    // build constraints for validate javascript
    this.rules = {
      name: {required: true, minlength: 3, alpha: true } ,
      email: {required: true, email: true},
      order: {required: true}

    }
	}


	updateFormValue= (event) => {
		this.setState({[event.target.name]: event.target.value},)
  }

	render(){
		return(
			<div>
			<Header as='h4'>Form Control</Header>
      <FormValidator data={this.state} rules={this.rules}  submit={this.props.submit}>
			<div className="h5 bg-info text-white p-2">
				<div className="form-group">
					<label>Name</label>
					<input type='text'
             className='form-control'
						onChange={this.updateFormValue}
            name='name'
             value={this.state.name}>
					</input>

          <ValidationMessage field='name'/>
				</div>
        <div className="form-group">
          <label>Email:</label>
          <input type='text' className='form-control'
            onChange={this.updateFormValue} name='email'
             value={this.state.email}>
          </input>
          <ValidationMessage field='email'/>
        </div>
				<div className='form-group'>
					<textarea className="form-control" name='order'
						value={this.state.order} onChange={this.updateFormValue}
            ></textarea>
          <ValidationMessage field="order"/>
				</div>
			</div>
    </FormValidator>
			</div>
		)
	}

}


/*
export class Editor extends Component {
	constructor(props){
		super(props)
		this.state = {
			name: "Bob",
			flavor: 'Vanilla',
			toppings: ["Strawberries"],
			twoscoops: false
		}
		this.flavors = ["Chocolate", "Double Chocolate",
            "Triple Chocolate", "Vanilla"];
        this.toppings = ["Sprinkles", "Fudge Sauce",
                            "Strawberries", "Maple Syrup"]

	}
	updateFormValue = (event) => {
		this.setState({[event.target.name]: event.target.value},
			() => this.props.submit(this.state))
	}
	updateFormValueOptions = (event) => {
		let options = [...event.target.options].filter(o => o.selected).map(o => o.value)
		this.setState({[event.target.name]: options}, ()=> this.props.submit(this.state))
	}

	updateFormValueCheck = (event) => {
		event.persist();
		this.setState(state => {
			if (event.target.checked){
				state.toppings.push(event.target.name)
			}
			else{
				let index = state.topping.indexOf(event.target.name)
				state.topping.splice(index, 1)

		}
	}, ()=> this.props.submit(this.state))
	}



	componentDidCatch = (error, info) => {console.log('error caught as ', error)}

    render() {
        return <div className="h5 bg-info text-white p-2">
                    <div className='form-group'>
                    	<label>Name:</label>
                    	<input className="form-control" value={this.state.name} name="name"  onChange={this.updateFormValue} />
                    </div>
                    <div className="form-group">
                    	<label>Ice Cream Flavor</label>
                    		{this.flavors.map(flavor =>
                    		<div className="form-check" key={ flavor }>
                    			<input type="radio"
                    				className='form-check'
                    			  	value={flavor}  name="flavor"
                    			 	checked = {this.state.flavor === flavor}
                    			 	onChange={this.updateFormValue} />
                    			<label className="form-check-label">{flavor}</label>
                    		</div>
                    		)}

                	</div>
                	<div className="form-group">
                		<label>Ice Cream Toppings</label>
                			{this.toppings.map(top =>
                				<div className="form-check" key={ top }>
                    			<input type="checkbox"
                    				className='form-check'
                    			  	value={top}  name="toppings"
                    			 	checked = {this.state.toppings.indexOf({top}) > -1}
                    			 	onChange={this.updateFormValueCheck} />
                    			<label className="form-check-label">{top}</label>
                    		</div>

                			)}

                	</div>
                	<div className="form-group">
                	<div className="form-check">
                	<input type="checkbox"
                		className="form-check-input"
                		value={this.state.twoscoops}
                		checked = {this.state.twoscoops}
                		name="twoscoops"
                		onChange={this.updateFormValue}/>
									                	</div>
                	<label className="form-check-label">Two Scoops</label>
                	</div>
                	</div>
    }
}


export class Editor extends Component{
	constructor(props) {
		super(props)
		this.state = {
			'name': 'Bob',
			'flavor': 'vanilla',
			'toppings': ['strawberries'],
			'twoscoops': false
		}
		this.flavors = ['wikk', 'berries', 'guey']
		this.toppings = ['banana', 'apples', 'oranges']
	}
	updateSingleFieldValue = (event) => {
		this.setState({event.target.name: event.target.value}, () => this.props.submit(this.state))
	}
	render() {
		return (
			<div className='form-group'>
				<div className="form-check">
					{this.toppings.map(top =>
						<input type='checkbox' name='toppings'onChange={this.updateSingleFieldValue}>
						</input>
				</div>
			</div>
		)
	}
}
*/
