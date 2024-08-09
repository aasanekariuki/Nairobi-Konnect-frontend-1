import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaInstagram, FaTelegramPlane, FaFacebookF, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
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

            <section id="about" className="about">
                <div className="about-container">
                    <h2 className="about-title">About NairobiKonnect</h2>
                    <p className="about-description">
                        NairobiKonnect is your gateway to discovering the best Nairobi has to offer. 
                        Whether you're booking a bus, shopping, or connecting with local businesses, 
                        we're here to make your experience seamless and enjoyable.
                    </p>
                    <div className="about-features">
                        <div className="feature-card">
                            <i className="fas fa-users feature-icon"></i>
                            <h3>10,000+</h3>
                            <p>Users</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-briefcase feature-icon"></i>
                            <h3>1,000+</h3>
                            <p>Businesses</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-bus feature-icon"></i>
                            <h3>500+</h3>
                            <p>Buses Available</p>
                        </div>
                    </div>
                    <div className="about-cta">
                        <a href="#services" className="btn-primary">Explore Our Services</a>
                        <a href="#contact" className="btn-secondary">Contact Us</a>
                    </div>
                </div>
            </section>

            <section id="testimonials" className="testimonials">
                <div className="testimonials-container">
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
                <div className="locations-container">
                    <h2 className="locations-title">Explore Nairobi</h2>
                    <div className="location-grid">
                        <div className="location-card">
                            <img src="https://i.pinimg.com/236x/76/66/13/766613bbad01ba083be4ce56fe8dcff6.jpg" alt="Karura Forest" className="location-image" />
                            <h3 className="location-title">Karura Forest</h3>
                            <p className="location-description">A tranquil escape in the heart of the city.</p>
                        </div>
                        <div className="location-card">
                            <img src="https://i.pinimg.com/236x/c7/f9/d4/c7f9d44d724f0a35af544b45b53fa0ff.jpg" alt="Maasai Market" className="location-image" />
                            <h3 className="location-title">Maasai Market</h3>
                            <p className="location-description">Experience the vibrant culture and crafts.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="cta" className="cta">
                <div className="cta-container">
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
                <div className="storytelling-container">
                    <h2 className="storytelling-title">Discover Nairobi Through Our Story</h2>
                    <div className="storytelling-content">
                        <div className="storytelling-item" id="culture">
                            <div className="storytelling-svg">
                                {/* <!-- SVG for Culture --> */}
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="100" cy="100" r="80" fill="#ffcc00" />
                                    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="#000">Culture</text>
                                </svg>
                            </div>
                            <p className="storytelling-text">Explore Nairobi's rich cultural heritage through vibrant festivals, traditional music, and dance.</p>
                        </div>
                        <div className="storytelling-item" id="history">
                            <div className="storytelling-svg">
                                {/* <!-- SVG for History --> */}
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="50" y="50" width="100" height="100" fill="#00ccff" />
                                    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="#000">History</text>
                                </svg>
                            </div>
                            <p className="storytelling-text">Journey through Nairobi's past with historical landmarks and fascinating stories of the city’s growth.</p>
                        </div>
                        <div className="storytelling-item" id="attractions">
                            <div className="storytelling-svg">
                                {/* <!-- SVG for Attractions --> */}
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M50,150 L150,150 L100,50 Z" fill="#ff5733" />
                                    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="#fff">Attractions</text>
                                </svg>
                            </div>
                            <p className="storytelling-text">Discover Nairobi’s top attractions, from breathtaking parks to bustling markets and iconic landmarks.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className="services">
                <div className="services-container">
                    <h2 className="services-title">Our Services</h2>
                    <div className="services-list">
                        <div className="service-card">
                            <div className="service-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="#000"/>
                                </svg>
                            </div>
                            <h3>Bus Booking</h3>
                            <p>Book buses effortlessly and receive tickets instantly.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6H4v12h16V6zm0-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM12 16h-2v-2h2v2zm0-4h-2V7h2v5z" fill="#000"/>
                                </svg>
                            </div>
                            <h3>Shop Directory</h3>
                            <p>Find and explore local businesses and products.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 11.4l-6-6V3H3v18h12v-2.4l6-6v-2.4zM4 19V5h10v4h4v10H4zm15-6h-2v-2h2v2zm-4 0H7v-2h8v2z" fill="#000"/>
                                </svg>
                            </div>
                            <h3>Order Tracking</h3>
                            <p>Track your orders and stay updated on delivery status.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-6 text-white bg-gray-800">
                <div className="mb-4 text-center">
                    <p className="mb-2">You can find us on these platforms:</p>
                    <div className="grid max-w-xs grid-cols-2 gap-4 mx-auto mb-4">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#C13584] hover:text-[#a02d74] flex items-center justify-center">
                            <FaInstagram size={24} className="mr-2 transition-transform duration-300 transform hover:scale-125" /> Instagram
                        </a>
                        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-[#0088cc] hover:text-[#006a9a] flex items-center justify-center">
                            <FaTelegramPlane size={24} className="mr-2 transition-transform duration-300 transform hover:scale-125" /> Telegram
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:text-[#145dbf] flex items-center justify-center">
                            <FaFacebookF size={24} className="mr-2 transition-transform duration-300 transform hover:scale-125" /> Facebook
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#1DA1F2] hover:text-[#1a91da] flex items-center justify-center">
                            <FaTwitter size={24} className="mr-2 transition-transform duration-300 transform hover:scale-125" /> Twitter
                        </a>
                        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:text-[#1e8e6f] flex items-center justify-center">
                            <FaWhatsapp size={24} className="mr-2 transition-transform duration-300 transform hover:scale-125" /> Whatsapp
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:text-[#cc0000] flex items-center justify-center">
                            <FaYoutube size={24} className="mr-2 transition-transform duration-300 transform hover:scale-125" /> Youtube
                        </a>
                    </div>
                </div>
                <div className="mb-4 text-center">
                    <p className="mb-1">Phone: 0712345678</p>
                    <p className="mb-1">Phone: 0710602258</p>
                    <p className="mb-1">Email: support@yourwebsite.com</p>
                    <p>Email: contact@yourwebsite.com</p>
                </div>
                <div className="text-center">
                    <p className="text-sm">© 2024 NairobiKonnect. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
