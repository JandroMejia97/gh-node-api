# GitHub Node API
This API was built in NodeJS to consume the GitHub API to search for users by their username. It is public and open to any site that wants to consume it.

## Contents

- [Using Docker](#using-docker)
- [Using Docker Compose](#using-docker-compose)
- [Using Node](#using-node)

## Using Docker

### Requirements
- Docker

### Running the project

1. First, you need to create a `.env` file in the root of the project. You can use the `.env.template` file as a template.

    > Remember to save the SERVER_PORT variable with the port you want to use.

2. Then, you need to build the Docker image. Runing the following command in the root of the project.
    ```bash
    # For development
    docker build . -t <IMAGE NAME> --target development
    # For production
    docker build . -t <IMAGE NAME> --target production
    ```
    > `<IMAGE NAME>` is the name you want to give to the image.

3. Then, you need to run the following command to start the project:
    ```bash
    docker run -p <HOST PORT>:<SERVER_PORT> --name <CONTAINER NAME> --env-file .env <IMAGE NAME>
    ```
    Or if you want to detach the container from the terminal, you can run:
    ```bash
    docker run -p <HOST PORT>:<SERVER_PORT> -d --name <CONTAINER NAME> --env-file .env <IMAGE NAME>
    ```
    And then, you can stop the container with:
    ```bash
    docker stop <CONTAINER NAME>
    ```

    > Remember to replace the `<HOST PORT>` with the port you want to use in your machine and replace the `<SERVER_PORT>` with the port you saved in the `.env` file. Also, remember to replace the `<IMAGE NAME>` with the name you gave to the image and replace the `<CONTAINER NAME>` with the name you want to give to the container.
4. Now, you can access the API in the following URL: [http://localhost:HOSTPORT/docs](http://localhost:HOSTPORT/docs) and you can see the documentation of the API.

## Using Docker Compose

### Requirements
- Docker
- Docker Compose

### Running the project
If you want to run the project with Docker Compose, you can use the `docker-compose.yml` file. You need to follow the following steps:
1. First, you need to create a `.env` file in the root of the project. You can use the `.env.template` file as a template.
2. In the `.env` file, you need to save the SERVER_PORT variable with 3000 as value, this is the port that the container will use.
3. Then, you need to run the following command to start the project:
    ```bash
    # For development
    docker-compose up dev-api
    # For production
    docker-compose up prod-api
    ```
4. Now, you can access the API in the following URL: [http://localhost:3000/docs](http://localhost:3000/docs) and you can see the documentation of the API.

## Using Node
If you don't want to use Docker, you can use Node to run the project. You need to follow the following instructions before running the project.

### Requirements
- Node.js
- NPM

### Running the project
If you want to run the project with Node, you need to follow the following steps:

1. First, you need to create a `.env` file in the root of the project. You can use the `.env.template` file as a template.

    > Remember to save the SERVER_PORT variable with the port you want to use.

2. Then, you need to install the dependencies. Runing the following command in the root of the project.
    ```bash
    # For development
    npm install
    # For production
    npm ci --only=production
    ```

3. Then, you need to run the following command to start the project:
    ```bash
    # For development
    npm run dev
    # For production
    npm start
    ```

4. Now, you can access the API in the following URL: [http://localhost:HOSTPORT/docs](http://localhost:HOSTPORT/docs) and you can see the documentation of the API.