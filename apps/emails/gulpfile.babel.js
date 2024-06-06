"use strict";

import gulp from "gulp";
import log from "fancy-log";
import mail from "gulp-mail";
import fs from "fs";
import mjml from "gulp-mjml";
import browserSync from "browser-sync";
import del from "del";
import htmlmin from "gulp-htmlmin";
import replace from "gulp-string-replace";
import "dotenv/config";

import datas from "./src/assets/js/datas.js";
import { emailList } from "./src/assets/js/emailList.js";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const smtpInfo = {
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  host: process.env.SMTP_HOST,
  secureConnection: true,
  port: process.env.SMTP_PORT,
};

// Simple config: just set up paths for everything
const basePaths = {
  src: "./src/",
  contents: "./src/contents/",
  includes: "./src/includes/",
  dist: "./dist/",
};

const paths = {
  html: {
    src: basePaths.contents + "*.mjml",
  },
};

//
// `sendMail` function:
// Send an email using the `gulp-mail` plugin
//
const sendMail = () => {
  const error_not_current =
    "Attention vous devez préciser la variable TO_SEND_EMAIL dans le fichier .env pour exécuter cette commande";
  if (!process.env.TO_SEND_EMAIL) {
    log.error(error_not_current);
    return;
  }
  const mjmlFilePath = `${basePaths.contents}${process.env.TO_SEND_EMAIL}.mjml`;
  const modifiedFilePath = `${basePaths.dist}test/${process.env.TO_SEND_EMAIL}.html`;

  // Vérifie si le fichier MJML existe
  if (!fs.existsSync(mjmlFilePath)) {
    log.error("Le fichier MJML spécifié n'existe pas !");
    return;
  }

  // Transformation du fichier MJML en HTML
  return gulp
    .src(mjmlFilePath)
    .pipe(mjml())
    .on("error", console.error) // Affiche les erreurs de transformation MJML
    .on("data", (file) => {
      let modifiedContent = file.contents.toString();

      // Remplacement du contenu
      datas.forEach((replacePair) => {
        const regex = new RegExp(`{{${replacePair.key}}}`, "g");
        modifiedContent = modifiedContent.replace(regex, replacePair.value);
      });
      fs.writeFileSync(modifiedFilePath, modifiedContent);
      gulp.src(modifiedFilePath).pipe(
        mail({
          subject: "Test email",
          to: ["ddolmazon@openstudio.fr"],
          from: "Foo <foo@163.com>",
          smtp: smtpInfo,
        })
      );
    });
};

//
// `pushEmails` function:
// Push the emails to the S3 tebi bucket
//
const pushEmails = (done) => {
  // Configuration
  const credentials = {
    accessKeyId: process.env.TEBI_EMAIL_KEY,
    secretAccessKey: process.env.TEBI_EMAIL_SECRET,
  };

  const bucketName = "aspemails";

  // Créer un client S3
  const s3Client = new S3Client({
    endpoint: "https://s3.tebi.io",
    credentials: credentials,
    region: "global",
  });

  emailList.forEach((email) => {
    const filePath = `${basePaths.dist}${email.template}.html`;

    // Création d'un flux de lecture pour le fichier HTML
    const fileStream = fs.createReadStream(filePath);

    s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: `${email.template}.html`,
        Body: fileStream,
      })
    );
  });
  done();
};

//
// `generateHtml` function:
// Transform the MJML files using `gulp-mjml` into HTML files
// Waiting for the process to be `done` before reloading the browsers
//
const generateHtml = (done) => {
  gulp
    .src(paths.html.src)
    .pipe(mjml())
    .pipe(replace("../assets/img", "https://s3.tebi.io/aspemails/assets/img"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(basePaths.dist));
  browserSync.reload();
  done();
};

//
// `index` function:
//
const index = (done) => {
  gulp.src(`${basePaths.src}index.html`).pipe(gulp.dest(basePaths.dist));
  gulp
    .src(`${basePaths.src}assets/css/index.css`)
    .pipe(gulp.dest(`${basePaths.dist}assets/css/`));
  gulp
    .src(`${basePaths.src}assets/js/emailList.js`)
    .pipe(gulp.dest(`${basePaths.dist}assets/js/`));
  done();
};

//
// `watch` function:
// Start a BrowserSync server on the `dist` folder which will listen
// to the changes on html & images generated
//
export const watch = () => {
  // 1. Générer les fichiers HTML de base
  generateHtml(() => {
    index(() => {
      // 2. Initialiser BrowserSync
      browserSync.init({
        server: basePaths.dist,
        port: 3010,
        // Configuration pour le rafraîchissement automatique
        reloadOnRestart: true,
        notify: false, // Désactive les notifications dans le navigateur
        files: [basePaths.dist + "**/*"], // Surveille tous les fichiers dans le dossier dist pour les changements
      });

      // 3. Surveiller les modifications dans les fichiers source
      gulp.watch(basePaths.contents, generateHtml);
      gulp.watch(basePaths.includes, generateHtml);
      gulp.watch(basePaths.src + "index.html", index);
    });
  });
};

// Simple clean task, deleting the `dist` folder
gulp.task("clean", () => del([basePaths.dist]));

// Default task: clean `dist/` folder & then run generateHtml
gulp.task("default", gulp.series("clean", generateHtml));

// Watch task: refering to the `watch` function - see above
gulp.task("watch", watch);

gulp.task("mail", sendMail);

gulp.task("push",  pushEmails);
