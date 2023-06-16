import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Jumbotron from '../../Jumbotron';


test("Jumbotron renders successfully", async () => {
    render(<Jumbotron />);

    const element = await screen.findByAltText(/logo/);

    expect(element).toBeInTheDocument();


})
