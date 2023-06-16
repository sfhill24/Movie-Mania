import { render, screen } from '@testing-library/react';
import MovieCard from '../../MovieCard';


test("MovieCard renders successfully", async () => {
    render(<MovieCard/>);

    const element = await screen.findByAltText(/movieImage/);

    expect(element).toBeInTheDocument();
})


test("MovieCard renders successfully when passing image url", async () => {
    render(<MovieCard imageUrl ={"testImage"}/>);

    const element = await screen.findByAltText(/movieImage/);

    expect(element.src).toContain('testImage');
})


