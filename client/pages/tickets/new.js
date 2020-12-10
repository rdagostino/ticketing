import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRequest } from '../../hooks/use-request';

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,
      price,
    },
    onSuccess: () => router.push('/'),
  });

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    doRequest();
  };

  return (
    <>
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            className="form-control"
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {errors}
        <button className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default NewTicket;
