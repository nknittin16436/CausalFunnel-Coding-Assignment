
# Causal Assignment

Build the RestAPI for a BlogPost Application using NestJs and Sqlite3 as Databse using Typeorm.
You can reset your password by using forgot password endpoint and then you will receive a Email with reset password link and then you can change your password.



## Installation

```bash
$ npm install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`JWT_SECRET`

`COOKIE_EXPIRE`

`COOKIE_NAME`

`MYSQL_ROOT_PASSWORD`

`MYSQL_DATABASE`

`MYSQL_LOCAL_PORT`

`MYSQL_DOCKER_PORT`

`NODE_LOCAL_PORT`

`NODE_DOCKER_PORT`

`MAILER_HOST`

`MAILER_PORT`

`MAILER_EMAIL`

`MAILER_PASSWORD`


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# production mode
$ npm run start:prod
```




## API Reference

### SIGNUP or Create User

```http
  POST localhost:5000/signup
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. name |
| `email` | `string` | **Required**. email |
| `password` | `string` | **Required**. Password |
| `confirmPassword` | `string` | **Required**. confirmPassword |

## Login

```http
  POST localhost:5000/login
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. email |
| `password` | `string` | **Required**. Password |


## FORGOT PASSWORD

```http
  POST localhost:5000/forgot
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. email |
 
#####  user will then recieve a email for reseting the password
 

## RESET PASSWORD

```http
  POST http://localhost:5000/password/reset/{resetToken} (link recived in mail)
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `password` | `string` | **Required**. Password |
| `confirmPassword` | `string` | **Required**. confirmPassword |
 




 
##
##
### Get all blogs

```http
  GET localhost:5000/?page=1
```

| Query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `string` | **Required**. Page Number |

### Create a New Blog

```http
  POST localhost:5000/blogs
```

| body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Title of Blog |
| `description`      | `string` | **Required**. Description of Blog |


### Update a Blog
```http
  PATCH localhost:5000/blogs/{blogId}
```

| body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | Title of blog to be Updated |
| `description`      | `string` | Description of Blog |

### Delete a Blog
```http
  DELETE localhost:5000/blogs/{blogId}
```



