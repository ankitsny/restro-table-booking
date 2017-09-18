# Table Booking
----------
> Software required
1. Nodejs **(Version 8.0 or greater)** [Download](https://nodejs.org/en/download/)
2. MongoDB [Download](https://www.mongodb.com/download-center?jmp=nav#atlas)


> Clone Repo
- `git clone https://github.com/anks333/restro-table-booking.git`


> To run the server, follow the steps
1. Move to the root directory, `cd restro-table-booking`
2. Install node_modules `npm install`
3. Start mongoDB Server type `mongod` in terminal, skip this step if mongod service is already running. 
4. Then type `npm start` and hit enter 


> MongoDB Indexes

*NOTE:* Text index is created in db Schema, if index does not created after running the app then create it manually 
- Text index has been used for search, to create index open mongo shell by typing `mongo [myapp]` in the terminal  
```javascript
db.restaurants.ensureIndex(
  {
    name: 'text',
    cusines: 'text',
    'address.city': 'text',
    'address.zipCode': 'text',
    'address.country': 'text'
  }
)
```
