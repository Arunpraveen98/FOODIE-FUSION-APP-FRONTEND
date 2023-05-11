import Carousel from "react-bootstrap/Carousel";
import "../Stylesheet/Carousel.css";


function CarouselItem() {
  
  return (
    <div className="container carousel-container">
      <div className="row">
        <div className="col-lg-12">
          <Carousel className="carousel-parent">
            <Carousel.Item interval={1000}>
              <img
                className="d-block  carousel-images"
                src="https://images.unsplash.com/photo-1477617722074-45613a51bf6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3 className="carousel-title">Burger</h3>
                <p className="carousel-desc">
                  Experience burger perfection with a tantalizing masterpiece of
                  succulent ingredients.
                </p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={1000}>
              <img
                className="d-block  carousel-images"
                src="https://img.lovepik.com/photo/50077/4812.jpg_wh860.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3 className="carousel-title">Pizza</h3>
                <p className="carousel-desc">
                  Savor the divine flavors of a delectable pizza, enticing you
                  with its cheesy goodness
                </p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={1000}>
              <img
                className="d-block  carousel-images"
                src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1257&q=80"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3 className="carousel-title">Juicy</h3>
                <p className="carousel-desc">
                  Indulge in the juiciest delights, tantalizing your taste buds
                  with a burst of flavor.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default CarouselItem;
