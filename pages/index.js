import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "First meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/f/fd/Sz%C3%A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg",
//     address: "Budapest Széchenyi tér",
//     description: "Valami meetup",
//   },
//   {
//     id: "m2",
//     title: "Second meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/1/1c/West_and_East_Germans_at_the_Brandenburg_Gate_in_1989.jpg ",
//     address: "Berlin",
//     description: "Berlini fal ledöntése",
//   },
//   {
//     id: "m3",
//     title: "Third meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/f/fd/Sz%C3%A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg",
//     address: "Budapest Széchenyi tér",
//     description: "Valami meetup",
//   },
//   {
//     id: "m4",
//     title: "Fourth meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/f/fd/Sz%C3%A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg",
//     address: "Budapest Széchenyi tér",
//     description: "Valami meetup",
//   },
// ];
// Az a props lessz a paraméter ami a getStaticProps függvénynél visszatér
function HomePage(props) {
  // erre nincs szükség mert a getStaticData-t használom
  //   const [loadedMeetups, setLoadedMeetups] = useState([]);
  //   useEffect(() => {
  //     //send HTTP

  //     //a useEffect a komponens betöltése után fut
  //     // Ez így nem jó mert az első futáskor nem kerül bele és a keresőmotor nem fogja látni
  //     setLoadedMeetups(DUMMY_MEETUPS);
  //   }, []);
  return (
    <>
      <Head>
        <title>React meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}
//ez csak a page komponensekben működik, akkor kell ha az oladlon dinamikus tartalmat szeretnénk úgy megjeleníteni hogy a seo is lássa.
//ez nem fut a client oldalon csak a build során

export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect(
    "mongodb+srv://kazargyuri93:zJ32gDVpNCY7f@cluster0.pxta3sb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    //Újra lekéri az adatot minden óra elteltével
    revalidate: 3600,
  };
}

// //Minden híváskor lefut a szerveroldalon
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//   //Fetch date from api
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// A getServerSideProps vagy a getStaticProps a jobb:
// Ha feltétlen  szükséges hogy up to date legyen az adat akkor a serverProps, de várni kell a válaszra, lassabb lesz az oldal.
//Ha az adat nem sűrűn változik(percen vagy órán belül) akkor viszont a staticProps revalidattel.
export default HomePage;
