import footer from '../../src/imgs/footer.png'

import '../../src/css/Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {

  const year = new Date().getFullYear()

  return (
    <div id='footerContainer'>
        <img src={footer} alt="" id='footerLogo'/>
        <ul id="footerList">
          <Link to={'/booth-cosmetics/terms&conditions/'} className='footerLink' >TERMS & CONDITIONS</Link>
          <Link to={'/booth-cosmetics/privacy/'} className='footerLink' >PRIVACY POLICY</Link>
          <Link to={'/booth-cosmetics/ship/'} className='footerLink' >SHIPPING INFORMATION</Link>
          <Link to={'/booth-cosmetics/about/'} className='footerLink' >ABOUT US</Link>
          <Link to={'/booth-cosmetics/account/settings/'} className='footerLink' >ACCOUNT SETTINGS</Link>
        </ul>
        <div id="copyContainer">
          <h5 id='madeText'>Made By <Link to={'/booth-cosmetics/myself/'} id='myLink'>Me</Link></h5>
          <h6 id='copy'>&copy;&nbsp;{year}</h6>
        </div>
        <div id="picCreditContainer">
          <Link to={'/booth-cosmetics/pictures/credit/'} id='pictureCredit'>
            Picture Credit
          </Link>
        </div>
    </div>
  )
}
