import React, { useCallback, useState, useEffect } from "react"
import { TimelineMax } from "gsap"
import "../style/submission.scss"
import "../style/formItems.scss"
import arrow from '../images/Arrow.svg';
import Form from './form.jsx'

import { gsap, Power2 } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'


// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin)

const gold = "#d3c371"
const black = "black"


const SubmissionPage = props => {
    let subcontainer
    useEffect(()=>{
        let items = subcontainer.getElementsByClassName("animateUp");
        let tl = gsap.timeline();
        tl.staggerTo(items, .3,{
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            ease: Power2.easeOut,
        }, (.05))
        
        let canAnimate = true;
        subcontainer.addEventListener('wheel', (event)=>{
            if(event.deltaY < 0 && canAnimate){
                handleClick();
                canAnimate = false;
            }
        });
        
    })
    const handleClick = () =>{
        let items = subcontainer.getElementsByClassName("animateUp");
        let tl = gsap.timeline();
        tl.staggerTo(items, .3,{
            opacity: 0,
            filter: "blur(4px)",
            y: 30,
            ease: Power2.easeIn,
        }, (.05))
        tl.call(()=>props.onClick('main'))
    }
    return (
        <div ref={div => (subcontainer = div)} className="submissionContainer">
            <div className = "arrowUp animateUp">
              <img
                onClick = {()=>handleClick()}
                src={arrow} alt="return up"
              />
            </div>
            <div className="header animateUp">
                <h1>We Want<br/> To Hear<br/> Your<br/> Voice</h1>
            </div>
            <div className="text animateUp">
                <div className="border"></div>
                <p>Show us what you see<br/> and tell us how you feel.</p>
                <p>
                    We’ll be taking the videos and images submitted to create a living
                    audio visual patchwork for and by all of us.
                </p>
            </div>
            <Form className="formContainer animateUp" />
            <div className="formBumper"></div>
            <div className="botContain"></div>
        </div>
    )
}
export default SubmissionPage
