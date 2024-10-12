import React, { useState, useEffect } from 'react';
import styles from './MainContent.module.css';
import TrendingNowSection from '../TrendingNowSection/TrendingNowSection';
import data from '../../data/data.json';

const MainContent = () => {
  const defaultFeaturedData = data.Featured;
  const [featuredData, setFeaturedData] = useState(defaultFeaturedData);
  const [backgroundImage, setBackgroundImage] = useState(require(`../../assets/${defaultFeaturedData.CoverImage}`));
  const [videoUrl, setVideoUrl] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const lastClickedId = sessionStorage.getItem('lastClickedId');
    const lastClickedMovie = data.TendingNow.find(item => item.Id === lastClickedId);
    if (lastClickedMovie) {
      updateFeaturedData(lastClickedMovie);
    }
  }, []);

  const updateFeaturedData = (movie) => {
    setFeaturedData(movie);
    sessionStorage.setItem('lastClickedId', movie.Id);
    handleTransition(movie);
  };

  const handleTransition = (movie) => {
    setIsTransitioning(true);
    setVideoUrl(null);
    setBackgroundImage(require(`../../assets/${movie.CoverImage}`));

    setTimeout(() => {
      setVideoUrl(movie.VideoUrl);
      setIsTransitioning(false);
    }, 2000);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className={styles.mainContent}>
      {videoUrl && !isTransitioning ? (
        <video
          src={videoUrl}
          className={styles.backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={(e) => {
            setIsVideoPlaying(true);
          }}
        />
      ) : (
        <div
          className={styles.backgroundImage}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            display: 'block'
          }}
        />
      )}

      <div className={styles.section} >
        <h3 className={styles.category}>{featuredData.Category}</h3>
        <h1 className={styles.title}>{featuredData.Title}</h1>
        <div className={styles.info}>
          <span>{featuredData.ReleaseYear}</span>
          <span className={styles.rating}>{featuredData.MpaRating}</span>
          <span className={styles.duration}>{formatDuration(featuredData.Duration)}</span>
        </div>
        <div className={styles.description}>{featuredData.Description}</div>
        <div className={styles.buttons}>
          <button className={styles.play}>Play</button>
          <button className={styles.more_info}>More info</button>
        </div>
      </div>

      <TrendingNowSection setBackgroundImage={setBackgroundImage} setFeaturedData={updateFeaturedData} />
    </div>
  );
};

export default MainContent;

