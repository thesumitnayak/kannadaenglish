import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

const vocab = [
  v("eda", "ಎಡ", "Eda", "Left", "बायाँ", { pos: "noun", tags: ["directions", "auto"],
    example: ex("ಎಡಕ್ಕೆ ತಿರುಗಿ.", "Edakke tirugi.", "Turn left.", "बाएँ मुड़िए।") }),
  v("bala", "ಬಲ", "Bala", "Right", "दायाँ", { pos: "noun", tags: ["directions", "auto"],
    example: ex("ಬಲಕ್ಕೆ ತಿರುಗಿ.", "Balakke tirugi.", "Turn right.", "दाएँ मुड़िए।") }),
  v("nera", "ನೇರ", "Nera", "Straight", "सीधा", { pos: "adjective", tags: ["directions", "auto"],
    example: ex("ನೇರವಾಗಿ ಹೋಗಿ.", "Neravaagi hogi.", "Go straight.", "सीधे जाइए।") }),
  v("illi", "ಇಲ್ಲಿ", "Illi", "Here", "यहाँ", { pos: "adverb", tags: ["directions"],
    example: ex("ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ.", "Illi nillisi.", "Stop here.", "यहाँ रोकिए।") }),
  v("alli-there", "ಅಲ್ಲಿ", "Alli", "There", "वहाँ", { pos: "adverb", tags: ["directions"],
    example: ex("ಅಲ್ಲಿ ನೋಡಿ.", "Alli nodi.", "Look there.", "वहाँ देखिए।") }),
  v("hattira", "ಹತ್ತಿರ", "Hattira", "Near", "पास", { pos: "adverb", tags: ["directions"],
    example: ex("ಮೆಟ್ರೋ ಹತ್ತಿರ ಇದೆ.", "Metro hattira ide.", "The metro is near.", "मेट्रो पास है।") }),
  v("doora", "ದೂರ", "Doora", "Far", "दूर", { pos: "adverb", tags: ["directions"],
    bridge: bi("Same word as Hindi दूर!", "हिंदी 'दूर' जैसा ही शब्द!"),
    example: ex("ಎಷ್ಟು ದೂರ?", "Eshtu doora?", "How far?", "कितना दूर?") }),
  v("olage", "ಒಳಗೆ", "Olage", "Inside", "अंदर", { pos: "adverb", tags: ["directions"],
    example: ex("ಒಳಗೆ ಬನ್ನಿ.", "Olage banni.", "Come inside.", "अंदर आइए।") }),
  v("horage", "ಹೊರಗೆ", "Horage", "Outside", "बाहर", { pos: "adverb", tags: ["directions"],
    example: ex("ಹೊರಗೆ ಕಾಯಿರಿ.", "Horage kaayiri.", "Wait outside.", "बाहर इंतज़ार कीजिए।") }),
  v("ellide", "ಎಲ್ಲಿದೆ", "Ellide?", "Where is it?", "कहाँ है?", { pos: "question", tags: ["question", "directions"],
    bridge: bi("elli (where) + ide (is) = ellide. For people: 'elliddaare?'", "elli (कहाँ) + ide (है) = ellide। लोगों के लिए: 'elliddaare?'"),
    example: ex("ಬಸ್ ಸ್ಟಾಪ್ ಎಲ್ಲಿದೆ?", "Bus stop ellide?", "Where is the bus stop?", "बस स्टॉप कहाँ है?") }),
  v("tirugi", "ತಿರುಗಿ", "Tirugi", "Turn (polite)", "मुड़िए", { pos: "verb", formality: "polite", tags: ["verb", "auto"] }),
  v("munde", "ಮುಂದೆ", "Munde", "Ahead / In front", "आगे", { pos: "adverb", tags: ["directions", "auto"],
    example: ex("ಸ್ವಲ್ಪ ಮುಂದೆ ಹೋಗಿ.", "Swalpa munde hogi.", "Go a little ahead.", "थोड़ा आगे जाइए।") }),
  v("hinde", "ಹಿಂದೆ", "Hinde", "Behind / Back", "पीछे", { pos: "adverb", tags: ["directions"] }),
  v("pakka", "ಪಕ್ಕ", "Pakka", "Beside / Next to", "बगल में", { pos: "adverb", tags: ["directions"],
    example: ex("ಬ್ಯಾಂಕ್ ಪಕ್ಕ.", "Bank pakka.", "Next to the bank.", "बैंक के बगल में।") }),
  v("eduru", "ಎದುರು", "Eduru", "Opposite", "सामने", { pos: "adverb", tags: ["directions"],
    example: ex("ಮಾಲ್ ಎದುರು.", "Mall eduru.", "Opposite the mall.", "मॉल के सामने।") }),
  v("raste", "ರಸ್ತೆ", "Raste", "Road", "सड़क", { pos: "noun", tags: ["directions"],
    bridge: bi("Like Hindi रास्ता.", "हिंदी 'रास्ता' जैसा।") }),
  v("nildaana", "ನಿಲ್ದಾಣ", "Nildaana", "Station / Stop", "स्टेशन / स्टॉप", { pos: "noun", tags: ["directions"],
    context: bi("Bus nildaana = bus stand. In speech 'bus stop' / 'metro station' in English is normal.", "Bus nildaana = बस स्टैंड। बोलचाल में अंग्रेज़ी 'bus stop' / 'metro station' आम है।") }),
  v("daari", "ದಾರಿ", "Daari", "Way / Route", "रास्ता", { pos: "noun", tags: ["directions"],
    example: ex("ದಾರಿ ಗೊತ್ತಾ?", "Daari gotta?", "Do you know the way?", "रास्ता पता है?") }),
];

const sentences = [
  s("d6s1", "ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ.", "Illi nillisi.", "Stop here.", "यहाँ रोकिए।", {
    formality: "polite", words: ["Illi", "nillisi"], wordsKn: ["ಇಲ್ಲಿ", "ನಿಲ್ಲಿಸಿ"], tags: ["auto"],
  }),
  s("d6s2", "ಎಡಕ್ಕೆ ತಿರುಗಿ.", "Edakke tirugi.", "Turn left.", "बाएँ मुड़िए।", {
    formality: "polite", words: ["Edakke", "tirugi"], wordsKn: ["ಎಡಕ್ಕೆ", "ತಿರುಗಿ"], tags: ["auto"],
    breakdown: [{ roman: "Eda-kke", meaning: "to the left", hi: "बाएँ (की ओर)" }, { roman: "tirugi", meaning: "turn", hi: "मुड़िए" }],
  }),
  s("d6s3", "ಬಲಕ್ಕೆ ತಿರುಗಿ.", "Balakke tirugi.", "Turn right.", "दाएँ मुड़िए।", {
    formality: "polite", words: ["Balakke", "tirugi"], wordsKn: ["ಬಲಕ್ಕೆ", "ತಿರುಗಿ"], tags: ["auto"],
  }),
  s("d6s4", "ನೇರವಾಗಿ ಹೋಗಿ.", "Neravaagi hogi.", "Go straight.", "सीधे जाइए।", {
    formality: "polite", words: ["Neravaagi", "hogi"], wordsKn: ["ನೇರವಾಗಿ", "ಹೋಗಿ"], tags: ["auto"],
  }),
  s("d6s5", "ಮೆಟ್ರೋ ಸ್ಟೇಷನ್ ಎಲ್ಲಿದೆ?", "Metro station ellide?", "Where is the metro station?", "मेट्रो स्टेशन कहाँ है?", {
    words: ["Metro", "station", "ellide?"], wordsKn: ["ಮೆಟ್ರೋ", "ಸ್ಟೇಷನ್", "ಎಲ್ಲಿದೆ?"],
  }),
  s("d6s6", "ಇಲ್ಲೇ ಹತ್ತಿರ ಇದೆ.", "Ille hattira ide.", "It's right near here.", "यहीं पास है।", {
    words: ["Ille", "hattira", "ide"], wordsKn: ["ಇಲ್ಲೇ", "ಹತ್ತಿರ", "ಇದೆ"],
    note: bi("Illi + e = ille: 'right here'. The -e adds emphasis.", "Illi + e = ille: 'यहीं'। -e से ज़ोर आता है।"),
  }),
  s("d6s7", "ತುಂಬಾ ದೂರ ಇಲ್ಲ.", "Tumba doora illa.", "It's not very far.", "बहुत दूर नहीं है।", {
    words: ["Tumba", "doora", "illa"], wordsKn: ["ತುಂಬಾ", "ದೂರ", "ಇಲ್ಲ"],
  }),
  s("d6s8", "ಸ್ವಲ್ಪ ಮುಂದೆ ಹೋಗಿ.", "Swalpa munde hogi.", "Go a little ahead.", "थोड़ा आगे जाइए।", {
    formality: "polite", words: ["Swalpa", "munde", "hogi"], wordsKn: ["ಸ್ವಲ್ಪ", "ಮುಂದೆ", "ಹೋಗಿ"], tags: ["auto"],
  }),
  s("d6s9", "ಸಿಗ್ನಲ್ ಹತ್ತಿರ ನಿಲ್ಲಿಸಿ.", "Signal hattira nillisi.", "Stop near the signal.", "सिग्नल के पास रोकिए।", {
    formality: "polite", words: ["Signal", "hattira", "nillisi"], wordsKn: ["ಸಿಗ್ನಲ್", "ಹತ್ತಿರ", "ನಿಲ್ಲಿಸಿ"], tags: ["auto"],
  }),
  s("d6s10", "ಎಷ್ಟು ದೂರ?", "Eshtu doora?", "How far?", "कितना दूर?", {
    words: ["Eshtu", "doora?"], wordsKn: ["ಎಷ್ಟು", "ದೂರ?"],
  }),
];

export const day06: DayLesson = {
  day: 6, week: 1, type: "lesson", emoji: "🧭", minutes: 20,
  title: bi("Directions", "दिशाएँ"),
  subtitle: bi("Left, right, straight, here, there — auto-ready Kannada", "बाएँ, दाएँ, सीधे, यहाँ, वहाँ — ऑटो के लिए तैयार कन्नड़"),
  vocab, sentences,
  scriptLetters: ["ba", "ma", "ya", "ra"],
  concept: {
    title: bi("Getting around Bengaluru", "बेंगलुरु में घूमना"),
    intro: bi(
      "Four words run every auto ride: eda, bala, nera, nillisi. Add 'illi' and 'alli' and you can direct anyone anywhere.",
      "हर ऑटो सफ़र चार शब्दों से चलता है: eda, bala, nera, nillisi। 'illi' और 'alli' जोड़ो और किसी को कहीं भी रास्ता बता सकते हो।",
    ),
    sections: [
      {
        heading: bi("'-kke' means 'to'", "'-kke' = 'की ओर'"),
        body: bi("Eda (left) → edakke (to the left). Bala (right) → balakke. Mane (home) → manege (to home). Office → office-ge. This little ending is your 'को / की तरफ़'.", "Eda (बायाँ) → edakke (बाएँ की ओर)। Bala → balakke। Mane (घर) → manege (घर को)। Office → office-ge। यह छोटा अंत आपका 'को / की तरफ़' है।"),
        bridge: [
          { kn: "ಎಡಕ್ಕೆ", roman: "Edakke", hi: "बाएँ", en: "to the left" },
          { kn: "ಬಲಕ್ಕೆ", roman: "Balakke", hi: "दाएँ", en: "to the right" },
          { kn: "ಮನೆಗೆ", roman: "Manege", hi: "घर को", en: "to home" },
          { kn: "ಆಫೀಸ್‌ಗೆ", roman: "Office-ge", hi: "ऑफिस को", en: "to the office" },
        ],
      },
      {
        heading: bi("Ellide? — the question that finds anything", "Ellide? — जो कुछ भी ढूँढ ले"),
        body: bi("[Place] + ellide? That's it. 'Bathroom ellide?' 'ATM ellide?' 'Bus stop ellide?' For a person, use elliddaare: 'Manager elliddaare?'", "[जगह] + ellide? बस। 'Bathroom ellide?' 'ATM ellide?' 'Bus stop ellide?' व्यक्ति के लिए elliddaare: 'Manager elliddaare?'"),
      },
      {
        heading: bi("Answering with hattira / doora / pakka / eduru", "जवाब: hattira / doora / pakka / eduru"),
        body: bi("'Ille hattira ide' (right near here). 'Bank pakka ide' (next to the bank). 'Mall eduru ide' (opposite the mall). 'Swalpa doora ide' (a little far). Notice 'ide' (is) closes the sentence every time.", "'Ille hattira ide' (यहीं पास है)। 'Bank pakka ide' (बैंक के बगल में)। 'Mall eduru ide' (मॉल के सामने)। 'Swalpa doora ide' (थोड़ा दूर)। हर बार 'ide' (है) वाक्य को बंद करता है।"),
        examples: [
          ex("ATM ಬ್ಯಾಂಕ್ ಪಕ್ಕ ಇದೆ.", "ATM bank pakka ide.", "The ATM is next to the bank.", "ATM बैंक के बगल में है।"),
          ex("ಅದು ಸ್ವಲ್ಪ ದೂರ ಇದೆ.", "Adu swalpa doora ide.", "That's a little far.", "वह थोड़ा दूर है।"),
        ],
      },
    ],
    tip: bi("In an auto, say the landmark first, then the direction: 'Signal hattira... edakke.' Drivers think in landmarks, not street names.", "ऑटो में पहले landmark, फिर दिशा: 'Signal hattira... edakke.' ड्राइवर सड़क के नाम नहीं, landmarks से सोचते हैं।"),
  },
  conversation: {
    id: "d6c1",
    title: bi("Guiding the auto home", "ऑटो को घर तक रास्ता बताना"),
    setting: bi("Last stretch of your auto ride.", "ऑटो सफ़र का आखिरी हिस्सा।"),
    speakers: { A: "Driver", B: "You" },
    lines: [
      line("A", "ಎಲ್ಲಿ ಹೋಗ್ಬೇಕು?", "Elli hogbeku?", "Where do we need to go?", "कहाँ जाना है?"),
      line("B", "ನೇರವಾಗಿ ಹೋಗಿ. ಸಿಗ್ನಲ್ ಹತ್ತಿರ ಎಡಕ್ಕೆ.", "Neravaagi hogi. Signal hattira edakke.", "Go straight. Left near the signal.", "सीधे जाइए। सिग्नल के पास बाएँ।"),
      line("A", "ಸರಿ. ಈಗ?", "Sari. Eega?", "Okay. Now?", "ठीक है। अब?"),
      line("B", "ಸ್ವಲ್ಪ ಮುಂದೆ ಹೋಗಿ... ಬಲಕ್ಕೆ ತಿರುಗಿ.", "Swalpa munde hogi... balakke tirugi.", "Go a little ahead... turn right.", "थोड़ा आगे जाइए... दाएँ मुड़िए।"),
      line("A", "ಇಲ್ಲೇನಾ?", "Illena?", "Here?", "यहीं?"),
      line("B", "ಹೌದು, ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ. ಧನ್ಯವಾದ ಅಣ್ಣ!", "Houdu, illi nillisi. Dhanyavaada anna!", "Yes, stop here. Thanks brother!", "हाँ, यहाँ रोकिए। धन्यवाद भैया!"),
    ],
    prompts: [
      {
        afterLine: 0,
        question: bi("Tell him: go straight, left near the signal.", "कहें: सीधे जाइए, सिग्नल के पास बाएँ।"),
        options: [
          { kn: "ನೇರವಾಗಿ ಹೋಗಿ. ಸಿಗ್ನಲ್ ಹತ್ತಿರ ಎಡಕ್ಕೆ.", roman: "Neravaagi hogi. Signal hattira edakke.", en: "Go straight. Left near the signal.", correct: true },
          { kn: "ನೇರವಾಗಿ ಹೋಗಿ. ಸಿಗ್ನಲ್ ಹತ್ತಿರ ಬಲಕ್ಕೆ.", roman: "Neravaagi hogi. Signal hattira balakke.", en: "Go straight. Right near the signal.", correct: false, feedback: bi("Balakke = right. Edakke = left.", "Balakke = दाएँ। Edakke = बाएँ।") },
          { kn: "ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ.", roman: "Illi nillisi.", en: "Stop here.", correct: false, feedback: bi("Too early to stop!", "अभी रुकना जल्दी है!") },
        ],
      },
      {
        afterLine: 4,
        question: bi("He asks 'Illena?' (here?). Confirm and ask him to stop:", "वह पूछता है 'Illena?' (यहीं?)। हाँ कहकर रोकने को कहें:"),
        options: [
          { kn: "ಹೌದು, ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ.", roman: "Houdu, illi nillisi.", en: "Yes, stop here.", correct: true },
          { kn: "ಇಲ್ಲ, ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ.", roman: "Illa, illi nillisi.", en: "No, stop here.", correct: false, feedback: bi("Mixed signals! Houdu = yes.", "उलझन! Houdu = हाँ।") },
          { kn: "ಹೌದು, ಮುಂದೆ ಹೋಗಿ.", roman: "Houdu, munde hogi.", en: "Yes, go ahead.", correct: false },
        ],
      },
    ],
  },
  bossQuestion: {
    id: "d6boss", type: "build", skill: "grammar",
    prompt: bi("Build: 'Stop near the signal.'", "बनाएँ: 'सिग्नल के पास रोकिए।'"),
    answer: "Signal hattira nillisi",
    words: ["Signal", "hattira", "nillisi"],
    explanation: bi("Landmark first (signal), then position (hattira), then the verb (nillisi) at the end.", "पहले landmark (signal), फिर स्थिति (hattira), फिर क्रिया (nillisi) अंत में।"),
  },
  dailyPhrase: {
    kn: "ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ", roman: "Ille nillisi",
    meaning: bi("Stop right here", "यहीं रोकिए"),
    example: ex("ಅಣ್ಣ, ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ, ಸಾಕು.", "Anna, ille nillisi, saaku.", "Brother, stop right here, that's enough.", "भैया, यहीं रोकिए, बस।"),
    mini: [
      line("A", "ಇನ್ನೂ ಮುಂದೆನಾ?", "Innu mundena?", "Further ahead?", "और आगे?"),
      line("B", "ಇಲ್ಲ, ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ.", "Illa, ille nillisi.", "No, stop right here.", "नहीं, यहीं रोकिए।"),
    ],
  },
};
