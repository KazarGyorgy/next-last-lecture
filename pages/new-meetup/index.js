import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

function NewMeetupPage() {
  const router = useRouter();

  async function handleAdd(meetupDetails) {
    const res = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Add a new meetups</title>
        <meta name="description" content="Add your own meetups!"></meta>
      </Head>
      <NewMeetupForm onAddMeetup={handleAdd} />
    </>
  );
}
export default NewMeetupPage;
