import React from "react";

const Footer = () => {
    return (
        <footer className=" flex center">
            <div className="footer">Movie Mania Ⓒ 2023
                <span>
                    <img className=" source-img" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                        OnClick={() => window.open('https://www.themoviedb.org/?language=en-US')}></img>

                </span>
            </div>
        </footer>
    )
}

export default Footer;