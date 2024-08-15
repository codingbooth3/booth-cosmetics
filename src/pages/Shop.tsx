import '../../src/css/Shop.css';

import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { auth } from '../config/firebase';
import { User } from 'firebase/auth';

import foundation from '../../src/imgs/foundation.jpg';
import lipbalm from '../../src/imgs/lipbalm.jpg';
import palette from '../../src/imgs/palette.jpg';

export default function Shop() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState<boolean>(true);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);

  const location = useLocation();

  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({
    new: localStorage.getItem('new') === 'checked',
    eyes: localStorage.getItem('eyes') === 'checked',
    lips: localStorage.getItem('lips') === 'checked',
    face: localStorage.getItem('face') === 'checked',
    best: localStorage.getItem('best') === 'checked',
    sale: localStorage.getItem('sale') === 'checked',
    natural: localStorage.getItem('natural') === 'checked',
  });

  interface ShopItemsProps {
    image: string;
    title: string;
    price: string;
    collection: string[];
    productId: number;
    listingCreator: string;
  }

  const products: ShopItemsProps[] = [
    { image: palette, title: 'Eye Palette', price: '$20.00', collection: ['new', 'eyes', 'best'], productId: 1 , listingCreator: 'codingbooth3@proton.me'},
    { image: lipbalm, title: 'Lip Balm', price: '$5.00', collection: ['new', 'sale', 'lips'], productId: 2, listingCreator: 'codingbooth3@proton.me' },
    { image: foundation, title: 'Foundation', price: '$15.00', collection: ['new', 'natural', 'face'], productId: 3, listingCreator: 'codingbooth3@proton.me' },
  ];

  const ShopItem: React.FC<ShopItemsProps> = ({ image, title, price, productId, listingCreator }) => (
    <li className="shopItemContainer">
      <div className="shopImageCreditContainer">
        <img src={image} alt={title} className='shopItemImage' loading="lazy" />
        <h5 className="imageProvided">Image Provided By: <a href="https://www.freepik.com/">Freepik</a></h5>
      </div>
      <h3 className="shopTitle">{title}</h3>
      <h4 className="shopPrice">{price}</h4>
      <h4 className="shopId">{productId}</h4>
      <h4 className="creatorEmail">{listingCreator}</h4>
      <div id="shopAddToCartButtonContainer">
        <button id='shopAddToCartButton'>ADD TO CART</button>
      </div>
    </li>
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        if (user.emailVerified) {
          setEmailVerified(true);
        } else {
          toast.error('Please verify your email address.');
        }
      } else {
        toast.error('Please Sign In');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get('from');

    if (from === 'all' || location.search === ('')) {
      setCheckboxes({
        new: true,
        eyes: true,
        lips: true,
        face: true,
        best: true,
        sale: true,
        natural: true,
      });
    } 

    if (from === 'new') {
      setCheckboxes({
        new: true,
        eyes: false,
        lips: false,
        face: false,
        best: false,
        sale: false,
        natural: false,
      })
    }

    if (from === 'eyes') {
      setCheckboxes({
        new: false,
        eyes: true,
        lips: false,
        face: false,
        best: false,
        sale: false,
        natural: false,
      })
    }

    if (from === 'lips') {
      setCheckboxes({
        new: false,
        eyes: false,
        lips: true,
        face: false,
        best: false,
        sale: false,
        natural: false,
      })
    }

    if (from === 'face') {
      setCheckboxes({
        new: false,
        eyes: false,
        lips: false,
        face: true,
        best: false,
        sale: false,
        natural: false,
      })
    }

    if (from === 'best') {
      setCheckboxes({
        new: false,
        eyes: false,
        lips: false,
        face: false,
        best: true,
        sale: false,
        natural: false,
      })
    }

    if (from === 'sale') {
      setCheckboxes({
        new: false,
        eyes: false,
        lips: false,
        face: false,
        best: false,
        sale: true,
        natural: false,
      })
    }

    if (from === 'natural') {
      setCheckboxes({
        new: false,
        eyes: false,
        lips: false,
        face: false,
        best: false,
        sale: false,
        natural: true,
      })
    }
  }, [location.search]);
  

  useEffect(() => {
    Object.entries(checkboxes).forEach(([key, checked]) => {
      localStorage.setItem(key, checked ? 'checked' : 'unchecked');
    });
  }, [checkboxes]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (!checked) {
      const remainingCheckboxes = Object.values(checkboxes).filter(val => val).length;

      if (remainingCheckboxes <= 1) {
        toast.error('At least one checkbox must be selected.');
        return;
      }
    }

    setCheckboxes(prev => ({
      ...prev,
      [value]: checked,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={'/booth-cosmetics/account/signin/'} />;
  }

  if (!emailVerified) {
    return <Navigate to={'/booth-cosmetics/account/signin/confirm-email/'} />;
  }

  const filteredProducts = products.filter(product =>
    product.collection.some(collection => checkboxes[collection])
  );

  return (
    <div id='shopContainer'>
      <div id="shopSelectorContainer">
        <div id="shopSelector">
          <div id="shopNewContainer">
            <input 
              type="checkbox" 
              className='checkboxSelection' 
              value='new'
              checked={checkboxes.new}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="new">New</label>
          </div>
          <div id="shopEyesContainer">
            <input 
              type="checkbox" 
              className='checkboxSelection' 
              value='eyes'
              checked={checkboxes.eyes}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="eyes">Eyes</label>
          </div>
          <div id="shopLipsContainer">
            <input 
              type="checkbox" 
              className='checkboxSelection' 
              value='lips'
              checked={checkboxes.lips}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="lips">Lips</label>
          </div>
          <div id="shopFaceContainer">
            <input 
              type="checkbox" 
              className='checkboxSelection' 
              value='face'
              checked={checkboxes.face}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="face">Face</label>
          </div>  
          <div id="shopBestContainer">
            <input 
              type="checkbox" 
              className='checkboxSelection' 
              value='best'
              checked={checkboxes.best}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="best">Best</label>
          </div>
          <div id="shopSaleContainer">
            <input 
              type="checkbox" 
              className='checkboxSelection' 
              value='sale'
              checked={checkboxes.sale}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="sale">Sale</label>
          </div>
          <div id="naturalSaleContainer">
            <input 
              type="checkbox"
              className='checkboxSelection'
              value='natural'
              checked={checkboxes.natural}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="natural">Natural</label>
          </div>
        </div>
      </div>
      <div id="shopBody">
        <h3 id="shopHeader">Shop</h3>
        <div id="collectionOfProducts">
          <ul id='collectionOfProductsList'>
            {filteredProducts.map(product => (
              <ShopItem 
                key={product.title} 
                image={product.image} 
                title={product.title} 
                price={product.price} 
                collection={product.collection}
                productId={product.productId}
                listingCreator={product.listingCreator}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  }
