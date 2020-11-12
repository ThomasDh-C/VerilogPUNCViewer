import React from 'react'
import styled from 'styled-components'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import ImportFromFile from '../components/ImportFromFile'
import TimeSlider from '../components/TimeSlider'
import TopPanel from '../components/top_panel/TopPanel'
import BottomPanel from '../components/bottom_panel/BottomPanel'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px 8px 8px 8px;
  align-content: space-between;
`

const Home = () => {
  const [vcdObj, setVCD] = React.useState({})
  const [time, setTime] = React.useState(0)
  console.log(vcdObj)
  return (
    <div className={styles.container}>
      <Head>
        <title>ELE206 PUNC Lab</title>
        <link rel="icon" href="/PUwhite.svg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}> ELE206 PUNC - VCD Viewer </h1>
        <ImportFromFile setVCD={setVCD} />

        <TopPanel time={time} vcdObj={vcdObj} />
        <BottomPanel time={time} vcdObj={vcdObj} />
        {/* Way too many points to show this ... could implement
        a brush chart in future https://apexcharts.com/javascript-chart-demos/line-charts/brush-chart/
        <ClkGraph vcdObj={vcdObj} time={time} /> */}
        <TimeSlider vcdObj={vcdObj} time={time} setTime={setTime} />
      </main>

      <footer className={styles.footer}>
        <a> ELE206 Fall 2020
          <img src="/PU.svg" alt="Princeton Logo" className={styles.logo} />
        </a>
      </footer>
    </div >
  )
}

export default Home; 