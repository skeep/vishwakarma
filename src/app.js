/**
 * Created by suman on 21/07/16.
 */

import React from 'react';
import ContactForm from './form/form.comp';

const App = () => (
  <div>
    <ContactForm onSubmit={()=> {
      console.log('there');
    }}/>
  </div>
);

export default App
