import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

const vocab = [
  v("namaskara", "ನಮಸ್ಕಾರ", "Namaskara", "Hello / Greetings", "नमस्ते", {
    pos: "phrase", formality: "polite", tags: ["greeting"],
    context: bi("Works at any time of day, with anyone. Add 'sir' or 'madam' at work.", "दिन के किसी भी समय, किसी से भी। ऑफिस में 'sir' या 'madam' जोड़ें।"),
    example: ex("ನಮಸ್ಕಾರ ಸರ್, ಹೇಗಿದ್ದೀರಾ?", "Namaskara sir, hegiddira?", "Hello sir, how are you?", "नमस्ते सर, आप कैसे हैं?"),
  }),
  v("dhanyavaada", "ಧನ್ಯವಾದ", "Dhanyavaada", "Thank you", "धन्यवाद", {
    pos: "phrase", formality: "polite", tags: ["greeting"],
    context: bi("'Thanks' in English is just as common in Bengaluru. Dhanyavaada earns a smile.", "बेंगलुरु में अंग्रेज़ी 'Thanks' भी उतना ही आम है। Dhanyavaada कहने पर लोग खुश होते हैं।"),
    example: ex("ಧನ್ಯವಾದ ಅಣ್ಣ!", "Dhanyavaada anna!", "Thank you, brother!", "धन्यवाद भैया!"),
  }),
  v("houdu", "ಹೌದು", "Houdu", "Yes", "हाँ", {
    pos: "particle", tags: ["basic"],
    example: ex("ಹೌದು, ಸರಿ.", "Houdu, sari.", "Yes, okay.", "हाँ, ठीक है।"),
  }),
  v("illa", "ಇಲ್ಲ", "Illa", "No / Not there", "नहीं", {
    pos: "particle", tags: ["basic"],
    bridge: bi("Illa = 'no' AND 'there isn't'. 'Time illa' = no time.", "Illa = 'नहीं' और 'नहीं है' दोनों। 'Time illa' = समय नहीं है।"),
    example: ex("ಟೈಮ್ ಇಲ್ಲ.", "Time illa.", "There's no time.", "समय नहीं है।"),
  }),
  v("dayavittu", "ದಯವಿಟ್ಟು", "Dayavittu", "Please", "कृपया", {
    pos: "adverb", formality: "formal", tags: ["basic"],
    context: bi("Formal. In daily speech, politeness comes from the verb ending (-i) and 'swalpa'.", "औपचारिक। रोज़ की बोलचाल में विनम्रता क्रिया के अंत (-i) और 'swalpa' से आती है।"),
    example: ex("ದಯವಿಟ್ಟು ಕೂತ್ಕೊಳ್ಳಿ.", "Dayavittu kootkolli.", "Please sit.", "कृपया बैठिए।"),
  }),
  v("kshamisi", "ಕ್ಷಮಿಸಿ", "Kshamisi", "Sorry / Excuse me", "माफ़ कीजिए", {
    pos: "phrase", formality: "polite", tags: ["basic"],
    context: bi("Use it to apologise and to get someone's attention.", "माफ़ी माँगने और किसी का ध्यान खींचने, दोनों के लिए।"),
    example: ex("ಕ್ಷಮಿಸಿ, ಲೇಟ್ ಆಯ್ತು.", "Kshamisi, late aaytu.", "Sorry, I got late.", "माफ़ कीजिए, देर हो गई।"),
  }),
  v("banni", "ಬನ್ನಿ", "Banni", "Come (polite)", "आइए", {
    pos: "verb", formality: "polite", tags: ["verb"],
    context: bi("Casual form is 'baa' (ಬಾ) for friends and younger people.", "दोस्तों/छोटों के लिए casual रूप 'baa' (ಬಾ) है।"),
    example: ex("ಒಳಗೆ ಬನ್ನಿ.", "Olage banni.", "Come inside.", "अंदर आइए।"),
  }),
  v("hogi", "ಹೋಗಿ", "Hogi", "Go (polite)", "जाइए", {
    pos: "verb", formality: "polite", tags: ["verb"],
    context: bi("Casual: 'hogu' (ಹೋಗು).", "Casual: 'hogu' (ಹೋಗು)।"),
    example: ex("ನೇರವಾಗಿ ಹೋಗಿ.", "Neravaagi hogi.", "Go straight.", "सीधे जाइए।"),
  }),
  v("nillisi", "ನಿಲ್ಲಿಸಿ", "Nillisi", "Stop (the vehicle)", "रोकिए", {
    pos: "verb", formality: "polite", tags: ["verb", "auto"],
    context: bi("Your most-used auto word. 'Nilli' = you stand/stop; 'Nillisi' = stop it (the auto).", "ऑटो में सबसे ज़्यादा काम आने वाला शब्द। 'Nilli' = आप रुकिए; 'Nillisi' = (ऑटो) रोकिए।"),
    example: ex("ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ.", "Illi nillisi.", "Stop here.", "यहाँ रोकिए।"),
  }),
  v("enu", "ಏನು", "Enu", "What?", "क्या", {
    pos: "question", tags: ["question"],
    example: ex("ಇದು ಏನು?", "Idu enu?", "What is this?", "यह क्या है?"),
  }),
  v("yaaru", "ಯಾರು", "Yaaru", "Who?", "कौन", {
    pos: "question", tags: ["question"],
    example: ex("ಅವರು ಯಾರು?", "Avaru yaaru?", "Who is that?", "वे कौन हैं?"),
  }),
  v("elli", "ಎಲ್ಲಿ", "Elli", "Where?", "कहाँ", {
    pos: "question", tags: ["question"],
    example: ex("ಬಾತ್‌ರೂಮ್ ಎಲ್ಲಿ?", "Bathroom elli?", "Where is the bathroom?", "बाथरूम कहाँ है?"),
  }),
  v("sari", "ಸರಿ", "Sari", "Okay / Right", "ठीक है", {
    pos: "particle", tags: ["basic"],
    example: ex("ಸರಿ, ನಾಳೆ ಸಿಗೋಣ.", "Sari, naale sigona.", "Okay, let's meet tomorrow.", "ठीक है, कल मिलते हैं।"),
  }),
  v("parvagilla", "ಪರವಾಗಿಲ್ಲ", "Parvagilla", "It's okay / No problem", "कोई बात नहीं", {
    pos: "expression", tags: ["basic"],
    example: ex("ಪರವಾಗಿಲ್ಲ, ಬಿಡಿ.", "Parvagilla, bidi.", "No problem, leave it.", "कोई बात नहीं, छोड़िए।"),
  }),
  v("hegiddira", "ಹೇಗಿದ್ದೀರಾ?", "Hegiddira?", "How are you? (polite)", "आप कैसे हैं?", {
    pos: "phrase", formality: "polite", tags: ["greeting"],
    context: bi("Casual: 'Hegiddiya?' (ಹೇಗಿದ್ದೀಯಾ) for friends.", "दोस्तों के लिए casual: 'Hegiddiya?' (ಹೇಗಿದ್ದೀಯಾ)।"),
    example: ex("ಅಮ್ಮ ಹೇಗಿದ್ದಾರೆ?", "Amma hegiddaare?", "How is your mother?", "माँ कैसी हैं?"),
  }),
  v("chennagiddini", "ಚೆನ್ನಾಗಿದ್ದೀನಿ", "Chennagiddini", "I'm fine", "मैं ठीक हूँ", {
    pos: "phrase", tags: ["greeting"],
    bridge: bi("Chennagi = well/nicely + iddini = I am.", "Chennagi = अच्छे से + iddini = मैं हूँ।"),
    example: ex("ಚೆನ್ನಾಗಿದ್ದೀನಿ, ನೀವು?", "Chennagiddini, neevu?", "I'm fine, and you?", "मैं ठीक हूँ, आप?"),
  }),
  v("gottilla", "ಗೊತ್ತಿಲ್ಲ", "Gottilla", "I don't know", "मुझे नहीं पता", {
    pos: "phrase", tags: ["basic"],
    bridge: bi("Gottu = known (पता) + illa = not. 'Gotta?' = Do you know?", "Gottu = पता + illa = नहीं। 'Gotta?' = पता है?"),
    example: ex("ನನಗೆ ಗೊತ್ತಿಲ್ಲ.", "Nanage gottilla.", "I don't know.", "मुझे नहीं पता।"),
  }),
  v("swalpa", "ಸ್ವಲ್ಪ", "Swalpa", "A little / a bit", "थोड़ा", {
    pos: "adverb", tags: ["basic"],
    context: bi("The magic softener. 'Swalpa' before any request makes it polite.", "जादुई शब्द। किसी भी request से पहले 'swalpa' लगाने से वह विनम्र हो जाती है।"),
    example: ex("ಸ್ವಲ್ಪ ನೀರು ಕೊಡಿ.", "Swalpa neeru kodi.", "Give me a little water.", "थोड़ा पानी दीजिए।"),
  }),
];

const sentences = [
  s("d1s1", "ನಮಸ್ಕಾರ, ಹೇಗಿದ್ದೀರಾ?", "Namaskara, hegiddira?", "Hello, how are you?", "नमस्ते, आप कैसे हैं?", {
    formality: "polite", words: ["Namaskara,", "hegiddira?"], wordsKn: ["ನಮಸ್ಕಾರ,", "ಹೇಗಿದ್ದೀರಾ?"], tags: ["greeting"],
  }),
  s("d1s2", "ಚೆನ್ನಾಗಿದ್ದೀನಿ, ನೀವು?", "Chennagiddini, neevu?", "I'm fine, and you?", "मैं ठीक हूँ, आप?", {
    words: ["Chennagiddini,", "neevu?"], wordsKn: ["ಚೆನ್ನಾಗಿದ್ದೀನಿ,", "ನೀವು?"],
  }),
  s("d1s3", "ನನಗೆ ಕನ್ನಡ ಗೊತ್ತಿಲ್ಲ.", "Nanage Kannada gottilla.", "I don't know Kannada.", "मुझे कन्नड़ नहीं आती।", {
    words: ["Nanage", "Kannada", "gottilla"], wordsKn: ["ನನಗೆ", "ಕನ್ನಡ", "ಗೊತ್ತಿಲ್ಲ"],
    breakdown: [
      { roman: "Nanage", kn: "ನನಗೆ", meaning: "to me", hi: "मुझे" },
      { roman: "Kannada", kn: "ಕನ್ನಡ", meaning: "Kannada", hi: "कन्नड़" },
      { roman: "gottilla", kn: "ಗೊತ್ತಿಲ್ಲ", meaning: "not known", hi: "नहीं पता" },
    ],
  }),
  s("d1s4", "ಸ್ವಲ್ಪ ಸ್ವಲ್ಪ ಕನ್ನಡ ಬರುತ್ತೆ.", "Swalpa swalpa Kannada barutte.", "I know a little Kannada.", "मुझे थोड़ी-थोड़ी कन्नड़ आती है।", {
    words: ["Swalpa", "swalpa", "Kannada", "barutte"], wordsKn: ["ಸ್ವಲ್ಪ", "ಸ್ವಲ್ಪ", "ಕನ್ನಡ", "ಬರುತ್ತೆ"],
    note: bi("'Barutte' literally means 'it comes' — the same as Hindi 'आती है'.", "'Barutte' का मतलब है 'आती है' — बिल्कुल हिंदी जैसा।"),
    breakdown: [
      { roman: "Swalpa swalpa", meaning: "a little", hi: "थोड़ी-थोड़ी" },
      { roman: "Kannada", meaning: "Kannada", hi: "कन्नड़" },
      { roman: "barutte", meaning: "comes (I know)", hi: "आती है" },
    ],
  }),
  s("d1s5", "ನಿಧಾನವಾಗಿ ಹೇಳಿ.", "Nidhaanavaagi heli.", "Please say it slowly.", "धीरे बोलिए।", {
    formality: "polite", words: ["Nidhaanavaagi", "heli"], wordsKn: ["ನಿಧಾನವಾಗಿ", "ಹೇಳಿ"],
  }),
  s("d1s6", "ಇನ್ನೊಮ್ಮೆ ಹೇಳಿ.", "Innomme heli.", "Say it once more.", "एक बार फिर कहिए।", {
    formality: "polite", words: ["Innomme", "heli"], wordsKn: ["ಇನ್ನೊಮ್ಮೆ", "ಹೇಳಿ"],
  }),
  s("d1s7", "ಕ್ಷಮಿಸಿ, ಅರ್ಥ ಆಗಲಿಲ್ಲ.", "Kshamisi, artha aagalilla.", "Sorry, I didn't understand.", "माफ़ कीजिए, समझ नहीं आया।", {
    words: ["Kshamisi,", "artha", "aagalilla"], wordsKn: ["ಕ್ಷಮಿಸಿ,", "ಅರ್ಥ", "ಆಗಲಿಲ್ಲ"],
    breakdown: [
      { roman: "artha", kn: "ಅರ್ಥ", meaning: "meaning", hi: "अर्थ" },
      { roman: "aagalilla", kn: "ಆಗಲಿಲ್ಲ", meaning: "did not happen", hi: "नहीं हुआ" },
    ],
  }),
  s("d1s8", "ಇಲ್ಲಿ ಬನ್ನಿ.", "Illi banni.", "Come here.", "यहाँ आइए।", {
    formality: "polite", words: ["Illi", "banni"], wordsKn: ["ಇಲ್ಲಿ", "ಬನ್ನಿ"],
  }),
  s("d1s9", "ಪರವಾಗಿಲ್ಲ, ಸರಿ.", "Parvagilla, sari.", "No problem, okay.", "कोई बात नहीं, ठीक है।", {
    words: ["Parvagilla,", "sari"], wordsKn: ["ಪರವಾಗಿಲ್ಲ,", "ಸರಿ"],
  }),
];

export const day01: DayLesson = {
  day: 1, week: 1, type: "lesson", emoji: "🙏", minutes: 20,
  title: bi("Kannada basics", "कन्नड़ की शुरुआत"),
  subtitle: bi("Hello, thank you, yes, no and the survival trio", "नमस्ते, धन्यवाद, हाँ, नहीं और तीन जादुई वाक्य"),
  vocab, sentences,
  scriptLetters: ["a", "aa", "i", "ii"],
  concept: {
    title: bi("Your first Kannada toolkit", "आपका पहला कन्नड़ टूलकिट"),
    intro: bi(
      "You don't need grammar to start talking. You need 15 words, a polite ending, and three rescue sentences.",
      "बात शुरू करने के लिए grammar नहीं चाहिए। चाहिए 15 शब्द, एक विनम्र अंत, और तीन बचाव वाक्य।",
    ),
    sections: [
      {
        heading: bi("Politeness lives in the ending", "विनम्रता अंत में छिपी है"),
        body: bi(
          "Banni, hogi, heli, nillisi — all end in -i. That -i is the polite 'you' (like आप). Drop it and you get the casual form: baa, hogu, helu. As a beginner in Bengaluru, always use the -i form. Nobody is ever offended by polite Kannada.",
          "Banni, hogi, heli, nillisi — सब -i पर खत्म होते हैं। यह -i विनम्र 'आप' है। इसे हटाओ तो casual रूप मिलता है: baa, hogu, helu. शुरुआत में हमेशा -i वाला रूप इस्तेमाल करें। विनम्र कन्नड़ से कोई नाराज़ नहीं होता।",
        ),
        examples: [
          ex("ಬನ್ನಿ / ಬಾ", "Banni / Baa", "Come (polite / casual)", "आइए / आ"),
          ex("ಹೇಳಿ / ಹೇಳು", "Heli / Helu", "Say (polite / casual)", "कहिए / कह"),
        ],
      },
      {
        heading: bi("'Illa' does double duty", "'Illa' दो काम करता है"),
        body: bi(
          "Illa means 'no' as an answer, and 'is not there' inside a sentence. 'Neeru illa' = there's no water. 'Gottilla' = gottu (known) + illa = I don't know.",
          "Illa जवाब में 'नहीं' है और वाक्य में 'नहीं है'। 'Neeru illa' = पानी नहीं है। 'Gottilla' = gottu (पता) + illa = मुझे नहीं पता।",
        ),
        bridge: [
          { kn: "ಇಲ್ಲ", roman: "Illa", hi: "नहीं / नहीं है", en: "no / isn't there" },
          { kn: "ಗೊತ್ತಿಲ್ಲ", roman: "Gottilla", hi: "नहीं पता", en: "don't know" },
          { kn: "ಬೇಡ", roman: "Beda", hi: "नहीं चाहिए", en: "don't want (coming on Day 5)" },
        ],
      },
      {
        heading: bi("The survival trio", "तीन बचाव वाक्य"),
        body: bi(
          "Memorise these three and you can never get stuck:\n1. Nidhaanavaagi heli — say it slowly.\n2. Innomme heli — say it again.\n3. Kshamisi, artha aagalilla — sorry, I didn't understand.\nPeople in Bengaluru will slow down and help. Many will switch to Hindi or English, but try to stay in Kannada.",
          "ये तीन याद कर लो, कभी नहीं अटकोगे:\n1. Nidhaanavaagi heli — धीरे बोलिए।\n2. Innomme heli — फिर से कहिए।\n3. Kshamisi, artha aagalilla — माफ़ कीजिए, समझ नहीं आया।\nबेंगलुरु के लोग धीरे बोलकर मदद करेंगे। कई लोग हिंदी/अंग्रेज़ी में बदल जाएँगे, पर आप कन्नड़ में टिके रहें।",
        ),
      },
    ],
    tip: bi("Hindi 'आप' = neevu, 'तुम' = neenu. Stick with neevu for now.", "हिंदी 'आप' = neevu, 'तुम' = neenu. अभी neevu ही इस्तेमाल करें।"),
  },
  conversation: {
    id: "d1c1",
    title: bi("Meeting your neighbour", "पड़ोसी से मुलाकात"),
    setting: bi("Morning, outside your apartment.", "सुबह, आपके अपार्टमेंट के बाहर।"),
    speakers: { A: "You", B: "Neighbour" },
    lines: [
      line("A", "ನಮಸ್ಕಾರ!", "Namaskara!", "Hello!", "नमस्ते!"),
      line("B", "ನಮಸ್ಕಾರ, ಹೇಗಿದ್ದೀರಾ?", "Namaskara, hegiddira?", "Hello, how are you?", "नमस्ते, आप कैसे हैं?"),
      line("A", "ಚೆನ್ನಾಗಿದ್ದೀನಿ. ನೀವು?", "Chennagiddini. Neevu?", "I'm fine. And you?", "मैं ठीक हूँ। आप?"),
      line("B", "ನಾನೂ ಚೆನ್ನಾಗಿದ್ದೀನಿ. ಕನ್ನಡ ಬರುತ್ತಾ?", "Naanu chennagiddini. Kannada barutta?", "I'm fine too. Do you know Kannada?", "मैं भी ठीक हूँ। कन्नड़ आती है?"),
      line("A", "ಸ್ವಲ್ಪ ಸ್ವಲ್ಪ. ನಿಧಾನವಾಗಿ ಹೇಳಿ.", "Swalpa swalpa. Nidhaanavaagi heli.", "A little. Please speak slowly.", "थोड़ी-थोड़ी। धीरे बोलिए।"),
      line("B", "ಸರಿ, ಪರವಾಗಿಲ್ಲ!", "Sari, parvagilla!", "Okay, no problem!", "ठीक है, कोई बात नहीं!"),
    ],
    prompts: [
      {
        afterLine: 3,
        question: bi("Your neighbour asks 'Kannada barutta?' — what do you say?", "पड़ोसी पूछते हैं 'Kannada barutta?' — आप क्या कहेंगे?"),
        options: [
          { kn: "ಸ್ವಲ್ಪ ಸ್ವಲ್ಪ.", roman: "Swalpa swalpa.", en: "A little.", correct: true },
          { kn: "ಇಲ್ಲಿ ಬನ್ನಿ.", roman: "Illi banni.", en: "Come here.", correct: false, feedback: bi("That means 'come here' — a bit random!", "इसका मतलब 'यहाँ आइए' है — थोड़ा अजीब!") },
          { kn: "ಯಾರು?", roman: "Yaaru?", en: "Who?", correct: false, feedback: bi("'Yaaru' asks who someone is.", "'Yaaru' से पूछते हैं कोई कौन है।") },
        ],
      },
    ],
  },
  bossQuestion: {
    id: "d1boss", type: "mcq", skill: "conversation",
    prompt: bi("Someone bumps into you and says 'Kshamisi!' What's the natural reply?", "कोई आपसे टकराकर कहता है 'Kshamisi!' स्वाभाविक जवाब क्या है?"),
    options: ["Parvagilla", "Houdu", "Gottilla", "Banni"],
    answer: "Parvagilla",
    explanation: bi("'Parvagilla' = it's okay / no problem. The friendly way to accept an apology.", "'Parvagilla' = कोई बात नहीं। माफ़ी स्वीकार करने का दोस्ताना तरीका।"),
  },
  dailyPhrase: {
    kn: "ಪರವಾಗಿಲ್ಲ", roman: "Parvagilla",
    meaning: bi("It's okay / No problem / Not bad", "कोई बात नहीं / ठीक है / बुरा नहीं"),
    example: ex("ಕಾಫಿ ಹೇಗಿದೆ? — ಪರವಾಗಿಲ್ಲ!", "Kaafi hegide? — Parvagilla!", "How's the coffee? — Not bad!", "कॉफ़ी कैसी है? — ठीक-ठाक!"),
    mini: [
      line("A", "ಕ್ಷಮಿಸಿ, ಲೇಟ್ ಆಯ್ತು.", "Kshamisi, late aaytu.", "Sorry, I'm late.", "माफ़ कीजिए, देर हो गई।"),
      line("B", "ಪರವಾಗಿಲ್ಲ, ಬನ್ನಿ.", "Parvagilla, banni.", "No problem, come.", "कोई बात नहीं, आइए।"),
    ],
  },
};
