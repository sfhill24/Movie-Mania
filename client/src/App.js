import './App.css';


function App() {
  return (
    <div className="container-fluid ">
      <div className="test">
        <img className="jumbo-pic " src={require("../src/assets/Jumbo.jpg")} alt="jumbo-pic" />
        
        <div className="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">Button</button>
            </div>
            
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col">
            1 of 2
          </div>
          <div className="col">
            2 of 2
          </div>
          <div className="col">
            3 of 3
          </div>
        </div>
        <div className="row">
          <div className="col">
            1 of 3
          </div>
          <div className="col">
            2 of 3
          </div>
          <div className="col">
            3 of 3
          </div>
        </div>
      </div>
      <footer>
      <h2>Movie Mania Ⓒ 2023 <span><img className=" source-img" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"></img> </span></h2> 
      </footer>
    </div>


  );
}

export default App;
