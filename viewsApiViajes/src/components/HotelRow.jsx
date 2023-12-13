export const HotelRow = ({ id, name, city, price }) => {
  return (
    <div className="card card-hotel bg-dark">
      <div className="container-card">
        <img src="https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_627,q_auto,w_1200/hotelier-images/f2/27/a4709e2cae8e8aee4381986fcee791bf56b2cd2eb677d0cfec9f195dac58.jpeg" class="card-img-top" alt="hotel" />
      </div>
      <div className="card-body p-5">
          <h5 className="hotel-name card-title text-light">{name}</h5>
          <p className="d-none card-text t-hotel text-light">{id}</p>
          <p className="card-text t-hotel text-light">Ciudad: {city}</p>
          <p className="card-text t-hotel text-light">Precio: ${price}</p>
        </div>
    </div>
  );
};
