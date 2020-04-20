import React, { useEffect, useState, useCallback } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Landing from "../components/landing.jsx"
import SubmissionPage from "../components/submission.jsx"
import Logo from "../images/Matte.svg"
import { TimelineMax, TweenLite } from "gsap"


import "../style/loader.scss"

///landing opening animation ting
const DotDotDot = () =>{
    let animate
    useEffect(()=>{
        let tl = new TimelineMax();
        let items = animate.childNodes;
        tl.staggerTo(items, .03,{
            opacity: 1,
        }, .05)
    })
    return(<span ref = {div=>animate=div} className = 'ellipses'>
            <span> . </span>
            <span>. </span>
            <span>. </span>
            <span>. </span>
            <span>. </span>
            <span>. </span>
            <span>. </span>
            <span>. </span>
            <span>. </span>
            <span>.</span>
    </span>)
}
const EnterButton = props => {
    let enterButton
    const [isHovering, toggleHover] = useState(false)
    useEffect(() => {
        if(!isHovering){
        let first = enterButton.childNodes[1]
        let tl = new TimelineMax({ repeat: -1 })
        tl.to(first, 0.03, {
            opacity: 0
        })
            .to(first, 0.7, {
                opacity: 0
            })
            .to(first, 0.03, {
                opacity: 1
            })
            .to(first, 0.7, {
                opacity: 1
            })
        tl.pause()
        setTimeout(()=>{
            tl.play()
        }, 700)
        }
    })
    const handleClick = useCallback(()=>{
        props.onClick();
    })
    
    return (
        <h1 ref={div => (enterButton = div)} className={props.className}>
            <span
                className="enterClick"
                onMouseOver={() => toggleHover(true)}
                onMouseLeave={() => toggleHover(false)}
                onClick = {()=>handleClick()}
            >
                enter
            </span>
            {isHovering ? <DotDotDot /> : <span className="first"> . </span>}
        </h1>
    )
}
const OpeningAnimation = props => {
    let background
    let animate
    let enterButton
    let tl = new TimelineMax()
    const [showEnter, toggleEnter] = useState(false)
    useEffect(() => {
        let logo = animate.childNodes[0]
        console.log(logo)
        tl.to(
            logo,
            0.6,
            {
                opacity: 1,
                filter: "blur(0px)",
                scale: 1,
                ease: "back.out(2)"
            },
            `+=.5`
        ).call(
            () => {
                toggleEnter(true)
            },
            this,
            `+=.4`
        )
    }, [])
    const handleClick = useCallback(()=>{
        TweenLite.to(background, .4,{
            opacity: 0,
        })
        props.onClick();
    })
    return (
        <div ref = {div=>background=div} className="loadingAnimate">
            <div ref={div => (animate = div)}>
                <img src={Logo} alt="Matte" />
                {showEnter ? (
                    <EnterButton onClick={()=>handleClick()} className="enter" />
                ) : (
                    <EnterButton className="enter hide" />
                )}
            </div>
        </div>
    )
}
/////


const IndexPage = () => {
    const [showLoading, toggleShowLoading] = useState(true)
    const [showMain, toggleShowMain] = useState(false)
    const handleClick = useCallback(() => {
        toggleShowMain(true)
        setTimeout(()=>{
            toggleShowLoading(false);
        }, 500)
    })
    return (
        <Layout>
            <SEO title="Home" />
            
            <div className = "desktop">
            {showLoading ? (
                <OpeningAnimation onClick={() => handleClick()} />
            ) : (
                ""
            )}
            {showMain ? (
                <div>
                    <Landing />
                    <SubmissionPage />
                </div>
            ) : (
                ""
            )}
            </div>
            
            <div className = 'mobileContainer'>
                <div>Mobile isn't ready yet. Make ur screen bigger</div>
            </div>
            
        </Layout>
    )
}

export default IndexPage
