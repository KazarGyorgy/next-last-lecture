import classes from "./MeetupDetail.module.css";

function MeetupDetail(props) {
  return (
    <section className={classes.detail}>
      <img loading="lazy" src={props.image} alt={props.title} />
      <h1> {props.title}</h1>
      <p>{props.address}</p>
      <p>{props.description}</p>
    </section>
  );
}

export default MeetupDetail;
