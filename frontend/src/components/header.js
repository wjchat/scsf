import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header >
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `So Close So Far`,
}

export default Header
