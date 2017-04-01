import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../../src/common/components/navigation';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Nav />, div);
});
