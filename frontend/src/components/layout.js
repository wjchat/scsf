/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import favicon from "../images/favicon.ico"
import Helmet from "react-helmet"

import "../style/layout.css"

const Layout = ({ children }) => {
    return (
        <>
            <header><link href="https://fonts.googleapis.com/css2?family=Bitter&family=Kanit:wght@900&display=swap" rel="stylesheet" /></header>
            <main>{children}</main>
        </>
    )
}
export default Layout
