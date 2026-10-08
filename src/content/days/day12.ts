import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

const vocab = [
  v("naale-bartini", "ನಾಳೆ ಬರ್ತೀನಿ", "Naale bartini", "I'll come tomorrow", "कल आऊँगा", { pos: "phrase", tags: ["tense"],
    bridge: bi("Spoken Kannada uses the present form for future. 'Naale' makes it future.", "बोलचाल की कन्नड़ भविष्य के लिए वर्तमान रूप इस्तेमाल करती है। 'Naale' इसे भविष्य बनाता है।") }),
  v("call-maadtini", "ಕಾಲ್ ಮಾಡ್ತೀನಿ", "Call maadtini", "I'll call", "कॉल करूँगा", { pos: "phrase", tags: ["tense", "office"],
    example: ex("ಸಂಜೆ ಕಾಲ್ ಮಾಡ್ತೀನಿ.", "Sanje call maadtini.", "I'll call in the evening.", "शाम को कॉल करूँगा।") }),
  v("aagutte", "ಆಗುತ್ತೆ", "Aagutte", "It will happen / It's possible / OK", "हो जाएगा", { pos: "verb", tags: ["tense", "basic"],
    context: bi("Also the answer to 'can you?' — 'Aagutte' = yes, can do. 'Aagalla' = can't.", "'हो सकता है?' का जवाब भी — 'Aagutte' = हाँ, हो जाएगा। 'Aagalla' = नहीं होगा।"),
    example: ex("ನಾಳೆ ಆಗುತ್ತಾ? — ಆಗುತ್ತೆ.", "Naale aagutta? — Aagutte.", "Is tomorrow possible? — Yes.", "कल हो जाएगा? — हो जाएगा।") }),
  v("aagalla", "ಆಗಲ್ಲ", "Aagalla", "Won't happen / Can't", "नहीं होगा", { pos: "verb", tags: ["tense", "basic"],
    example: ex("ಇವತ್ತು ಆಗಲ್ಲ.", "Ivattu aagalla.", "Not possible today.", "आज नहीं होगा।") }),
  v("sigutte", "ಸಿಗುತ್ತೆ", "Sigutte", "Will be available / You'll get", "मिलेगा", { pos: "verb", tags: ["tense", "shopping"],
    example: ex("ಅಲ್ಲಿ ಸಿಗುತ್ತೆ.", "Alli sigutte.", "You'll get it there.", "वहाँ मिलेगा।") }),
  v("sigalla", "ಸಿಗಲ್ಲ", "Sigalla", "Won't be available", "नहीं मिलेगा", { pos: "verb", tags: ["tense", "shopping"] }),
  v("hogona", "ಹೋಗೋಣ", "Hogona", "Let's go", "चलें", { pos: "verb", tags: ["tense", "friends"],
    example: ex("ಊಟಕ್ಕೆ ಹೋಗೋಣ.", "Ootakke hogona.", "Let's go for lunch.", "खाने चलें।") }),
  v("maadona", "ಮಾಡೋಣ", "Maadona", "Let's do", "करें", { pos: "verb", tags: ["tense"],
    example: ex("ನಾಳೆ ಮಾಡೋಣ.", "Naale maadona.", "Let's do it tomorrow.", "कल करें।") }),
  v("sigona", "ಸಿಗೋಣ", "Sigona", "Let's meet", "मिलते हैं", { pos: "verb", tags: ["tense", "friends"],
    example: ex("ಸಂಜೆ ಸಿಗೋಣ.", "Sanje sigona.", "Let's meet in the evening.", "शाम को मिलते हैं।") }),
  v("barla", "ಬರ್ಲಾ?", "Barla?", "Shall I come?", "आऊँ?", { pos: "verb", tags: ["tense"],
    bridge: bi("-la? on the root = 'shall I?'. Hogla? (shall I go?), Maadla? (shall I do?), Helala? (shall I tell?)", "मूल पर -la? = 'करूँ?'। Hogla? (जाऊँ?), Maadla? (करूँ?), Helala? (बताऊँ?)") }),
  v("bega", "ಬೇಗ", "Bega", "Quickly / Soon", "जल्दी", { pos: "adverb", tags: ["time"],
    example: ex("ಬೇಗ ಬನ್ನಿ.", "Bega banni.", "Come soon.", "जल्दी आइए।") }),
  v("hottu", "ಹೊತ್ತು", "Hottu", "Time (duration)", "समय / देर", { pos: "noun", tags: ["time"],
    example: ex("ಎಷ್ಟು ಹೊತ್ತು?", "Eshtu hottu?", "How long?", "कितनी देर?") }),
  v("mundina-vaara", "ಮುಂದಿನ ವಾರ", "Mundina vaara", "Next week", "अगले हफ़्ते", { pos: "phrase", tags: ["time"] }),
  v("khandita", "ಖಂಡಿತ", "Khandita", "Definitely / Sure", "ज़रूर", { pos: "adverb", tags: ["basic"],
    example: ex("ಖಂಡಿತ ಬರ್ತೀನಿ.", "Khandita bartini.", "I'll definitely come.", "ज़रूर आऊँगा।") }),
  v("bahusha", "ಬಹುಶಃ", "Bahusha", "Maybe / Probably", "शायद", { pos: "adverb", tags: ["basic"] }),
];

const sentences = [
  s("d12s1", "ನಾನು ನಾಳೆ ಬರ್ತೀನಿ.", "Naanu naale bartini.", "I will come tomorrow.", "मैं कल आऊँगा।", {
    words: ["Naanu", "naale", "bartini"], wordsKn: ["ನಾನು", "ನಾಳೆ", "ಬರ್ತೀನಿ"],
  }),
  s("d12s2", "ಸಂಜೆ ಕಾಲ್ ಮಾಡ್ತೀನಿ.", "Sanje call maadtini.", "I'll call in the evening.", "शाम को कॉल करूँगा।", {
    words: ["Sanje", "call", "maadtini"], wordsKn: ["ಸಂಜೆ", "ಕಾಲ್", "ಮಾಡ್ತೀನಿ"],
  }),
  s("d12s3", "ನಾಳೆ ಊಟಕ್ಕೆ ಹೋಗೋಣ.", "Naale ootakke hogona.", "Let's go for lunch tomorrow.", "कल खाने चलें।", {
    words: ["Naale", "ootakke", "hogona"], wordsKn: ["ನಾಳೆ", "ಊಟಕ್ಕೆ", "ಹೋಗೋಣ"],
    breakdown: [{ roman: "ootakke", meaning: "for a meal", hi: "खाने के लिए" }, { roman: "hogona", meaning: "let's go", hi: "चलें" }],
  }),
  s("d12s4", "ಮುಂದಿನ ವಾರ ಸಿಗೋಣ.", "Mundina vaara sigona.", "Let's meet next week.", "अगले हफ़्ते मिलते हैं।", {
    words: ["Mundina", "vaara", "sigona"], wordsKn: ["ಮುಂದಿನ", "ವಾರ", "ಸಿಗೋಣ"],
  }),
  s("d12s5", "ಇವತ್ತು ಆಗಲ್ಲ, ನಾಳೆ ಆಗುತ್ತೆ.", "Ivattu aagalla, naale aagutte.", "Not today, tomorrow is possible.", "आज नहीं होगा, कल हो जाएगा।", {
    words: ["Ivattu", "aagalla,", "naale", "aagutte"], wordsKn: ["ಇವತ್ತು", "ಆಗಲ್ಲ,", "ನಾಳೆ", "ಆಗುತ್ತೆ"],
  }),
  s("d12s6", "ನಾನು ಬರ್ಲಾ?", "Naanu barla?", "Shall I come?", "मैं आऊँ?", {
    words: ["Naanu", "barla?"], wordsKn: ["ನಾನು", "ಬರ್ಲಾ?"],
  }),
  s("d12s7", "ಎಷ್ಟು ಹೊತ್ತು ಆಗುತ್ತೆ?", "Eshtu hottu aagutte?", "How long will it take?", "कितनी देर लगेगी?", {
    words: ["Eshtu", "hottu", "aagutte?"], wordsKn: ["ಎಷ್ಟು", "ಹೊತ್ತು", "ಆಗುತ್ತೆ?"],
  }),
  s("d12s8", "ಹತ್ತು ನಿಮಿಷದಲ್ಲಿ ಬರ್ತೀನಿ.", "Hattu nimishadalli bartini.", "I'll come in ten minutes.", "दस मिनट में आता हूँ।", {
    words: ["Hattu", "nimishadalli", "bartini"], wordsKn: ["ಹತ್ತು", "ನಿಮಿಷದಲ್ಲಿ", "ಬರ್ತೀನಿ"],
  }),
  s("d12s9", "ಖಂಡಿತ ಮಾಡ್ತೀನಿ.", "Khandita maadtini.", "I'll definitely do it.", "ज़रूर करूँगा।", {
    words: ["Khandita", "maadtini"], wordsKn: ["ಖಂಡಿತ", "ಮಾಡ್ತೀನಿ"],
  }),
  s("d12s10", "ಅಲ್ಲಿ ಎಲ್ಲಾ ಸಿಗುತ್ತೆ.", "Alli ella sigutte.", "You'll get everything there.", "वहाँ सब मिलेगा।", {
    words: ["Alli", "ella", "sigutte"], wordsKn: ["ಅಲ್ಲಿ", "ಎಲ್ಲಾ", "ಸಿಗುತ್ತೆ"],
  }),
];

export const day12: DayLesson = {
  day: 12, week: 2, type: "lesson", emoji: "⏩", minutes: 20,
  title: bi("Future tense", "भविष्य काल"),
  subtitle: bi("I'll come, I'll call — plus 'let's' and 'shall I?'", "आऊँगा, कॉल करूँगा — साथ में 'चलें' और 'करूँ?'"),
  vocab, sentences,
  scriptLetters: ["ssa", "lla", "ru", "am"],
  concept: {
    title: bi("The future is already yours", "भविष्य पहले से आपका है"),
    intro: bi("Here's the best news in this course: spoken Kannada has no separate future tense. 'Bartini' means 'I come' AND 'I will come'. Just add a time word.", "इस कोर्स की सबसे अच्छी खबर: बोलचाल की कन्नड़ में अलग भविष्य काल नहीं है। 'Bartini' = 'आता हूँ' और 'आऊँगा' दोनों। बस समय-शब्द जोड़ो।"),
    sections: [
      {
        heading: bi("Time word + present = future", "समय-शब्द + वर्तमान = भविष्य"),
        body: bi("Naale bartini (I'll come tomorrow). Sanje call maadtini (I'll call this evening). Mundina vaara hogtini (I'll go next week). Eega bartini (I'm coming now / I'll come right away).", "Naale bartini (कल आऊँगा)। Sanje call maadtini (शाम को कॉल करूँगा)। Mundina vaara hogtini (अगले हफ़्ते जाऊँगा)। Eega bartini (अभी आता हूँ)।"),
        bridge: [
          { kn: "ನಾಳೆ", roman: "naale", hi: "कल", en: "tomorrow" },
          { kn: "ಆಮೇಲೆ", roman: "aamele", hi: "बाद में", en: "later" },
          { kn: "ಮುಂದಿನ ವಾರ", roman: "mundina vaara", hi: "अगले हफ़्ते", en: "next week" },
        ],
      },
      {
        heading: bi("Aagutte / aagalla / sigutte / sigalla", "Aagutte / aagalla / sigutte / sigalla"),
        body: bi("Four words that run every negotiation:\naagutte — it'll work / possible / okay\naagalla — won't work / not possible\nsigutte — available / you'll get it\nsigalla — not available\n'Naale aagutta?' (Possible tomorrow?) 'Aagutte!'", "चार शब्द जो हर मोल-भाव चलाते हैं:\naagutte — हो जाएगा / संभव\naagalla — नहीं होगा\nsigutte — मिलेगा\nsigalla — नहीं मिलेगा\n'Naale aagutta?' (कल हो जाएगा?) 'Aagutte!'"),
      },
      {
        heading: bi("Let's: -ona. Shall I: -la?", "चलें: -ona। करूँ?: -la?"),
        body: bi("Root + ona = let's: hogona (let's go), maadona (let's do), sigona (let's meet), nodona (let's see), tinnona (let's eat).\nRoot + la? = shall I: barla? (shall I come?), hogla? (shall I go?), helala? (shall I tell?)", "मूल + ona = चलें: hogona (चलें), maadona (करें), sigona (मिलें), nodona (देखें), tinnona (खाएँ)।\nमूल + la? = करूँ?: barla? (आऊँ?), hogla? (जाऊँ?), helala? (बताऊँ?)"),
        examples: [
          ex("ಕಾಫಿಗೆ ಹೋಗೋಣ್ವಾ?", "Kaafige hogonva?", "Shall we go for coffee?", "कॉफ़ी के लिए चलें?"),
          ex("ನಾನು ಹೇಳ್ಲಾ?", "Naanu helala?", "Shall I tell?", "मैं बताऊँ?"),
        ],
      },
    ],
    tip: bi("'Hogona-va?' with -va at the end turns 'let's go' into 'shall we go?'. Very friendly, very Bengaluru.", "'Hogona-va?' में अंत का -va 'चलें' को 'चलें क्या?' बना देता है। बहुत दोस्ताना, बहुत बेंगलुरु।"),
  },
  conversation: {
    id: "d12c1",
    title: bi("Making plans", "प्लान बनाना"),
    setting: bi("Texting a friend, Bengaluru-style.", "दोस्त से बेंगलुरु अंदाज़ में बात।"),
    speakers: { A: "Friend", B: "You" },
    lines: [
      line("A", "ವೀಕೆಂಡ್ ಫ್ರೀನಾ? ಸಿನಿಮಾಗೆ ಹೋಗೋಣ್ವಾ?", "Weekend free-na? Cinemage hogonva?", "Free on the weekend? Shall we go to a movie?", "वीकेंड फ़्री हो? फ़िल्म चलें?"),
      line("B", "ಶನಿವಾರ ಆಗಲ್ಲ, ಭಾನುವಾರ ಆಗುತ್ತೆ.", "Shanivaara aagalla, bhaanuvaara aagutte.", "Saturday won't work, Sunday works.", "शनिवार नहीं होगा, रविवार हो जाएगा।"),
      line("A", "ಸರಿ, ಭಾನುವಾರ ಸಂಜೆ. ಎಷ್ಟು ಗಂಟೆಗೆ?", "Sari, bhaanuvaara sanje. Eshtu ghantege?", "Okay, Sunday evening. What time?", "ठीक है, रविवार शाम। कितने बजे?"),
      line("B", "ಆರು ಗಂಟೆಗೆ ಸಿಗೋಣ.", "Aaru ghantege sigona.", "Let's meet at six.", "छह बजे मिलते हैं।"),
      line("A", "ಟಿಕೆಟ್ ನಾನು ಬುಕ್ ಮಾಡ್ಲಾ?", "Ticket naanu book maadla?", "Shall I book the tickets?", "टिकट मैं बुक करूँ?"),
      line("B", "ಹೌದು, ಮಾಡಿ. ನಾನು ಸಂಜೆ ಕಾಲ್ ಮಾಡ್ತೀನಿ.", "Houdu, maadi. Naanu sanje call maadtini.", "Yes, do it. I'll call in the evening.", "हाँ, कर दो। मैं शाम को कॉल करूँगा।"),
    ],
    prompts: [
      {
        afterLine: 0,
        question: bi("Saturday doesn't work for you, Sunday does:", "शनिवार नहीं, रविवार ठीक है:"),
        options: [
          { kn: "ಶನಿವಾರ ಆಗಲ್ಲ, ಭಾನುವಾರ ಆಗುತ್ತೆ.", roman: "Shanivaara aagalla, bhaanuvaara aagutte.", en: "Saturday won't work, Sunday works.", correct: true },
          { kn: "ಶನಿವಾರ ಆಗುತ್ತೆ, ಭಾನುವಾರ ಆಗಲ್ಲ.", roman: "Shanivaara aagutte, bhaanuvaara aagalla.", en: "Saturday works, Sunday won't.", correct: false, feedback: bi("Swapped! aagalla = won't work.", "उल्टा! aagalla = नहीं होगा।") },
          { kn: "ಶನಿವಾರ ಹೋದೆ.", roman: "Shanivaara hode.", en: "I went on Saturday.", correct: false, feedback: bi("That's past tense.", "यह भूतकाल है।") },
        ],
      },
      {
        afterLine: 4,
        question: bi("Say yes, and that you'll call in the evening:", "हाँ कहें, और शाम को कॉल करने की बात:"),
        options: [
          { kn: "ಹೌದು, ಮಾಡಿ. ಸಂಜೆ ಕಾಲ್ ಮಾಡ್ತೀನಿ.", roman: "Houdu, maadi. Sanje call maadtini.", en: "Yes, do it. I'll call in the evening.", correct: true },
          { kn: "ಹೌದು, ಮಾಡಿ. ಸಂಜೆ ಕಾಲ್ ಮಾಡಿದೆ.", roman: "Houdu, maadi. Sanje call maadide.", en: "Yes, do it. I called in the evening.", correct: false, feedback: bi("maadide = did (past). Future = maadtini.", "maadide = किया (भूत)। भविष्य = maadtini।") },
          { kn: "ಬೇಡ, ನಾನು ಬರ್ಲಾ?", roman: "Beda, naanu barla?", en: "No, shall I come?", correct: false },
        ],
      },
    ],
  },
  bossQuestion: {
    id: "d12boss", type: "mcq", skill: "grammar",
    prompt: bi("A colleague asks if you can finish the report today. You can't today, but tomorrow is fine. Say:", "सहकर्मी पूछता है रिपोर्ट आज हो जाएगी। आज नहीं, कल ठीक है। कहें:"),
    options: ["Ivattu aagalla, naale aagutte", "Ivattu aagutte, naale aagalla", "Ivattu sigalla, naale sigutte", "Ninne aaytu"],
    answer: "Ivattu aagalla, naale aagutte",
    explanation: bi("aagalla = not possible, aagutte = possible. 'Sigutte' is for things being available, not tasks.", "aagalla = नहीं होगा, aagutte = हो जाएगा। 'Sigutte' चीज़ों के मिलने के लिए है, काम के लिए नहीं।"),
  },
  dailyPhrase: {
    kn: "ಸಿಗೋಣ", roman: "Sigona",
    meaning: bi("Let's meet / See you (the natural goodbye)", "मिलते हैं (स्वाभाविक अलविदा)"),
    example: ex("ಸರಿ, ನಾಳೆ ಸಿಗೋಣ!", "Sari, naale sigona!", "Okay, see you tomorrow!", "ठीक है, कल मिलते हैं!"),
    mini: [
      line("A", "ನಾನು ಹೊರಡ್ತೀನಿ.", "Naanu horadtini.", "I'm leaving.", "मैं चलता हूँ।"),
      line("B", "ಸರಿ, ಮತ್ತೆ ಸಿಗೋಣ!", "Sari, matte sigona!", "Okay, see you again!", "ठीक है, फिर मिलते हैं!"),
    ],
  },
};
