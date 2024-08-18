import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Navbar from '../components/Navbar';
import './styles/Landing.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LandingPage = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isChatOpen, setIsChatOpen] = useState(false); // Live chat state
    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(0);
    const [counter3, setCounter3] = useState(0);

    const images = [
        'url(https://i.ytimg.com/vi/ofzQqJNEYBk/maxresdefault.jpg)',
        'url(https://img.freepik.com/premium-photo/nairobi-city-county-kenyas-capital-cityscapes-skyline-skyscrapers-highrise-buildings-architecture_257688-277.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722297600&semt=ais_hybrid)',
        'url(https://www.voyagekenya.fr/cdn/ke-public/nairobi_centre_ville.jpg)',
        'url(https://media.cnn.com/api/v1/images/stellar/prod/230202121817-basigo-electric-bus-nairobi-kenya-2.jpg?c=original)'
    ];

    const landingSchema = z.object({
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
        role: z.string().min(2, { message: 'Role must be at least 2 characters' }),
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 10000);

        AOS.init(); // Initialize AOS for scroll animations

        // Animated Counters
        const intervalCounter = setInterval(() => {
            setCounter1((prev) => (prev < 10000 ? prev + 100 : 10000));
            setCounter2((prev) => (prev < 1000 ? prev + 10 : 1000));
            setCounter3((prev) => (prev < 500 ? prev + 5 : 500));
        }, 30);

        return () => {
            clearInterval(interval);
            clearInterval(intervalCounter);
        };
    }, []);

    // Toggle live chat window
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className="landing-page">
            <Navbar />
            <header id="home" className="hero" style={{ backgroundImage: images[currentImage] }}>
                <div className="hero-content" data-aos="fade-up">
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

            <section id="about" className="about">
                <div className="about-container" data-aos="fade-up">
                    <h2 className="about-title">About NairobiKonnect</h2>
                    <p className="about-description">
                        NairobiKonnect is your gateway to discovering the best Nairobi has to offer. 
                        Whether you're booking a bus, shopping, or connecting with local businesses, 
                        we're here to make your experience seamless and enjoyable.
                    </p>
                    <div className="about-features">
                        <div className="feature-card" data-aos="zoom-in" data-aos-delay="100">
                            <i className="fas fa-users feature-icon"></i>
                            <h3>{counter1}+</h3>
                            <p>Users</p>
                        </div>
                        <div className="feature-card" data-aos="zoom-in" data-aos-delay="200">
                            <i className="fas fa-briefcase feature-icon"></i>
                            <h3>{counter2}+</h3>
                            <p>Businesses</p>
                        </div>
                        <div className="feature-card" data-aos="zoom-in" data-aos-delay="300">
                            <i className="fas fa-bus feature-icon"></i>
                            <h3>{counter3}+</h3>
                            <p>Buses Available</p>
                        </div>
                    </div>
                    <div className="about-cta">
                        <a href="#services" className="btn-primary" data-aos="fade-right">Explore Our Services</a>
                        <a href="#contact" className="btn-secondary" data-aos="fade-left">Contact Us</a>
                    </div>
                </div>
            </section>

            <section id="testimonials" className="testimonials">
                <div className="testimonials-container" data-aos="fade-up">
                    <h2 className="testimonials-title">What Our Users Say</h2>
                    <div className="testimonial">
                        <p className="testimonial-quote">"NairobiKonnect made my trip to Nairobi so easy and fun. Booking a bus was a breeze!"</p>
                        <p className="testimonial-author">- Jane Doe</p>
                    </div>
                    <div className="testimonial">
                        <p className="testimonial-quote">"As a business owner, I've reached more customers than ever. Highly recommend!"</p>
                        <p className="testimonial-author">- John Smith</p>
                    </div>
                    <div className="testimonial-form">
                        <h3>Share Your Experience</h3>
                        <form>
                            <input type="text" placeholder="Your Name" required />
                            <textarea placeholder="Your Testimonial" rows="4" required></textarea>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </section>

            <section id="locations" className="locations">
                <div className="locations-container" data-aos="fade-up">
                    <h2 className="locations-title">Explore Nairobi</h2>
                    <div className="location-grid">
                        <div className="location-card" data-aos="flip-left">
                            <img src="https://i.pinimg.com/236x/76/66/13/766613bbad01ba083be4ce56fe8dcff6.jpg" alt="Market Name" className="location-image" />
                            <h3 className="location-title">Karura Forest</h3>
                            <p className="location-description">A tranquil escape in the heart of the city.</p>
                        </div>
                        <div className="location-card" data-aos="flip-right">
                            <img src="https://i.pinimg.com/236x/c7/f9/d4/c7f9d44d724f0a35af544b45b53fa0ff.jpg" alt="maasai market" className="location-image" />
                            <h3 className="location-title">Maasai Market</h3>
                            <p className="location-description">Experience the vibrant culture and crafts.</p>
                        </div>
                    </div>
                    <MapContainer center={[-1.286389, 36.817223]} zoom={13} scrollWheelZoom={false} className="map-container">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[-1.286389, 36.817223]}>
                            <Popup>
                                Nairobi, Kenya <br /> The heart of Africa.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </section>

            <section id="cta" className="cta">
                <div className="cta-container" data-aos="fade-up">
                    <h2 className="cta-title">Join the NairobiKonnect Community</h2>
                    <p className="cta-description">Sign up today and start exploring everything Nairobi has to offer.</p>
                    <button
                        onClick={() => document.getElementById('signup').scrollIntoView({ behavior: 'smooth' })}
                        className="cta-button"
                    >
                        Sign Up Now
                    </button>
                </div>
            </section>

            <section id="storytelling" className="storytelling">
                <div className="storytelling-container" data-aos="fade-up">
                    <h2 className="storytelling-title">Discover Nairobi Through Our Story</h2>
                    <div className="storytelling-content">
                        <div className="storytelling-item" id="culture" data-aos="zoom-in">
                            <div className="storytelling-svg">
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="100" cy="100" r="80" fill="#ffcc00" />
                                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="#000">Culture</text>
                                </svg>
                            </div>
                            <p className="storytelling-text">Explore Nairobi's rich cultural heritage through vibrant festivals, traditional music, and dance.</p>
                        </div>
                        <div className="storytelling-item" id="history" data-aos="zoom-in">
                            <div className="storytelling-svg">
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="50" y="50" width="100" height="100" fill="#00ccff" />
                                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="#000">History</text>
                                </svg>
                            </div>
                            <p className="storytelling-text">Journey through Nairobi's past with historical landmarks and fascinating stories of the city’s growth.</p>
                        </div>
                        <div className="storytelling-item" id="attractions" data-aos="zoom-in">
                            <div className="storytelling-svg">
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M50,150 L150,150 L100,50 Z" fill="#ff5733" />
                                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="#fff">Attractions</text>
                                </svg>
                            </div>
                            <p className="storytelling-text">Discover Nairobi’s top attractions, from breathtaking parks to bustling markets and iconic landmarks.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className="services">
                <div className="services-container" data-aos="fade-up">
                    <h2 className="services-title">Our Services</h2>
                    <div className="services-list">
                        <div className="service-card" data-aos="zoom-in">
                            <div className="service-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 3v9.27l6.72 4.09 1.28-2.18-7.52-4.5L12 3z" fill="currentColor"/>
                                </svg>
                            </div>
                            <h3 className="service-title">Booking Buses</h3>
                            <p className="service-description">
                                Easily book buses for your desired routes with our user-friendly interface. Enjoy seamless scheduling and real-time updates.
                            </p>
                        </div>
                        <div className="service-card" data-aos="zoom-in">
                            <div className="service-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 2v6h4l-6 6-6-6h4V2h4z" fill="currentColor"/>
                                </svg>
                            </div>
                            <h3 className="service-title">Driver Registration</h3>
                            <p className="service-description">
                                Register your vehicle and start driving. Connect with passengers and manage your schedules efficiently through our platform.
                            </p>
                        </div>
                        <div className="service-card" data-aos="zoom-in">
                            <div className="service-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6h-8V4h8v2zm-2 8v2H4v-2h14zm0-8v2H4V6h14z" fill="currentColor"/>
                                </svg>
                            </div>
                            <h3 className="service-title">Shopping</h3>
                            <p className="service-description">
                                Shop from a variety of local stores with an easy and secure payment system. Discover unique products and support local businesses.
                            </p>
                        </div>
                        <div className="service-card" data-aos="zoom-in">
                            <div className="service-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L1 21h22L12 2zm0 3.27L17.64 18H6.36L12 5.27z" fill="currentColor"/>
                                </svg>
                            </div>
                            <h3 className="service-title">Business Opportunities</h3>
                            <p className="service-description">
                                Expand your business by reaching more customers. List your products and services, and grow your presence in the Nairobi market.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="partners" className="partners">
                <div className="partners-container" data-aos="fade-up">
                    <h2 className="partners-title">Our Partners</h2>
                    <div className="partners-logos">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5MtRrZ5ntzJhuyc5yg8q707E7AzRDTEgdLQ&s" alt="Partner 1" className="partner-logo" />
                        <img src="https://media-mba1-1.cdn.whatsapp.net/v/t61.24694-24/418593239_1024578882738141_661375324599991818_n.jpg?ccb=11-4&oh=01_Q5AaIHF_nusdl-g8tCUX5L4tuku1b22t99RLn5F2okvvxqAS&oe=66CC55E8&_nc_sid=5e03e0&_nc_cat=106" alt="Partner 2" className="partner-logo" />
                    </div>
                </div>
            </section>

            <section id="contact" className="contact">
                <div className="contact-container" data-aos="fade-up">
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

            <footer className="footer">
                <div className="footer-container">
                    <div className="social-media">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                    <p>&copy; 2024 NairobiKonnect. All rights reserved.</p>
                </div>
            </footer>

            {/* Live Chat Feature */}
            <div className={`live-chat ${isChatOpen ? 'open' : ''}`}>
                <button onClick={toggleChat} className="chat-toggle-button">
                    {isChatOpen ? 'Close Chat' : 'Chat with Us'}
                </button>
                {isChatOpen && (
                    <div className="chat-box">
                        <p>Hi! How can we assist you today?</p>
                        <input type="text" placeholder="Type your message..." />
                        <button type="submit">Send</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingPage;
