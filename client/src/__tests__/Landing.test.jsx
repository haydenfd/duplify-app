import { render, screen } from '@testing-library/react';
import React from 'react';
import Landing from '../src/pages/Landing';

describe('Landing Page Test', () => {
    it('should contains the heading 1', () => {
    render(<Landing />);
        const heading = screen.getByText(/DUPLIFY/i);
        expect(heading).toBeInTheDocument()
    });
});