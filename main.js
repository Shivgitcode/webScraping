import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import { appendFile } from "node:fs";

// const pupet=require("puppeteer")
async function getData() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://www.dominos.co.in/");
  await page.setViewport({ width: 1080, height: 1024 });
  let source = await page.content();

  const $ = cheerio.load(source);
  const coupons = $(".offers-slider").children("img");
  const values = Object.keys(coupons);
  const newValues = values.filter((el) => {
    if (el.length <= 1) {
      return el;
    }
  });
  let myImages = {};
  for (let images of newValues) {
    myImages[`${images}`] = coupons[images].attribs.src;
    console.log(coupons[images].attribs.src);
  }

  appendFile("./web/data.js", `${JSON.stringify(myImages)}`, (err) => {
    if (err) throw err;
    console.log("oops");
  });
  console.log(myImages);
  // console.log(newValues);
  // console.log(values);

  // const images = $("#top-header").text().split(" ");
  // // const links = images.attr();
  // // console.log(links);
  // const newNav = images.filter((el) => {
  //   if (el.length > 2) {
  //     return el;
  //   }
  // });
  // const newNav2 = newNav.map((el) => {
  //   if (el.includes("\n")) {
  //     let index = el.indexOf("\n");
  //     return el.substring(0, index);
  //   } else {
  //     return el;
  //   }

  //   // console.log(el.substring(0, index));
  // });

  // const newNav2 = newNav.filter((el) => {
  //   if (el.includes("\n")) {
  //     return el.substring(0, el.indexOf("\n"));
  //   }
  // });

  // console.log(newNav);
  // console.log(newNav2);

  browser.close();
}
getData();

// const data = cheerio.load(buffer);
// console.log(data.html());
// getData();
