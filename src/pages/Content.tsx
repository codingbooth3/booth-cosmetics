import { lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';


import '../../src/css/Content.css';

import Header from './Header';
import Footer from './Footer';

const Home = lazy(() => import('./Home'));
const Signup = lazy(() => import('./Signup'));
const Signin = lazy(() => import('./Signin'));
const Confirm = lazy(() => import('./Confirm'));
const Shop = lazy(() => import('./Shop'));
const Settings = lazy(() => import('./Settings'));
const About = lazy(() => import('./About'));
const Picture = lazy(() => import('./Picture'));
const Ship = lazy(() => import('./Ship'));
const Privacy = lazy(() => import('./Privacy'));
const Conditions = lazy(() => import('./Conditions'));
const Myself = lazy(() => import('./Myself'));
const Cart = lazy(() => import('./Cart'));
const Create = lazy(() => import('./Create'))


export default function Content() {
  return (
    <div>
      <Toaster />
      <Header />
      <div id="mainBodySpacer">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/booth-cosmetics/' element={<Home />} />
            <Route path='/booth-cosmetics/account/signup/' element={<Signup />} />
            <Route path='/booth-cosmetics/account/signin/' element={<Signin />} />
            <Route path='/booth-cosmetics/account/signin/confirm-email/' element={<Confirm />} />
            <Route path='/booth-cosmetics/account/settings/' element={<Settings />} />
            <Route path='/booth-cosmetics/shop/' element={<Shop />} />
            <Route path='/booth-cosmetics/terms&conditions/' element={<Conditions />} />
            <Route path='/booth-cosmetics/privacy/' element={<Privacy />} />
            <Route path='/booth-cosmetics/ship/' element={<Ship />} />
            <Route path='/booth-cosmetics/about/' element={<About />} />
            <Route path='/booth-cosmetics/pictures/credit/' element={<Picture />} />
            <Route path='/booth-cosmetics/cart/' element={<Cart />} />
            <Route path='/booth-cosmetics/myself' element={<Myself />} />
            <Route path='/booth-cosmetics/create/' element={<Create />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );

  function NotFound() {
    return (
      <div>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <Link to={'/booth-cosmetics/'}>Home</Link>
      </div>
    );
  }
}
