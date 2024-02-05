export const PackagesRow = ({
  id,
  name,
  hotel,
  flight,
  initDate,
  endDate,
  price,
}) => {
  return (
    <article className="card__tp">
      <div className="card__preview">
        <img src="https://images.alphacoders.com/132/1327898.png" />
        <div className="card__price">${price}</div>
      </div>
      <div className="card__content">
        <h5 className="card__title">{name}</h5>
        <p className="d-none card-text">{id}</p>
        <p className="card__hotel">Hotel: {hotel}</p>
        <p className="card__flight">Vuelo: {flight}</p>
        <p className="card__bottom">
          {initDate} | {endDate}
        </p>
      </div>
    </article>
  );
};
