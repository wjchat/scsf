import React, { useEffect, useState } from "react"
import logo from "../images/Matte.svg"
import arrow from "../images/Arrow.svg"
import gsap, { Power2 } from "gsap"
import Form from "./form.jsx";
import {useStaticQuery, graphql} from 'gatsby'

import "../style/mobile.scss"
import axios from 'axios'
import { CSSPlugin } from 'gsap/CSSPlugin'



// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin)

const Arrow = props => {
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
      <div ref={arrow => (animate = arrow)} className="arrow">
          <img src={arrow} alt="" className="arrowImg"/>
      </div>
  )
}
const SwooshIn = props => {
    let animate
    useEffect(() => {
        let animateOb = animate
        window.addEventListener("scroll", () => {
            if (animateOb != null) {
                if (
                    animateOb.getBoundingClientRect().y <
                    window.innerHeight / 1.56
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
    const [count, updateCount] = useState(0)
    useEffect(()=>{
        if(trigger === true){
            let animateOb = animate
            let tl = gsap.timeline();
            let duration = .4;
            tl.to(animateOb, duration,{
                width: "60vw",
                ease: Power2.easeIn,
            })
            tl.to(animateOb, duration, {
                y: "-20vw", // half the height increase. keeps it center
                height: "40vw", //double the large text size
                ease: Power2.easeOut,
            }, `-=.05`)
        }
    }, [animate, trigger])
    useEffect(()=>{
        if(props.count < 100){
            updateCount(props.count)
        } else{
            updateCount('999+')
        }
    }, props.count)
    return(<SwooshIn trigger = {(newTrigger) => updateTrigger(newTrigger)}>
        <div className = "count">
           <div ref = {div=>animate=div} className = "container">
               <div>      
                    <h1>{count}</h1>
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
        console.log(trigger)
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
                // delay: 0.7
            }, 1 * duration * .3)
            tl.staggerTo(text, duration, {
                opacity: 1,
                filter: "blur(0px)",
                x: 0,
                ease: Power2.easeOut,
            }, 1 * duration * .3, `-=${duration * 1.5}`)
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
                    <p>One pandemic,<br/> seven billion stories to tell.</p>
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
            tl.staggerTo(title, duration, {
                opacity: 1,
                filter: "blur(0px)",
                x: 0,
                ease: Power2.easeOut,
            }, 1 * duration * .3)
            
            tl.staggerTo(text, duration, {
                opacity: 1,
                filter: "blur(0px)",
                x: 0,
                ease: Power2.easeOut,
            }, 1 * duration * .3, `-=${duration * 1.5}`)
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
                    <p>Show us what you see<br/> and tell us how you feel.</p>
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
            <img 
              src={logo} alt="" 
              className="logoImg"
              onClick = {()=>window.open("http://www.matteprojects.com")}
            />
        </div>
    )
}

const MobileContainer = props => {
    const data = useStaticQuery(graphql`
        query mobileVid {
          strapiFrontPageVideo{
            id
            Video{
              publicURL
            } 
            Name
          }
        }
`)
    const vid = data.strapiFrontPageVideo.Video.publicURL
    return (
        <div className="mobile">
            <LogoHeader />
            <div className="firstView">
                <video controls>
                    <source src={vid} type="video/mp4" />
                    <source src={vid} type="video/ogg" />
                </video>
                <Arrow/>
            </div>
            <FirstText />
            <Count count = {props.count}/>
            <SecondText />
            <Form className = "mobileForm" />
        </div>
    )
}

export default MobileContainer
