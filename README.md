# matcha

A small, minimalist online dating site.
You can find your soulmate according to your criteria (age, distance, gender etc...), you can chat with people who like you back, look at profiles who like you, who see your profile etc... __(docker-compose)__

![Recordit GIF](https://github.com/trixky/matcha/blob/master/.demo/demo.gif?raw=true)

## Mobile First

The site is designed in mobile first.

![Recordit GIF](https://github.com/trixky/matcha/blob/master/.demo/demo-mobile.gif?raw=true)

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
