const express = require("express");
const path = require("path");
const {Datastore} = require('@google-cloud/datastore');
const cors = require('cors');
const datastore = new Datastore();

const app = express();
const port = process.env.PORT || "8000";

app.use(cors());

async function queryEntities() {
    const kind = 'summery_kind';
    const query = datastore.createQuery(kind);
    const [entities] = await datastore.runQuery(query);

    let queryArr = []

    entities.forEach(entity => {
      // console.log(entity.summery);
      queryArr.push(entity)
    });

    return queryArr
    
  }

app.get("/", async (req, res) => {
    const queryArr = await queryEntities().catch(console.error);

    res.status(200).send(queryArr);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});