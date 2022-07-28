#!/usr/bin/node
const models = require('../src/db')

const users = [
    { 'username': 'user1', 'password': 'password1' },
    { 'username': 'user2', 'password': 'password2' },
    { 'username': 'user3', 'password': 'password3' },
]

for (let user of users) {
    console.log("Ctrl + c : to exit")
    console.log(user)
    models.User.create(user, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Created user To database Name: " + result.username + "password :" + result.password + " (id: " + result._id + " )");
        }
    })
}
