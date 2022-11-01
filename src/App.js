import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import {
  calculateTotal,
  getCartData,
  STATUSES,
} from "./features/cart/cartSlice";

function App() {
  const { cart, status } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotal());
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(getCartData());
  }, []);

  if (status === STATUSES.LOADING) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (status === STATUSES.ERROR) {
    return (
      <div className="error">
        <h1>Something is wrong</h1>
      </div>
    );
  }
  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
