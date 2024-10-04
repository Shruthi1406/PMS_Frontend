import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Specialities.css";
import derma from './derma.jpg';
import dentist from './dentist.jpg';
import cardio from './cardio.jpg';
import nutrionist from './nutritionist.png';
import psychologist from './pyschologist 1.png';
import orthopedic from './orthopedic.png';
import gynecologist from './gynecologist 1.png';
import pediatrician from './pediatrician 1.jpg';
 
const specialists = [
    { name: 'Dentist', image: dentist },
    { name: 'Dermatologist', image: derma },
    { name: 'Cardiologist', image: cardio },
    { name: 'Nutritionist', image: nutrionist },
    { name: 'Psychologist', image: psychologist },
    { name: 'Orthopedic', image: orthopedic },
    { name: 'Gynecologist', image: gynecologist },
    { name: 'Pediatrician', image: pediatrician },
];
 
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1
    }
};
 
const Specialities = () => {
    return (
        <div className='appointment container'>
            <h2 className='doctor-heading'>Consult top doctors across Specialities</h2>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={true}
                infinite={true}
                autoPlay={false}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                itemClass="carousel-item-padding-0"
            >
                {specialists.map((specialist, idx) => (
                    <div key={idx} className="d-flex justify-content-center">
                        <div className="card custom-card" style={{ width: '100%', maxWidth: '250px' }}>
                            <img src={specialist.image} className="card-img-top img-fluid problem-img" alt={specialist.name} />
                            <div className="card-body">
                                <Link to='/root/specialist' state={{ specialization: specialist.name }} className="btn btn-info">
                                    {specialist.name}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Specialities;