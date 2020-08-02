# matcha

A small, minimalist online dating site.
You can find your soulmate according to your criteria (age, distance, gender etc...), you can chat with people who like you back, look at profiles who like you, who see your profile etc... __(docker-compose)__

![Recordit GIF](https://i.ibb.co/tMB0YJn/ezgif-com-gif-maker-1.gif)

## Mobile First

The site is designed in mobile first.

![Recordit GIF](https://i.ibb.co/Lk9NMbr/ezgif-com-gif-maker.gif)

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
