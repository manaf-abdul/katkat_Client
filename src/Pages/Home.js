import React from 'react'
import Banner from '../Components/Banner'
import Row from '../Components/Row'
import request from '../request'

const Home = () => {
  
  return (
    <>
    <Banner />

        <Row
          title="NATKAT ORIGINALS"
          fetchUrl={request.fetchNetflixOriginals}
          isLargeRow
        />
        <Row title="TRENDING NOW" fetchUrl={request.fetchTrending} />
        <Row title="TOP RATED" fetchUrl={request.fetchTopRated} />
        <Row title="ACTION MOVIES" fetchUrl={request.fetchActionMovies} />
        <Row title="COMEDY MOVIES" fetchUrl={request.fetchComedyMovies} />
        <Row title="HORROR MOVIES" fetchUrl={request.fetchHorrorMovies} />
        <Row title="ROMANCE MOVIES" fetchUrl={request.fetchRomanceMovies} />
        <Row title="DOCUMENTARIES " fetchUrl={request.fetchDocumentaries} />
        </>
  )
}

export default Home