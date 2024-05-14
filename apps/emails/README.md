# `emails`

> TODO: description

## This starter uses these tools :

- [MJML](https://mjml.io/) 4 processor for gulp (gulp-mjml),
- **BrowserSync** server for assets injections & automatic reload on changes,
- **Imagemin** for _lossless_ images compression with :
  - **gifsicle** — Compress GIF images
  - **jpegtran** — Compress JPEG images
  - **optipng** — Compress PNG images
  - **svgo** — Compress SVG images
- **MJML** starter template.

### Requirements

- [NodeJS](https://nodejs.org/en/) (6 or greater)
- [Gulp](https://gulpjs.com/)

## Usage

Finally, run `yarn dev` to run Gulp & BrowserSync for development. Everything you will do will be created in a folder called `dist`.

```bash
$ yarn dev
```

Local development URL :

```bash
http://localhost:3000
```

### Ready for production

When you are done building everything and you want to make a clean build for production, use the command line tool again and type `yarn build` :

```bash
$ yarn build
```

This will first delete your existing `build/` folder, then process everything and send it into your `build/` folder again. This is useful if you used different assets while developing and deleted some of them in your `src/` folder (what you delete in this folder will still exist in the `build/` folder.
