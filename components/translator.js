const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

const preserveCase = (string, regex, replacement) => {
  return string.replace(regex, (match) => {
    if (match[0] === replacement[0].toUpperCase()) {
      return highlight(replacement.charAt(0).toUpperCase() + replacement.slice(1));
    } else {
      return highlight(replacement);
    }
  });
};

const highlight = (word) => {
    return `<span class="highlight">${word}</span>`
}

class Translator {
  americanToBritish(testString) {
    let translatedString = testString.replace(/([01]?[0-9]|2[0-3]):[0-5][0-9]/g, (match) => {
        return highlight(match.replace(':', '.'));
    });

    for (const [american, british] of Object.entries(americanOnly)) {
      const regex = new RegExp(`\\b${american}\\b`, "gi");
      translatedString = preserveCase(translatedString, regex, british);
    }

    for (const [american, british] of Object.entries(
      americanToBritishSpelling
    )) {
      const regex = new RegExp(`\\b${american}\\b`, "gi");
      translatedString = preserveCase(translatedString, regex, british);
    }

    for (const [american, british] of Object.entries(americanToBritishTitles)) {
      const regex = new RegExp(`\\b${british}\\.`, "gi");
      translatedString = preserveCase(translatedString, regex, british);
    }
    return translatedString;
  }
  britishToAmerican(testString) {
    let translatedString = testString.replace(/([01]?[0-9]|2[0-3]).[0-5][0-9]/g, (match) => {
        return highlight(match.replace('.', ':'));
    });

    for (const [british, american] of Object.entries(britishOnly)) {
      const regex = new RegExp(`(?<!\-)\\b${british}\\b`, "gi");
      translatedString = preserveCase(translatedString, regex, american);
    }

    for (const [american, british] of Object.entries(
      americanToBritishSpelling
    )) {
      const regex = new RegExp(`\\b${british}\\b`, "gi");
      translatedString = preserveCase(translatedString, regex, american);
    }

    for (const [american, british] of Object.entries(americanToBritishTitles)) {
      const regex = new RegExp(`\\b${british}\\b`, "gi");
      translatedString = preserveCase(translatedString, regex, american);
    }
    return translatedString;
  }
}

module.exports = Translator;
