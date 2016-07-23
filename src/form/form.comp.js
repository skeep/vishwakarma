/**
 * Created by suman on 21/07/16.
 */

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';

class ContactForm extends Component {

  constructor() {
    super();

    this.state = {};

    const googKey = '103oqntmIFabPiE1mhve7JyDjELstxqMQ253egD0wn2Y';
    const googURL = `https://spreadsheets.google.com/feeds/list/${googKey}/od6/public/values?alt=json`;

    const request = new Request(googURL, {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    const pr = fetch(request).then((res)=> {
      return res.json();
    }).catch((err)=> {
      console.error(err);
    });

    pr.then((res)=> {
      this.setState({
        fields: this._createFieldsSpec(res.feed.entry)
      });
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        {(!_.isUndefined(this.state.fields)) ?
          this.state.fields.map((field, index)=>
            <div key={index}>
              {field.required = +field.required ? true : false}
              <label>{field.label}</label>
              <Field name={index + ''}
                     component="input"
                     type={field.type}
                     placeholder={field.placeholder}
                     required={field.required}/>
            </div>
          ) : ''}
        <button type="submit">Submit</button>
      </form>
    );
  }

  _createFieldsSpec(rows) {
    const fieldsArr = _.map(rows, (row)=> {
      const fields = row.content.$t.split(', ');
      const fieldObj = {};
      _.each(fields, (chunk)=> {
        chunk = chunk.split(': ');
        fieldObj[chunk[0]] = chunk[1];
      });
      return fieldObj;
    });
    return fieldsArr;
  }
}

// Decorate the form component
ContactForm = reduxForm({
  form: 'contact' // a unique name for this form
})(ContactForm);

export default ContactForm;
