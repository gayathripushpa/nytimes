import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';

describe('App', () => {
  it('renders the App component with title and period select', () => {
    render(<App/>);
    
    expect(screen.getByText('NY Times Most Popular Articles')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Period')).toBeInTheDocument();
  });

  it('changes period and fetches new articles', async () => {
    render(<App/>);

    const selectElement = screen.getByLabelText('Select Period');
    fireEvent.change(selectElement, { target: { value: 7 } });

    expect(selectElement.value).toBe('7');

    await screen.findByText('Test Article 1');
  });
});
