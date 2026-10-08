import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

const vocab = [
  v("yaake", "ಯಾಕೆ", "Yaake", "Why?", "क्यों", { pos: "question", tags: ["question"],
    example: ex("ಯಾಕೆ ಬರ್ಲಿಲ್ಲ?", "Yaake barlilla?", "Why didn't you come?", "क्यों नहीं आए?") }),
  v("hege", "ಹೇಗೆ", "Hege", "How?", "कैसे", { pos: "question", tags: ["question"],
    example: ex("ಹೇಗೆ ಹೋಗೋದು?", "Hege hogodu?", "How to go?", "कैसे जाएँ?") }),
  v("yaavudu", "ಯಾವುದು", "Yaavudu", "Which (thing)?", "कौन सा", { pos: "question", tags: ["question"],
    example: ex("ನಿಮ್ಮ ಬಸ್ ಯಾವುದು?", "Nimma bus yaavudu?", "Which is your bus?", "आपकी बस कौन सी है?") }),
  v("yaava", "ಯಾವ", "Yaava", "Which (before a noun)", "कौन सा (संज्ञा से पहले)", { pos: "question", tags: ["question"],
    example: ex("ಯಾವ ಊರು?", "Yaava ooru?", "Which town?", "कौन सा शहर?") }),
  v("ellige", "ಎಲ್ಲಿಗೆ", "Ellige", "To where?", "कहाँ (को)", { pos: "question", tags: ["question", "auto"],
    example: ex("ಎಲ್ಲಿಗೆ ಹೋಗ್ತಿದ್ದೀರಾ?", "Ellige hogtiddira?", "Where are you going?", "कहाँ जा रहे हैं?") }),
  v("eshtu-hottu", "ಎಷ್ಟು ಹೊತ್ತು", "Eshtu hottu", "How long?", "कितनी देर", { pos: "question", tags: ["question", "time"] }),
  v("eshtu-jana", "ಎಷ್ಟು ಜನ", "Eshtu jana", "How many people?", "कितने लोग", { pos: "question", tags: ["question"] }),
  v("ideya", "ಇದೆಯಾ?", "Ideya?", "Is there? / Is it available?", "है क्या?", { pos: "question", tags: ["question", "shopping"],
    bridge: bi("ide (is) + -ya = yes/no question. Neeru ideya? = Is there water?", "ide (है) + -ya = हाँ/नहीं वाला सवाल। Neeru ideya? = पानी है क्या?"),
    example: ex("ರೂಮ್ ಇದೆಯಾ?", "Room ideya?", "Is there a room?", "कमरा है क्या?") }),
  v("houdaa", "ಹೌದಾ?", "Houdaa?", "Really? / Is that so?", "अच्छा? / सच?", { pos: "question", tags: ["question", "basic"],
    context: bi("The perfect listening noise. Say 'houdaa?' and people keep talking.", "सुनते समय बोलने की सही आवाज़। 'houdaa?' कहो और लोग बोलते रहेंगे।") }),
  v("enaadru", "ಏನಾದ್ರೂ", "Enaadru", "Anything / Something", "कुछ भी", { pos: "pronoun", tags: ["basic"],
    example: ex("ಬೇರೆ ಏನಾದ್ರೂ ಬೇಕಾ?", "Bere enaadru beka?", "Anything else?", "और कुछ चाहिए?") }),
  v("yaaraadru", "ಯಾರಾದ್ರೂ", "Yaaraadru", "Anyone / Someone", "कोई", { pos: "pronoun", tags: ["basic"] }),
  v("ellaadru", "ಎಲ್ಲಾದ್ರೂ", "Ellaadru", "Anywhere / Somewhere", "कहीं", { pos: "pronoun", tags: ["basic"] }),
  v("yaavaagalu", "ಯಾವಾಗ್ಲೂ", "Yaavaaglu", "Always", "हमेशा", { pos: "adverb", tags: ["time"] }),
  v("gotta", "ಗೊತ್ತಾ?", "Gotta?", "Do you know?", "पता है?", { pos: "question", tags: ["question"],
    example: ex("ದಾರಿ ಗೊತ್ತಾ?", "Daari gotta?", "Do you know the way?", "रास्ता पता है?") }),
];

const sentences = [
  s("d13s1", "ಇದು ಏನು?", "Idu enu?", "What is this?", "यह क्या है?", { words: ["Idu", "enu?"], wordsKn: ["ಇದು", "ಏನು?"] }),
  s("d13s2", "ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗ್ತಿದ್ದೀರಾ?", "Neevu ellige hogtiddira?", "Where are you going?", "आप कहाँ जा रहे हैं?", {
    formality: "polite", words: ["Neevu", "ellige", "hogtiddira?"], wordsKn: ["ನೀವು", "ಎಲ್ಲಿಗೆ", "ಹೋಗ್ತಿದ್ದೀರಾ?"],
  }),
  s("d13s3", "ಯಾಕೆ ಬರ್ಲಿಲ್ಲ?", "Yaake barlilla?", "Why didn't you come?", "क्यों नहीं आए?", { words: ["Yaake", "barlilla?"], wordsKn: ["ಯಾಕೆ", "ಬರ್ಲಿಲ್ಲ?"] }),
  s("d13s4", "ಹೇಗೆ ಹೋಗೋದು?", "Hege hogodu?", "How do I get there?", "कैसे जाऊँ?", { words: ["Hege", "hogodu?"], wordsKn: ["ಹೇಗೆ", "ಹೋಗೋದು?"] }),
  s("d13s5", "ಬಸ್ ಯಾವಾಗ ಬರುತ್ತೆ?", "Bus yaavaga barutte?", "When will the bus come?", "बस कब आएगी?", {
    words: ["Bus", "yaavaga", "barutte?"], wordsKn: ["ಬಸ್", "ಯಾವಾಗ", "ಬರುತ್ತೆ?"],
  }),
  s("d13s6", "ಇದು ಯಾರದು?", "Idu yaaradu?", "Whose is this?", "यह किसका है?", {
    words: ["Idu", "yaaradu?"], wordsKn: ["ಇದು", "ಯಾರದು?"],
    note: bi("yaaru + du = yaaradu (whose). Like nannadu (mine).", "yaaru + du = yaaradu (किसका)। nannadu (मेरा) की तरह।"),
  }),
  s("d13s7", "ಎಷ್ಟು ಜನ ಬರ್ತಾರೆ?", "Eshtu jana bartaare?", "How many people are coming?", "कितने लोग आ रहे हैं?", {
    words: ["Eshtu", "jana", "bartaare?"], wordsKn: ["ಎಷ್ಟು", "ಜನ", "ಬರ್ತಾರೆ?"],
  }),
  s("d13s8", "ಬೇರೆ ಏನಾದ್ರೂ ಬೇಕಾ?", "Bere enaadru beka?", "Do you want anything else?", "और कुछ चाहिए?", {
    words: ["Bere", "enaadru", "beka?"], wordsKn: ["ಬೇರೆ", "ಏನಾದ್ರೂ", "ಬೇಕಾ?"],
  }),
  s("d13s9", "ಯಾವ ಬಸ್ ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ ಹೋಗುತ್ತೆ?", "Yaava bus Majestic-ge hogutte?", "Which bus goes to Majestic?", "कौन सी बस मैजेस्टिक जाती है?", {
    words: ["Yaava", "bus", "Majestic-ge", "hogutte?"], wordsKn: ["ಯಾವ", "ಬಸ್", "ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ", "ಹೋಗುತ್ತೆ?"],
  }),
  s("d13s10", "ಕನ್ನಡದಲ್ಲಿ ಇದಕ್ಕೆ ಏನು ಹೇಳ್ತಾರೆ?", "Kannadadalli idakke enu heltaare?", "What do you call this in Kannada?", "कन्नड़ में इसे क्या कहते हैं?", {
    words: ["Kannadadalli", "idakke", "enu", "heltaare?"], wordsKn: ["ಕನ್ನಡದಲ್ಲಿ", "ಇದಕ್ಕೆ", "ಏನು", "ಹೇಳ್ತಾರೆ?"],
    note: bi("Your learning superpower. Ask this to any Kannada speaker and learn a word.", "आपकी सीखने की सुपरपावर। किसी भी कन्नड़ भाषी से पूछो, एक शब्द सीखो।"),
  }),
];

export const day13: DayLesson = {
  day: 13, week: 2, type: "lesson", emoji: "❓", minutes: 20,
  title: bi("Questions", "सवाल"),
  subtitle: bi("What, why, where, when, who, how, how much — and the -aa trick", "क्या, क्यों, कहाँ, कब, कौन, कैसे, कितना — और -aa ट्रिक"),
  vocab, sentences,
  scriptLetters: ["ri", "ah", "nga", "nya"],
  concept: {
    title: bi("Two kinds of questions", "दो तरह के सवाल"),
    intro: bi("Kannada questions are easy: question words go where the answer would go (like Hindi), and any sentence becomes a yes/no question by stretching the last vowel to -aa.", "कन्नड़ के सवाल आसान हैं: प्रश्न-शब्द वहीं आता है जहाँ जवाब आएगा (हिंदी की तरह), और आखिरी स्वर को -aa खींचने से कोई भी वाक्य हाँ/नहीं वाला सवाल बन जाता है।"),
    sections: [
      {
        heading: bi("The question words", "प्रश्न-शब्द"),
        body: bi("enu (what), yaaru (who), elli (where), ellige (to where), ellinda (from where), yaavaga (when), yaake (why), hege (how), eshtu (how much/many), yaavudu (which). Notice: most start with 'e' or 'y'. Hindi क-words, Kannada e/y-words.", "enu (क्या), yaaru (कौन), elli (कहाँ), ellige (कहाँ को), ellinda (कहाँ से), yaavaga (कब), yaake (क्यों), hege (कैसे), eshtu (कितना), yaavudu (कौन सा)। ध्यान दो: ज़्यादातर 'e' या 'y' से शुरू। हिंदी क-शब्द, कन्नड़ e/y-शब्द।"),
        bridge: [
          { kn: "ಏನು", roman: "enu", hi: "क्या", en: "what" },
          { kn: "ಯಾಕೆ", roman: "yaake", hi: "क्यों", en: "why" },
          { kn: "ಹೇಗೆ", roman: "hege", hi: "कैसे", en: "how" },
          { kn: "ಯಾವಾಗ", roman: "yaavaga", hi: "कब", en: "when" },
          { kn: "ಎಷ್ಟು", roman: "eshtu", hi: "कितना", en: "how much" },
        ],
      },
      {
        heading: bi("Yes/no questions: stretch the end to -aa", "हाँ/नहीं सवाल: अंत को -aa खींचो"),
        body: bi("Bartira (you'll come) → Bartiraa? (will you come?)\nIde (there is) → Ideya? (is there?)\nBeku (want) → Beka? (do you want?)\nHoudu (yes) → Houdaa? (really?)\nGottu (know) → Gotta? (do you know?)\nThat's it. No word order change.", "Bartira (आप आएँगे) → Bartiraa? (आएँगे क्या?)\nIde (है) → Ideya? (है क्या?)\nBeku (चाहिए) → Beka? (चाहिए क्या?)\nHoudu (हाँ) → Houdaa? (सच?)\nGottu (पता) → Gotta? (पता है?)\nबस। शब्द-क्रम नहीं बदलता।"),
      },
      {
        heading: bi("Any-words: add -aadru", "कोई/कुछ: -aadru जोड़ो"),
        body: bi("enu + aadru = enaadru (anything). yaaru + aadru = yaaraadru (anyone). elli + aadru = ellaadru (anywhere). yaavaga + aadru = yaavaagaadru (anytime).", "enu + aadru = enaadru (कुछ भी)। yaaru + aadru = yaaraadru (कोई)। elli + aadru = ellaadru (कहीं)। yaavaga + aadru = yaavaagaadru (कभी भी)।"),
        examples: [
          ex("ಯಾರಾದ್ರೂ ಇದ್ದಾರಾ?", "Yaaraadru iddaara?", "Is anyone there?", "कोई है?"),
          ex("ಎಲ್ಲಾದ್ರೂ ಹೋಗೋಣ.", "Ellaadru hogona.", "Let's go somewhere.", "कहीं चलें।"),
        ],
      },
    ],
    tip: bi("Learn 'Kannadadalli idakke enu heltaare?' — it turns every Kannada speaker into your teacher.", "'Kannadadalli idakke enu heltaare?' सीखो — हर कन्नड़ भाषी आपका शिक्षक बन जाएगा।"),
  },
  conversation: {
    id: "d13c1",
    title: bi("Lost near Majestic", "मैजेस्टिक के पास भटके"),
    setting: bi("Asking a stranger at the bus stand.", "बस स्टैंड पर किसी अजनबी से पूछना।"),
    speakers: { A: "You", B: "Stranger" },
    lines: [
      line("A", "ಕ್ಷಮಿಸಿ, ಯಾವ ಬಸ್ ಕೋರಮಂಗಲಕ್ಕೆ ಹೋಗುತ್ತೆ?", "Kshamisi, yaava bus Koramangala-kke hogutte?", "Excuse me, which bus goes to Koramangala?", "माफ़ कीजिए, कौन सी बस कोरमंगला जाती है?"),
      line("B", "171. ಅಲ್ಲಿ ಎಡಕ್ಕೆ ನಿಲ್ಲುತ್ತೆ.", "171. Alli edakke nillutte.", "171. It stops over there on the left.", "171। वहाँ बाएँ रुकती है।"),
      line("A", "ಯಾವಾಗ ಬರುತ್ತೆ ಗೊತ್ತಾ?", "Yaavaga barutte gotta?", "Do you know when it comes?", "कब आएगी, पता है?"),
      line("B", "ಹತ್ತು ನಿಮಿಷಕ್ಕೆ ಒಂದು ಇದೆ.", "Hattu nimishakke ondu ide.", "There's one every ten minutes.", "हर दस मिनट में एक है।"),
      line("A", "ಎಷ್ಟು ಹೊತ್ತು ಆಗುತ್ತೆ?", "Eshtu hottu aagutte?", "How long does it take?", "कितनी देर लगती है?"),
      line("B", "ಟ್ರಾಫಿಕ್ ಇದ್ರೆ ಒಂದು ಗಂಟೆ. ಇಲ್ಲಾಂದ್ರೆ ನಲವತ್ತು ನಿಮಿಷ.", "Traffic idre ondu ghante. Illaandre nalavattu nimisha.", "If there's traffic, one hour. Otherwise forty minutes.", "ट्रैफिक हो तो एक घंटा। वरना चालीस मिनट।"),
      line("A", "ಸರಿ, ಧನ್ಯವಾದ!", "Sari, dhanyavaada!", "Okay, thank you!", "ठीक है, धन्यवाद!"),
    ],
    prompts: [
      {
        afterLine: 1,
        question: bi("Ask if he knows when it comes:", "पूछें कि उसे पता है कब आएगी:"),
        options: [
          { kn: "ಯಾವಾಗ ಬರುತ್ತೆ ಗೊತ್ತಾ?", roman: "Yaavaga barutte gotta?", en: "Do you know when it comes?", correct: true },
          { kn: "ಯಾಕೆ ಬರುತ್ತೆ ಗೊತ್ತಾ?", roman: "Yaake barutte gotta?", en: "Do you know why it comes?", correct: false, feedback: bi("Yaake = why. Yaavaga = when.", "Yaake = क्यों। Yaavaga = कब।") },
          { kn: "ಯಾರು ಬರ್ತಾರೆ?", roman: "Yaaru bartaare?", en: "Who is coming?", correct: false },
        ],
      },
      {
        afterLine: 3,
        question: bi("Ask how long the journey takes:", "पूछें सफ़र में कितनी देर लगती है:"),
        options: [
          { kn: "ಎಷ್ಟು ಹೊತ್ತು ಆಗುತ್ತೆ?", roman: "Eshtu hottu aagutte?", en: "How long does it take?", correct: true },
          { kn: "ಎಷ್ಟು ಜನ ಇದ್ದಾರೆ?", roman: "Eshtu jana iddaare?", en: "How many people are there?", correct: false, feedback: bi("Jana = people. Hottu = time/duration.", "Jana = लोग। Hottu = समय/देर।") },
          { kn: "ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತೆ?", roman: "Ellige hogutte?", en: "Where does it go?", correct: false },
        ],
      },
    ],
  },
  bossQuestion: {
    id: "d13boss", type: "typein", skill: "grammar",
    prompt: bi("Turn 'Neevu naale bartira' (you'll come tomorrow) into the question 'Will you come tomorrow?'", "'Neevu naale bartira' (आप कल आएँगे) को सवाल बनाएँ 'क्या आप कल आएँगे?'"),
    answer: "Neevu naale bartiraa?",
    acceptable: ["Neevu naale bartira?", "Neevu naale bartiraa", "Naale bartiraa?", "Naale bartira?"],
    explanation: bi("Stretch the final vowel: bartira → bartiraa? That's the whole trick.", "आखिरी स्वर खींचो: bartira → bartiraa? बस यही ट्रिक है।"),
  },
  dailyPhrase: {
    kn: "ಹೌದಾ?", roman: "Houdaa?",
    meaning: bi("Really? / Is that so? (keeps any conversation going)", "सच? / अच्छा? (कोई भी बातचीत चलाए रखता है)"),
    example: ex("ನಾನು ಮೈಸೂರಿನವನು. — ಹೌದಾ? ಚೆನ್ನಾಗಿದೆ!", "Naanu Mysurinavanu. — Houdaa? Chennagide!", "I'm from Mysuru. — Really? Nice!", "मैं मैसूर से हूँ। — अच्छा? बढ़िया!"),
    mini: [
      line("A", "ನಾಳೆ ರಜೆ.", "Naale raje.", "Tomorrow is a holiday.", "कल छुट्टी है।"),
      line("B", "ಹೌದಾ? ಸೂಪರ್!", "Houdaa? Super!", "Really? Super!", "सच? सुपर!"),
    ],
  },
};
