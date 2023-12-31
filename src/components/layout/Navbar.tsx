import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartWithItems from '../partials/CartWithItems';
import EmptyCart from '../partials/EmptyCart';
import LogoImg2 from '../../assets/img/logo.png';
import useNavbarController from '../../controllers/NavbarController';
import { CartContext, CartItem } from '../../App';
import '../../styles/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCartShopping,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { state, controller } = useNavbarController();

  const cartContext = useContext(CartContext);

  const cartItem: CartItem[] = cartContext?.cartItem || [];

  const cartItemQuantity = cartItem.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <div
        className={`mobile-nav-full ${
          state.mobileNav ? 'open-flex' : 'closed-flex'
        }`}
      >
        <FontAwesomeIcon icon={faXmark} onClick={controller.closeNavMobile} />
        <div className="mobile-links">
          <Link onClick={controller.closeNavMobile} to="/categories/all">
            categories
          </Link>
          <Link onClick={controller.closeNavMobile} to="/categories/product/15">
            product page
          </Link>
        </div>
      </div>

      <div
        onClick={controller.openCart}
        className={`page-overlay ${state.cart ? 'open-flex' : 'closed-flex'}`}
      ></div>

      <div className={`cart-div ${state.cart ? 'open-cart' : 'closed-cart'}`}>
        <div className="cart-title-btn">
          <h2 className="cart-full-h2">
            Your Shopping Cart ({cartItemQuantity})
          </h2>
          <FontAwesomeIcon icon={faXmark} onClick={controller.closeCart} />
        </div>

        <div className="cart-body">
          {cartItem.length < 1 ? (
            <EmptyCart closeCart={controller.closeCart} />
          ) : (
            <CartWithItems closeCart={controller.closeCart} />
          )}
        </div>
      </div>

      <nav className="navbar">
        <div className="container">
          <div className={`nav-container ${state.sticky ? 'cont-sticky' : ''}`}>
            <Link to="/">
              <img
                onClick={controller.scrollToTop}
                src={LogoImg2}
                alt="logo"
                className="logo-img"
              />
            </Link>
            <div className="nav-links">
              <Link onClick={() => window.scrollTo(0, 0)} to="/categories/all">
                categories
              </Link>
              <Link
                onClick={() => window.scrollTo(0, 0)}
                to="/categories/product/15"
              >
                product page
              </Link>

              <div
                className={`cart-icon ${
                  cartItemQuantity > 0 ? 'with-items' : ''
                }`}
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  onClick={controller.openCart}
                />
                {cartItemQuantity > 0 && (
                  <span className="cart-item-count">{cartItemQuantity}</span>
                )}
              </div>
            </div>

            <div className="hamburger-menu">
              <div
                className={`cart-icon ${
                  cartItemQuantity > 0 ? 'with-items' : ''
                }`}
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  onClick={controller.openCart}
                  style={{ width: '20px', height: '20px' }}
                />
                {cartItemQuantity > 0 && (
                  <span className="cart-item-count">{cartItemQuantity}</span>
                )}
              </div>
              <FontAwesomeIcon
                icon={faBars}
                onClick={controller.openNavMobile}
                className="hamburger-hamb"
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
