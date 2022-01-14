### Submission for MongoDB Atlashackathon
The main aim of this project is to fire an email to the user with an appropriate description when the time of the particular event (set by the user prior) is up.

### Working
1. The events are stored in **documents**. Each **event** has `keys`: **description**, **time**, **processed**, **emailId**.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1ru9vi013vbqrfa4bdod.png)

Index is used to make query process fast
`db. remindersList.createIndex({ processed: 1, date: 1 })`

2. The time (in `time` field) controls when the event will be fired. The **scheduled trigger type** is deployed which checks what event has been passed in regular intervals.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lymxcklp0hoqkq4jyizk.png)

3. The event occurrence, **email** is fired to email id (in `emailId` field) with description (in `description` field). For sending email, I am using 3rd party dependency `SendGrid`.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dmxh1zpfoa4241ncfux2.png)


4. After the event is processed, the `processed` field is set true, so that event is not fired again.
 `context.services.get("mongodb-atlas").db("reminders").collection("remindersList").updateOne({_id:id},{$set:{processed:true}})`


### Submission Category: 
**Choose Your Own Adventure**

### Atlas services used:
1. `Atlas Database`
2. `Realm Triggers`
3. `Realm Functions`

### Additional Resources / Info

- https://docs.mongodb.com/realm/tutorial/backend/#automatically-comment-on-github-issues
- https://docs.mongodb.com/realm/triggers/trigger-types/
- Send Grid Email API
