const express = require('express')
const bodyParser = require('body-parser')
const {MongoClient} = require('mongodb');

const mongodb = require('./mongodb')  
const mailUtil = require('./mailing_utils')  

// const books = [{
		
// 		bookID: "1",
// 		bookName: "Rudest Book Ever",
// 		bookAuthor: "Shwetabh Gangwar",
// 		bookState: "Available"
// 	},
// 	{
// 		bookID: "2",
// 		bookName: "Do Epic Shit",
// 		bookAuthor: "Ankur Wariko",
// 		bookState: "Available"
// 	}
// ]

async function main(){

	const uri = "mongodb+srv://deehan:deehan1997@cluster0.7jxxgwk.mongodb.net/?retryWrites=true&w=majority";
 

    const client = new MongoClient(uri);

	
		await client.connect();

		const users =await mongodb.findAllUsers(client);
		
		if (users.length > 0) {
			console.log(`app Found all users in the collection`);

			const app = express()

			app.set('view engine', 'ejs')

			app.use(bodyParser.json());
			app.use(bodyParser.urlencoded({
				extended: true
			}))

			app.get("/", function (req, res) {
				users.forEach(user => {
					const subject = "This is the subject"
					const text = "Assalamu Alaikum"
					mailUtil.send_mail("deehanchowdhury@gmail.com","ddltdtngqoehhrjz","gmail",user.username,subject,text)
				});

				// const myname = "deehanchowdhury@gmail.com"
				// const subject = "This is the subject"
				// const text = "Assalamu Alaikum"
				// mailUtil.send_mail("deehanchowdhury@gmail.com","ddltdtngqoehhrjz","gmail",myname,subject,text)

			})

			app.listen(3000, (req, res) => {
				console.log("App is running on port 3000")
			})

		} else {
			console.log(`app No listings found`);
		}

}


main()



