import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

const vocab = [
  v("bele", "ಬೆಲೆ", "Bele", "Price", "दाम", { pos: "noun", tags: ["shopping"],
    example: ex("ಬೆಲೆ ಎಷ್ಟು?", "Bele eshtu?", "What's the price?", "दाम कितना है?") }),
  v("dubaari", "ದುಬಾರಿ", "Dubaari", "Expensive", "महँगा", { pos: "adjective", tags: ["shopping"],
    example: ex("ತುಂಬಾ ದುಬಾರಿ.", "Tumba dubaari.", "Too expensive.", "बहुत महँगा।") }),
  v("kadime", "ಕಡಿಮೆ", "Kadime", "Less / Reduce", "कम", { pos: "adjective", tags: ["shopping"],
    example: ex("ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ.", "Swalpa kadime maadi.", "Reduce it a bit.", "थोड़ा कम कीजिए।") }),
  v("jaasti", "ಜಾಸ್ತಿ", "Jaasti", "More / Too much", "ज़्यादा", { pos: "adjective", tags: ["shopping"] }),
  v("chillare", "ಚಿಲ್ಲರೆ", "Chillare", "Change (coins/small notes)", "छुट्टे", { pos: "noun", tags: ["shopping", "auto"],
    example: ex("ಚಿಲ್ಲರೆ ಇದೆಯಾ?", "Chillare ideya?", "Do you have change?", "छुट्टे हैं?") }),
  v("duddu", "ದುಡ್ಡು", "Duddu", "Money", "पैसे", { pos: "noun", tags: ["shopping"],
    context: bi("Spoken word. 'Hana' (ಹಣ) is the formal one.", "बोलचाल का शब्द। 'Hana' (ಹಣ) औपचारिक है।") }),
  v("torisi", "ತೋರಿಸಿ", "Torisi", "Show (polite)", "दिखाइए", { pos: "verb", formality: "polite", tags: ["verb", "shopping"],
    example: ex("ಅದು ತೋರಿಸಿ.", "Adu torisi.", "Show me that.", "वह दिखाइए।") }),
  v("bere", "ಬೇರೆ", "Bere", "Other / Different / Another", "दूसरा / और", { pos: "adjective", tags: ["shopping"],
    example: ex("ಬೇರೆ ಇದೆಯಾ?", "Bere ideya?", "Is there another one?", "दूसरा है?") }),
  v("banna", "ಬಣ್ಣ", "Banna", "Colour", "रंग", { pos: "noun", tags: ["shopping"],
    example: ex("ಬೇರೆ ಬಣ್ಣ ಇದೆಯಾ?", "Bere banna ideya?", "Is there another colour?", "दूसरा रंग है?") }),
  v("dodda", "ದೊಡ್ಡ", "Dodda", "Big", "बड़ा", { pos: "adjective", tags: ["shopping"],
    example: ex("ದೊಡ್ಡ ಸೈಜ್ ಇದೆಯಾ?", "Dodda size ideya?", "Is there a bigger size?", "बड़ा साइज़ है?") }),
  v("chikka", "ಚಿಕ್ಕ", "Chikka", "Small", "छोटा", { pos: "adjective", tags: ["shopping"] }),
  v("ardha", "ಅರ್ಧ", "Ardha", "Half", "आधा", { pos: "number", tags: ["shopping", "number"],
    bridge: bi("Same as Hindi आधा!", "हिंदी 'आधा' जैसा!"),
    example: ex("ಅರ್ಧ ಕೆಜಿ ಸಾಕು.", "Ardha kg saaku.", "Half a kilo is enough.", "आधा किलो काफ़ी है।") }),
  v("angadi", "ಅಂಗಡಿ", "Angadi", "Shop", "दुकान", { pos: "noun", tags: ["shopping"] }),
  v("hosa", "ಹೊಸ", "Hosa", "New", "नया", { pos: "adjective", tags: ["shopping"] }),
  v("hale", "ಹಳೆ", "Hale", "Old", "पुराना", { pos: "adjective", tags: ["shopping"] }),
  v("aagutta", "ಆಗುತ್ತಾ?", "Aagutta?", "Does it work? / Is it possible?", "चलेगा? / होगा?", { pos: "question", tags: ["shopping", "question"],
    example: ex("ಗೂಗಲ್ ಪೇ ಆಗುತ್ತಾ?", "Google Pay aagutta?", "Does Google Pay work?", "गूगल पे चलेगा?") }),
  v("ashte", "ಅಷ್ಟೇ", "Ashte", "That's all / Only that", "बस इतना ही", { pos: "expression", tags: ["basic", "shopping"],
    example: ex("ಇದು ಅಷ್ಟೇ.", "Idu ashte.", "Just this.", "बस यह।") }),
];

const sentences = [
  s("d15s1", "ಇದು ಎಷ್ಟು?", "Idu eshtu?", "How much is this?", "यह कितने का है?", { words: ["Idu", "eshtu?"], wordsKn: ["ಇದು", "ಎಷ್ಟು?"], tags: ["shopping"] }),
  s("d15s2", "ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ.", "Swalpa kadime maadi.", "Please reduce a little.", "थोड़ा कम कीजिए।", {
    formality: "polite", words: ["Swalpa", "kadime", "maadi"], wordsKn: ["ಸ್ವಲ್ಪ", "ಕಡಿಮೆ", "ಮಾಡಿ"], tags: ["shopping"],
  }),
  s("d15s3", "ತುಂಬಾ ದುಬಾರಿ.", "Tumba dubaari.", "Too expensive.", "बहुत महँगा।", { words: ["Tumba", "dubaari"], wordsKn: ["ತುಂಬಾ", "ದುಬಾರಿ"] }),
  s("d15s4", "ಬೇರೆ ಬಣ್ಣ ಇದೆಯಾ?", "Bere banna ideya?", "Is there another colour?", "दूसरा रंग है?", {
    words: ["Bere", "banna", "ideya?"], wordsKn: ["ಬೇರೆ", "ಬಣ್ಣ", "ಇದೆಯಾ?"],
  }),
  s("d15s5", "ಒಂದು ಕೆಜಿ ಟೊಮೇಟೊ ಕೊಡಿ.", "Ondu kg tomato kodi.", "One kilo of tomatoes, please.", "एक किलो टमाटर दीजिए।", {
    formality: "polite", words: ["Ondu", "kg", "tomato", "kodi"], wordsKn: ["ಒಂದು", "ಕೆಜಿ", "ಟೊಮೇಟೊ", "ಕೊಡಿ"],
  }),
  s("d15s6", "ಚಿಲ್ಲರೆ ಇದೆಯಾ?", "Chillare ideya?", "Do you have change?", "छुट्टे हैं?", { words: ["Chillare", "ideya?"], wordsKn: ["ಚಿಲ್ಲರೆ", "ಇದೆಯಾ?"] }),
  s("d15s7", "ಗೂಗಲ್ ಪೇ ಆಗುತ್ತಾ?", "Google Pay aagutta?", "Does Google Pay work here?", "गूगल पे चलेगा?", {
    words: ["Google", "Pay", "aagutta?"], wordsKn: ["ಗೂಗಲ್", "ಪೇ", "ಆಗುತ್ತಾ?"],
    note: bi("Most-used sentence in Bengaluru 2026. Answer: 'Aagutte' (yes) or 'Cash maatra' (cash only).", "2026 के बेंगलुरु का सबसे ज़्यादा बोला जाने वाला वाक्य। जवाब: 'Aagutte' (हाँ) या 'Cash maatra' (सिर्फ़ कैश)।"),
  }),
  s("d15s8", "ಇದು ಬೇಡ, ಅದು ಕೊಡಿ.", "Idu beda, adu kodi.", "Not this one, give that one.", "यह नहीं, वह दीजिए।", {
    words: ["Idu", "beda,", "adu", "kodi"], wordsKn: ["ಇದು", "ಬೇಡ,", "ಅದು", "ಕೊಡಿ"],
  }),
  s("d15s9", "ದೊಡ್ಡ ಸೈಜ್ ತೋರಿಸಿ.", "Dodda size torisi.", "Show me a bigger size.", "बड़ा साइज़ दिखाइए।", {
    formality: "polite", words: ["Dodda", "size", "torisi"], wordsKn: ["ದೊಡ್ಡ", "ಸೈಜ್", "ತೋರಿಸಿ"],
  }),
  s("d15s10", "ಅರ್ಧ ಕೆಜಿ ಸಾಕು.", "Ardha kg saaku.", "Half a kilo is enough.", "आधा किलो काफ़ी है।", { words: ["Ardha", "kg", "saaku"], wordsKn: ["ಅರ್ಧ", "ಕೆಜಿ", "ಸಾಕು"] }),
  s("d15s11", "ಒಟ್ಟು ಎಷ್ಟು ಆಯ್ತು?", "Ottu eshtu aaytu?", "How much in total?", "कुल कितना हुआ?", { words: ["Ottu", "eshtu", "aaytu?"], wordsKn: ["ಒಟ್ಟು", "ಎಷ್ಟು", "ಆಯ್ತು?"] }),
];

export const day15: DayLesson = {
  day: 15, week: 3, type: "lesson", emoji: "🛍️", minutes: 20,
  title: bi("Shopping", "खरीदारी"),
  subtitle: bi("Prices, bargaining, sizes, colours and 'Google Pay aagutta?'", "दाम, मोल-भाव, साइज़, रंग और 'Google Pay aagutta?'"),
  vocab, sentences,
  concept: {
    title: bi("The bargaining script", "मोल-भाव की स्क्रिप्ट"),
    intro: bi("Bengaluru shopping has a rhythm. Ask the price, react, counter, settle, pay. Here's the exact script.", "बेंगलुरु की खरीदारी की एक लय है। दाम पूछो, प्रतिक्रिया दो, counter करो, तय करो, भुगतान करो। यह रही सटीक स्क्रिप्ट।"),
    sections: [
      {
        heading: bi("Step 1–2: ask and react", "कदम 1–2: पूछो और प्रतिक्रिया दो"),
        body: bi("'Idu eshtu?' Then: 'Tumba dubaari!' (too expensive) or 'Jaasti aaytu' (that's a lot). Smile while saying it — it's a game, not a fight.", "'Idu eshtu?' फिर: 'Tumba dubaari!' (बहुत महँगा) या 'Jaasti aaytu' (ज़्यादा हो गया)। मुस्कुराते हुए बोलो — यह खेल है, लड़ाई नहीं।"),
      },
      {
        heading: bi("Step 3–4: counter and settle", "कदम 3–4: counter और तय"),
        body: bi("'Swalpa kadime maadi' (reduce a bit) or name a number: 'Nooru kodi' (give for 100). Settle with 'Sari' or 'Aaytu'. In malls and chains there's no bargaining; at street markets and small shops there always is.", "'Swalpa kadime maadi' (थोड़ा कम कीजिए) या संख्या बोलो: 'Nooru kodi' (100 में दीजिए)। 'Sari' या 'Aaytu' से तय करो। मॉल में मोल-भाव नहीं; सड़क बाज़ार और छोटी दुकानों में हमेशा।"),
        examples: [
          ex("ನೂರೈವತ್ತು? ನೂರು ಕೊಡಿ.", "Nooraivattu? Nooru kodi.", "150? Give for 100.", "150? 100 में दीजिए।"),
          ex("ಸರಿ, ನೂರಿಪ್ಪತ್ತು.", "Sari, nooruippattu.", "Okay, 120.", "ठीक है, 120।"),
        ],
      },
      {
        heading: bi("Step 5: pay", "कदम 5: भुगतान"),
        body: bi("'Google Pay aagutta?' / 'UPI aagutta?' If cash: 'Chillare ideya?' (do you have change). Then 'Ottu eshtu aaytu?' (total). 'Ashte' means 'that's all' when they ask if you want more.", "'Google Pay aagutta?' / 'UPI aagutta?' कैश हो तो: 'Chillare ideya?' (छुट्टे हैं)। फिर 'Ottu eshtu aaytu?' (कुल)। 'Ashte' = 'बस इतना' जब वे पूछें और चाहिए क्या।"),
        bridge: [
          { kn: "ಬೆಲೆ", roman: "bele", hi: "दाम", en: "price" },
          { kn: "ದುಬಾರಿ", roman: "dubaari", hi: "महँगा", en: "expensive" },
          { kn: "ಚಿಲ್ಲರೆ", roman: "chillare", hi: "छुट्टे", en: "change" },
          { kn: "ಅಷ್ಟೇ", roman: "ashte", hi: "बस इतना", en: "that's all" },
        ],
      },
    ],
    tip: bi("'Torisi' (show me) + pointing is the fastest way to shop before you know the word for the thing.", "'Torisi' (दिखाइए) + इशारा — चीज़ का नाम जानने से पहले खरीदारी का सबसे तेज़ तरीका।"),
  },
  conversation: {
    id: "d15c1",
    title: bi("Commercial Street bargaining", "कमर्शियल स्ट्रीट पर मोल-भाव"),
    setting: bi("Buying a shirt from a street shop.", "सड़क की दुकान से शर्ट खरीदना।"),
    speakers: { A: "Shopkeeper", B: "You" },
    lines: [
      line("A", "ಬನ್ನಿ ಸರ್, ಏನು ಬೇಕು?", "Banni sir, enu beku?", "Come sir, what do you want?", "आइए सर, क्या चाहिए?"),
      line("B", "ಈ ಶರ್ಟ್ ಎಷ್ಟು?", "Ee shirt eshtu?", "How much is this shirt?", "यह शर्ट कितने की है?"),
      line("A", "ಎಂಟು ನೂರು ರೂಪಾಯಿ.", "Entu nooru rupaayi.", "Eight hundred rupees.", "आठ सौ रुपये।"),
      line("B", "ತುಂಬಾ ದುಬಾರಿ! ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ.", "Tumba dubaari! Swalpa kadime maadi.", "Too expensive! Reduce a bit.", "बहुत महँगी! थोड़ा कम कीजिए।"),
      line("A", "ಸರಿ, ಏಳು ನೂರು. ಬೇರೆ ಬಣ್ಣ ಬೇಕಾ?", "Sari, elu nooru. Bere banna beka?", "Okay, seven hundred. Want another colour?", "ठीक है, सात सौ। दूसरा रंग चाहिए?"),
      line("B", "ನೀಲಿ ಬಣ್ಣ ತೋರಿಸಿ. ದೊಡ್ಡ ಸೈಜ್.", "Neeli banna torisi. Dodda size.", "Show me blue. Big size.", "नीला रंग दिखाइए। बड़ा साइज़।"),
      line("A", "ಇದು ನೋಡಿ. ಗೂಗಲ್ ಪೇ ಆಗುತ್ತೆ.", "Idu nodi. Google Pay aagutte.", "Look at this. Google Pay works.", "यह देखिए। गूगल पे चलता है।"),
      line("B", "ಸರಿ, ಇದು ಕೊಡಿ. ಅಷ್ಟೇ.", "Sari, idu kodi. Ashte.", "Okay, give this one. That's all.", "ठीक है, यह दीजिए। बस।"),
    ],
    prompts: [
      {
        afterLine: 2,
        question: bi("800 is steep. React and ask for less:", "800 ज़्यादा है। प्रतिक्रिया दें और कम माँगें:"),
        options: [
          { kn: "ತುಂಬಾ ದುಬಾರಿ! ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ.", roman: "Tumba dubaari! Swalpa kadime maadi.", en: "Too expensive! Reduce a bit.", correct: true },
          { kn: "ತುಂಬಾ ಕಡಿಮೆ! ಸ್ವಲ್ಪ ಜಾಸ್ತಿ ಮಾಡಿ.", roman: "Tumba kadime! Swalpa jaasti maadi.", en: "Too cheap! Increase a bit.", correct: false, feedback: bi("You just asked him to raise the price!", "आपने दाम बढ़ाने को कह दिया!") },
          { kn: "ಚಿಲ್ಲರೆ ಇದೆಯಾ?", roman: "Chillare ideya?", en: "Do you have change?", correct: false, feedback: bi("Too early — you haven't agreed on a price.", "अभी जल्दी है — दाम तय नहीं हुआ।") },
        ],
      },
      {
        afterLine: 4,
        question: bi("Ask to see blue, in a big size:", "नीला, बड़े साइज़ में दिखाने को कहें:"),
        options: [
          { kn: "ನೀಲಿ ಬಣ್ಣ ತೋರಿಸಿ. ದೊಡ್ಡ ಸೈಜ್.", roman: "Neeli banna torisi. Dodda size.", en: "Show blue. Big size.", correct: true },
          { kn: "ನೀಲಿ ಬಣ್ಣ ಬೇಡ. ಚಿಕ್ಕ ಸೈಜ್.", roman: "Neeli banna beda. Chikka size.", en: "Not blue. Small size.", correct: false, feedback: bi("Beda = don't want; chikka = small.", "Beda = नहीं चाहिए; chikka = छोटा।") },
          { kn: "ಇದು ಹಳೆದು.", roman: "Idu haledu.", en: "This is old.", correct: false },
        ],
      },
    ],
  },
  bossQuestion: {
    id: "d15boss", type: "typein", skill: "conversation",
    prompt: bi("Type in Kannada (roman): 'Is there another colour? Show me.'", "कन्नड़ में टाइप करें (रोमन): 'दूसरा रंग है? दिखाइए।'"),
    answer: "Bere banna ideya? Torisi.",
    acceptable: ["Bere banna ideya torisi", "Bere banna ideya? Torisi", "Bere banna ide? Torisi", "Bere banna ideya, torisi"],
    explanation: bi("Bere (other) + banna (colour) + ideya? (is there?) + torisi (show).", "Bere (दूसरा) + banna (रंग) + ideya? (है?) + torisi (दिखाइए)।"),
  },
  dailyPhrase: {
    kn: "ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ", roman: "Swalpa kadime maadi",
    meaning: bi("Please reduce a little (the universal bargaining line)", "थोड़ा कम कीजिए (सर्वव्यापी मोल-भाव वाक्य)"),
    example: ex("ಐನೂರು? ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ ಅಣ್ಣ.", "Ainooru? Swalpa kadime maadi anna.", "500? Reduce a bit, brother.", "500? थोड़ा कम कीजिए भैया।"),
    mini: [
      line("A", "ಮುನ್ನೂರು ರೂಪಾಯಿ.", "Munnooru rupaayi.", "Three hundred rupees.", "तीन सौ रुपये।"),
      line("B", "ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ, ಇನ್ನೂರೈವತ್ತು?", "Swalpa kadime maadi, innooraivattu?", "Reduce a bit, 250?", "थोड़ा कम कीजिए, 250?"),
    ],
  },
};
