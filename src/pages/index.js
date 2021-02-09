import React from "react"



import CssBaseline from '@material-ui/core/CssBaseline'

import LandingHero from "../components/LandingHero"
import KitsGrid from "../components/KitsGrid"


const IndexPage = () => {
  return (

  <React.Fragment>
  <CssBaseline />
  <main>
        <LandingHero h_title="Zen Robots" h_paragraph="
        Zen robot build kit is a tool for teaching robotics to kids.
         With modular parts, tons of example projects,
         and a full curriculum set,
         teachers can hit the ground running." />
        <KitsGrid />
      </main>
  </React.Fragment>

)}

export default IndexPage
