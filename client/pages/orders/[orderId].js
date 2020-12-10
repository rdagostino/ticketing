import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useRequest } from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    // Invoke manually once since we'll be 1 second behind.
    findTimeLeft();

    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51HwUf1LKXUqJAdcNRX7ydTWuhkqslj7Az5L5GGT13GIDd0cZXwPEkPcEBSqkp2stxoFr3Soe7sEsnQPVzCGQiYe500lum5fOE1"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
