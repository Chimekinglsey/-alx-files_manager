const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url)
const dbName = 'fileManagerTest';

async function main () {
    await client.connect();
    console.log('Connected successfully to server');
    const db2 = client.db('SecondBDTest')
    const db = client.db(dbName)
    const collection = db.collection('documents')
    const db2collectino = db2.collection('Students')
    const student = await db2collectino.insertMany([{name: 'John', age: 20}, {name: 'Inyang', age: 30}])
    console.log('Inserted', student)


    // const insertResult = await collection.insertMany([{a: 1}, {a: 2}, {a: 3}, {b: 4}])
    // console.log(`Inserted documents => ${insertResult}`)
    
    // const deleteMany = await collection.deleteMany({b: {$lte: 5}})
    // console.log(`deleted ${deleteMany}`)
    const findResult = await collection.find({}).toArray();
    // findResult.forEach(element => {
    //     console.log(element)
    // });
    console.log(`Found:`, findResult)
    const findFilter = await collection.find({ a: 3 }).toArray();
    console.log('Found documents =>', findFilter);
    const update = await db2collectino.updateOne({name: 'Inyang'},{$set: {name: 'Iberedem Inyang'}})
    console.log('update:', update.result)
    return 'done creating database and collection `documents`'
}

main()
.then(console.log('Doing then block'))
.catch(console.error)
.finally(() => client.close(()=> console.log('Connection Closed')))