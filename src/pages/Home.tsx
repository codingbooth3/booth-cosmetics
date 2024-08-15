import '../../src/css/Home.css';
import heroImg from '../../src/imgs/img.png';
import foundation from '../../src/imgs/foundation.jpg';
import lipbalm from '../../src/imgs/lipbalm.jpg';
import palette from '../../src/imgs/palette.jpg';
import { Link } from 'react-router-dom';

interface NewArrivalItemProps {
  image: string; 
  title: string;
  price: string;
}

const NewArrivalItem: React.FC<NewArrivalItemProps> = ({ image, title, price }) => (
  <li className="newArrivalItem">
    <div className="imageCreditContainer">
      <img src={image} alt={title} className='newArrivalImage' loading="lazy"/>
      <h5 className="imageProvided">Image Provided By :&nbsp;<a href="https://www.freepik.com/">Freepik</a></h5>
    </div>
    <h3 className="newArrivalHeader">{title}</h3>
    <h4 className="newArrivalPrice">{price}</h4>
    <div className="newArrivalButtonContainer">
      <button className="addToCartNew">ADD TO CART</button>
    </div>
  </li>
);

export default function Home() {

  const newArrivals = [
    { image: foundation, title: 'Foundation', price: '$15.00' },
    { image: lipbalm, title: 'Lip Stick', price: '$8.50' },
    { image: palette, title: 'Palette', price: '$16.75' },
  ];

  return (
    <div id='homeContainer'>
      <div id='heroContainer'>
        <div id="heroTextContainer">
          <h2 id='heroHeader'>Embrace Your Natural Glow</h2>
          <h5 id='heroSubHeader'>
            Booth Cosmetics brings out the best in you. Our natural,<br />
            cruelty-free makeup enhances your unique beauty effortlessly.
          </h5>
          <Link to='/booth-cosmetics/shop/?from=natural'>
            <button id='heroButton'>Explore Our Natural Collection</button>
          </Link>
        </div>
        <div id="heroImageContainer">
          <img src={heroImg} alt="Hero" className='heroImages' loading="lazy"/>
          <h5 className="imageProvided">
            Image Provided By :&nbsp;<a href="https://www.freepik.com/">Freepik</a>
          </h5>
        </div>
      </div>
      <div id="newArrivalContainer">
        <h3 id="newArrival">New Arrivals</h3>
        <ul id="newArrivalList">
          {newArrivals.map((item, index) => (
            <NewArrivalItem key={index} {...item} />
          ))}
        </ul>
        <div id="shopAllNewButtonContainer">
          <Link to={'/booth-cosmetics/shop/?from=all'} id="shopAllNewButton">SHOP ALL NEW PRODUCTS</Link>
        </div>
      </div>
    </div>
  );
}
