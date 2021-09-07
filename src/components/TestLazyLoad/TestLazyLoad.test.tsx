import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestLazyLoad from './TestLazyLoad';

describe('<TestLazyLoad />', () => {
  test('it should mount', () => {
    render(<TestLazyLoad />);
    
    const testLazyLoad = screen.getByTestId('TestLazyLoad');

    expect(testLazyLoad).toBeInTheDocument();
  });
});