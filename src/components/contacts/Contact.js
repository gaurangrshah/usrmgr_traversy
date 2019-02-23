import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';

class Contact extends Component {
  state = {
    showContactInfo: false
  };
  // @params: id(int), dispatch(func) passed in from the onClick handler
  onDeleteClick = async (id, dispatch) => {
    //hack: mocking delete from persistent database, with try/catch:
    try {
      //since we are not expecting any data back we can forego creating a variable to handle our response
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

      //call dispatch and pass in the action='DELETE_CONTACT' and payload=id
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (e) {
      // Regarless of persistence above, we atleast want to remove, even if there is an error:
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    }
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    // destructuring showContactInfo from state
    const { showContactInfo } = this.state;

    return (
      //Bring in the Consumer component and access its value attribute
      <Consumer>
        {value => {
          //destructure dispatch out of the value attribute:
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{' '}
                <i
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    })
                  }
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                  //bind this to the Contact component so we can access id & dispatch from its props:
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contacts/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
              </h4>
              {//if showContactInfo = true ? show-<ul> : show-null;
              showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
