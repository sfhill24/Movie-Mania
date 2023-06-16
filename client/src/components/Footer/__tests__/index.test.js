import { render, screen } from '@testing-library/react';
import Footer from '../../Footer';


test("Footer renders successfully", () => {
    render(<Footer/>);

    const element = screen.getByText(/Movie Mania/);

    expect(element).toBeInTheDocument();
})

