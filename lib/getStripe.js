import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51MlaprIjl8pQ8CxCDOWHNC9UTyRKMfQh5bu54wojATDG4Ggmh0gh9OAwazkeMBGFZ7V8xGyqxiBJ9HMhdUfo2Ocj00doSZHi5L"
    );
  }

  return stripePromise;
};

export default getStripe;
