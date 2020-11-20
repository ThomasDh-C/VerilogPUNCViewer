import ReactGA from "react-ga"

export const initGA = () => {
    ReactGA.initialize("G-XL1R59C49T")
}

export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
}