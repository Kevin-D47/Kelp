import React from "react";

import githubIcon from '../../icons/github-icon.png'
import linkedIcon from '../../icons/linkedin-icon.png'
import angelListIcon from '../../icons/angellist-icon.png'
import KevPic from '../../icons/KevD-Profile-Image.png'

import "./developer.css";


export function AboutDevPage() {
    return (
        <div className="about-devs-container">
            <div className="about-devs-wrapper">
                <div className="about-me-title">About Me</div>
                <div className="me-container">
                    <div className="me-container-left">
                        <img className="dev-profile-pic" src={KevPic}></img>
                    </div>
                    <div className="me-container-right">
                        <div className="me-title">Kevin Duong</div>
                        <div className="me-description">I am Full-Stack Software Developer, looking to use my creativity and skills to contribute to the every growing field of tech.</div>
                        <div className="me-contact-info">
                            <div className="contact-container">
                                <div style={{ fontWeight: 'bold' }}>Email:</div>
                                kevinduongdev@gmail.com
                            </div>
                            <div className="contact-container">
                                <div style={{ fontWeight: 'bold' }}>Phone:</div>
                                678-469-9001
                            </div>
                        </div>
                        <a className="links-container" href="https://kevin-d47.github.io./" target="_blank">
                            <div className="portfolio-link">Portfolio Website link here</div>
                        </a>
                        <div className="link-info-contatiner">
                            <a className="links-container" href="https://github.com/Kevin-D47" target="_blank">
                                <img className="github-icon" src={githubIcon}></img>
                                <div className="linked-titles">Github</div>
                            </a>
                            <a className="links-container" href='https://www.linkedin.com/in/kevin-duong-513341216/' target="_blank">
                                <img className="linkedin-icon" src={linkedIcon}></img>
                                <div className="linked-titles">LinkedIn</div>
                            </a>
                            <a className="links-container" href='https://angel.co/u/kevin-duong-20' target="_blank">
                                <img className="angel-icon" src={angelListIcon}></img>
                                <div className="linked-titles">AngelList</div>
                            </a>
                        </div>
                        <div className="project-repo-container">
                            <div className="repo-title">Project Github Repo: </div>
                            <a href="https://github.com/Kevin-D47/Kelp" target="_blank">
                                <h4 className="repo-link">
                                    https://github.com/Kevin-D47/Kelp
                                </h4>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutDevPage
