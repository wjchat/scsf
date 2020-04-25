import React,{useEffect, useCallback} from "react"
import logo from "../images/Matte.svg"
import arrow from "../images/Arrow.svg"
import vid from "../images/video.mp4"
import {TimelineMax} from "gsap"
import { gsap, Power2 } from 'gsap'
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
    
    return (
        <div className={props.className}>
            <img
            onClick = {()=>props.onClick()}
            onMouseEnter = {()=>handleHover(true)}
            onMouseLeave = {()=>handleHover(false)}
             src={arrow} alt="see more"
             className = {props.animateClass} />
            <div className="shimmerBox">
                <p ref = {div=>animate=div}>tell your story</p>
            </div>
        </div>
    )
}
const Right = props => {
    return (
        <div className={props.className}>
           <div>
            <div className="top">
                <p className = {props.animateClass}>
                    One pandemic,<br/>seven billion stories to tell.
                </p>
                <p className = {props.animateClass}>
                    Matte Projects believes your experience needs to be heard.
                </p>
                <p className = {props.animateClass}>We invite you to help us tell the story of the world.</p>
            </div>
            <div className="bottomRight">
                <h1 className = {props.animateClass}>641</h1>
                <p className = {props.animateClass}>stories told</p>
                <div className="border"></div>
            </div>
            </div>
        </div>
    )
}
const Vid = props => {
    let video
    useEffect(()=>{
    let vidObject = video 
    vidObject.currentTime = props.videoTime
        if(props.view === "firstMain"){      
            setTimeout(()=>{
                vidObject.play();
            }, 1300) //choreographed with main animation
            setTimeout(()=>{
                vidObject.setAttribute("controls", "controls")
            }, 1800)
        }
        if(props.view === "main"){
            setTimeout(()=>{
                vidObject.setAttribute("controls", "controls")
            }, 500)
        }
    }, props.view)
 
    return (
        <div className={props.className}>
            <video  
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
                <span className = {props.animateClass}>So</span>
                <span className= {`grey ${props.animateClass}`} >So</span>
                <span className = {props.animateClass}>Close</span>
                <span className={`grey ${props.animateClass}`} >Far</span>
                <span className = {props.animateClass}>So</span>
                <span className={`grey ${props.animateClass}`} >So</span>
                <span className = {props.animateClass}>Far</span>
                <span className={`grey ${props.animateClass}`} >Close</span>
            </h1>
        </div>
    )
}
const Main = props => {
    let animate;
    const fromLeft = () =>{
        let tl = new TimelineMax();
        let logo = animate.childNodes[0].childNodes[0].childNodes[0]
        let left = animate.childNodes[1].childNodes[0].childNodes;
        let rightTop = animate.childNodes[3].childNodes[0].childNodes[0].childNodes
        let rightBottom = animate.childNodes[3].childNodes[0].childNodes[1].childNodes
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
    }
    const transitionFromSubmit = () =>{
        let duration = .4
        let logo = animate.childNodes[0]
        let left = animate.childNodes[1]
        let vid = animate.childNodes[2]
        let right = animate.childNodes[3]
        let bottom = animate.childNodes[4]
        let tl = gsap.timeline();
        let ease = Power2.easeOut;
            tl.to(bottom, duration, {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                ease: ease,
            })            
            tl.to(right, duration, {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                ease: ease,
            }, `-=${duration * .8}`)            
            tl.to(left, duration, {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                ease: ease,
            }, `-=${duration}`)
            tl.to(vid, duration, {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                ease: ease,
            }, `-=${duration * .8}`)            
            tl.to(logo, duration, {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                ease: ease,
            }, `-=${duration * .8}`)
            tl.play();
    }
    const transition = () =>{
        if(animate != null){
        let duration = .4
        let logo = animate.childNodes[0]
        let left = animate.childNodes[1]
        let vid = animate.childNodes[2]
        let right = animate.childNodes[3]
        let bottom = animate.childNodes[4]
        let ease = Power2.easeIn
            let tl = gsap.timeline();
            tl.to(logo, duration, {
                opacity: 0,
                filter: "blur(4px)",
                y: -30,
                ease: ease,
            })        
            tl.to(vid, duration, {
                opacity: 0,
                filter: "blur(4px)",
                y: -30,
                ease: ease,
            }, `-=${duration  * .8}`)        
            tl.to(left, duration, {
                opacity: 0,
                filter: "blur(4px)",
                y: -30,
                ease: ease,
            }, `-=${duration  * .8}`)        
            tl.to(right, duration, {
                opacity: 0,
                filter: "blur(4px)",
                y: -30,
                ease: ease,
            }, `-=${duration}`)        
            tl.to(bottom, duration, {
                opacity: 0,
                filter: "blur(4px)",
                y: -30,
                ease: ease,
            },`-=${duration  * .8}`)
            tl.call(()=>props.onClick("submission"));
        }
}
    useEffect(()=>{
            let canAnimate = true;
            animate.addEventListener('wheel', (event)=>{
                if(event.deltaY > 0 && canAnimate){
                    transition();
                    canAnimate = false;
                    console.log('o')
                }
            });
            
            if(props.view === "firstMain"){
                fromLeft();
            }
            if(props.view === "main"){
                transitionFromSubmit();
            }
        })
    const handleClick = () =>{
        transition(); 
        let vid = animate.getElementsByTagName('video')[0];
        props.updateTime(Math.floor(vid.currentTime))
    }
    return (
        <div ref={div=>animate=div} className={`landing ${props.animateClass}`}>
            <div className="title animateUp fromSub">
               <div>
                <img onClick = {()=>window.open("http://www.matteprojects.com")}
                    className= {`logo ${props.animateClass}`}
                    src={logo}
                    alt="Matte Projects Brings You"
                    />
                    </div>
            </div>
            <Left animateClass = {props.animateClass} className="left fromSub" />
            <Vid 
            videoTime = {props.videoTime}
            animateClass = {props.animateClass}  
            view = {props.view} 
            className="video fromSub" />
            <Right animateClass = {props.animateClass}  className="right fromSub" />
            <Bottom animateClass = {props.animateClass} onClick = {()=>handleClick()} className="bottom fromSub" />
        </div>
    )
}

export default Main
