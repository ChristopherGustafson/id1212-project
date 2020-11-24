# Backend

## Getting started

### Connecting with MySQL database

Since this application makes use of a MySQL database to persist data, such as user information and session storage, you'll need to create an active MySQL database.

To connect this application to the database, first copy the example development properties to a real properties file:

```bash
cp src/main/resources/application-dev.properties.example src/main/resources/application-dev.properties
```

Fill in the newly created `application-dev.properties` file with the database url (usually `jdbc:mysql://${MYSQL_HOST:localhost}:3306/<DATABASE_NAME>`), database user and password.
