import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class EditContact extends Component {
  //NOTE state
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  async componentDidMount() {
    //destructure id from url @param :id
    const { id } = this.props.match.params;
    //create a promise and a response:
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    //save the response
    const contact = res.data;
    //setState with response:
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  onSubmit = async (dispatch, e) => {
    //NOTE onSubmit
    //prevents any browser defaults from submitting
    e.preventDefault();
    //destructuring inputs from state
    const { name, email, phone } = this.state;

    // Check for errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }

    // creating an updated contact object from state:
    const updContact = {
      name,
      email,
      phone
    };

    //
    const { id } = this.props.match.params;
    // making PUT request and saving response, 2nd param: Updated Contact Object
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );

    //dispatch action.type for update contact and payload data from response
    dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

    //Clear State upon form submit
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    //Redirect user upon form submit
    this.props.history.push('/');
  };

  onChange = e =>
    //NOTE onChange => setState
    this.setState({
      // targeting each input's name attribute, and then its value attribute
      [e.target.name]: e.target.value
    });

  render() {
    //NOTE render()
    const { name, email, phone, errors } = this.state;

    console.log(errors);

    return (
      //NOTE return
      //value = state
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name.."
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email" //overriding the default type of text we set.
                    placeholder="you@email.com"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    type="tel" //overriding the default type of text we set.
                    placeholder="xxx-xxx-xxxx"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
