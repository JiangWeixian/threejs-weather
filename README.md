# @aiou/react-template
> spa react template

[![npm](https://img.shields.io/npm/v/@aiou/react-template?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/core) [![GitHub](https://img.shields.io/github/license/jiangweixian/templates?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/react-template)

- [@aiou/react-template](#aioureact-template)
  - [features](#features)
  - [dependencies](#dependencies)
  - [dev](#dev)
  - [refs](#refs)

## features

1. use webpack
2. support ts
3. `<link />` 会加上`preload`
4. 在移动端可以通过`http:<ip>:port`方式访问
5. hot-loader

## dependencies


* typescript
* css
  * stylus
  * post-css
  * rucksack - useful postcss mixins
  * rupture - useful media query
* react
* react-hot-loader
* rematch
* swr

## dev

*  custom
   * `prepublishOnly script`
   * package name
   * version 
* vscode
  * install `tslint` and `stylint` first
* chrome
  * devtools

## refs

- [如何让webpack-devserver开启移动端的访问](https://stackoverflow.com/questions/35412137/how-to-get-access-to-webpack-dev-server-from-devices-in-local-network)