import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ArticleList from '../ArticleList';
import '@testing-library/jest-dom/extend-expect';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      results: [
        {
          id: 1,
          title: 'Test Article 1',
          abstract: 'This is a test abstract',
          byline: 'By Test Author',
          url: 'http://example.com',
          media: [
            {
              'media-metadata': [
                { format: 'mediumThreeByTwo440', url: 'http://example.com/image.jpg' },
              ],
            },
          ],
        },
      ],
    }),
  })
);

describe('ArticleList', () => {
  it('renders loading state initially', () => {
    render(<ArticleList period={1} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders articles after fetch', async () => {
    render(<ArticleList period={1} />);

    await waitFor(() => expect(screen.getByText('Test Article 1')).toBeInTheDocument());
    expect(screen.getByText('This is a test abstract')).toBeInTheDocument();
    expect(screen.getByText('By Test Author')).toBeInTheDocument();
    expect(screen.getByText('Read more')).toHaveAttribute('href', 'http://example.com');
    expect(screen.getByAltText('Test Article 1')).toHaveAttribute('src', 'http://example.com/image.jpg');
  });

  it('renders error state on fetch failure', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch')));

    render(<ArticleList period={1} />);

    await waitFor(() => expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument());
  });
});
