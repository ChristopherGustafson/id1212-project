# Backend

## Getting started

### Connecting with Postgres database

Since this application makes use of a Postgres database to persist data, such as user information and session storage, you'll need to create an active Postgres database.

To connect this application to the database, first copy the example development properties to a real properties file:

```bash
cp src/main/resources/application-dev.properties.example src/main/resources/application-dev.properties
```

Fill in the newly created `application-dev.properties` file with the database url (usually `jdbc:postgresql://localhost:5432/<DATABASE_NAME>`), database user and password.
