import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../../components/layout/TextInputGroup';
import uuid from 'uuid';
import axios from 'axios';

class AddContact extends Component {
  //NOTE state
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

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
    const newContact = {
      //generating uuid with uuid package
      id: uuid(),
      //using es6 key/value shorthand:
      name,
      email,
      phone
    };

    //making a post request to add a new contact, with the contact as the 2nd argument:
    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/users/',
      newContact
    );

    //dispatch gets returned with action.type: 'ADD_CONTACT' - payload: response.data
    dispatch({ type: 'ADD_CONTACT', payload: res.data });

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
                    value="Add Contact"
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

export default AddContact;
