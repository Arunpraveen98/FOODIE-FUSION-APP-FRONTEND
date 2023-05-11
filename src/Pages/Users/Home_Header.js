import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import "../../Stylesheet/Home.css";
import CarouselItem from "../../components/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faMoneyCheck,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
// -----------------------
const Home = () => {
  return (
    <Container className="Home-Header">
      <Row>
        <Col lg="6" md="6">
          <div className="hero__content">
            <div className="header-description">
              <h5 className="mb-3">Easy way to make an order</h5>
              <h1 className="mb-4 hero__title">
                <span>HUNGRY?</span> Just wait <br /> food at
                <span> your door</span>
              </h1>

              <p>
                Exploring global flavors in every bite, from mouthwatering
                pizzas to juicy burgers. Unleash your taste buds with our
                innovative fusion app.
              </p>
            </div>

            <div className="hero__btns d-flex align-items-center gap-5 mt-4">
              <button
                className="order__btn d-flex align-items-center justify-content-between"
                onClick={() =>
                  toast.success(
                    "🤷‍♂️Please Select Your Favourite Item to Order.",
                    {
                      autoClose: 2000,
                    }
                  )
                }
              >
                Order now{" "}
                <FontAwesomeIcon
                  style={{ marginLeft: "5px" }}
                  icon={faCartArrowDown}
                />
              </button>
            </div>

            <div className="hero__service  d-flex align-items-center gap-5 mt-5">
              <p className="d-flex align-items-center gap-2">
                <span className="shipping__icon">
                  <FontAwesomeIcon icon={faTruckFast} />
                </span>{" "}
                No shipping charge
              </p>

              <p className="d-flex align-items-center gap-2">
                <span className="shipping__icon">
                  <FontAwesomeIcon icon={faMoneyCheck} />
                </span>{" "}
                100% secure checkout
              </p>
            </div>
          </div>
        </Col>

        <Col lg="6" md="6">
          <CarouselItem />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
