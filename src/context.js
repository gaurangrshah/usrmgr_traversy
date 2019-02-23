import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

//reducer is an arrow func. that takes in @params: state, action => updated state w/o mutation.;
const reducer = (state, action) => {
  //eval action.type and preform actions based on type:
  switch (action.type) {
    // when the action.type = DELETE_CONTACT
    case 'DELETE_CONTACT':
      return {
        //using spread-op to grab all of our state
        ...state,
        //filter thru each contact in the contacts object from state
        contacts: state.contacts.filter(
          //if the id of the contact being deleted does not match then return it.
          contact => contact.id !== action.payload
        )
        // payload is the data that is sent along with an action in our case the id.
        // payload can also contain the entire contact object if necc.
      };
    //set case for action.type 'ADD_CONTACT'
    case 'ADD_CONTACT':
      return {
        ...state,
        //grabbing the action.payload from our contacts array
        contacts: [action.payload, ...state.contacts]
        //using spread to add on the new contact from payload to state.
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        //mapping contacts to check for the correct user id against the id from payload
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? //if the payload id matches contact.id we set contact = the entire payload
              (contact = action.payload)
            : //else, we just set it back to the same contact object.
              contact
        )
      };
    default:
      // set a default case, just in case, as is proper.
      return state;
    // if the default case is executed, then just return current state.
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    //NOTE dispatch is a method on our contact{object}
    dispatch: action =>
      this.setState(state =>
        //dispatch returns a function setState which in turn returns a reducer.
        reducer(state, action)
      )
    //the reducer gets passed in our state and an action.
  };
  //Using async/await to fulfill request
  async componentDidMount() {
    //assigning a variable to handle our response & setting axios to "await"
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    this.setState({ contacts: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
export const Consumer = Context.Consumer;

// this file provides redux like "provider" functionality to manage data as an alternative to passing state. this file gives us a class called provider which we then wrap around our entire application.
