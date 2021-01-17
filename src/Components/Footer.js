import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import Assetsgplay from '../Assets-saras/sosmed/gplay.png';
import Assetsappstore from '../Assets-saras/sosmed/apple.png';
import Assetsfb from '../Assets-saras/sosmed/facebook.png';
import Assetsig from '../Assets-saras/sosmed/sosmed_instagram.png';
import Assetsgplus from '../Assets-saras/sosmed/gplus.png';

function Footer() {
  return (
    <>
    <div className="footer">
        <Container>
            <Row className="footer-content">
                <Col md='6' className="footer-logo">
                    <h1 style={{fontFamily: 'Bebas Neue, sans-serif'}}><i class="fas fa-ticket-alt"></i> UlasFilm</h1>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint enim velit sit autem dolores temporibus dignissimos nulla totam, porro debitis quo at magni unde in voluptatibus dolor accusantium, necessitatibus perferendis!
                    </p>
                </Col>
                <Col xs='6' md='2' className="footer-foot">
                    <h5>About Us</h5>
                    <h5>Blog</h5>
                    <h5>Service</h5>
                    <h5>Karir</h5>
                    <h5>Media Center</h5>
                </Col>
                <Col xs='6' md='4' className="footer-download">
                    <h5>Download</h5>
                    <div className="footer-download-image">
                        <img src={Assetsgplay} alt="Google Play" className="footer-gplay"></img>
                        <img src={Assetsappstore} alt="App Store" className="footer-app"></img>
                    </div>
                    <h5>Social Media</h5>
                    <img src={Assetsfb} alt="Facebook" className="footer-facebook"></img>
                    <img src={Assetsig} alt="Instagram" className="footer-instagram"></img>
                    <img src={Assetsgplus} alt="Google Plus" className="footer-gplus"></img>
                </Col>
            </Row>
            <div className="footer-copyright">
                Copyright © 2020 UlasFilm. All Rights Reserved
            </div>
        </Container>
    </div>
</>

  );
}

export default Footer;