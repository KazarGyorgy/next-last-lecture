//az api routesok csak a szerveren futnak sose a cliens oldalon
//api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://kazargyuri93:zJ32gDVpNCY7f@cluster0.pxta3sb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
      const db = client.db();
      
      const meetupsCollection = db.collection("meetups");
      
      const result = await meetupsCollection.insertOne(data);
      
      client.close();
      res.status(201).json({message: 'Meetup inserted!'});
      
  }
}

export default handler;
