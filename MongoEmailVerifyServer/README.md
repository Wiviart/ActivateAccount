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

After sign up, an email will be send to user email with an activation link. Click on it to connect to index.html for verify.

```
# Verify account server uri
http://localhost:8000/api/account-activation
```