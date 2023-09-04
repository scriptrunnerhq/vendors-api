require('@testing-library/jest-dom')

const jQuery = require('jquery')

window.AJS = { $: jQuery.bind(jQuery) }
