import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import searchIcon from '../../assets/icons/1.png';
import homeIcon from '../../assets/icons/2.png';
import tvIcon from '../../assets/icons/3.png';
import moviesIcon from '../../assets/icons/4.png';
import genresIcon from '../../assets/icons/5.png';
import watchLaterIcon from '../../assets/icons/6.png';
import profilePic from '../../assets/profile.jpg';

const menuItems = [
  { name: 'search', label: 'Search', icon: searchIcon },
  { name: 'home', label: 'Home', icon: homeIcon },
  { name: 'tv', label: 'TV Shows', icon: tvIcon },
  { name: 'movies', label: 'Movies', icon: moviesIcon },
  { name: 'genres', label: 'Genres', icon: genresIcon },
  { name: 'watchLater', label: 'Watch later', icon: watchLaterIcon }
];

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMouseHover = (hoverState) => {
    setIsHovered(hoverState);

  };

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div
      className={`${styles.sidebar} ${isHovered ? styles.open : ''}`}
      onMouseEnter={() => handleMouseHover(true)}
      onMouseLeave={() => handleMouseHover(false)}
    >

      {isHovered && (
        <div className={styles.profileInfo}>
          <img src={profilePic} alt="Profile" className={styles.profilePic} />
          <p className={styles.profileName}>Daniel</p>
        </div>
      )}

      <div className={!isHovered ? styles.menuIcons : styles.selectedDiv}>
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`${styles.menuItem} ${selectedItem === item.name ? styles.selected : ''}`}
            onClick={() => handleMenuItemClick(item.name)}
          >
            <img src={item.icon} alt={item.label} className={styles.icon} />
            {isHovered && (
              <span className={styles.iconLabel}>
                <span className={styles.textLabel}>{item.label}</span>
              </span>
            )}
          </div>
        ))}
      </div>

      {isHovered && (
        <div className={styles.additionalMenu}>
          <p className={styles.menuItem}>Language</p>
          <p className={styles.menuItem}>Get Help</p>
          <p className={styles.menuItem}>Exit</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
