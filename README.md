# MyPersonalSpace
A Simple Web application written in full stack M.E.R.N architecture.

An experimental project while learning the MERN stack.

## What is inside?
* Json Web Token (Access and refresh token)
* RESTful API?
* Authentication
* Error handling

## Json Web Token
An open standard used to create tokens for an application. It allows a payload to be stored on the token itself.

### How it works
Normal case:
1. User logs in.
2. User recieves an Access token and an Refresh token.
3. User uses Access token to retrieve resources.
4. Server verifies Access token.
5. Server responses with requested resource.

If access token expires:  
3. User uses Access token to retrieve resource.
4. Server verifies Access token. (Access token expired)
5. Server verifies Refresh token. (Refresh token not expired)
6. Server renews Access token and Refresh token and sends to user.
7. User uses renewed Access token to retrieve resource.
8. Server verifies Access token.
9. Server responses with requested resource.

If refresh token expires:
5. Server verifies Refresh token. (Refresh token expired)
6. User required to re-authenticate. (Login)
7. Back to normal case.

## Disclaimer
The source code might not be clean, efficient or logically correct.
