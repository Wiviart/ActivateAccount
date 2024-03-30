Build docker image
```
docker build -t <image name> .
```
Run docker container
```
docker run --rm -ti -p 8000:8000 --name <container name>  <image name>
```