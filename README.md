# Getting started

This sample application is built in NodeJs + Typescript on server side and React+TypeScript on client.
I tried to take advantange of the Hook in latest react release.
Didn't use Redux as it's a little bit overkill for this simple case.
Didn't use Databse on server, just save the data in local storage as JSON files.

Feel free to use for learning purpose.

- Server NodeJs:
open terminal window,
go server folder,

npm install
npm start

for test and coverage:
npm run test

- Client React App:

open another terminal tab
go client folder

npm install
npm start

for test and coverage:
npm run test

http://localhost:3000/?listid=1

change listid for different item list,
will create new list first

- Env:
developed and tested on:
node v10.16.0
npm  6.11.3 


- TODO for real world application:
due to the time limit, I skip some parts which are supposed to be handled in real world application:
1. use Database for data storage and Redis for cache.
2. OAS / RAML for API documentation.
3. e2e tests
4. dockerfile
5. more test coverage.
