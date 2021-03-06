
<div align="center">

<h1>@threejs-weather</h1>

[![npm](https://img.shields.io/npm/v/threejs-weather.svg?style=flat-square)](https://www.npmjs.org/package/threejs-weather) [![npm](https://img.shields.io/npm/dm/threejs-weather.svg?style=flat-square)](https://www.npmjs.org/package/threejs-weather) [![npm](https://img.shields.io/npm/l/threejs-weather.svg?style=flat-square)](https://www.npmjs.org/package/threejs-weather)

[📝](/docs/README.md) / [✨](https://threejs-weather.now.sh)

</div>

[![ctx-threejs-weather](https://user-images.githubusercontent.com/6839576/84586116-11a39400-ae49-11ea-9333-0833ffc9afcf.png)](https://chrome.google.com/webstore/detail/%E5%B0%8F%E5%B7%9D/gckdnedgcldldbdajllnmbmfhacalini)

## install

`npm install threejs-weather three react-three-fiber`

## demos and documents

docs can be found [here](/docs/README.md) 

<div align="center">

<a href="https://threejs-weather.now.sh/#/prod/rain"><img src='https://user-images.githubusercontent.com/6839576/83318117-40741480-a264-11ea-9f28-e4e4b55326dd.gif' width='200' /></a><a href="https://threejs-weather.now.sh/#/prod/snow"><img src='https://user-images.githubusercontent.com/6839576/82968936-f7705600-a000-11ea-89ba-b33ed5d7bc77.gif' width='200' /></a>
<a href="https://threejs-weather.now.sh/#/prod/cloudy"><img src='https://user-images.githubusercontent.com/6839576/83318092-191d4780-a264-11ea-9095-29d5ff180247.gif' width='200' /></a><a href="https://threejs-weather.now.sh/#/prod/meteors"><img src='https://user-images.githubusercontent.com/6839576/82881928-ed077b00-9f72-11ea-80c8-788bdbe7d38c.gif' width='200' /></a>
<a href="https://threejs-weather.now.sh/#/prod/star-rings"><img src='https://user-images.githubusercontent.com/6839576/82881937-f0026b80-9f72-11ea-9cf2-fe2dd3f06937.gif' width='200' /></a><a href="https://threejs-weather.now.sh/#/prod/sun"><img src='https://user-images.githubusercontent.com/6839576/82881946-f2fd5c00-9f72-11ea-8083-69b4dabd71d5.gif' width='200' /></a>
<a href="https://threejs-weather.now.sh/#/prod/partly-cloudy"><img src='https://user-images.githubusercontent.com/6839576/84014733-652b6300-a9ad-11ea-827e-5e1cee4f7e9b.gif' width='200' /></a>

</div>

## todo

- [ ] 萤火虫
- [ ] 水波纹
- [x] 雾霾
- [x] online-demo
- [x] 光环
- [x] 云
- [x] 流星

## develope

> **⚠️ WARNING**  
it's hard to develope component mode

```console
yarn remove react
```

1. write `code` in root `components` fold
2. `npm run build:dev` in root
3. goto `example`
4. `import component from @/components/lib` in `example`
5. `yarn run dev`

**before depoly example**

```console
yarn add react@16.3.1
```
