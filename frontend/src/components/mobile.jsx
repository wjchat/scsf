import React, { useEffect, useState } from "react"
import logo from "../images/Matte.svg"
import vid from "../images/video.mp4"
import gsap, { Power2 } from "gsap"
import Form from "./form.jsx";

import "../style/mobile.scss"


const SwooshIn = props => {
    let animate
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (animate != null) {
                if (
                    animate.getBoundingClientRect().y <
                    window.innerHeight / 10
                ) {
                    props.trigger(true)
                }
            }
        })
    }, [animate])
    return (
        <div ref={div => (animate = div)}>
            {props.children}
        </div>
    )
}
const Count = props=>{
    let animate;
    const [trigger, updateTrigger] = useState(false)
    useEffect(()=>{
        if(trigger === true){
            let tl = gsap.timeline();
            let duration = .4;
            tl.to(animate, duration,{
                width: "60vw",
                ease: Power2.easeIn,
            })
            tl.to(animate, duration, {
                y: "-20vw", // half the height increase. keeps it center
                height: "40vw", //double the large text size
                ease: Power2.easeOut,
            }, `-=.05`)
        }
    }, [animate, trigger])
    return(<SwooshIn trigger = {(newTrigger) => updateTrigger(newTrigger)}>
        <div className = "count">
           <div ref = {div=>animate=div} className = "container">
               <div>      
                    <h1>641</h1>
                    <p>stories told</p>
               </div>
           </div>
        </div>
    </SwooshIn>)
}
const FirstText = props => {
    let animate;
    const [trigger, updateTrigger] = useState(false)
    useEffect(() => {
        if(trigger === true){
            let tl = gsap.timeline();
            let duration = .15
            let title = animate.getElementsByClassName("animateThis")[0].childNodes
            let text = animate.getElementsByClassName("animateThis")[1].childNodes
            tl.staggerTo(title, duration, {
                opacity: 1,
                filter: "blur(0px)",
                x: 0,
                ease: Power2.easeOut,
            }, -1 * duration * .3)
            tl.staggerTo(text, duration, {
                opacity: 1,
                filter: "blur(0px)",
                x: 0,
                ease: Power2.easeOut,
            }, -1 * duration * .3, `-=${duration * 1.5}`)
        }
    }, [animate, trigger])
    return (
        <SwooshIn trigger={(trig) => updateTrigger(trig)}>
            <div className="firstText" ref={div=>animate=div}>
                <h1 className="animateThis">
                    <span>So</span>
                    <span>Close</span>
                    <span>So</span>
                    <span>Far</span>
                </h1>
                <div className="animateThis">
                    <p>One pandemic, seven billion stories to tell.</p>
                    <p>
                        Matte Projects believes your experience needs to be
                        heard.
                    </p>
                    <p>We invite you to help us tell the story of the world.</p>
                </div>
            </div>
        </SwooshIn>
    )
}
const SecondText = props => {
    let animate;
    const [trigger, updateTrigger] = useState(false)
    useEffect(() => {
        if(trigger === true){
            let tl = gsap.timeline();
            let duration = .15
            let title = animate.getElementsByClassName("animateThis")[0].childNodes
            let text = animate.getElementsByClassName("animateThis")[1].childNodes
            console.log(title, text)
            tl.staggerTo(title, duration, {
                opacity: 1,
                filter: "blur(0px)",
                x: 0,
                ease: Power2.easeOut,
            }, -1 * duration * .3)
            
            tl.staggerTo(text, duration, {
                opacity: 1,
                filter: "blur(0px)",
                x: 0,
                ease: Power2.easeOut,
            }, -1 * duration * .3, `-=${duration * 1.5}`)
        }
    }, [animate, trigger])
    return (
        <SwooshIn trigger={(trig) => updateTrigger(trig)}>
            <div className="firstText secondText" ref={div=>animate=div}>
                <h1 className="animateThis">
                    <span>We</span>
                    <span>Want</span>
                    <span>To</span>
                    <span>Hear</span>
                    <span>Your</span>
                    <span>Voice</span>
                </h1>
                <div className="animateThis">
                    <p>Show us what you see and tell us how you feel.</p>
                    <p>We’ll be taking the videos and images submitted to create a living audio visual patchwork for and by all of us.</p>
                </div>

            </div>
        </SwooshIn>
    )
}
const LogoHeader = props => {
    let animate
    let duration = 0.2
    const [showing, updateShowing] = useState(true)
    const appear = () => {
        gsap.to(animate, duration, {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            ease: Power2.easeOut
        })
    }
    const disappear = () => {
        gsap.to(animate, duration, {
            opacity: 0,
            filter: "blur(4px)",
            y: -20,
            ease: Power2.easeIn
        })
    }
    useEffect(() => {
        window.addEventListener("wheel", event => {
            if (event.deltaY > 0) {
                updateShowing(false)
            } else {
                updateShowing(true)
            }
        })
    }, [])
    useEffect(() => {
        if (showing === true) {
            appear()
        } else {
            disappear()
        }
    })
    return (
        <div ref={div => (animate = div)} className="logoHeader">
            <img src={logo} alt="" />
        </div>
    )
}
const MobileContainer = props => {
    return (
        <div className="mobile">
            <LogoHeader />
            <div className="firstView">
                <video controls>
                    <source src={vid} type="video/mp4" />
                    <source src={vid} type="video/ogg" />
                </video>
            </div>
            <FirstText />
            <Count />
            <SecondText />
            <Form className = "mobileForm" />
        </div>
    )
}

export default MobileContainer
