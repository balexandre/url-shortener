# How To Build A URL Shortener With Node.js, Express, and MongoDB

As seen on [Youtube](https://www.youtube.com/watch?v=SLpUKAGnm-g)

## MongoDB on your DevMachine with Docker

if you have Docker installed, simply run 

```bash
docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:latest
```

_*you might need to pre-append `sudo` if in a *nix machine_

This command will:

- pull `mongo:latest` image
- redirect ports 27017 to 17019 to your host with the same ports (make sure nothing is using such ports, like a physical instance of MongoDB)
- name the container as `mongodb`
- run as in the background (detached mode) so you can easily connect to it

To start/stop the container, simply run `docker start mongodb` or `docker stop mongodb`

Warning: as we've not specified a data volume, every time you restart your machine the database will be empty

# Run and deploy with Docker

as Heroku lost the [ability to have a MongoDB for free](https://devcenter.heroku.com/changelog-items/1823), I choose to [containerize the entire solution](https://devcenter.heroku.com/articles/local-development-with-docker-compose); the `docker-compose.yml` has a simple setup that makes this web application run together with the MongoDB image

just build and started with

```bash
docker-compose build
docker-compose up
```

you will have both images running locally at http://localhost:8080

## Deploy docker-compose to Heroku

it's pretty simple, all you need is to have Heroku CLI installed and do: 

- `heroku login` to login into your account
- `heroku container:login` to login into the registry
- `heroku container:push web` to push the image to the registry
- `heroku container:release web` to deploy the image

# Available on Heroku

the API is available on [Heroku](https://heroku.com) as https://ba-url-shortener.herokuapp.com/ (it is running on a free server, so it will sleep if no traffic for the last 30min)
