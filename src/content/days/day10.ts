import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

const vocab = [
  v("maadtini", "ಮಾಡ್ತೀನಿ", "Maadtini", "I do / I'll do", "मैं करता हूँ", { pos: "verb", tags: ["verb", "tense"],
    example: ex("ನಾನು ಕೆಲಸ ಮಾಡ್ತೀನಿ.", "Naanu kelsa maadtini.", "I work.", "मैं काम करता हूँ।") }),
  v("maadtiya", "ಮಾಡ್ತೀಯಾ", "Maadtiya?", "Do you do? (casual)", "तुम करते हो?", { pos: "verb", formality: "casual", tags: ["verb", "tense"] }),
  v("maadtira", "ಮಾಡ್ತೀರಾ", "Maadtira?", "Do you do? (polite)", "आप करते हैं?", { pos: "verb", formality: "polite", tags: ["verb", "tense"],
    example: ex("ನೀವು ಏನು ಮಾಡ್ತೀರಾ?", "Neevu enu maadtira?", "What do you do?", "आप क्या करते हैं?") }),
  v("maadtaane", "ಮಾಡ್ತಾನೆ", "Maadtaane", "He does", "वह करता है", { pos: "verb", tags: ["verb", "tense"] }),
  v("maadtaale", "ಮಾಡ್ತಾಳೆ", "Maadtaale", "She does", "वह करती है", { pos: "verb", tags: ["verb", "tense"] }),
  v("maadtaare", "ಮಾಡ್ತಾರೆ", "Maadtaare", "They do / he-she does (polite)", "वे करते हैं", { pos: "verb", tags: ["verb", "tense"] }),
  v("maadtivi", "ಮಾಡ್ತೀವಿ", "Maadtivi", "We do", "हम करते हैं", { pos: "verb", tags: ["verb", "tense"] }),
  v("hogtini", "ಹೋಗ್ತೀನಿ", "Hogtini", "I go", "मैं जाता हूँ", { pos: "verb", tags: ["verb", "tense"],
    example: ex("ನಾನು ಆಫೀಸ್‌ಗೆ ಹೋಗ್ತೀನಿ.", "Naanu office-ge hogtini.", "I go to the office.", "मैं ऑफिस जाता हूँ।") }),
  v("bartini", "ಬರ್ತೀನಿ", "Bartini", "I come", "मैं आता हूँ", { pos: "verb", tags: ["verb", "tense"],
    example: ex("ಈಗ ಬರ್ತೀನಿ.", "Eega bartini.", "I'm coming now.", "अभी आता हूँ।") }),
  v("tintini", "ತಿಂತೀನಿ", "Tintini", "I eat", "मैं खाता हूँ", { pos: "verb", tags: ["verb", "tense"] }),
  v("kudeetini", "ಕುಡೀತೀನಿ", "Kudeetini", "I drink", "मैं पीता हूँ", { pos: "verb", tags: ["verb", "tense"],
    example: ex("ನಾನು ಕಾಫಿ ಕುಡೀತೀನಿ.", "Naanu kaafi kudeetini.", "I drink coffee.", "मैं कॉफ़ी पीता हूँ।") }),
  v("maataadtini", "ಮಾತಾಡ್ತೀನಿ", "Maataadtini", "I speak", "मैं बोलता हूँ", { pos: "verb", tags: ["verb", "tense"],
    example: ex("ನಾನು ಸ್ವಲ್ಪ ಕನ್ನಡ ಮಾತಾಡ್ತೀನಿ.", "Naanu swalpa Kannada maataadtini.", "I speak a little Kannada.", "मैं थोड़ी कन्नड़ बोलता हूँ।") }),
  v("iddini", "ಇದ್ದೀನಿ", "Iddini", "I am (here / doing)", "मैं हूँ", { pos: "verb", tags: ["verb", "tense"],
    example: ex("ನಾನು ಮನೇಲಿ ಇದ್ದೀನಿ.", "Naanu manelli iddini.", "I'm at home.", "मैं घर पर हूँ।") }),
  v("dina", "ದಿನ", "Dina", "Day", "दिन", { pos: "noun", tags: ["time"],
    bridge: bi("Same as Hindi दिन!", "हिंदी 'दिन' जैसा ही!"),
    example: ex("ಪ್ರತಿ ದಿನ.", "Prati dina.", "Every day.", "हर दिन।") }),
  v("belagge", "ಬೆಳಿಗ್ಗೆ", "Belagge", "Morning", "सुबह", { pos: "noun", tags: ["time"] }),
  v("sanje", "ಸಂಜೆ", "Sanje", "Evening", "शाम", { pos: "noun", tags: ["time"] }),
  v("raatri", "ರಾತ್ರಿ", "Raatri", "Night", "रात", { pos: "noun", tags: ["time"], bridge: bi("Same as Hindi रात!", "हिंदी 'रात' जैसा ही!") }),
];

const sentences = [
  s("d10s1", "ನಾನು ಊಟ ಮಾಡ್ತೀನಿ.", "Naanu oota maadtini.", "I eat (I have my meal).", "मैं खाना खाता हूँ।", {
    words: ["Naanu", "oota", "maadtini"], wordsKn: ["ನಾನು", "ಊಟ", "ಮಾಡ್ತೀನಿ"],
    breakdown: [{ roman: "Naanu", meaning: "I", hi: "मैं" }, { roman: "oota", meaning: "meal", hi: "खाना" }, { roman: "maadtini", meaning: "I do", hi: "करता हूँ" }],
  }),
  s("d10s2", "ನಾನು ಆಫೀಸ್‌ಗೆ ಹೋಗ್ತೀನಿ.", "Naanu office-ge hogtini.", "I go to the office.", "मैं ऑफिस जाता हूँ।", {
    words: ["Naanu", "office-ge", "hogtini"], wordsKn: ["ನಾನು", "ಆಫೀಸ್‌ಗೆ", "ಹೋಗ್ತೀನಿ"],
  }),
  s("d10s3", "ಅವನು ಕಾಫಿ ಕುಡೀತಾನೆ.", "Avanu kaafi kudeetaane.", "He drinks coffee.", "वह कॉफ़ी पीता है।", {
    words: ["Avanu", "kaafi", "kudeetaane"], wordsKn: ["ಅವನು", "ಕಾಫಿ", "ಕುಡೀತಾನೆ"],
  }),
  s("d10s4", "ಅವಳು ಕನ್ನಡ ಮಾತಾಡ್ತಾಳೆ.", "Avalu Kannada maataadtaale.", "She speaks Kannada.", "वह कन्नड़ बोलती है।", {
    words: ["Avalu", "Kannada", "maataadtaale"], wordsKn: ["ಅವಳು", "ಕನ್ನಡ", "ಮಾತಾಡ್ತಾಳೆ"],
  }),
  s("d10s5", "ನೀವು ಏನು ಮಾಡ್ತೀರಾ?", "Neevu enu maadtira?", "What do you do?", "आप क्या करते हैं?", {
    formality: "polite", words: ["Neevu", "enu", "maadtira?"], wordsKn: ["ನೀವು", "ಏನು", "ಮಾಡ್ತೀರಾ?"],
  }),
  s("d10s6", "ನಾನು ಮನೆಗೆ ಹೋಗ್ತಾ ಇದ್ದೀನಿ.", "Naanu manege hogta iddini.", "I am going home.", "मैं घर जा रहा हूँ।", {
    words: ["Naanu", "manege", "hogta", "iddini"], wordsKn: ["ನಾನು", "ಮನೆಗೆ", "ಹೋಗ್ತಾ", "ಇದ್ದೀನಿ"],
    breakdown: [{ roman: "manege", meaning: "to home", hi: "घर को" }, { roman: "hogta iddini", meaning: "am going", hi: "जा रहा हूँ" }],
    note: bi("'-ta iddini' = '-ing' right now. Hogta iddini = going. Maadta iddini = doing.", "'-ta iddini' = अभी '-रहा हूँ'। Hogta iddini = जा रहा हूँ। Maadta iddini = कर रहा हूँ।"),
  }),
  s("d10s7", "ಅವರು ಪ್ರತಿ ದಿನ ಬರ್ತಾರೆ.", "Avaru prati dina bartaare.", "They come every day.", "वे हर दिन आते हैं।", {
    words: ["Avaru", "prati", "dina", "bartaare"], wordsKn: ["ಅವರು", "ಪ್ರತಿ", "ದಿನ", "ಬರ್ತಾರೆ"],
  }),
  s("d10s8", "ನಾವು ಬೆಳಿಗ್ಗೆ ತಿಂಡಿ ತಿಂತೀವಿ.", "Naavu belagge tindi tintivi.", "We eat breakfast in the morning.", "हम सुबह नाश्ता करते हैं।", {
    words: ["Naavu", "belagge", "tindi", "tintivi"], wordsKn: ["ನಾವು", "ಬೆಳಿಗ್ಗೆ", "ತಿಂಡಿ", "ತಿಂತೀವಿ"],
  }),
  s("d10s9", "ನಾನು ಸ್ವಲ್ಪ ಕನ್ನಡ ಮಾತಾಡ್ತೀನಿ.", "Naanu swalpa Kannada maataadtini.", "I speak a little Kannada.", "मैं थोड़ी कन्नड़ बोलता हूँ।", {
    words: ["Naanu", "swalpa", "Kannada", "maataadtini"], wordsKn: ["ನಾನು", "ಸ್ವಲ್ಪ", "ಕನ್ನಡ", "ಮಾತಾಡ್ತೀನಿ"],
  }),
  s("d10s10", "ಏನ್ ಮಾಡ್ತಾ ಇದ್ದೀರಾ?", "En maadta iddira?", "What are you doing?", "आप क्या कर रहे हैं?", {
    formality: "polite", words: ["En", "maadta", "iddira?"], wordsKn: ["ಏನ್", "ಮಾಡ್ತಾ", "ಇದ್ದೀರಾ?"],
  }),
];

export const day10: DayLesson = {
  day: 10, week: 2, type: "lesson", emoji: "⏱️", minutes: 22,
  title: bi("Present tense", "वर्तमान काल"),
  subtitle: bi("Naanu maadtini, neevu maadtira — your first real sentences", "Naanu maadtini, neevu maadtira — आपके पहले असली वाक्य"),
  vocab, sentences,
  scriptLetters: ["tta", "dda", "nna", "pha"],
  concept: {
    title: bi("One pattern, every verb", "एक पैटर्न, हर क्रिया"),
    intro: bi("Spoken Bengaluru Kannada has a simple present tense: root + t + person ending. Learn the endings once; they work for every verb.", "बोलचाल की बेंगलुरु कन्नड़ में वर्तमान काल आसान है: मूल + t + व्यक्ति अंत। अंत एक बार सीखो; हर क्रिया पर चलते हैं।"),
    sections: [
      {
        heading: bi("The endings (spoken)", "अंत (बोलचाल)"),
        body: bi("naanu … -tini (I)\nneenu … -tiya (you, casual)\nneevu … -tira (you, polite)\navanu … -taane (he)\navalu … -taale (she)\navaru … -taare (they / polite)\nnaavu … -tivi (we)\nadu … -utte (it)", "naanu … -tini (मैं)\nneenu … -tiya (तुम)\nneevu … -tira (आप)\navanu … -taane (वह पु.)\navalu … -taale (वह स्त्री)\navaru … -taare (वे)\nnaavu … -tivi (हम)\nadu … -utte (यह/वह चीज़)"),
        bridge: [
          { kn: "ಮಾಡ್ತೀನಿ", roman: "maadtini", hi: "करता/करती हूँ", en: "I do" },
          { kn: "ಮಾಡ್ತೀರಾ", roman: "maadtira", hi: "करते हैं (आप)", en: "you do (polite)" },
          { kn: "ಮಾಡ್ತಾರೆ", roman: "maadtaare", hi: "करते हैं (वे)", en: "they do" },
        ],
      },
      {
        heading: bi("Plug in any root", "कोई भी मूल लगाओ"),
        body: bi("hogu → hogtini (I go). baa/baru → bartini (I come). tinnu → tintini (I eat). kudi → kudeetini (I drink). maataadu → maataadtini (I speak). nodu → nodtini (I see). kodu → kodtini (I give).", "hogu → hogtini (जाता हूँ)। baru → bartini (आता हूँ)। tinnu → tintini (खाता हूँ)। kudi → kudeetini (पीता हूँ)। maataadu → maataadtini (बोलता हूँ)। nodu → nodtini (देखता हूँ)। kodu → kodtini (देता हूँ)।"),
      },
      {
        heading: bi("Right now: -ta iddini", "अभी: -ta iddini"),
        body: bi("For 'I am doing right now' use root + ta + iddini: hogta iddini (going), maadta iddini (doing), kalita iddini (learning). Hindi '-रहा हूँ' maps exactly.", "'अभी कर रहा हूँ' के लिए मूल + ta + iddini: hogta iddini (जा रहा हूँ), maadta iddini (कर रहा हूँ), kalita iddini (सीख रहा हूँ)। हिंदी '-रहा हूँ' से बिल्कुल मेल।"),
        examples: [
          ex("ನಾನು ಕನ್ನಡ ಕಲೀತಾ ಇದ್ದೀನಿ.", "Naanu Kannada kalita iddini.", "I am learning Kannada.", "मैं कन्नड़ सीख रहा हूँ।"),
          ex("ಅವರು ಊಟ ಮಾಡ್ತಾ ಇದ್ದಾರೆ.", "Avaru oota maadta iddaare.", "They are eating.", "वे खाना खा रहे हैं।"),
        ],
      },
      {
        heading: bi("Formal vs spoken", "औपचारिक बनाम बोलचाल"),
        body: bi("Textbooks write 'maaduttene' (ಮಾಡುತ್ತೇನೆ). Everyone in Bengaluru says 'maadtini' (ಮಾಡ್ತೀನಿ). We teach what people say; you'll still recognise the written form.", "किताबें लिखती हैं 'maaduttene' (ಮಾಡುತ್ತೇನೆ)। बेंगलुरु में सब कहते हैं 'maadtini' (ಮಾಡ್ತೀನಿ)। हम वही सिखाते हैं जो लोग बोलते हैं; लिखा रूप भी पहचान लोगे।"),
      },
    ],
    tip: bi("Tonight, narrate three things you do: 'Naanu oota maadtini. Naanu TV nodtini. Naanu malagtini.' Done — present tense owned.", "आज रात तीन काम बोलकर बताओ: 'Naanu oota maadtini. Naanu TV nodtini. Naanu malagtini.' बस — वर्तमान काल आपका।"),
  },
  conversation: {
    id: "d10c1",
    title: bi("What do you do?", "आप क्या करते हैं?"),
    setting: bi("Chatting with your auto driver in traffic.", "ट्रैफिक में ऑटो वाले से बातचीत।"),
    speakers: { A: "Driver", B: "You" },
    lines: [
      line("A", "ಸರ್, ನೀವು ಏನು ಮಾಡ್ತೀರಾ?", "Sir, neevu enu maadtira?", "Sir, what do you do?", "सर, आप क्या करते हैं?"),
      line("B", "ನಾನು ಸಾಫ್ಟ್‌ವೇರ್ ಕೆಲಸ ಮಾಡ್ತೀನಿ.", "Naanu software kelsa maadtini.", "I do software work.", "मैं सॉफ्टवेयर का काम करता हूँ।"),
      line("A", "ಓಹ್. ಪ್ರತಿ ದಿನ ಆಫೀಸ್‌ಗೆ ಹೋಗ್ತೀರಾ?", "Oh. Prati dina office-ge hogtira?", "Oh. Do you go to the office every day?", "ओह। हर दिन ऑफिस जाते हैं?"),
      line("B", "ಇಲ್ಲ, ಮೂರು ದಿನ ಹೋಗ್ತೀನಿ. ಬೇರೆ ದಿನ ಮನೇಲಿ ಕೆಲಸ ಮಾಡ್ತೀನಿ.", "Illa, mooru dina hogtini. Bere dina manelli kelsa maadtini.", "No, I go three days. Other days I work from home.", "नहीं, तीन दिन जाता हूँ। बाकी दिन घर से काम करता हूँ।"),
      line("A", "ಕನ್ನಡ ಚೆನ್ನಾಗಿ ಮಾತಾಡ್ತೀರಾ!", "Kannada chennagi maataadtira!", "You speak Kannada well!", "आप कन्नड़ अच्छी बोलते हैं!"),
      line("B", "ಸ್ವಲ್ಪ ಸ್ವಲ್ಪ. ಕಲೀತಾ ಇದ್ದೀನಿ.", "Swalpa swalpa. Kalita iddini.", "A little. I'm learning.", "थोड़ी-थोड़ी। सीख रहा हूँ।"),
    ],
    prompts: [
      {
        afterLine: 0,
        question: bi("Tell him you do software work:", "बताएँ कि आप सॉफ्टवेयर का काम करते हैं:"),
        options: [
          { kn: "ನಾನು ಸಾಫ್ಟ್‌ವೇರ್ ಕೆಲಸ ಮಾಡ್ತೀನಿ.", roman: "Naanu software kelsa maadtini.", en: "I do software work.", correct: true },
          { kn: "ನಾನು ಸಾಫ್ಟ್‌ವೇರ್ ಕೆಲಸ ಮಾಡ್ತೀರಾ?", roman: "Naanu software kelsa maadtira?", en: "Do I do software work?", correct: false, feedback: bi("-tira is 'you (polite)'. For 'I', use -tini.", "-tira = 'आप'। 'मैं' के लिए -tini।") },
          { kn: "ಅವನು ಸಾಫ್ಟ್‌ವೇರ್ ಕೆಲಸ ಮಾಡ್ತಾನೆ.", roman: "Avanu software kelsa maadtaane.", en: "He does software work.", correct: false },
        ],
      },
      {
        afterLine: 4,
        question: bi("He compliments your Kannada. Reply modestly:", "वह आपकी कन्नड़ की तारीफ़ करता है। विनम्र जवाब:"),
        options: [
          { kn: "ಸ್ವಲ್ಪ ಸ್ವಲ್ಪ. ಕಲೀತಾ ಇದ್ದೀನಿ.", roman: "Swalpa swalpa. Kalita iddini.", en: "A little. I'm learning.", correct: true },
          { kn: "ಹೌದು, ತುಂಬಾ ಚೆನ್ನಾಗಿ.", roman: "Houdu, tumba chennagi.", en: "Yes, very well.", correct: false, feedback: bi("Grammatically fine, but a little boastful! 'Kalita iddini' is the charming answer.", "व्याकरण ठीक है पर थोड़ा घमंडी! 'Kalita iddini' प्यारा जवाब है।") },
          { kn: "ಗೊತ್ತಿಲ್ಲ.", roman: "Gottilla.", en: "I don't know.", correct: false },
        ],
      },
    ],
  },
  bossQuestion: {
    id: "d10boss", type: "typein", skill: "grammar",
    prompt: bi("Type in Kannada (roman): 'She goes to the office every day.'", "कन्नड़ में टाइप करें (रोमन): 'वह (स्त्री) हर दिन ऑफिस जाती है।'"),
    answer: "Avalu prati dina office-ge hogtaale",
    acceptable: ["Avalu prati dina officege hogtaale", "Avalu prati dina office ge hogtaale", "Avalu pratidina office-ge hogtaale", "Avalu dina office-ge hogtaale"],
    explanation: bi("Avalu (she) + prati dina (every day) + office-ge (to office) + hogtaale (she goes).", "Avalu (वह) + prati dina (हर दिन) + office-ge (ऑफिस को) + hogtaale (जाती है)।"),
  },
  dailyPhrase: {
    kn: "ಈಗ ಬರ್ತೀನಿ", roman: "Eega bartini",
    meaning: bi("I'll be right back / coming now", "अभी आता हूँ"),
    example: ex("ಒಂದು ನಿಮಿಷ, ಈಗ ಬರ್ತೀನಿ.", "Ondu nimisha, eega bartini.", "One minute, I'll be right back.", "एक मिनट, अभी आता हूँ।"),
    mini: [
      line("A", "ಎಲ್ಲಿದ್ದೀರಾ?", "Elliddira?", "Where are you?", "कहाँ हैं आप?"),
      line("B", "ಹತ್ತಿರ ಇದ್ದೀನಿ, ಈಗ ಬರ್ತೀನಿ.", "Hattira iddini, eega bartini.", "I'm near, coming now.", "पास ही हूँ, अभी आता हूँ।"),
    ],
  },
};
