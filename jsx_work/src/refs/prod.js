import React from 'react'
import {
  Form, Button,
  Header, Table,
  Segment, Grid,
  Loader, Ref,
  Container} from 'semantic-ui-react'
import PropTypes from 'prop-types'


class  ValidationDisplay extends React.Component {
  render () {
    return this.props.errors ?
      this.props.errors.map(err =>
      <div className='ui error top pointing label' key={err}>
        {err}
      </div>
    ) : null


  }
}


export const GetValidationMsgs = function (elem) {
  // body...
  let constraints = {}
  let errors = {}
  const validateField =  () => {
    let field_errors = []
    if(!elem.checkValidity()){
      if (elem.validity.tooShort)
        field_errors.push('value is too short')
      if (elem.validity.valueMissing)
      field_errors.push('value is missing')
      if (elem.validity.rangeUnderflow)
        field_errors.push('too small enter from 1 and above')


      if(field_errors.length > 0){
        errors[elem] = field_errors
      }


    }

    return errors;
  }
};


class ProductForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      category: '',
      price: '',
      loading: false,
      error: {}
    }

    this.erromatic = {}

    this.rules = {
      name: { validation: {required: true}},
      category: {validation: {required: true}},
      price: {validation: {required: true}}

    }
    this.nameRef = React.createRef()
    this.handleAdd = this.handleAdd.bind(this)
  }


  deriveErrors(elem){
    this.state.error = GetValidationMsgs(elem)
    return this.state.error
  }
  get formValid(){
    console.log('for errors ', typeof(this.state.error))
    return (this.state.error).length === 0
  }

  handleChange = (ev) => {
    this.deriveErrors(ev.target)
    this.setState({
      [ev.target.name]: ev.target.value
    });
  }

  handleAdd = (ev) => {
    if (!this.formValid){
      console.log(this.erromatic)
      return
    }
    this.setState({
      loading : true
    })

    this.props.callback(this.state)

    setTimeout(
      () =>{
      this.setState({
        name: '', category: '',
        price: '', loading: false
    },
  )
  }, 600)
  this.nameRef.current.focus()

  }


  render () {
    const  stats  = Object.keys(this.state)
    stats.splice(stats.indexOf('loading'), 1)

      stats.splice(stats.indexOf('error'), 1)
    const load = this.state.loading

      return <div>

        <Form size='large' >

          { stats && stats.map((field,num)  =>{

            return (
              <div key={field}>
              <div class="field">
                <label>{`${field.toUpperCase()[0] + field.slice(1)}`}</label>
                <div class="ui large fluid input">
                <input name={field}
                  type="text"

                  ref={field === 'name' ? this.nameRef : ''}
                  autoFocus={field === 'name'}
                  onChange={this.handleChange}
                  value={`${this.state[field]}`}
                  {...this.rules[field].validation} />

                </div>
              </div>
              </div>
            )
          })}

          <Button
            color='teal'
            type='submit'
            fluid
            onClick={this.handleAdd}
            disabled={this.formValid}>
            Submit
          </Button>

          { load &&
            <Loader active inline='centered' />
          }


        </Form>


      </div>



  }
}

//export default CreateProduct;



class DisplayProducts extends React.Component {
  render () {
    if  (this.props.products.length){
      return(
        <div>
          <Header as='h2'>
            Display Products
          </Header>
          <Table size='small'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Category
                </Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>

              {
                this.props.products.map(p =>
                  <Table.Row key={p.name}>
                    <Table.Cell>
                      {p.name}
                    </Table.Cell>
                    <Table.Cell>
                      {p.category}
                    </Table.Cell>
                    <Table.Cell>
                      ${Number(p.price).toFixed(2)}
                    </Table.Cell>
                  </Table.Row>

                )
              }
            </Table.Body>
          </Table>
        </div>
      )
    }
    else{
      return(
        <div>
          <Header  as='h4'>No Products on Cart</Header>
        </div>
      )
    }
  }
}

//export default DisplayProducts;

export class ProdHub extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      products: []
    }
  }

  addProduct = (product) => {
    if(this.state.products.indexOf(product) == -1)
      this.setState({
        products: [...this.state.products, product]
      });
  }


  render () {
    return (
      <div>
        <Container>
        <Grid centered columns={2}>
          <Grid.Column>
            <Segment>
              <Header as='h3'>
                Product Form
              </Header>
              <ProductForm callback={this.addProduct}  />
            </Segment>

            <DisplayProducts products={this.state.products}/>
          </Grid.Column>
        </Grid>
      </Container>
      </div>

    );
  }
}

export default ProdHub;
