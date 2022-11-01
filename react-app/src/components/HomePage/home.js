import React from 'react'
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import "./home.css";

import githubIcon from '../../icons/github-icon.png'
import linkedinIcon from '../../icons/linkedin-icon.png'
import kelpLogo from '../../icons/Kelp-logo.png'
import kelpTitleLogo from '../../icons/kelp-logo-title.png'


const HomePage = () => {
    const img1 = 'https://s3-media0.fl.yelpcdn.com/bphoto/Zg95QGwmay_PpgV0Xecb6A/o.jpg'
    const img2 = 'https://s3-media0.fl.yelpcdn.com/bphoto/3PVczqE9frDnDmdcjXed-Q/o.jpg'
    const img3 = 'https://www.washingtonpost.com/resizer/S0uE7ze24z1spZwWS_XsFyN5YBc=/arc-anglerfish-washpost-prod-washpost/public/E37EMGFVZYI6ZA2YECVBMNK7WQ.jpg'
    const img4 = 'https://media.istockphoto.com/photos/octopus-picture-id1324632301?b=1&k=20&m=1324632301&s=170667a&w=0&h=45KkZRjC19LMbQh5ewcPI0MQHnuTtaBZmav2cfe0kxE='

    const carouselArr = [img1, img2, img3, img4]

    const [image, setImage] = useState(carouselArr[0])
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        setImage(carouselArr[counter])
    }, [counter])

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter((counter) => counter === 3 ? 0 : counter + 1)
        }, 3000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className='homepage-container'>
            <div className='homepage-images-container'>
                <img className="homepage-image" src={image}></img>
            </div>
            <div className='homepage-title-container'>
                <div className='homepage-title'>Get some Seafood today</div>
                <NavLink to='/sign-up'>
                <div className='homepage-signup-bttn'>Sign Up Here</div>
              </NavLink>
            </div>
            <div className="hompage-footer-container">
                <div className='hompage-footer-wrapper'>
                    <div className="about-footer-container">
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>About</div>
                        <a className="footer-link" href="https://github.com/Kevin-D47/Kelp" target="_blank">
                            <img className='footer-icon' src={githubIcon}></img>
                            <div className="kelp-github-repo">Kelp Github Repository</div>
                        </a>
                    </div>
                    <div className="developer-footer-container">
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Developer</div>
                        <div style={{ fontWeight: '500' }}>Kevin Duong</div>
                        <div className='kevin-links'>
                            <a className="footer-link" href="https://www.linkedin.com/in/kevin-duong-513341216/" target="_blank">
                                <img className='footer-icon' src={linkedinIcon}></img>
                                <div className="kelp-github-repo">LinkedIn</div>
                            </a>
                            <a className="footer-link" href="https://github.com/Kevin-D47" target="_blank">
                                <img className='footer-icon' src={githubIcon}></img>
                                <div className="kelp-github-repo">Github</div>
                            </a>
                        </div>

                    </div>
                </div>
                <div className='copyright-container'>
                    <div>Copyright © 2022 Kelp Inc. Kelp,</div> &nbsp;
                    <img className='coyright-icon' src={kelpTitleLogo}></img>
                    <div>,</div> &nbsp;
                    <img className='coyright-icon-2' src={kelpLogo}></img> &nbsp;
                    <div>and related marks are registered trademarks of Kelp.</div>
                </div>

            </div>
        </div>

    );

}

export default HomePage
