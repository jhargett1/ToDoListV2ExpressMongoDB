# ToDo List App 

A simple ToDo list web app built with Node.js, Express, MongoDB and EJS templates.

![ToDoListAppV2](https://github.com/jhargett1/ToDoListV2ExpressMongoDB/assets/119984652/05c67452-1ef5-41a1-926b-5c1f6b256093)


## Usage

To use the app:

1. Add your MongoDB connection string to `.env` as `CONNECTION_MONGO` 

2. Install dependencies:

```
npm install
```

3. Start the app:  

```
npm start
```

4. Navigate to `http://localhost:3030`

The home page will show the "Today" list with default items. 

- To add a new item, fill out the form at the bottom 
- To delete an item, check the box next to it and submit
- To create a custom list, add `/listname` to the URL
- New lists will be saved in MongoDB

## Code Overview

- `app.js` - Main app code with Mongoose models and Express routes
- `list.ejs` - Template that renders the todo list
  - Uses EJS template tags to output the list data
  - Forms to add/delete items submit to Express routes
  
- Models:

  - `Item` - Schema for individual todo items
  - `List` - Schema for list document containing items
  
- Routes:

  - `GET /` - Gets "Today" list
  - `GET /:customListName` - Dynamic route to get custom list
  - `POST /` - Create new item
  - `POST /delete` - Delete checked item
  
## Deployment

- The app can be deployed to any Node.js hosting platform
- Make sure to add `CONNECTION_MONGO` environment variable

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Built With

- Node.js
- Express
- MongoDB
- Mongoose
- EJS
- Lodash
