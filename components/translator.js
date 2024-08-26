const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

const preserveCase = (matched, replacement) => {
  if (matched[0] === matched[0].toUpperCase()) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  } else {
    return replacement;
  }
};

const flipObject = (obj) => {
  const flipped = {};
  for (const [key, value] of Object.entries(obj)) {
    flipped[value] = key;
  }
  return flipped;
};

// const replaceOnce = (string, regex, replacementMap, word) => {
//     const oldWords = new Set();
//     const translatedWords = new Set();
//     return string.replace(regex, (matched) => {
//         if (oldWords.has(word)) {
//             return;
//         };
//         if (!translatedWords.has(matched.toLowerCase())) {
//             translatedWords.add(matched.toLowerCase());
//             oldWords.add(word)
//             const replacement = preserveCase(matched, replacementMap[matched.toLowerCase()]);
//             console.log(`Replacing ${matched} with ${replacement}`);
//             console.log("Replacement words:", translatedWords);
//             console.log("Old words", oldWords);
//             return replacement;
//         };
        
//         return matched;
//     })
// }

const britishToAmericanSpelling = flipObject(americanToBritishSpelling);
const britishToAmericanTitles = flipObject(americanToBritishTitles);

class Translator {
  americanToBritish(testString) {
    const replacedWords = new Set();

    Object.keys(americanOnly).forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      testString = testString.replace(regex, (matched) => {
        if (!replacedWords.has(matched.toLowerCase())) {
          replacedWords.add(matched.toLowerCase());
          return preserveCase(matched, americanOnly[word]);
        }
        return matched;
      });
    });

    Object.keys(americanToBritishSpelling).forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      testString = testString.replace(regex, (matched) => {
        if (!replacedWords.has(matched.toLowerCase())) {
          replacedWords.add(matched.toLowerCase());
          return preserveCase(matched, americanToBritishSpelling[word]);
        }
        console.log("2nd test yes");
        return matched;
      });
    });

    Object.keys(americanToBritishTitles).forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      testString = testString.replace(regex, (matched) => {
        if (!replacedWords.has(matched.toLowerCase())) {
          replacedWords.add(matched.toLowerCase());
          return preserveCase(matched, americanToBritishTitles[word]);
        }
        return matched;
      });
    });

    return testString;
  }
  britishToAmerican(testString) {
    const replacedWords = new Set();

    const replaceOnce = (string, regex, replacementMap) => {
        return string.replace(regex, (matched) => {
          if (!replacedWords.has(matched.toLowerCase())) {
            replacedWords.add(matched.toLowerCase());
            const replacement = preserveCase(matched, replacementMap[matched.toLowerCase()]);
            console.log(`Replacing ${matched} with ${replacement}`);
            console.log("Replacement words:", replacedWords);
            return replacement;
          }
          return matched;
        });
      };

      const words = testString.split(/\b/);
      for (const word of words) {
        console.log("This is word:", word);
        
        
      }

    Object.keys(britishOnly).forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      testString = replaceOnce(testString, regex, britishOnly, word);
    //   testString = testString.replace(regex, (matched) => {
    //     if (!replacedWords.has(matched.toLowerCase())) {
    //       replacedWords.add(matched.toLowerCase());
    //       const replacement = preserveCase(matched, britishOnly[word]);
    //       console.log(`Replacing ${matched} with ${replacement}`);
    //       return replacement;
    //     };
    //     console.log(testString);
    //     return matched;
    //   });
    });

    Object.keys(britishToAmericanSpelling).forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      testString = replaceOnce(testString, regex, britishToAmericanSpelling);
    //   testString = testString.replace(regex, (matched) => {
    //     if (!replacedWords.has(matched.toLowerCase())) {
    //       replacedWords.add(matched.toLowerCase());
    //       const replacement = preserveCase(matched, britishToAmericanSpelling[word]);
    //       console.log(`Replacing ${matched} with ${replacement}`);
    //       return replacement;
    //     };
    //     console.log(testString);
    //     return matched;
    //   });
    });

    // Iterate over British to American titles
    Object.keys(britishToAmericanTitles).forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      testString = replaceOnce(testString, regex, britishToAmericanTitles);
    //   testString = testString.replace(regex, (matched) => {
    //     if (!replacedWords.has(matched.toLowerCase())) {
    //       replacedWords.add(matched.toLowerCase());
    //       const replacement = preserveCase(
    //         matched,
    //         britishToAmericanTitles[word]
    //       );
    //       console.log(`Replacing ${matched} with ${replacement}`);
    //       return replacement;
    //     };
    //     console.log(testString);
    //     return matched;
    //   });
    });

    console.log(testString);
    return testString;
    
  }
}

module.exports = Translator;

const translate = new Translator();

console.log(
  translate.americanToBritish("Mr. Blacktop Bangs energized extemporization")
);
console.log(translate.britishToAmerican("I had a bicky then went to the chippy."));

