import React, { useCallback, useState, useEffect } from "react"
import { TimelineMax } from "gsap"
import "../style/submission.scss"
import "../style/formItems.scss"

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
        let duration = 0.05
        tl.to(animate, duration, {
            opacity: 1,
            ease: "easeIn"
        }).to(
            animate,
            duration,
            {
                x: 0,
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
    const [fileLabel, updateFileLabel] = useState("Upload a file")
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
            updateFileLabel("Upload a file")
        }
    },[files])

    const setFile = event => {
        updateFile(event.target.files)
    }
    const setEmail = event => {
        updateEmail(event.target.value)
    }
    const validateSubmit = useCallback(() => {
        if (email === null) {
            updateMessage(
                "Please put in your email so we can keep you updated on the project."
            )
        } else if (
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ===
            false
        ) {
            updateMessage("Please enter a proper email.")
        } else if (files === null) {
            updateMessage("Please upload something.")
        } else {
            updateMessage(`This part doesn't work yet! U goof`)
            //handleSubmit();
        }
    })
    const colorChange = useCallback((container, entering) => {
        let tl = new TimelineMax({ paused: false })
        let duration = 0.2
        let text = container.childNodes[0]

        if (entering) {
            tl.to(container, duration, {
                backgroundColor: gold
            }).to(
                text,
                duration,
                {
                    color: black
                },
                0
            )
        } else {
            tl.to(container, duration, {
                backgroundColor: black
            }).to(
                text,
                duration,
                {
                    color: gold
                },
                0
            )
        }
    })
    return (
        <div className={props.className}>
            <form className="flexbox">
                <div className="email">
                    <div className="labelContainer">
                        <input
                            onChange={setEmail.bind(this)}
                            type="text"
                            placeholder="Enter Email"
                        />
                    </div>
                </div>
                <div
                    className="file"
                    onMouseEnter={() => colorChange(fileBox, true)}
                    onMouseLeave={() => colorChange(fileBox, false)}
                >
                    <input
                        ref={div => (fileInput = div)}
                        onChange={setFile.bind(this)}
                        id="files"
                        type="file"
                        multiple
                    />
                    <div
                        ref={div => (fileBox = div)}
                        className="labelContainer"
                    >
                        <div className="label">{fileLabel}</div>
                    </div>
                    {files != null ? (
                        <X onClick={() => updateFile(null)} classname="x" />
                    ) : (
                        ""
                    )}
                </div>
                <div
                    onClick={() => validateSubmit()}
                    className="submit"
                    onMouseEnter={() => colorChange(submitBox, true)}
                    onMouseLeave={() => colorChange(submitBox, false)}
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
    let tl = new TimelineMax()
    const [animated, updateAnimate] = useState(false)
    const animateIn = (contain) => {
        let duration = 0.2
        let stagger = duration * 0.2
        let start = duration * 0.8
        let head = contain.childNodes[0]
        let texts = contain.childNodes[1].childNodes
        let forms = contain.childNodes[2].childNodes[0].childNodes
        tl.staggerTo(
            texts,
            duration,
            {
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                ease: "easeOut"
            },
            stagger
        )
        tl.to(
            head,
            duration,
            {
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                ease: "easeOut"
            },
            `-=${start}`
        )
        tl.staggerTo(
            forms,
            duration,
            {
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                ease: "easeOut"
            },
            -1 * stagger,
            `-=${duration * 1.2}`
        )
    }
    useEffect(() => {
        let contain = subcontainer
        if (animated === false && contain != null) {
            window.addEventListener("scroll", () => {
                if (window.scrollY > window.innerHeight * 0.8) {
                    animateIn(contain)
                    updateAnimate(true)
                    console.log("ok")
                }
            })
        }
    }, [])
    return (
        <div ref={div => (subcontainer = div)} className="submissionContainer">
            <div className="header">
                <div>
                    <h1>We Want To Hear Your Voice</h1>
                </div>
            </div>
            <div className="text">
                <div className="border"></div>
                <p>Show us what you see and tell us how you feel.</p>
                <p>
                    We’ll be taking the videos submitted to create a living
                    audio visual patchwork for and by all of us.
                </p>
            </div>
            <FormContainer className="formContainer" />
        </div>
    )
}
export default SubmissionPage
