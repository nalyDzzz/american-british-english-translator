"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;

    if (text === undefined || !locale) {
      return res.json({ error: "Required field(s) missing" });
    } else if (text === "") {
      return res.json({ error: "No text to translate" });
    } else if (
      locale !== "american-to-british" &&
      locale !== "british-to-american"
    ) {
      return res.json({ error: "Invalid value for locale field" });
    }

    let translation;
    if (locale === "american-to-british") {
      translation = translator.americanToBritish(text);
    }

    if (locale === "british-to-american") {
      translation = translator.britishToAmerican(text);
    }
    return res.json({
      text,
      translation:
        translation === text ? "Everything looks good to me!" : translation,
    });
  });
};