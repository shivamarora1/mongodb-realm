exports = function() {
  /*
    A Scheduled Trigger will always call a function without arguments.
    Documentation on Triggers: https://docs.mongodb.com/realm/triggers/overview/

    Functions run by Triggers are run as System users and have full access to Services, Functions, and MongoDB Data.

    Access a mongodb service:
    const collection = context.services.get(<SERVICE_NAME>).db("<DB_NAME>").collection("<COLL_NAME>");
    const doc = collection.findOne({ name: "mongodb" });

    Note: In Atlas Triggers, the service name is defaulted to the cluster name.

    Call other named functions if they are defined in your application:
    const result = context.functions.execute("function_name", arg1, arg2);

    Access the default http client and execute a GET request:
    const response = context.http.get({ url: <URL> })

    Learn more about http client here: https://docs.mongodb.com/realm/functions/context/#context-http
  */
  let dateStr = new Date();

  let apiKey =context.values.get("SEND_GRID_API_KEY");
  
  const collection = context.services.get("mongodb-atlas").db("reminders").collection("remindersList");
  const rows = collection.find({processed:false,date:{$lt:dateStr.toISOString()}}).toArray();

  for (let i in rows){
    let row = rows[i];

    let desc = row["description"];
    let email = row["emailId"];
    let id = row["_id"];
    

    let apiKey =context.values.get("SEND_GRID_API_KEY");
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(apiKey)
    const msg = {
      to: email,
      from: 'support@diamondharbour.com',
      subject: 'Hi, You got a reminder',
      text: desc,
    }
    sgMail.send(msg)
    
    collection.updateOne({_id:id},{$set:{processed:true}})
  }
};
