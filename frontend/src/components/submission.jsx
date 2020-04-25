import React, { useCallback, useState, useEffect } from "react"
import { TimelineMax } from "gsap"
import "../style/submission.scss"
import "../style/formItems.scss"
import arrow from '../images/Arrow.svg';

import { gsap, Power2 } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'


// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin)

const gold = "#d3c371"
const black = "black"

const Message = props => {
    return (
        <div className={props.className}>
            {props.text != null ? <div>{props.text}</div> : ""}
        </div>
    )
}
const X = props => {
    let animate
    useEffect(() => {
        let tl = new TimelineMax()
        let duration = 0.15
        
        tl.to(animate, duration, {
            opacity: 1,
            ease: "easeIn"
        }).to(
            animate,
            duration,
            {
                x: 5,
                filter: `blur(0px)`,
                ease: "easeIn"
            },
            `-=${duration * 0.7}`
        )
    }, [animate])
    return (
        <div onClick={props.onClick} ref={div => (animate = div)} className="x">
            <div>X</div>
        </div>
    )
}
const FormContainer = props => {
    let fileBox
    let submitBox
    let fileInput
    //state tings
    const [fileLabel, updateFileLabel] = useState("Upload File")
    const [files, updateFile] = useState(null)
    const [email, updateEmail] = useState(null)
    const [message, updateMessage] = useState(null)

    useEffect(() => {
        if (files != null) {
            if (files.length > 1) {
                updateFileLabel(`${files.length} Files`)
            }
            if (files.length === 1) {
                let name = `${files[0].name.substr(0, 15)}...`
                updateFileLabel(name)
            }
        } else {
            updateFileLabel("Upload File")
        }
    },[files])

    const setFile = event => {
        updateFile(event.target.files)
    }
    const setEmail = event => {
        updateEmail(event.target.value)
    }
    const xClick = () => {
      updateFile(null)
      fileInput.value = ""
    }
    const clearMessage = () => {
      updateMessage("")
    }
    const validateSubmit = useCallback(() => {
        if (email === null) {
            updateMessage(
                "Please enter your email."
            )
        } else if (
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ===
            false
        ) {
            updateMessage("Please enter a valid email.")
        } else if (files === null) {
            updateMessage("Please upload a photo or video.")
        } else {
            updateMessage(`This part doesn't work yet! U goof`)
            //handleSubmit();
        }
    })

    return (
        <div className={props.className}>
            <form className="flexbox">
                <div className="email">
                    <div className="labelContainer">
                        <input
                            onClick={clearMessage}
                            onChange={setEmail.bind(this)}
                            type="text"
                            placeholder="Enter Email"
                        />
                    </div>
                </div>
                <div 
                    className= {files ? "fileActive" : "file"}
                >
                    <input
                        ref={div => (fileInput = div)}
                        onClick={clearMessage}
                        onChange={setFile.bind(this)}
                        id="files"
                        type="file"
                        accept = "video/*|image/*"
                        multiple
                    />
                    <div
                        ref={div => (fileBox = div)}
                        className="labelContainer"
                    >
                        <div className="label">{fileLabel}</div>
                    </div>
                    {files != null ? (
                        <X onClick={xClick} classname="x" />
                    ) : (
                        ""
                    )}
                </div>
                <div
                    onClick={() => validateSubmit()}
                    className="submit"
                >
                    <div
                        ref={div => (submitBox = div)}
                        className="labelContainer"
                    >
                        <div className="label">Submit</div>
                    </div>
                </div>
                <Message text={message} className="message" />
            </form>
        </div>
    )
}
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
           <div className = "arrowUp animateUp"><img
           onClick = {()=>handleClick()}
             src={arrow} alt="return up"/></div>
            <div className="header animateUp">
                <div>
                    <h1>We Want<br/> To Hear<br/> Your<br/> Voice</h1>
                </div>
            </div>
            <div className="text animateUp">
                <div className="border"></div>
                <p>Show us what you see and tell us how you feel.</p>
                <p>
                    We’ll be taking the videos submitted to create a living
                    audio visual patchwork for and by all of us.
                </p>
            </div>
            <FormContainer className="formContainer animateUp" />
        </div>
    )
}
export default SubmissionPage
