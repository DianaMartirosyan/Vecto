
import React, { useState, useEffect } from 'react';
import styles from './TrendingNowSection.module.css';
import data from '../../data/data.json';

function TrendingNowSection({ setBackgroundImage, setFeaturedData }) {
  const [startIndex, setStartIndex] = useState(0);
  const blocksToShow = 8;
  const [trendingData, setTrendingData] = useState(data.TendingNow);

  useEffect(() => {

    const lastClickedId = sessionStorage.getItem('lastClickedId');
    if (lastClickedId) {
      const lastClickedMovie = trendingData.find(item => item.Id === lastClickedId);
      if (lastClickedMovie) {

        const sortedData = [
          lastClickedMovie,
          ...trendingData.filter(item => item.Id !== lastClickedId),
        ];
        setTrendingData(sortedData);
      }
    }
  }, []);

  const handleNextClick = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + blocksToShow, trendingData.length - blocksToShow));
  };

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - blocksToShow, 0));
  };

  const handleBlockClick = (item) => {
    setFeaturedData(item);
    setBackgroundImage(require(`../../assets/${item.CoverImage}`));
    sessionStorage.setItem('lastClickedId', item.Id);
  };

  return (
    <div className={styles.trendingNowSection}>
      <div className={styles.trendingBlocksContainer}>
        {trendingData.slice(startIndex, startIndex + blocksToShow).map((item) => (
          <div key={item.Id} className={styles.trendingBlock} onClick={() => handleBlockClick(item)}>
            <img
              src={require(`../../assets/${item.CoverImage}`)}
              alt={item.Title}
              className={styles.coverImage}
            />
          </div>
        ))}
      </div>

      <div className={styles.sliderControls}>
        <button onClick={handlePrevClick} disabled={startIndex === 0}>
          Previous
        </button>
        <button onClick={handleNextClick} disabled={startIndex + blocksToShow >= trendingData.length}>
          Next
        </button>
      </div>
    </div>
  );
}

export default TrendingNowSection;
