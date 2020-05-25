const {readFile, appendFile} = require('fs');
const path = require('path');

const usersPath = path.join(process.cwd(), 'users.txt');


class User {
    saveUser(user) {
            let jsonUser = JSON.stringify(user);

            return new Promise((resolve, reject) => {
                appendFile(usersPath, `\n${jsonUser}`, (err) => {
                    if (err) reject('Cant write user');

                    resolve();
                })
            })
        }

    getAllUsers() {
        let users = [];

        return new Promise((resolve, reject) => {
            readFile(usersPath, (err, jsonUsers) => {
                if (err) reject('Cant read file');

                let jsonArray = jsonUsers.toString().split('\n');

                jsonArray.forEach(jsonUser => {
                    if (!jsonUser) return;
                    users.push(JSON.parse(jsonUser))
                });
                console.log(users);
                resolve(users);
            })
        })
    }
}

module.exports = new User;
