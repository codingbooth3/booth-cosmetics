import { Link, Navigate } from 'react-router-dom';
import logo from '../imgs/header.png';
import account from '../imgs/account.svg';
import cart from '../imgs/cart.svg';
import { auth } from '../config/firebase';
import '../../src/css/Header.css';
import { useState, useEffect } from 'react';

export default function Header() {
  const settingsSetup = () => {
    if (!auth.currentUser) {
      return <Navigate to={'/booth-cosmetics/signin/'} />;
    }

    if (auth.currentUser && !auth.currentUser.emailVerified) {
      return <Navigate to={'/booth-cosmetics/account/signin/confirm-email/'} />;
    }

    if (auth.currentUser && auth.currentUser.emailVerified) {
      return <Navigate to={'/booth-cosmetics/account/settings/'} />;
    }

    if (!auth.currentUser) {
      return <Navigate to={'/booth-cosmetics/signin/'} />;
    }
  };
  
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>(getTimeUntilMidnight());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function getTimeUntilMidnight() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);

    const timeDifference = midnight.getTime() - now.getTime();
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  function formatTimeUnit(unit: number): string {
    return unit < 10 ? `0${unit}` : `${unit}`;
  }

  const { hours, minutes, seconds } = timeLeft;

  const [dropdown, setDropdown] = useState<string>('')

  const handleMouseOver = (item: string) => {
    setDropdown(item)
  }

  const handleMouseLeave = () => {
    setDropdown('')
  }

  const [hidden, setHidden] = useState<string>('')
  const [move, setMove] = useState<string>('')

  function closeShipping() {
    localStorage.setItem('shippingBanner', 'false');
    setHidden('hidden')
    setMove('move')
  }

  useEffect(() => {
    let savedState = localStorage.getItem('shippingBanner');
    if (savedState === null) {
      localStorage.setItem('shippingBanner', 'true');
      savedState = 'true';
    }
    
    if (savedState === 'true') {
      setHidden('visible');
      setMove('orig')
    } else {
      window.scrollTo({top: 0})
      setHidden('hidden');
      setMove('move');
    }
  }, []);

  return (
    <div id='sticky'>
      <div id="shippingContainer" className={hidden}>
          <div id="shippingMainContainer">
            <div id="shippingTextContainer">
              <p id='shippingText'>Order $50 or more before midnight for free shipping.</p>
              <p id='shippingTime'>Time left: {hours} : {formatTimeUnit(minutes)} : {formatTimeUnit(seconds)}</p>
            </div>
            <div id='closerContainer'>
              <h5 id="closer" onClick={closeShipping}>X</h5>
            </div>
          </div>
      </div>
      <div id='headingContainer' className={move}>
        <Link to={'/booth-cosmetics/'}>
          <img src={logo} alt="Booth Cosmetics Logo" id='logo' />
        </Link>
        <ol id="headingList">
          <li className="headingListItem"
            onMouseOver={() => { handleMouseOver('new') }}
            onMouseLeave={handleMouseLeave}
          >
            New
            {dropdown === 'new' && (
              <ul className='dropdownListContainer'>
                <Link to={'/booth-cosmetics/shop/?from=new'}  className='dropdownListItem'>New Seasonal</Link>
                <Link to={'/booth-cosmetics/shop/?from=new'} className='dropdownListItem'>New Arrival</Link>
                <Link to={'/booth-cosmetics/shop/?from=new'} className='dropdownListItem'>New Sales</Link>
              </ul>
            )}
          </li>
          <li className="headingListItem"
            onMouseOver={() => { handleMouseOver('eyes') }}
            onMouseLeave={handleMouseLeave}
          >
            Eyes
            {dropdown === 'eyes' && (
              <ul className='dropdownListContainer'>
                <Link to={'/booth-cosmetics/shop/?from=eyes'} className='dropdownListItem'>Eye Sets</Link>
                <Link to={'/booth-cosmetics/shop/?from=eyes'} className='dropdownListItem'>Eye Liners</Link>
                <Link to={'/booth-cosmetics/shop/?from=eyes'} className='dropdownListItem'>Eye Primers</Link>
                <Link to={'/booth-cosmetics/shop/?from=eyes'} className='dropdownListItem'>Mascara</Link>
                <Link to={'/booth-cosmetics/shop/?from=eyes'} className='dropdownListItem'>Eye Lashes</Link>
                <Link to={'/booth-cosmetics/shop/?from=eyes'} className='dropdownListItem'>Liquid Liner</Link>
                <Link to={'/booth-cosmetics/shop/?from=eyes'} className='dropdownListItem'>Eye Shadow</Link>
              </ul>
            )}
          </li>
          <li className="headingListItem"
            onMouseOver={() => { handleMouseOver('lips') }}
            onMouseLeave={handleMouseLeave}
          >
            Lips
            {dropdown === 'lips' && (
              <ul className='dropdownListContainer'>
                <Link to={'/booth-cosmetics/shop/?from=lips'} className='dropdownListItem'>Lip Liner</Link>
                <Link to={'/booth-cosmetics/shop/?from=lips'} className='dropdownListItem'>Lip Gloss</Link>
                <Link to={'/booth-cosmetics/shop/?from=lips'} className='dropdownListItem'>Lip Stick</Link>
                <Link to={'/booth-cosmetics/shop/?from=lips'} className='dropdownListItem'>Lip Oil</Link>
                <Link to={'/booth-cosmetics/shop/?from=lips'} className='dropdownListItem'>Lip Balm</Link>
                <Link to={'/booth-cosmetics/shop/?from=lips'} className='dropdownListItem'>Lip Scrub</Link>
              </ul>
            )}
          </li>
          <li className="headingListItem"
            onMouseOver={() => { handleMouseOver('face') }}
            onMouseLeave={handleMouseLeave}
          >
            Face
            {dropdown === 'face' && (
              <ul className='dropdownListContainer'>
                <Link to={'/booth-cosmetics/shop/?from=face'} className='dropdownListItem'>Foundation</Link>
                <Link to={'/booth-cosmetics/shop/?from=face'} className='dropdownListItem'>Primer</Link>
                <Link to={'/booth-cosmetics/shop/?from=face'} className='dropdownListItem'>Concealer</Link>
                <Link to={'/booth-cosmetics/shop/?from=face'} className='dropdownListItem'>Bronzer</Link>
                <Link to={'/booth-cosmetics/shop/?from=face'} className='dropdownListItem'>Setting Powder</Link>
                <Link to={'/booth-cosmetics/shop/?from=face'} className='dropdownListItem'>Blush</Link>
              </ul>
            )}
          </li>
          <Link to={'/booth-cosmetics/shop/?from=best'} className="headingListItem">
            Best Sellers
          </Link>
        </ol>
        <div id="rightHeaderContainer">
          <div id="logosContainer">
            <Link to={'/booth-cosmetics/account/signup/'}>
              <img src={account} alt="Account" id='account' onClick={settingsSetup} />
            </Link>
            <Link to={'booth-cosmetics/cart/'}>
              <img src={cart} alt="Cart" id='cart' />
            </Link>
          </div>
          <button id="createListing">
            Create a listing
          </button>
        </div>
      </div>
    </div>
  );
}
