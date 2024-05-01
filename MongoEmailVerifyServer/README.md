First step is create a .env file with follow:
```
PORT=8000
DATABASE=<mongodb connect csv>

JWT_ACCOUNT_ACTIVATION=accountactivation12345
clientUrl=<url>

smtpAddress = smtp.gmail.com
portNumber = 587
senderEmail = <email>
password = <password>
```

Build docker image
```
docker build -t <image name> .
```
Run docker container
```
docker run --rm -ti -p 8000:8000 --name <container name>  <image name>
```

Using Postman to connect to server
```
# Sign up new account server uri
http://localhost:8000/api/signup
```
with Body is:
```
{
    "name":"",
    "email":"",
    "password":""
}
```
After sign up, an email will be send to user email with an activation link. Click on it to connect to index.html for verify.
Or use Postman to active:

```
# Verify account server uri
http://localhost:8000/api/account-activation
```
with Body is link in email:
```
{
    "token":""
}
```
