import React,{useEffect, useCallback} from "react"
import logo from "../images/Matte.svg"
import arrow from "../images/Arrow.svg"
import vid from "../images/video.mp4"
import {TimelineMax} from "gsap"
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import "../style/landing.scss"


// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin)






const Bottom = props => {
    let animate
    let duration = .12;
    let tl = new TimelineMax({paused: true});
    const handleHover = enter =>{
        tl.to(animate, duration,{
            opacity: 1,
            ease: "easeIn",
        })
        .to(animate, duration,{
            x: 0,
            filter: `blur(0px)`,
            ease: "easeIn",
        }, `-=${duration * .7}`)
        .pause();
        if(enter){
            tl.play();
        }else{
            tl.reverse(duration);
        }
    }
    const handleClick = () => {
        handleHover(false);
        window.scrollTo({top: window.innerHeight, left:0, behavior:"smooth"});
      }
    
    return (
        <div className={props.className}>
            <img
            onClick = {()=>handleClick()}
            onMouseEnter = {()=>handleHover(true)}
            onMouseLeave = {()=>handleHover(false)}
             src={arrow} alt="see more" />
            <div className="shimmerBox">
                <p ref = {div=>animate=div}>tell your story</p>
            </div>
        </div>
    )
}
const Right = props => {
    return (
        <div className={props.className}>
            <div className="top">
                <p>
                    In a time of unprecedented devastation,
                    everybody has a story to tell.
                </p>
                <p>
                    Matte Projects believes your experience needs to be heard.
                </p>
                <p>We invite you to help us tell the story of the world.</p>
            </div>
            <div className="bottomRight">
                <h1>641</h1>
                <p>stories told</p>
                <div className="border"></div>
            </div>
        </div>
    )
}
const Vid = props => {
    let video
    useEffect(()=>{
        let vidObject = video
        setTimeout(()=>{
            vidObject.play();
        }, 1300) //choreographed with main animation
    }, [])
    const showControls = useCallback((mouseover)=>{
        if(mouseover){
            video.setAttribute("controls", "controls")
        }else{
            video.removeAttribute("controls")
        }
    }, video)
    const handleClick = useCallback(()=>{
        if(!video.hasAttribute("controls")){
            if(!video.paused){
                video.pause()
                showControls(true);
            }
        }
    })
    return (
        <div className={props.className}>
            <video
                onMouseEnter = {()=>showControls(true)}
                onMouseLeave = {()=>showControls(false)}
                onClick = {()=>handleClick()}
                 ref = {div=>video=div} >
                <source src={vid} type="video/mp4" />
                <source src={vid} type="video/ogg" />
            </video>
        </div>
    )
}
const Left = props => {
    return (
        <div className={props.className}>
            <h1>
                <span>So</span>
                <span className="grey">So</span>
                <span>Close</span>
                <span className="grey">Far</span>
                <span>So</span>
                <span className="grey">So</span>
                <span>Far</span>
                <span className="grey">Close</span>
            </h1>
        </div>
    )
}
const Main = props => {
    let animate;
    let tl = new TimelineMax();
    useEffect(()=>{
        let logo = animate.childNodes[0].childNodes[0]
        let left = animate.childNodes[1].childNodes[0].childNodes;
        let rightTop = animate.childNodes[3].childNodes[0].childNodes
        let rightBottom = animate.childNodes[3].childNodes[1].childNodes
        let arrow = animate.childNodes[4].childNodes[0]
        let duration = .2
        let stagger = duration * 0.2
        let start = duration    
        setTimeout(()=>{
            tl.staggerTo(left, duration,{
                opacity: 1,
                filter: "blur(0px)",
                x: 0,
                ease: 'easeIn'
            }, stagger * -1)
            .to(arrow,duration, {
                opacity:1,
                filter: "blur(0px)",
                x: 0,
            }, `-=${duration * 1.4}`)
            .to(logo, duration,{
                opacity: 1,
                filter: "blur(0px)",
                x: 0,
            }, `-=${duration}`)
            .staggerTo(rightBottom, duration, {
                opacity: 1,
                filter: "blur(0px)",
                x: 0
            }, stagger, `-=${start * 1.2}`)            
                .staggerTo(rightTop, duration, {
                    opacity: 1,
                    filter: "blur(0px)",
                    x: 0
            }, stagger * -1, `-=${start}`)
        }, 100)

        },[animate, tl])
    return (
        <div ref={div=>animate=div}className="landing">
            <div className="title">
                <img onClick = {()=>window.open("http://www.matteprojects.com")}
                    className="logo"
                    src={logo}
                    alt="Matte Projects Brings You"
                    />
            </div>
            <Left className="left" />
            <Vid className="video" />
            <Right className="right" />
            <Bottom className="bottom" />
        </div>
    )
}

export default Main
