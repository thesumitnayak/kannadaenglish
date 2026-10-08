import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";
import { kannadaNumber } from "../numbers";

const num = (n: number, hi: string) => {
  const k = kannadaNumber(n);
  return v(`num${n}`, k.kn, k.roman, String(n), hi, { pos: "number", tags: ["number"] });
};

const vocab = [
  num(1, "एक"), num(2, "दो"), num(3, "तीन"), num(4, "चार"), num(5, "पाँच"),
  num(6, "छह"), num(7, "सात"), num(8, "आठ"), num(9, "नौ"), num(10, "दस"),
  num(20, "बीस"), num(50, "पचास"), num(100, "सौ"),
  v("eshtu", "ಎಷ್ಟು", "Eshtu", "How much / How many?", "कितना / कितने", { pos: "question", tags: ["question", "shopping"],
    context: bi("Your shopping and auto superpower. 'Idu eshtu?' = How much is this?", "शॉपिंग और ऑटो की सुपरपावर। 'Idu eshtu?' = यह कितने का है?"),
    example: ex("ಇದು ಎಷ್ಟು?", "Idu eshtu?", "How much is this?", "यह कितने का है?") }),
  v("rupaayi", "ರೂಪಾಯಿ", "Rupaayi", "Rupees", "रुपये", { pos: "noun", tags: ["shopping", "number"],
    example: ex("ಐವತ್ತು ರೂಪಾಯಿ.", "Aivattu rupaayi.", "Fifty rupees.", "पचास रुपये।") }),
  v("nimisha", "ನಿಮಿಷ", "Nimisha", "Minute", "मिनट", { pos: "noun", tags: ["time", "number"],
    example: ex("ಐದು ನಿಮಿಷ.", "Aidu nimisha.", "Five minutes.", "पाँच मिनट।") }),
  v("ghante", "ಗಂಟೆ", "Ghante", "Hour / O'clock", "घंटा / बजे", { pos: "noun", tags: ["time", "number"],
    example: ex("ಎಷ್ಟು ಗಂಟೆ?", "Eshtu ghante?", "What time is it?", "कितने बजे हैं?") }),
  v("saavira", "ಸಾವಿರ", "Saavira", "Thousand", "हज़ार", { pos: "number", tags: ["number"],
    example: ex("ಒಂದು ಸಾವಿರ ರೂಪಾಯಿ.", "Ondu saavira rupaayi.", "One thousand rupees.", "एक हज़ार रुपये।") }),
];

const sentences = [
  s("d3s1", "ಇದು ಎಷ್ಟು?", "Idu eshtu?", "How much is this?", "यह कितने का है?", {
    words: ["Idu", "eshtu?"], wordsKn: ["ಇದು", "ಎಷ್ಟು?"], tags: ["shopping"],
  }),
  s("d3s2", "ಐವತ್ತು ರೂಪಾಯಿ.", "Aivattu rupaayi.", "Fifty rupees.", "पचास रुपये।", {
    words: ["Aivattu", "rupaayi"], wordsKn: ["ಐವತ್ತು", "ರೂಪಾಯಿ"],
  }),
  s("d3s3", "ಎರಡು ಕಾಫಿ ಕೊಡಿ.", "Eradu kaafi kodi.", "Give two coffees.", "दो कॉफ़ी दीजिए।", {
    formality: "polite", words: ["Eradu", "kaafi", "kodi"], wordsKn: ["ಎರಡು", "ಕಾಫಿ", "ಕೊಡಿ"],
    breakdown: [{ roman: "Eradu", meaning: "two", hi: "दो" }, { roman: "kaafi", meaning: "coffee", hi: "कॉफ़ी" }, { roman: "kodi", meaning: "give (polite)", hi: "दीजिए" }],
  }),
  s("d3s4", "ಎಷ್ಟು ಗಂಟೆ?", "Eshtu ghante?", "What time is it?", "कितने बजे हैं?", {
    words: ["Eshtu", "ghante?"], wordsKn: ["ಎಷ್ಟು", "ಗಂಟೆ?"],
  }),
  s("d3s5", "ಹತ್ತು ನಿಮಿಷ ಕಾಯಿರಿ.", "Hattu nimisha kaayiri.", "Wait ten minutes.", "दस मिनट रुकिए।", {
    formality: "polite", words: ["Hattu", "nimisha", "kaayiri"], wordsKn: ["ಹತ್ತು", "ನಿಮಿಷ", "ಕಾಯಿರಿ"],
  }),
  s("d3s6", "ನೂರು ರೂಪಾಯಿ ಜಾಸ್ತಿ.", "Nooru rupaayi jaasti.", "Hundred rupees is too much.", "सौ रुपये ज़्यादा है।", {
    words: ["Nooru", "rupaayi", "jaasti"], wordsKn: ["ನೂರು", "ರೂಪಾಯಿ", "ಜಾಸ್ತಿ"],
    note: bi("'Jaasti' = more / too much. Pure Bengaluru bargaining.", "'Jaasti' = ज़्यादा। बेंगलुरु की असली मोल-भाव वाली भाषा।"),
  }),
  s("d3s7", "ಒಂದು ಕೆಜಿ ಕೊಡಿ.", "Ondu kg kodi.", "Give one kilo.", "एक किलो दीजिए।", {
    formality: "polite", words: ["Ondu", "kg", "kodi"], wordsKn: ["ಒಂದು", "ಕೆಜಿ", "ಕೊಡಿ"],
  }),
  s("d3s8", "ಮೂರು ಜನ ಇದ್ದೀವಿ.", "Mooru jana iddivi.", "We are three people.", "हम तीन लोग हैं।", {
    words: ["Mooru", "jana", "iddivi"], wordsKn: ["ಮೂರು", "ಜನ", "ಇದ್ದೀವಿ"],
    note: bi("Useful at restaurants: 'Mooru jana' = table for three.", "रेस्टोरेंट में काम आता है: 'Mooru jana' = तीन लोगों की टेबल।"),
  }),
];

export const day03: DayLesson = {
  day: 3, week: 1, type: "lesson", emoji: "🔢", minutes: 20,
  title: bi("Numbers", "संख्याएँ"),
  subtitle: bi("1 to 100, prices, minutes and time", "1 से 100, दाम, मिनट और समय"),
  vocab, sentences,
  scriptLetters: ["o", "oo", "ai", "au"],
  concept: {
    title: bi("Numbers follow a pattern", "संख्याओं का पैटर्न"),
    intro: bi(
      "Learn 1–10 by heart. Then 20, 30 … 90 are built from them, and 21–99 are just tens + units stuck together.",
      "1–10 रट लो। फिर 20, 30 … 90 उन्हीं से बनते हैं, और 21–99 बस दहाई + इकाई को जोड़ना है।",
    ),
    sections: [
      {
        heading: bi("1 to 10", "1 से 10"),
        body: bi("Ondu, eradu, mooru, naalku, aidu, aaru, elu, entu, ombattu, hattu. Say them out loud five times — rhythm helps.", "Ondu, eradu, mooru, naalku, aidu, aaru, elu, entu, ombattu, hattu. पाँच बार ज़ोर से बोलिए — लय से याद होता है।"),
      },
      {
        heading: bi("Teens", "11 से 19"),
        body: bi("Hattu (10) + unit: hannondu (11), hanneradu (12), hadimooru (13), hadinaalku (14), hadinaidu (15), hadinaaru (16), hadinelu (17), hadinentu (18), hattombattu (19).", "Hattu (10) + इकाई: hannondu (11), hanneradu (12), hadimooru (13), hadinaalku (14), hadinaidu (15), hadinaaru (16), hadinelu (17), hadinentu (18), hattombattu (19)।"),
      },
      {
        heading: bi("Tens and compounds", "दहाई और जोड़"),
        body: bi(
          "Ippattu 20, moovattu 30, nalavattu 40, aivattu 50, aravattu 60, eppattu 70, embattu 80, tombattu 90, nooru 100.\nTo say 25: ippatt + aidu → ippattaidu. 42: nalavatt + eradu → nalavatteradu. 99: tombattombattu.",
          "Ippattu 20, moovattu 30, nalavattu 40, aivattu 50, aravattu 60, eppattu 70, embattu 80, tombattu 90, nooru 100.\n25 कहने के लिए: ippatt + aidu → ippattaidu. 42: nalavatt + eradu → nalavatteradu. 99: tombattombattu.",
        ),
        examples: [
          ex("ಇಪ್ಪತ್ತೈದು", "Ippattaidu", "25", "पच्चीस"),
          ex("ನಲವತ್ತೆರಡು", "Nalavatteradu", "42", "बयालीस"),
          ex("ಎಂಬತ್ತೊಂದು", "Embattondu", "81", "इक्यासी"),
        ],
      },
      {
        heading: bi("Real life: prices and time", "असली ज़िंदगी: दाम और समय"),
        body: bi("Auto drivers quote 'nooru' (100), 'nooraivattu' (150), 'innooru' (200). For time: 'eradu ghante' = 2 o'clock, 'aidu nimisha' = 5 minutes.", "ऑटो वाले कहेंगे 'nooru' (100), 'nooraivattu' (150), 'innooru' (200)। समय: 'eradu ghante' = 2 बजे, 'aidu nimisha' = 5 मिनट।"),
        bridge: [
          { kn: "ನೂರೈವತ್ತು", roman: "Nooraivattu", hi: "डेढ़ सौ", en: "150" },
          { kn: "ಇನ್ನೂರು", roman: "Innooru", hi: "दो सौ", en: "200" },
          { kn: "ಐನೂರು", roman: "Ainooru", hi: "पाँच सौ", en: "500" },
        ],
      },
    ],
    tip: bi("Hindi speakers: 'ek-do-teen' rhythm maps nicely onto 'ondu-eradu-mooru'. Count your stairs in Kannada today.", "हिंदी वालों के लिए: 'एक-दो-तीन' की लय 'ondu-eradu-mooru' पर अच्छे से बैठती है। आज सीढ़ियाँ कन्नड़ में गिनिए।"),
  },
  conversation: {
    id: "d3c1",
    title: bi("At the fruit cart", "फल की ठेली पर"),
    setting: bi("A roadside fruit seller.", "सड़क किनारे फल बेचने वाला।"),
    speakers: { A: "You", B: "Seller" },
    lines: [
      line("A", "ಅಣ್ಣ, ಇದು ಎಷ್ಟು?", "Anna, idu eshtu?", "Brother, how much is this?", "भैया, यह कितने का है?"),
      line("B", "ಒಂದು ಕೆಜಿ ಎಂಬತ್ತು ರೂಪಾಯಿ.", "Ondu kg embattu rupaayi.", "Eighty rupees a kilo.", "एक किलो अस्सी रुपये।"),
      line("A", "ಎಂಬತ್ತು ಜಾಸ್ತಿ. ಅರವತ್ತು ಕೊಡಿ.", "Embattu jaasti. Aravattu kodi.", "Eighty is too much. Give for sixty.", "अस्सी ज़्यादा है। साठ में दीजिए।"),
      line("B", "ಸರಿ, ಎಪ್ಪತ್ತು. ಎಷ್ಟು ಬೇಕು?", "Sari, eppattu. Eshtu beku?", "Okay, seventy. How much do you want?", "ठीक है, सत्तर। कितना चाहिए?"),
      line("A", "ಎರಡು ಕೆಜಿ ಕೊಡಿ.", "Eradu kg kodi.", "Give two kilos.", "दो किलो दीजिए।"),
      line("B", "ನೂರ ನಲವತ್ತು ರೂಪಾಯಿ.", "Noora nalavattu rupaayi.", "One hundred forty rupees.", "एक सौ चालीस रुपये।"),
    ],
    prompts: [
      {
        afterLine: 1,
        question: bi("He says 80 per kilo. Bargain to 60:", "वह कहता है 80 प्रति किलो। 60 में मोल-भाव करें:"),
        options: [
          { kn: "ಎಂಬತ್ತು ಜಾಸ್ತಿ. ಅರವತ್ತು ಕೊಡಿ.", roman: "Embattu jaasti. Aravattu kodi.", en: "80 is too much. Give for 60.", correct: true },
          { kn: "ಅರವತ್ತು ಜಾಸ್ತಿ. ಎಂಬತ್ತು ಕೊಡಿ.", roman: "Aravattu jaasti. Embattu kodi.", en: "60 is too much. Give for 80.", correct: false, feedback: bi("You just offered to pay MORE. Aravattu = 60, embattu = 80.", "आपने ज़्यादा देने की पेशकश कर दी! Aravattu = 60, embattu = 80।") },
          { kn: "ಐದು ಕೊಡಿ.", roman: "Aidu kodi.", en: "Give for 5.", correct: false, feedback: bi("Aidu is 5 — a bit too optimistic!", "Aidu = 5 — थोड़ा ज़्यादा उम्मीद!") },
        ],
      },
      {
        afterLine: 3,
        question: bi("He asks how much you want. Say two kilos:", "वह पूछता है कितना चाहिए। दो किलो कहें:"),
        options: [
          { kn: "ಎರಡು ಕೆಜಿ ಕೊಡಿ.", roman: "Eradu kg kodi.", en: "Give two kilos.", correct: true },
          { kn: "ಮೂರು ಕೆಜಿ ಕೊಡಿ.", roman: "Mooru kg kodi.", en: "Give three kilos.", correct: false, feedback: bi("Mooru = 3. Eradu = 2.", "Mooru = 3। Eradu = 2।") },
          { kn: "ಎರಡು ಗಂಟೆ.", roman: "Eradu ghante.", en: "Two o'clock.", correct: false },
        ],
      },
    ],
  },
  bossQuestion: {
    id: "d3boss", type: "mcq", skill: "vocabulary",
    prompt: bi("The auto driver says 'nooraivattu'. How many rupees is that?", "ऑटो वाला कहता है 'nooraivattu'। कितने रुपये?"),
    options: ["150", "115", "500", "105"],
    answer: "150",
    explanation: bi("Nooru (100) + aivattu (50) = nooraivattu (150).", "Nooru (100) + aivattu (50) = nooraivattu (150)।"),
  },
  dailyPhrase: {
    kn: "ಎಷ್ಟು ಆಗುತ್ತೆ?", roman: "Eshtu aagutte?",
    meaning: bi("How much will it cost?", "कितना होगा?"),
    example: ex("ಕೋರಮಂಗಲಕ್ಕೆ ಎಷ್ಟು ಆಗುತ್ತೆ?", "Koramangala-kke eshtu aagutte?", "How much to Koramangala?", "कोरमंगला तक कितना होगा?"),
    mini: [
      line("A", "ಅಣ್ಣ, ಎಷ್ಟು ಆಗುತ್ತೆ?", "Anna, eshtu aagutte?", "Brother, how much will it be?", "भैया, कितना होगा?"),
      line("B", "ನೂರು ರೂಪಾಯಿ.", "Nooru rupaayi.", "Hundred rupees.", "सौ रुपये।"),
    ],
  },
};
