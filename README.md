# **yapic**
## POSTS PHOTOS & MEETING PEOPLE

## Description

**yapic** is a photo sharing community which helps users to connect each other based on the type of photo taken (tags) and their similar interests (shortlist). When users start to upload photos and make a collection they will see a section with their stuff and another one with their matches. Then they will have the possibility to see their user match profiles and get in touch through a form (sender username and email is shared in submit).

## User Stories

- **Error 4xx**- As a user, I want to see a clear error page when it doesn't exist/has restricted access so that I know I probably make a mistake.
- **Error 5xx** -  As a user, I want to see a clear error page when problems are generated by the server so that I know that is not my fault.
- **index/home** - As a user, I want to seamless access the index/home so that I know I'm the right place to begin the flow.
- **signup** - As a user, I want to signup in a secure and easy way on the webpage so that I can start using the app.
- **login** - As a user, I want to be able to login on the webpage so that I can see my personal account.
- **logout** - As a user, I want to be able to logout from the webpage so that I can make sure no one will access my personal account.
- **edit profile** - As a user, I want to be able to edit my profile so that I can modify my personal data.
- **create post** - As a user, I want to create and share posts through pics in an easy way so that I have a personal collection and stay in touch with similar profiles
- **profile of match** - As a user, I want to connect with other similar profiles with accurate interests so that I can find out new people.
- **contact match** - As a user, I want to reach easy and quick the profiles of my interests so that I can increase my network and meet new people.

## Server Routes/Views:

|**Method**    |    **View**           |    **Route**     |   **Description**       |          **Request - Body**                     |
|--------------|-------------------|------------------------|-----------------------------------|---------------------|
|`GET`         |   `index` or `home`            |      `/`               | Main page route for `ìndex` or `home` view. If logged redirect to `/home/user/:userid`  |   {req.session.userID} |
|`GET`         | `signup`            |    `/signup`           | Render `signup`form view          |                     |
|`POST`        |  `home`           |    `/signup`           | Send signup data to server and creates an user in DB. Then redirect to `/home/:userId`                                   |          {username, email, password}           |
|`GET`         |  `login`           |      `/login`          | Render `login`form view           |                     |
|`POST`        |   `home`          |      `/login`          | Send login data to server and redirect to `home`     | {email, password}            |
|`GET`         |   `home`          |      `/home/:userId`           | Render `home`view with personalization and potential profile matches                | {req.session.userID}    |
|`GET`        |    `home`         |      `/post/new`     | Render `post-creation`view  |  |
|`POST`        |    `post-creation`         |      `/post/new`     | Sends ObjID of the post that user do (upload photo with all fields). Then redirect `/home/user/:userId`   | {req.session.userID, req.file.path} |
|`GET`        |     `match-profile`          |      `/match/:matchId`    | Render `match`view   | {req.session.matchID} |
|`POST`        |     `match-profile`          |      `/match/:matchId`    | Render modal for contact match   |  |
|`GET`         |     `profile`        |      `/profile/:userId`        | Render `profile`view             | {req.session.userID                    |
|`POST`        |    `profile`         |      `/profile/:user:id` | Send the data updated by the user to the DB. Then render `profile`view  | {req.session.userID, name, age, genre, interests, country, req.file.path}  |
|`GET`        |    `home`         |      `/profile/:userId` | Render `home`view  |   |

### Backlog
| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/inbox` | Render inbox messages|

## Models

### User

```javascript
{
username: String
password: String
email: String
age: String
genre: [Strings]
country: String
interests: [Strings]
userPhotoUrl: String
posts: ObjectId 
}
```
### Post

```javascript
{
postPhotoUrl: String
owner: ObjectId 
title: String
description: String
tags: [Strings]
date: Date
}
```
## Links

### Deployment
<a href="https://albertevieites-yapic.herokuapp.com/">
  <img height="30" src="./public/images/heroku.svg"/>
</a>

### Contributor

Alberte Vieites  

<div style="display: flex; gap: 0.5rem">
<a href="https://www.linkedin.com/in/albertevieites/">
  <img height="30" src="./public/images/linkedin.svg"/>
</a>

<a href="https://github.com/albertevieites">
  <img height="30" src="./public/images/github.svg"/>
</a>
</div>