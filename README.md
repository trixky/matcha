# matcha

A small, minimalist online dating site.
You can find your soulmate according to your criteria (age, distance, gender etc...), you can chat with people who like you back, look at profiles who like you, who see your profile etc... __(docker-compose)__

> Unfortunately, the project is not finished for reasons of time.

![Recordit GIF](https://i.ibb.co/myjSLX2/ezgif-com-crop.gif)

# Mobile First

The site is designed in mobile first.

![Recordit GIF](https://i.ibb.co/d44xzj9/ezgif-com-crop-1.gif)

## Usage

```bash
sudo docker-compose -f docker-compose.build.yaml up
sudo docker-compose -f docker-compose.seed.yaml up --abort-on-container-exit
sudo docker-compose up
```

## Stack

- React.js
- Node.js / Express
- Socket.io
- PostgreSQL
