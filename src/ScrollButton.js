import React, { useState } from 'react';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    /* eslint-disable-next-line */
    <a
      onClick={scrollToTop}
      style={{ display: visible ? 'flex' : 'none' }}
      className='scroll-btn'
    >
      <i class='fi fi-br-arrow-small-up'></i>
    </a>
  );
};

export default ScrollButton;
