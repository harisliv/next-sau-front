import Service from "../../models/Service";
import classes from "./Services.module.scss";
import SingleService from "./SingleService";

const ServiceList = () => {
  let DUMMY = [];

  const service = {
    id: Math.floor(Math.random() * 100000),
    name: "Service name",
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    price: "$10",
  };

  for (let i = 0; i < 7; i++) {
    DUMMY.push(service);
  }

  return (
    <>
      <nav>
        <h1>Services</h1>
        <time className={classes.time}>
          Log in using your account details
        </time>
      </nav>
      <section className={classes.service_grid}>
        {DUMMY.map((item: Service) => (
          <SingleService
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </section>
    </>
  );
};

export default ServiceList;
