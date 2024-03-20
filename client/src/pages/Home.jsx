import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
// import "bootstrap/dist/js/bootstrap.bundle.min";


const Home = () => {
    return(
        <div className='m-0 p-0'>
            {/*  carousel */}
            <div id="carouselExampleAutoplaying" class="carousel slide custom-carousel bg-dark" data-bs-ride="carousel" fade interval={3000}>
  <div class="carousel-inner " fade interval={3000}>
    <div class="carousel-item active p-4">
      <Link to="/products">
      <img src="/images/last.png" class="d-block container-fluid ps-4 pe-4 pb-3" alt="electric-scooty for rent" style={{ maxHeight: '36.3rem', objectFit: 'contain', borderRadius:'70px'}} />
      </Link>
    </div>
    <div class="carousel-item p-4">
      <img src="/images/sneaker.png" class="d-block container-fluid ps-4 pe-4 pb-3" alt="electric-scooty for rent" style={{ maxHeight: '36.3rem', objectFit: 'contain', borderRadius:'70px'}} />
    </div>
    <div class="carousel-item p-4">
      <img src="/images/speaker.png" class="d-block container-fluid ps-4 pe-4 pb-3" alt="electric-scooty for rent" style={{ maxHeight: '36.3rem', objectFit: 'contain', borderRadius:'70px'}} />
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<div class="card-group container-fluid ps-5 pe-5 p-sm-2">

  <div class="card m-xl-5 m-1 rounded bg-dark btn container-fluid">
  <h1 class="bi bi-scooter p-1 ps-0 pe-0 text-center m-auto container-fluid text-warning"></h1>
    <div class="card-body">
      <h5 class="card-title text-center text-warning">Electric Scooty</h5>
      </div>
  </div>

  <div class="card m-xl-5 m-1 rounded bg-dark container-fluid">
  <h1 class="bi bi-camera p-2 text-center text-warning m-auto container-fluid fs-1"></h1>
    <div class="card-body">
      <h5 class="card-title text-center text-warning">Camera</h5>
      </div>
  </div>

  <div class="card m-xl-5 m-1 rounded bg-dark container-fluid">
  <h1 class="bi bi-headphones p-2 text-center m-auto container-fluid text-warning"></h1>
    <div class="card-body">
      <h5 class="card-title text-center text-warning">Head-Phones</h5>
      </div>
  </div>

  <div class="card m-xl-5 m-1 rounded bg-dark container-fluid">
  <FontAwesomeIcon icon={faTshirt} className='text-warning text-center m-auto pb-0 pt-4' size="2x" />
    <div class="card-body">
      <h5 class="card-title text-center text-warning pt-2">Clothings</h5>
      </div>
  </div>

  <div class="card m-xl-5 m-1 rounded bg-dark container-fluid">
  <h1 class="bi bi-speaker p-2 text-center m-auto container-fluid text-warning pb-0 pt-3"></h1>
    <div class="card-body">
      <h5 class="card-title text-center text-warning">Party Speakers</h5>
      </div>
  </div>
</div>


{/* There's more to renting  */}
<div className='bg-dark'>
  <h3 className='pb-0 p-5 text-center text-light'>There's more to <br /> <span className='text-warning text-decoration-underline'>Rent</span>Kr ...</h3>
  
  <div class="row row-cols-1 row-cols-md-2 g-4 p-xl-5 pt-0 mt-0 m-5 fluid-container">
  <div class="col">
    <div class="card m-5 mt-0 bg-dark text-light">
      <div class="card-body">
      <i class="bi bi-shield-check fs-1 text-warning "></i>
        <h5 class="card-title text-warning">Quality Products</h5>
        <p class="card-text">We're all about top-notch quality and ensuring your peace of mind. Our team goes the extra mile to inspect every item, guaranteeing you get the best. Plus, we've got robust security measures in place to keep your rentals safe and secure. It's all about delivering an awesome experience you can trust!  </p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card m-5 mt-0 bg-dark text-light">
      <div class="card-body">
      <i class="bi bi-columns-gap fs-1 text-warning"></i>
        <h5 class="card-title text-warning">Wide Range of Items</h5>
        <p class="card-text">From Techy gadgets to trendy fashion, we've got it all! <br /> With such an incredible selection, there's something for everyone. <br />
         Say goodbye to limitations and hello to endless options with <span className='text-warning'>Rent</span>Kr!</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card m-5 mt-0 bg-dark text-light">
      <div class="card-body">
      <i class="bi bi-shield-lock fs-1 text-warning"></i>
        <h5 class="card-title text-warning">Secure Transactions</h5>
        <p class="card-text">With RentKr, your transactions are locked down tight. Our top-notch security measures ensure your peace of mind every step of the way. Rent with confidence knowing your payments are safe and secure!</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card m-5 mt-0 bg-dark text-light">
      <div class="card-body">
      <i class="bi bi-cash-coin fs-1 text-warning"></i>
        <h5 class="card-title text-warning">Earn from Home</h5>
        <p class="card-text"> With RentKr, your idle belongings can turn into extra cash!  That's right – earn money from the things you already own but don't use every day. RentKr makes it effortless to turn your idle items into income – now that's what I call a win-win!</p>
        </div>
    </div>
  </div>
</div>
</div>

        </div>
    );
};

export default Home;
