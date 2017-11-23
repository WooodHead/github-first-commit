# github-first-commit


![screenshot](screenshots/buttons.png)

<p>
  Github的Commits页面只有Newer和Older两个按钮，但我经常需要查看最早的几个commit，所以我做了这个Chrome扩展，用于给Commits页面添加FirstPage和LastPage按钮。
</p>
<p>
  这是一个谷歌Chrome浏览器的扩展，请在Chrome的扩展程序管理页面启用“开发者模式”，然后“载入已解压的扩展”。
</p>

<p>
Inspired by: <a href='http://first-commit.com/'>http://first-commit.com/</a>, <a href='https://news.ycombinator.com/item?id=10610065'>https://news.ycombinator.com/item?id=10610065</a>
</p>
<p>
See also: <a href='https://github.com/FarhadG/init'>https://github.com/FarhadG/init</a>
</p>

<p>TODO:
<ol>
<li>使FirstPage在第一页不可用，LastPage在最后一页不可用</li>
<li>修复Bug：Issues界面也会显示两个按钮</li>
</ol>
</p>


## Installation

	$ npm install

## Usage

Run `$ gulp --watch` and load the `dist`-directory into chrome.

## Entryfiles (bundles)

There are two kinds of entryfiles that create bundles.

1. All js-files in the root of the `./app/scripts` directory
2. All css-,scss- and less-files in the root of the `./app/styles` directory

## Tasks

### Build

    $ gulp


| Option         | Description                                                                                                                                           |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--watch`      | Starts a livereload server and watches all assets. <br>To reload the extension on change include `livereload.js` in your bundle.                      |
| `--production` | Minifies all assets                                                                                                                                   |
| `--verbose`    | Log additional data to the console.                                                                                                                   |
| `--vendor`     | Compile the extension for different vendors (chrome, firefox, opera, edge)  Default: chrome                                                                 |
| `--sourcemaps` | Force the creation of sourcemaps. Default: !production                                                                                                |


### pack

Zips your `dist` directory and saves it in the `packages` directory.

    $ gulp pack --vendor=firefox

### Version

Increments version number of `manifest.json` and `package.json`,
commits the change to git and adds a git tag.


    $ gulp patch      // => 0.0.X

or

    $ gulp feature    // => 0.X.0

or

    $ gulp release    // => X.0.0


## Globals

The build tool also defines a variable named `process.env.NODE_ENV` in your scripts. It will be set to `development` unless you use the `--production` option.


**Example:** `./app/background.js`

```javascript
if(process.env.NODE_ENV === 'development'){
  console.log('We are in development mode!');
}
```






