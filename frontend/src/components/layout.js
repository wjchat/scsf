/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import "../style/layout.css"

import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'


// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin)






const Layout = ({ children }) => {
    return (
        <>
            <head><link rel="stylesheet" href="https://use.typekit.net/fck3ywu.css"/></head><header><link href="https://fonts.googleapis.com/css2?family=Bitter&family=Kanit:wght@900&display=swap" rel="stylesheet" /></header>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.min.js"></script>
            <main>{children}</main>
        </>
    )
}
export default Layout
