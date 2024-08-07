import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Landing.css';

const LandingPage = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const images = [
        'url(https://i.ytimg.com/vi/ofzQqJNEYBk/maxresdefault.jpg)',
        'url(https://img.freepik.com/premium-photo/nairobi-city-county-kenyas-capital-cityscapes-skyline-skyscrapers-highrise-buildings-architecture_257688-277.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722297600&semt=ais_hybrid)',
        'url(https://www.voyagekenya.fr/cdn/ke-public/nairobi_centre_ville.jpg)',
        'url(https://media.cnn.com/api/v1/images/stellar/prod/230202121817-basigo-electric-bus-nairobi-kenya-2.jpg?c=original)'
    ];

   
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="landing-page">
            <Navbar />
            <header id="home" className="hero" style={{ backgroundImage: images[currentImage] }}>
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to NairobiKonnect</h1>
                    <p className="hero-description">
                        Explore the greatness of Nairobi
                    </p>
                    <button
                        onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                        className="cta-button"
                    >
                        Discover More
                    </button>
                </div>
            </header>

            <section id="services" className="services">
                <div className="services-container">
                    <h2 className="services-title">Our Services</h2>
                    <div className="services-list">
                        <div className="service-card">
                            <div className="service-icon"></div>
                            <h3 className="service-title">Booking Buses</h3>
                            <p className="service-description">
                                A user is able to book a bus for the route they would want
                            </p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon"></div>
                            <h3 className="service-title">Driver</h3>
                            <p className="service-description">
                                A driver can register their car and work 
                            </p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon"></div>
                            <h3 className="service-title">Buying</h3>
                            <p className="service-description">
                                A user can shop from local stores with an effective payment method
                            </p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon"></div>
                            <h3 className="service-title">BusinessPerson</h3>
                            <p className="service-description">
                                A business person can sell their products to the users
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="contact">
                <div className="contact-container">
                    <h2 className="contact-title">Get in Touch</h2>
                    <form className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name" className="contact-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="contact-input"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="contact-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="contact-input"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" className="contact-label">Message</label>
                            <textarea
                                id="message"
                                className="contact-textarea"
                                placeholder="Your Message"
                            />
                        </div>
                        <button
                            type="submit"
                            className="contact-submit"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
