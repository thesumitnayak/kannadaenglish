import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

const vocab = [
  v("enu-ide", "ಏನು ಇದೆ?", "Enu ide?", "What's available?", "क्या-क्या है?", { pos: "phrase", tags: ["food"],
    example: ex("ತಿಂಡಿಗೆ ಏನು ಇದೆ?", "Tindige enu ide?", "What's there for breakfast?", "नाश्ते में क्या है?") }),
  v("plate", "ಪ್ಲೇಟ್", "Plate", "Plate (a serving)", "प्लेट", { pos: "noun", tags: ["food"],
    example: ex("ಒಂದು ಪ್ಲೇಟ್ ಇಡ್ಲಿ.", "Ondu plate idli.", "One plate of idli.", "एक प्लेट इडली।") }),
  v("innondu", "ಇನ್ನೊಂದು", "Innondu", "One more / Another", "एक और", { pos: "number", tags: ["food", "number"],
    bridge: bi("innu (more) + ondu (one) = innondu.", "innu (और) + ondu (एक) = innondu।"),
    example: ex("ಇನ್ನೊಂದು ಕಾಫಿ.", "Innondu kaafi.", "One more coffee.", "एक और कॉफ़ी।") }),
  v("parcel", "ಪಾರ್ಸೆಲ್", "Parcel", "Takeaway", "पैक करके", { pos: "noun", tags: ["food"],
    example: ex("ಪಾರ್ಸೆಲ್ ಮಾಡಿ.", "Parcel maadi.", "Pack it to go.", "पैक कर दीजिए।") }),
  v("sambar", "ಸಾಂಬಾರ್", "Sambar", "Sambar (lentil stew)", "सांभर", { pos: "noun", tags: ["food"] }),
  v("chutney", "ಚಟ್ನಿ", "Chutney", "Chutney", "चटनी", { pos: "noun", tags: ["food"] }),
  v("uppu", "ಉಪ್ಪು", "Uppu", "Salt", "नमक", { pos: "noun", tags: ["food"],
    example: ex("ಉಪ್ಪು ಜಾಸ್ತಿ ಆಗಿದೆ.", "Uppu jaasti aagide.", "It's too salty.", "नमक ज़्यादा हो गया है।") }),
  v("tannage", "ತಣ್ಣಗೆ", "Tannage", "Cold", "ठंडा", { pos: "adjective", tags: ["food"],
    example: ex("ತಣ್ಣಗಿನ ನೀರು ಕೊಡಿ.", "Tannagina neeru kodi.", "Give cold water.", "ठंडा पानी दीजिए।") }),
  v("ruchi", "ರುಚಿ", "Ruchi", "Taste", "स्वाद", { pos: "noun", tags: ["food"],
    example: ex("ರುಚಿ ಸೂಪರ್!", "Ruchi super!", "The taste is super!", "स्वाद सुपर!") }),
  v("kaayabeka", "ಕಾಯಬೇಕಾ?", "Kaayabeka?", "Do I have to wait?", "इंतज़ार करना होगा?", { pos: "question", tags: ["food", "question"],
    example: ex("ಎಷ್ಟು ಹೊತ್ತು ಕಾಯಬೇಕು?", "Eshtu hottu kaayabeku?", "How long do I have to wait?", "कितनी देर इंतज़ार करना होगा?") }),
  v("veg", "ವೆಜ್ / ನಾನ್‌ವೆಜ್", "Veg / Non-veg", "Veg / Non-veg", "वेज / नॉनवेज", { pos: "noun", tags: ["food"],
    example: ex("ವೆಜ್ ಮಾತ್ರ ಇದೆಯಾ?", "Veg maatra ideya?", "Is it veg only?", "सिर्फ़ वेज है?") }),
  v("maatra", "ಮಾತ್ರ", "Maatra", "Only", "सिर्फ़", { pos: "adverb", tags: ["basic"],
    example: ex("ಕ್ಯಾಶ್ ಮಾತ್ರ.", "Cash maatra.", "Cash only.", "सिर्फ़ कैश।") }),
  v("ishta", "ಇಷ್ಟ", "Ishta", "Like / Liking", "पसंद", { pos: "noun", tags: ["basic"],
    bridge: bi("Nanage ishta = मुझे पसंद है. Same structure as beku.", "Nanage ishta = मुझे पसंद है। beku जैसी ही बनावट।"),
    example: ex("ನನಗೆ ದೋಸೆ ತುಂಬಾ ಇಷ್ಟ.", "Nanage dose tumba ishta.", "I really like dosa.", "मुझे डोसा बहुत पसंद है।") }),
  v("table", "ಟೇಬಲ್", "Table", "Table", "टेबल", { pos: "noun", tags: ["food"],
    example: ex("ಮೂರು ಜನಕ್ಕೆ ಟೇಬಲ್ ಇದೆಯಾ?", "Mooru janakke table ideya?", "Table for three?", "तीन लोगों के लिए टेबल है?") }),
  v("neeru-bottle", "ನೀರು ಬಾಟಲ್", "Neeru bottle", "Water bottle", "पानी की बोतल", { pos: "noun", tags: ["food"] }),
];

const sentences = [
  s("d16s1", "ಒಂದು ಮಸಾಲೆ ದೋಸೆ ಕೊಡಿ.", "Ondu masale dose kodi.", "One masala dosa, please.", "एक मसाला डोसा दीजिए।", {
    formality: "polite", words: ["Ondu", "masale", "dose", "kodi"], wordsKn: ["ಒಂದು", "ಮಸಾಲೆ", "ದೋಸೆ", "ಕೊಡಿ"],
  }),
  s("d16s2", "ಇನ್ನೊಂದು ಇಡ್ಲಿ ಕೊಡಿ.", "Innondu idli kodi.", "One more idli, please.", "एक और इडली दीजिए।", {
    formality: "polite", words: ["Innondu", "idli", "kodi"], wordsKn: ["ಇನ್ನೊಂದು", "ಇಡ್ಲಿ", "ಕೊಡಿ"],
  }),
  s("d16s3", "ಸಾಂಬಾರ್ ಸ್ವಲ್ಪ ಜಾಸ್ತಿ ಕೊಡಿ.", "Sambar swalpa jaasti kodi.", "A little extra sambar, please.", "सांभर थोड़ा ज़्यादा दीजिए।", {
    formality: "polite", words: ["Sambar", "swalpa", "jaasti", "kodi"], wordsKn: ["ಸಾಂಬಾರ್", "ಸ್ವಲ್ಪ", "ಜಾಸ್ತಿ", "ಕೊಡಿ"],
  }),
  s("d16s4", "ಪಾರ್ಸೆಲ್ ಮಾಡಿ.", "Parcel maadi.", "Pack it to go.", "पैक कर दीजिए।", { formality: "polite", words: ["Parcel", "maadi"], wordsKn: ["ಪಾರ್ಸೆಲ್", "ಮಾಡಿ"] }),
  s("d16s5", "ಇದರಲ್ಲಿ ಏನು ಇದೆ?", "Idralli enu ide?", "What's in this?", "इसमें क्या है?", {
    words: ["Idralli", "enu", "ide?"], wordsKn: ["ಇದರಲ್ಲಿ", "ಏನು", "ಇದೆ?"],
    breakdown: [{ roman: "idu + alli = idralli", meaning: "in this", hi: "इसमें" }],
  }),
  s("d16s6", "ಖಾರ ಇದೆಯಾ?", "Khaara ideya?", "Is it spicy?", "तीखा है?", { words: ["Khaara", "ideya?"], wordsKn: ["ಖಾರ", "ಇದೆಯಾ?"] }),
  s("d16s7", "ಮೂರು ಜನಕ್ಕೆ ಟೇಬಲ್ ಇದೆಯಾ?", "Mooru janakke table ideya?", "Is there a table for three?", "तीन लोगों के लिए टेबल है?", {
    words: ["Mooru", "janakke", "table", "ideya?"], wordsKn: ["ಮೂರು", "ಜನಕ್ಕೆ", "ಟೇಬಲ್", "ಇದೆಯಾ?"],
  }),
  s("d16s8", "ಎಷ್ಟು ಹೊತ್ತು ಕಾಯಬೇಕು?", "Eshtu hottu kaayabeku?", "How long do we have to wait?", "कितनी देर इंतज़ार करना होगा?", {
    words: ["Eshtu", "hottu", "kaayabeku?"], wordsKn: ["ಎಷ್ಟು", "ಹೊತ್ತು", "ಕಾಯಬೇಕು?"],
  }),
  s("d16s9", "ಸಾಕು, ಬಿಲ್ ಕೊಡಿ.", "Saaku, bill kodi.", "That's enough, the bill please.", "बस, बिल दीजिए।", { formality: "polite", words: ["Saaku,", "bill", "kodi"], wordsKn: ["ಸಾಕು,", "ಬಿಲ್", "ಕೊಡಿ"] }),
  s("d16s10", "ನನಗೆ ದೋಸೆ ತುಂಬಾ ಇಷ್ಟ.", "Nanage dose tumba ishta.", "I really like dosa.", "मुझे डोसा बहुत पसंद है।", {
    words: ["Nanage", "dose", "tumba", "ishta"], wordsKn: ["ನನಗೆ", "ದೋಸೆ", "ತುಂಬಾ", "ಇಷ್ಟ"],
  }),
  s("d16s11", "ತಣ್ಣಗಿನ ನೀರು ಕೊಡಿ.", "Tannagina neeru kodi.", "Cold water, please.", "ठंडा पानी दीजिए।", { formality: "polite", words: ["Tannagina", "neeru", "kodi"], wordsKn: ["ತಣ್ಣಗಿನ", "ನೀರು", "ಕೊಡಿ"] }),
];

export const day16: DayLesson = {
  day: 16, week: 3, type: "lesson", emoji: "🍽️", minutes: 20,
  title: bi("Restaurants", "रेस्टोरेंट"),
  subtitle: bi("Order, ask what's in it, get extra sambar, pack it, pay", "ऑर्डर, क्या है पूछो, सांभर और लो, पैक करो, भुगतान"),
  vocab, sentences,
  concept: {
    title: bi("From the counter to the bill", "काउंटर से बिल तक"),
    intro: bi("Restaurants are the easiest place to practise. The staff hear the same 20 sentences all day and will understand your accent instantly.", "रेस्टोरेंट अभ्यास की सबसे आसान जगह है। स्टाफ दिन भर वही 20 वाक्य सुनता है और आपका उच्चारण तुरंत समझ जाएगा।"),
    sections: [
      {
        heading: bi("Darshini vs sit-down", "दर्शिनी बनाम बैठकर"),
        body: bi("Darshini (stand-and-eat): pay first at the counter ('Ondu masale dose, ondu kaafi'), take the token, collect. Sit-down: ask for a table ('Mooru janakke table ideya?'), order with kodi, finish with 'Bill kodi'.", "दर्शिनी (खड़े होकर): पहले काउंटर पर भुगतान ('Ondu masale dose, ondu kaafi'), टोकन लो, लो। बैठकर: टेबल माँगो ('Mooru janakke table ideya?'), kodi से ऑर्डर, 'Bill kodi' से खत्म।"),
      },
      {
        heading: bi("Modifiers", "बदलाव"),
        body: bi("jaasti (more), kadime (less), beda (without), maatra (only), innondu (one more), swalpa (a little).\n'Sambar jaasti.' 'Khaara kadime.' 'Sakkare beda.' 'Veg maatra.' 'Innondu kaafi.'", "jaasti (ज़्यादा), kadime (कम), beda (बिना), maatra (सिर्फ़), innondu (एक और), swalpa (थोड़ा)।\n'Sambar jaasti.' 'Khaara kadime.' 'Sakkare beda.' 'Veg maatra.' 'Innondu kaafi.'"),
        bridge: [
          { kn: "ಜಾಸ್ತಿ / ಕಡಿಮೆ", roman: "jaasti / kadime", hi: "ज़्यादा / कम", en: "more / less" },
          { kn: "ಇನ್ನೊಂದು", roman: "innondu", hi: "एक और", en: "one more" },
          { kn: "ಮಾತ್ರ", roman: "maatra", hi: "सिर्फ़", en: "only" },
        ],
      },
      {
        heading: bi("'-alli' inside things", "'-alli' चीज़ों के अंदर"),
        body: bi("Idu + alli = idralli (in this). 'Idralli enu ide?' = What's in this? 'Idralli eggu ideya?' = Is there egg in this? Essential for allergies and veg/non-veg.", "Idu + alli = idralli (इसमें)। 'Idralli enu ide?' = इसमें क्या है? 'Idralli eggu ideya?' = इसमें अंडा है? एलर्जी और वेज/नॉनवेज के लिए ज़रूरी।"),
      },
    ],
    tip: bi("Compliment the food: 'Ruchi super!' or 'Tumba chennagide!' Cooks remember you.", "खाने की तारीफ़ करो: 'Ruchi super!' या 'Tumba chennagide!' रसोइए आपको याद रखते हैं।"),
  },
  conversation: {
    id: "d16c1",
    title: bi("Dinner for three", "तीन लोगों का डिनर"),
    setting: bi("A family restaurant on a weekend.", "वीकेंड पर फ़ैमिली रेस्टोरेंट।"),
    speakers: { A: "Waiter", B: "You" },
    lines: [
      line("A", "ಎಷ್ಟು ಜನ ಸರ್?", "Eshtu jana sir?", "How many people, sir?", "कितने लोग सर?"),
      line("B", "ಮೂರು ಜನ. ಟೇಬಲ್ ಇದೆಯಾ?", "Mooru jana. Table ideya?", "Three people. Is there a table?", "तीन लोग। टेबल है?"),
      line("A", "ಹತ್ತು ನಿಮಿಷ ಕಾಯಬೇಕು.", "Hattu nimisha kaayabeku.", "You'll have to wait ten minutes.", "दस मिनट इंतज़ार करना होगा।"),
      line("B", "ಸರಿ, ಪರವಾಗಿಲ್ಲ.", "Sari, parvagilla.", "Okay, no problem.", "ठीक है, कोई बात नहीं।"),
      line("A", "ಏನು ಬೇಕು ಸರ್?", "Enu beku sir?", "What would you like, sir?", "क्या चाहिए सर?"),
      line("B", "ಎರಡು ಮಸಾಲೆ ದೋಸೆ, ಒಂದು ಪ್ಲೇಟ್ ಇಡ್ಲಿ. ಖಾರ ಕಡಿಮೆ.", "Eradu masale dose, ondu plate idli. Khaara kadime.", "Two masala dosas, one plate idli. Less spicy.", "दो मसाला डोसा, एक प्लेट इडली। कम तीखा।"),
      line("A", "ಕುಡಿಯೋಕೆ?", "Kudiyoke?", "To drink?", "पीने के लिए?"),
      line("B", "ಮೂರು ಕಾಫಿ. ಆಮೇಲೆ ಬಿಲ್ ಕೊಡಿ.", "Mooru kaafi. Aamele bill kodi.", "Three coffees. Then the bill, please.", "तीन कॉफ़ी। फिर बिल दीजिए।"),
    ],
    prompts: [
      {
        afterLine: 0,
        question: bi("Say three people and ask for a table:", "तीन लोग कहकर टेबल माँगें:"),
        options: [
          { kn: "ಮೂರು ಜನ. ಟೇಬಲ್ ಇದೆಯಾ?", roman: "Mooru jana. Table ideya?", en: "Three people. Is there a table?", correct: true },
          { kn: "ಮೂರು ಪ್ಲೇಟ್. ಟೇಬಲ್ ಬೇಡ.", roman: "Mooru plate. Table beda.", en: "Three plates. No table.", correct: false },
          { kn: "ಎರಡು ಜನ. ಪಾರ್ಸೆಲ್.", roman: "Eradu jana. Parcel.", en: "Two people. Takeaway.", correct: false, feedback: bi("You're three, and you want to sit!", "आप तीन हैं, और बैठना चाहते हैं!") },
        ],
      },
      {
        afterLine: 4,
        question: bi("Order 2 masala dosas, 1 plate idli, less spicy:", "2 मसाला डोसा, 1 प्लेट इडली, कम तीखा ऑर्डर करें:"),
        options: [
          { kn: "ಎರಡು ಮಸಾಲೆ ದೋಸೆ, ಒಂದು ಪ್ಲೇಟ್ ಇಡ್ಲಿ. ಖಾರ ಕಡಿಮೆ.", roman: "Eradu masale dose, ondu plate idli. Khaara kadime.", en: "Two masala dosas, one plate idli. Less spicy.", correct: true },
          { kn: "ಒಂದು ಮಸಾಲೆ ದೋಸೆ, ಎರಡು ಪ್ಲೇಟ್ ಇಡ್ಲಿ. ಖಾರ ಜಾಸ್ತಿ.", roman: "Ondu masale dose, eradu plate idli. Khaara jaasti.", en: "One masala dosa, two plates idli. More spicy.", correct: false, feedback: bi("Numbers and spice both flipped.", "संख्या और तीखापन दोनों उल्टे।") },
          { kn: "ಮಸಾಲೆ ದೋಸೆ ಬೇಡ.", roman: "Masale dose beda.", en: "No masala dosa.", correct: false },
        ],
      },
    ],
  },
  bossQuestion: {
    id: "d16boss", type: "typein", skill: "conversation",
    prompt: bi("Type in Kannada (roman): 'One more coffee, less sugar. Then the bill.'", "कन्नड़ में टाइप करें (रोमन): 'एक और कॉफ़ी, चीनी कम। फिर बिल।'"),
    answer: "Innondu kaafi, sakkare kadime. Aamele bill kodi.",
    acceptable: ["Innondu kaafi sakkare kadime aamele bill kodi", "Innondu kaafi, sakkare kadime, aamele bill", "Innondu coffee, sakkare kadime. Aamele bill kodi.", "Innondu kaafi sakkare kadime. Aamele bill."],
    explanation: bi("innondu (one more) + kaafi; sakkare kadime (less sugar); aamele (then) + bill kodi.", "innondu (एक और) + kaafi; sakkare kadime (चीनी कम); aamele (फिर) + bill kodi।"),
  },
  dailyPhrase: {
    kn: "ಪಾರ್ಸೆಲ್ ಮಾಡಿ", roman: "Parcel maadi",
    meaning: bi("Pack it to take away", "पैक कर दीजिए"),
    example: ex("ಇಲ್ಲಿ ತಿನ್ನಲ್ಲ, ಪಾರ್ಸೆಲ್ ಮಾಡಿ.", "Illi tinnalla, parcel maadi.", "Not eating here, pack it.", "यहाँ नहीं खाऊँगा, पैक कर दीजिए।"),
    mini: [
      line("A", "ಇಲ್ಲೇ ತಿಂತೀರಾ?", "Ille tintira?", "Eating here?", "यहीं खाएँगे?"),
      line("B", "ಇಲ್ಲ, ಪಾರ್ಸೆಲ್ ಮಾಡಿ.", "Illa, parcel maadi.", "No, pack it.", "नहीं, पैक कर दीजिए।"),
    ],
  },
};
