import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

const vocab = [
  v("neeru", "ನೀರು", "Neeru", "Water", "पानी", { pos: "noun", tags: ["food"],
    example: ex("ನನಗೆ ನೀರು ಬೇಕು.", "Nanage neeru beku.", "I want water.", "मुझे पानी चाहिए।") }),
  v("oota", "ಊಟ", "Oota", "Food / Meal", "खाना", { pos: "noun", tags: ["food"],
    example: ex("ಊಟ ಆಯ್ತಾ?", "Oota aaytaa?", "Have you eaten?", "खाना हुआ?") }),
  v("anna-rice", "ಅನ್ನ", "Anna", "Rice (cooked)", "चावल", { pos: "noun", tags: ["food"],
    context: bi("Soft 'n'. Hard 'ṇ' (ಅಣ್ಣ) is brother.", "नरम 'न'। कड़ा 'ण' (ಅಣ್ಣ) = भाई।") }),
  v("kaafi", "ಕಾಫಿ", "Kaafi", "Coffee", "कॉफ़ी", { pos: "noun", tags: ["food"],
    context: bi("Bengaluru runs on filter coffee. 'Ondu kaafi' is the first thing to order.", "बेंगलुरु फ़िल्टर कॉफ़ी पर चलता है। 'Ondu kaafi' सबसे पहले ऑर्डर करें।") }),
  v("tea", "ಟೀ", "Tea", "Tea", "चाय", { pos: "noun", tags: ["food"],
    context: bi("'Chaha' exists but everyone says tea.", "'Chaha' शब्द है पर सब tea ही कहते हैं।") }),
  v("haalu", "ಹಾಲು", "Haalu", "Milk", "दूध", { pos: "noun", tags: ["food"] }),
  v("tindi", "ತಿಂಡಿ", "Tindi", "Breakfast / Snack", "नाश्ता", { pos: "noun", tags: ["food"],
    example: ex("ತಿಂಡಿ ಆಯ್ತಾ?", "Tindi aaytaa?", "Had breakfast?", "नाश्ता हुआ?") }),
  v("madhyaahna-oota", "ಮಧ್ಯಾಹ್ನದ ಊಟ", "Madhyaahnada oota", "Lunch", "दोपहर का खाना", { pos: "noun", tags: ["food"],
    context: bi("At work, 'lunch' in English is the norm.", "ऑफिस में अंग्रेज़ी 'lunch' ही चलता है।") }),
  v("raatri-oota", "ರಾತ್ರಿ ಊಟ", "Raatri oota", "Dinner", "रात का खाना", { pos: "noun", tags: ["food"] }),
  v("khaara", "ಖಾರ", "Khaara", "Spicy", "तीखा", { pos: "adjective", tags: ["food"],
    example: ex("ಖಾರ ಕಡಿಮೆ ಮಾಡಿ.", "Khaara kadime maadi.", "Make it less spicy.", "तीखा कम कीजिए।") }),
  v("sihi", "ಸಿಹಿ", "Sihi", "Sweet", "मीठा", { pos: "adjective", tags: ["food"] }),
  v("hasivu", "ಹಸಿವು", "Hasivu", "Hunger", "भूख", { pos: "noun", tags: ["food"],
    example: ex("ನನಗೆ ಹಸಿವಾಗಿದೆ.", "Nanage hasivaagide.", "I'm hungry.", "मुझे भूख लगी है।") }),
  v("baayaarike", "ಬಾಯಾರಿಕೆ", "Baayaarike", "Thirst", "प्यास", { pos: "noun", tags: ["food"],
    example: ex("ಬಾಯಾರಿಕೆ ಆಗಿದೆ.", "Baayaarike aagide.", "I'm thirsty.", "प्यास लगी है।") }),
  v("beku", "ಬೇಕು", "Beku", "Want / Need", "चाहिए", { pos: "verb", tags: ["grammar", "food"],
    bridge: bi("Beku = चाहिए. Exactly the same structure: Nanage neeru beku = मुझे पानी चाहिए.", "Beku = चाहिए। बिल्कुल वही बनावट: Nanage neeru beku = मुझे पानी चाहिए।"),
    example: ex("ನನಗೆ ಕಾಫಿ ಬೇಕು.", "Nanage kaafi beku.", "I want coffee.", "मुझे कॉफ़ी चाहिए।") }),
  v("beda", "ಬೇಡ", "Beda", "Don't want", "नहीं चाहिए", { pos: "verb", tags: ["grammar", "food"],
    example: ex("ಸಕ್ಕರೆ ಬೇಡ.", "Sakkare beda.", "No sugar.", "चीनी नहीं चाहिए।") }),
  v("chennagide", "ಚೆನ್ನಾಗಿದೆ", "Chennagide", "It's good / tasty", "अच्छा है", { pos: "expression", tags: ["food", "basic"],
    example: ex("ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ!", "Tumba chennagide!", "It's very good!", "बहुत अच्छा है!") }),
  v("kodi", "ಕೊಡಿ", "Kodi", "Give (polite)", "दीजिए", { pos: "verb", formality: "polite", tags: ["verb"],
    example: ex("ಬಿಲ್ ಕೊಡಿ.", "Bill kodi.", "Give the bill.", "बिल दीजिए।") }),
  v("sakkare", "ಸಕ್ಕರೆ", "Sakkare", "Sugar", "चीनी", { pos: "noun", tags: ["food"] }),
  v("bisi", "ಬಿಸಿ", "Bisi", "Hot (temperature)", "गरम", { pos: "adjective", tags: ["food"],
    context: bi("Bisi = hot in temperature. Khaara = hot/spicy. Bisi bele bath is a famous Bengaluru dish!", "Bisi = तापमान में गरम। Khaara = तीखा। Bisi bele bath बेंगलुरु की मशहूर डिश है!") }),
];

const sentences = [
  s("d5s1", "ನನಗೆ ನೀರು ಬೇಕು.", "Nanage neeru beku.", "I want water.", "मुझे पानी चाहिए।", {
    words: ["Nanage", "neeru", "beku"], wordsKn: ["ನನಗೆ", "ನೀರು", "ಬೇಕು"],
    breakdown: [{ roman: "Nanage", kn: "ನನಗೆ", meaning: "to me", hi: "मुझे" }, { roman: "neeru", kn: "ನೀರು", meaning: "water", hi: "पानी" }, { roman: "beku", kn: "ಬೇಕು", meaning: "want", hi: "चाहिए" }],
    note: bi("The most important sentence pattern in Kannada. Swap 'neeru' for anything.", "कन्नड़ का सबसे ज़रूरी पैटर्न। 'neeru' की जगह कुछ भी रखें।"),
  }),
  s("d5s2", "ಒಂದು ಕಾಫಿ ಕೊಡಿ.", "Ondu kaafi kodi.", "One coffee, please.", "एक कॉफ़ी दीजिए।", {
    formality: "polite", words: ["Ondu", "kaafi", "kodi"], wordsKn: ["ಒಂದು", "ಕಾಫಿ", "ಕೊಡಿ"],
  }),
  s("d5s3", "ಖಾರ ಕಡಿಮೆ ಮಾಡಿ.", "Khaara kadime maadi.", "Make it less spicy.", "तीखा कम कीजिए।", {
    formality: "polite", words: ["Khaara", "kadime", "maadi"], wordsKn: ["ಖಾರ", "ಕಡಿಮೆ", "ಮಾಡಿ"],
    breakdown: [{ roman: "kadime", meaning: "less", hi: "कम" }, { roman: "maadi", meaning: "do / make", hi: "कीजिए" }],
  }),
  s("d5s4", "ನನಗೆ ಹಸಿವಾಗಿದೆ.", "Nanage hasivaagide.", "I'm hungry.", "मुझे भूख लगी है।", {
    words: ["Nanage", "hasivaagide"], wordsKn: ["ನನಗೆ", "ಹಸಿವಾಗಿದೆ"],
    note: bi("hasivu + aagide = hunger has happened. Same logic as Hindi 'भूख लगी है'.", "hasivu + aagide = भूख हो गई है। हिंदी 'भूख लगी है' वाला ही तर्क।"),
  }),
  s("d5s5", "ಇದು ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ.", "Idu tumba chennagide.", "This is very good.", "यह बहुत अच्छा है।", {
    words: ["Idu", "tumba", "chennagide"], wordsKn: ["ಇದು", "ತುಂಬಾ", "ಚೆನ್ನಾಗಿದೆ"],
  }),
  s("d5s6", "ಸಕ್ಕರೆ ಬೇಡ.", "Sakkare beda.", "No sugar.", "चीनी नहीं चाहिए।", {
    words: ["Sakkare", "beda"], wordsKn: ["ಸಕ್ಕರೆ", "ಬೇಡ"],
  }),
  s("d5s7", "ಬಿಲ್ ಕೊಡಿ.", "Bill kodi.", "The bill, please.", "बिल दीजिए।", {
    formality: "polite", words: ["Bill", "kodi"], wordsKn: ["ಬಿಲ್", "ಕೊಡಿ"],
  }),
  s("d5s8", "ಸ್ವಲ್ಪ ನೀರು ಕೊಡಿ.", "Swalpa neeru kodi.", "A little water, please.", "थोड़ा पानी दीजिए।", {
    formality: "polite", words: ["Swalpa", "neeru", "kodi"], wordsKn: ["ಸ್ವಲ್ಪ", "ನೀರು", "ಕೊಡಿ"],
  }),
  s("d5s9", "ತಿಂಡಿ ಆಯ್ತಾ?", "Tindi aaytaa?", "Had breakfast?", "नाश्ता हुआ?", {
    words: ["Tindi", "aaytaa?"], wordsKn: ["ತಿಂಡಿ", "ಆಯ್ತಾ?"],
  }),
  s("d5s10", "ನನಗೆ ದೋಸೆ ಬೇಕು, ಇಡ್ಲಿ ಬೇಡ.", "Nanage dose beku, idli beda.", "I want dosa, not idli.", "मुझे डोसा चाहिए, इडली नहीं।", {
    words: ["Nanage", "dose", "beku,", "idli", "beda"], wordsKn: ["ನನಗೆ", "ದೋಸೆ", "ಬೇಕು,", "ಇಡ್ಲಿ", "ಬೇಡ"],
  }),
];

export const day05: DayLesson = {
  day: 5, week: 1, type: "lesson", emoji: "🍛", minutes: 22,
  title: bi("Food & drinks", "खाना-पीना"),
  subtitle: bi("Beku / beda — the pattern that orders everything", "Beku / beda — वह पैटर्न जिससे सब ऑर्डर होता है"),
  vocab, sentences,
  scriptLetters: ["ta", "da", "na", "pa"],
  concept: {
    title: bi("Nanage ... beku", "Nanage ... beku"),
    intro: bi(
      "Today's pattern is the Hindi 'मुझे ... चाहिए' in Kannada clothing. Nanage = मुझे. Beku = चाहिए. Beda = नहीं चाहिए.",
      "आज का पैटर्न हिंदी 'मुझे ... चाहिए' का कन्नड़ रूप है। Nanage = मुझे। Beku = चाहिए। Beda = नहीं चाहिए।",
    ),
    sections: [
      {
        heading: bi("The bridge", "हिंदी → कन्नड़ पुल"),
        body: bi("Word for word, the sentence is identical in structure. This is why Hindi speakers learn Kannada faster than English speakers.", "शब्द-दर-शब्द बनावट एक जैसी है। इसीलिए हिंदी वाले कन्नड़ अंग्रेज़ी वालों से तेज़ सीखते हैं।"),
        bridge: [
          { kn: "ನನಗೆ", roman: "Nanage", hi: "मुझे", en: "to me" },
          { kn: "ನೀರು", roman: "Neeru", hi: "पानी", en: "water" },
          { kn: "ಬೇಕು", roman: "Beku", hi: "चाहिए", en: "want / need" },
          { kn: "ಬೇಡ", roman: "Beda", hi: "नहीं चाहिए", en: "don't want" },
        ],
      },
      {
        heading: bi("English speakers: the verb goes last", "अंग्रेज़ी वालों के लिए: क्रिया अंत में"),
        body: bi("English: I want water. Kannada: To-me water want. Put the thing you want in the middle and 'beku' at the end. 'Nanage kaafi beku. Nanage dose beku. Nanage ondu auto beku.'", "अंग्रेज़ी: I want water. कन्नड़: मुझे पानी चाहिए। चीज़ बीच में, 'beku' अंत में। 'Nanage kaafi beku. Nanage dose beku. Nanage ondu auto beku.'"),
      },
      {
        heading: bi("Ordering politely", "विनम्रता से ऑर्डर"),
        body: bi("At a counter you don't even need 'nanage'. Just: [number] + [item] + kodi. 'Ondu kaafi kodi.' 'Eradu idli kodi.' Add 'swalpa' for extra softness: 'Swalpa neeru kodi.'", "काउंटर पर 'nanage' की भी ज़रूरत नहीं। बस: [संख्या] + [चीज़] + kodi। 'Ondu kaafi kodi.' 'Eradu idli kodi.' और नरमी के लिए 'swalpa': 'Swalpa neeru kodi.'"),
        examples: [
          ex("ಎರಡು ಇಡ್ಲಿ ಕೊಡಿ.", "Eradu idli kodi.", "Two idlis, please.", "दो इडली दीजिए।"),
          ex("ಒಂದು ಪ್ಲೇಟ್ ಪೂರಿ ಕೊಡಿ.", "Ondu plate poori kodi.", "One plate of poori, please.", "एक प्लेट पूरी दीजिए।"),
        ],
      },
      {
        heading: bi("Likes and feelings use the same 'nanage'", "पसंद और भावना में भी वही 'nanage'"),
        body: bi("Nanage hasivaagide (I'm hungry). Nanage ishta (I like it). Nanage gottilla (I don't know). All start with 'to me'.", "Nanage hasivaagide (मुझे भूख लगी है)। Nanage ishta (मुझे पसंद है)। Nanage gottilla (मुझे नहीं पता)। सब 'मुझे' से शुरू।"),
      },
    ],
    tip: bi("Order your next coffee in Kannada: 'Ondu kaafi kodi, sakkare kadime.' (One coffee, less sugar.)", "अगली कॉफ़ी कन्नड़ में ऑर्डर करें: 'Ondu kaafi kodi, sakkare kadime.' (एक कॉफ़ी, चीनी कम।)"),
  },
  conversation: {
    id: "d5c1",
    title: bi("At a darshini (quick-eats place)", "दर्शिनी (फटाफट खाने की जगह) पर"),
    setting: bi("A busy breakfast counter.", "व्यस्त नाश्ते का काउंटर।"),
    speakers: { A: "Counter", B: "You" },
    lines: [
      line("A", "ಏನು ಬೇಕು?", "Enu beku?", "What do you want?", "क्या चाहिए?"),
      line("B", "ಒಂದು ಮಸಾಲೆ ದೋಸೆ, ಒಂದು ಕಾಫಿ ಕೊಡಿ.", "Ondu masale dose, ondu kaafi kodi.", "One masala dosa and one coffee, please.", "एक मसाला डोसा, एक कॉफ़ी दीजिए।"),
      line("A", "ಕಾಫಿ ಸಕ್ಕರೆ ಬೇಕಾ?", "Kaafi sakkare beka?", "Sugar in the coffee?", "कॉफ़ी में चीनी चाहिए?"),
      line("B", "ಸಕ್ಕರೆ ಕಡಿಮೆ.", "Sakkare kadime.", "Less sugar.", "चीनी कम।"),
      line("A", "ಸರಿ. ಎಪ್ಪತ್ತು ರೂಪಾಯಿ.", "Sari. Eppattu rupaayi.", "Okay. Seventy rupees.", "ठीक है। सत्तर रुपये।"),
      line("B", "ಇದು ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ!", "Idu tumba chennagide!", "This is really good!", "यह बहुत अच्छा है!"),
    ],
    prompts: [
      {
        afterLine: 0,
        question: bi("Order one masala dosa and one coffee:", "एक मसाला डोसा और एक कॉफ़ी ऑर्डर करें:"),
        options: [
          { kn: "ಒಂದು ಮಸಾಲೆ ದೋಸೆ, ಒಂದು ಕಾಫಿ ಕೊಡಿ.", roman: "Ondu masale dose, ondu kaafi kodi.", en: "One masala dosa, one coffee please.", correct: true },
          { kn: "ಮಸಾಲೆ ದೋಸೆ ಬೇಡ.", roman: "Masale dose beda.", en: "I don't want masala dosa.", correct: false, feedback: bi("Beda = don't want. You DO want it: beku / kodi.", "Beda = नहीं चाहिए। आपको चाहिए: beku / kodi।") },
          { kn: "ಎರಡು ಕಾಫಿ ಬೇಡ.", roman: "Eradu kaafi beda.", en: "I don't want two coffees.", correct: false },
        ],
      },
      {
        afterLine: 2,
        question: bi("Sugar? Ask for less:", "चीनी? कम माँगें:"),
        options: [
          { kn: "ಸಕ್ಕರೆ ಕಡಿಮೆ.", roman: "Sakkare kadime.", en: "Less sugar.", correct: true },
          { kn: "ಸಕ್ಕರೆ ಜಾಸ್ತಿ.", roman: "Sakkare jaasti.", en: "More sugar.", correct: false, feedback: bi("Jaasti = more. Kadime = less.", "Jaasti = ज़्यादा। Kadime = कम।") },
          { kn: "ಖಾರ ಕಡಿಮೆ.", roman: "Khaara kadime.", en: "Less spicy.", correct: false, feedback: bi("Spicy coffee? Khaara = spicy; sakkare = sugar.", "तीखी कॉफ़ी? Khaara = तीखा; sakkare = चीनी।") },
        ],
      },
    ],
  },
  bossQuestion: {
    id: "d5boss", type: "typein", skill: "grammar",
    prompt: bi("Type in Kannada (roman): 'I want coffee, not tea.'", "कन्नड़ में टाइप करें (रोमन): 'मुझे कॉफ़ी चाहिए, चाय नहीं।'"),
    answer: "Nanage kaafi beku, tea beda",
    acceptable: ["Nanage kaafi beku tea beda", "Nanage coffee beku, tea beda", "Nanage kafi beku, tea beda", "Nanage kaafi beku, chaha beda"],
    explanation: bi("Nanage (to me) + kaafi beku (coffee want) + tea beda (tea don't want).", "Nanage (मुझे) + kaafi beku (कॉफ़ी चाहिए) + tea beda (चाय नहीं चाहिए)।"),
  },
  dailyPhrase: {
    kn: "ಊಟ ಚೆನ್ನಾಗಿತ್ತು", roman: "Oota chennagittu",
    meaning: bi("The food was good (say it to any host or cook)", "खाना अच्छा था (किसी भी मेज़बान या रसोइए से कहें)"),
    example: ex("ಊಟ ತುಂಬಾ ಚೆನ್ನಾಗಿತ್ತು, ಧನ್ಯವಾದ!", "Oota tumba chennagittu, dhanyavaada!", "The food was really good, thank you!", "खाना बहुत अच्छा था, धन्यवाद!"),
    mini: [
      line("A", "ಊಟ ಹೇಗಿತ್ತು?", "Oota hegittu?", "How was the food?", "खाना कैसा था?"),
      line("B", "ತುಂಬಾ ಚೆನ್ನಾಗಿತ್ತು!", "Tumba chennagittu!", "It was very good!", "बहुत अच्छा था!"),
    ],
  },
};
