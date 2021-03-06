const { ObjectId } = require('mongodb')

const { User } = require('../../models/users')
const createAuthToken = require('../../middleware/createAuthToken')

const users = [{
  _id: new ObjectId(),
  email: 'user0@example.com', // always saved to database
  password: 'Pass01234!',
  isAdmin: true 
}, {
  _id: new ObjectId(),
  email: 'user1@example.com', // always saved to database
  password: 'Pass11234!' 
}, {
  _id: new ObjectId(),
  email: 'user2@example.com', // valid data
  password: 'Pass21234!' 
}, {
  _id: new ObjectId(),
  email: 'user3!example.com', // invalid email
  password: 'Pass31234!' 
}, {
  _id: new ObjectId(),
  email: 'user4@example.com',
  password: 'pass41234' // invalid password
}]

const populateUsers = async () => {
  // delete users
  await User.deleteMany()

  // create and save users
  const user0 = new User(users[0]).save()
  const user1 = new User(users[1]).save()

  return Promise.all([user0, user1])
}

const tokens = []

createAuthToken(users[0])
  .then((token) => tokens.push(token))

createAuthToken(users[1])
  .then((token) => tokens.push(token))

module.exports = {
  users,
  populateUsers,
  tokens
}