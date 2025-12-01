// client/src/Home.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../components/Home';

describe('Home component', () => {
  test('renders welcome message', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );


    expect(
      screen.getByText(/Welcome to my portfolio/i)
    ).toBeInTheDocument();
  });
});
