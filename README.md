First check the `./db` directory. If the sampledata file is zipped, unzip it so
that you have `./db/sampledata.sql`.
Next, to start the demo, run `docker-compose up`.
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

Feel free to access the data directly in Postgres
(postgresql://postgres:postgres@postgres:5433/postgres) or through the Hasura
GraphQL API. You can access the Hasura Console by installing the Hasura CLI
locally and running `hasura console` in the `./hasura` subdirectory.
