# Movie REST API
By using this api u can fetch movies from `http://www.omdbapi.com` and inesrt it to MongoDB, also u can put a comment for existing movies saved in database.

## Routes

### /
Route created for checking if everything is UP, cuz of deployment at heroku

### /movies
> GET to check all existing movies in the database

> POST to insert the movie to the database, post data should look like this:

```
{
    movie: <movie-title>
}
```
### /comments
> GET to check all existing comments in the database

> POST to insert the movie to the database, post data should look like this:
```
{
    comment: <comment-content>
    movie: <movie-title>        // movie need to exists in database
}

```
## How to use

### Docker
```
$ git clone https://github.com/xchmielu/moviesapi.git
$ cd moviesapi
$ docker build -t moviesapi . 
$ docker run -p <free-port>:3000  moviesapi
```

### Local
```
$ git clone https://github.com/xchmielu/moviesapi.git 
$ cd moviesapi
$ npm install 
```

## Tests
To run test use:
```
$ npm test
```

## Live
The live version of project: `https:// ...`