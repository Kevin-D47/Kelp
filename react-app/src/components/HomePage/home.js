import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import "./home.css";

import githubIcon from '../../icons/github-icon.png'
import linkedinIcon from '../../icons/linkedin-icon.png'
import kelpLogo from '../../icons/Kelp-logo.png'
import kelpTitleLogo from '../../icons/kelp-logo-title.png'


const HomePage = () => {
    const dispatch = useDispatch();
    const [backgroundImageNumber, setBackgroundImageNumber] = useState(0);
    let imageArray;

    const images = [
        {
            imageUrl:
                "https://wallpapercave.com/wp/wp5116626.jpg",
            title: "The Shellfish Pot",
            photoBy: "Photo from the business owner"
        },
        {
            imageUrl:
                "https://s3-media0.fl.yelpcdn.com/bphoto/Zg95QGwmay_PpgV0Xecb6A/o.jpg",
            title: "Rockin Bass",
            photoBy: "Photo from the business owner"
        },
          {
            imageUrl:
                "https://media.istockphoto.com/photos/octopus-picture-id1324632301?b=1&k=20&m=1324632301&s=170667a&w=0&h=45KkZRjC19LMbQh5ewcPI0MQHnuTtaBZmav2cfe0kxE=",
            title: "Jaw-some Bites",
            photoBy: "Photo from the business owner"
        },
        {
            imageUrl:
                "https://s3-media0.fl.yelpcdn.com/bphoto/3PVczqE9frDnDmdcjXed-Q/o.jpg",
            title: "Ocean's Finest",
            photoBy: "Photo from the business owner"
        },
        {
            imageUrl:
                "https://www.washingtonpost.com/resizer/S0uE7ze24z1spZwWS_XsFyN5YBc=/arc-anglerfish-washpost-prod-washpost/public/E37EMGFVZYI6ZA2YECVBMNK7WQ.jpg",
            title: "Flexing Mussles",
            photoBy: "Photo from the business owner"
        },
        {
            imageUrl:
                "https://data2.1freewallpapers.com/detail/sushi-rolls-seafood.jpg",
            title: "Sushi Samurai",
            photoBy: "Photo from the business owner"
        },
    ];

    useEffect(() => {
        const backgroundImageTransition = setInterval(() => {
            setBackgroundImageNumber(
                (previousBackgroundImageNumber) =>
                    (previousBackgroundImageNumber + 1) % images.length
            );
        }, 4000);
        return () => clearInterval(backgroundImageTransition);
    }, [backgroundImageNumber, images.length]);


    return (
        <div className='homepage-container'>
            <div className='homepage-images-container'>
                {/* <img className="homepage-image" src={image}></img> */}
                {images.map((image, index) => {
                    return (
                        <>
                            <div
                                className={
                                    index == backgroundImageNumber
                                        ? "ActiveImageBackgroundCarousel"
                                        : "InactiveImageBackgroundCarousel"
                                }
                                key={index}
                            >
                                <img
                                    className="imageCarouselArray"
                                    src={image.imageUrl}
                                    alt="CarouselImageBackground"
                                />
                            </div>
                            <div className="ParentofCarouselCaptions">
                                <div
                                    className={
                                        index == backgroundImageNumber
                                            ? "ActiveImageCaptionsCarousel"
                                            : "InactiveImageCaptionsCarousel"
                                    }
                                >
                                    <div className="BackgroundImageCarouselTitle-container">
                                        <div className="BackgroundImageCarouselTitle">
                                            {image.title}
                                        </div>
                                        <div className='BackgroundImageCarouselTakenBy'>
                                            {image.photoBy}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                    );
                })}
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
