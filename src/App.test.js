import React from 'react';
import ReactDOM from 'react-dom';
import ManualSearch from './ManualSearch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManualSearch />, div);
  ReactDOM.unmountComponentAtNode(div);
});
