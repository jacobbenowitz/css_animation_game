// entry point, bundler will take required files here for use in main.js

import Example from "./scripts/functionality.js"
import NavBar from "./scripts/nav_bar"

document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("main")
    new Example(main)

    const header = document.getElementById("header")
    new NavBar(header)
})