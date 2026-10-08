import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

const vocab = [
  v("naanu", "ನಾನು", "Naanu", "I", "मैं", { pos: "pronoun", tags: ["pronoun"],
    example: ex("ನಾನು ಸುಮಿತ್.", "Naanu Sumit.", "I am Sumit.", "मैं सुमित हूँ।") }),
  v("neevu", "ನೀವು", "Neevu", "You (polite)", "आप", { pos: "pronoun", formality: "polite", tags: ["pronoun"],
    bridge: bi("Neevu = आप. Neenu = तुम. Use neevu with everyone new.", "Neevu = आप। Neenu = तुम। नए लोगों से हमेशा neevu।"),
    example: ex("ನೀವು ಯಾರು?", "Neevu yaaru?", "Who are you?", "आप कौन हैं?") }),
  v("hesaru", "ಹೆಸರು", "Hesaru", "Name", "नाम", { pos: "noun", tags: ["intro"],
    example: ex("ನನ್ನ ಹೆಸರು ಸುಮಿತ್.", "Nanna hesaru Sumit.", "My name is Sumit.", "मेरा नाम सुमित है।") }),
  v("nanna", "ನನ್ನ", "Nanna", "My", "मेरा / मेरी", { pos: "pronoun", tags: ["pronoun"],
    bridge: bi("Naanu (I) → nanna (my). Like मैं → मेरा.", "Naanu (मैं) → nanna (मेरा)।"),
    example: ex("ನನ್ನ ಮನೆ.", "Nanna mane.", "My house.", "मेरा घर।") }),
  v("nimma", "ನಿಮ್ಮ", "Nimma", "Your (polite)", "आपका / आपकी", { pos: "pronoun", formality: "polite", tags: ["pronoun"],
    example: ex("ನಿಮ್ಮ ಹೆಸರು ಏನು?", "Nimma hesaru enu?", "What is your name?", "आपका नाम क्या है?") }),
  v("ooru", "ಊರು", "Ooru", "Hometown / Town", "शहर / गाँव (मूल स्थान)", { pos: "noun", tags: ["intro"],
    context: bi("'Nimma ooru yaavudu?' is the classic Bengaluru ice-breaker: where are you from?", "'Nimma ooru yaavudu?' बेंगलुरु का क्लासिक सवाल है: आप कहाँ से हैं?"),
    example: ex("ನಿಮ್ಮ ಊರು ಯಾವುದು?", "Nimma ooru yaavudu?", "Which is your hometown?", "आपका शहर कौन सा है?") }),
  v("inda", "ಇಂದ", "-inda", "From", "से", { pos: "postposition", tags: ["grammar"],
    bridge: bi("Attached to the end of the place: Delhi-inda = दिल्ली से.", "जगह के अंत में जुड़ता है: Delhi-inda = दिल्ली से।"),
    example: ex("ನಾನು ದೆಹಲಿಯಿಂದ ಬಂದಿದ್ದೀನಿ.", "Naanu Delhi-inda bandiddini.", "I have come from Delhi.", "मैं दिल्ली से आया हूँ।") }),
  v("ellinda", "ಎಲ್ಲಿಂದ", "Ellinda", "From where?", "कहाँ से", { pos: "question", tags: ["question"],
    example: ex("ನೀವು ಎಲ್ಲಿಂದ?", "Neevu ellinda?", "Where are you from?", "आप कहाँ से हैं?") }),
  v("irtini", "ಇರ್ತೀನಿ", "Irtini", "I stay / I live", "मैं रहता हूँ", { pos: "verb", tags: ["verb"],
    context: bi("Spoken form. Formal: 'vaasisuttene'. In Bengaluru everyone says irtini.", "बोलचाल का रूप। औपचारिक: 'vaasisuttene'। बेंगलुरु में सब irtini कहते हैं।"),
    example: ex("ನಾನು ಕೋರಮಂಗಲದಲ್ಲಿ ಇರ್ತೀನಿ.", "Naanu Koramangala-dalli irtini.", "I live in Koramangala.", "मैं कोरमंगला में रहता हूँ।") }),
  v("alli", "ಅಲ್ಲಿ / -ಅಲ್ಲಿ", "-alli", "In / At", "में", { pos: "postposition", tags: ["grammar"],
    bridge: bi("Bengaluru + alli = Bengaluru-nalli (in Bengaluru). Like 'में', but glued to the word.", "Bengaluru + alli = Bengaluru-nalli (बेंगलुरु में)। 'में' की तरह, पर शब्द से जुड़ा हुआ।"),
    example: ex("ಆಫೀಸ್‌ನಲ್ಲಿ ಇದ್ದೀನಿ.", "Office-nalli iddini.", "I'm at the office.", "मैं ऑफिस में हूँ।") }),
  v("kelsa", "ಕೆಲಸ", "Kelsa", "Work / Job", "काम", { pos: "noun", tags: ["office"],
    example: ex("ನಾನು ಕೆಲಸ ಮಾಡ್ತೀನಿ.", "Naanu kelsa maadtini.", "I work.", "मैं काम करता हूँ।") }),
  v("santosha", "ಸಂತೋಷ", "Santosha", "Happiness / Glad", "खुशी", { pos: "noun", tags: ["intro"],
    example: ex("ತುಂಬಾ ಸಂತೋಷ.", "Tumba santosha.", "Very happy.", "बहुत खुशी।") }),
  v("bheti", "ಭೇಟಿ", "Bheti", "Meeting (someone)", "मुलाकात", { pos: "noun", tags: ["intro"],
    example: ex("ನಿಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿ ಸಂತೋಷ ಆಯ್ತು.", "Nimmannu bheti maadi santosha aaytu.", "Nice to meet you.", "आपसे मिलकर खुशी हुई।") }),
  v("tumba", "ತುಂಬಾ", "Tumba", "Very / A lot", "बहुत", { pos: "adverb", tags: ["basic"],
    context: bi("The most used adverb in Bengaluru. Tumba chennagide = very nice.", "बेंगलुरु में सबसे ज़्यादा इस्तेमाल होने वाला शब्द। Tumba chennagide = बहुत अच्छा।"),
    example: ex("ತುಂಬಾ ಧನ್ಯವಾದ.", "Tumba dhanyavaada.", "Thank you very much.", "बहुत धन्यवाद।") }),
  v("vayassu", "ವಯಸ್ಸು", "Vayassu", "Age", "उम्र", { pos: "noun", tags: ["intro"],
    example: ex("ನನ್ನ ವಯಸ್ಸು ಇಪ್ಪತ್ತೈದು.", "Nanna vayassu ippattaidu.", "My age is 25.", "मेरी उम्र 25 है।") }),
  v("snehita", "ಸ್ನೇಹಿತ", "Snehita", "Friend", "दोस्त", { pos: "noun", tags: ["people"],
    context: bi("Snehita (m) / snehite (f). 'Friend' in English is also used all the time.", "Snehita (पुरुष) / snehite (स्त्री)। अंग्रेज़ी 'friend' भी खूब चलता है।"),
    example: ex("ಇವರು ನನ್ನ ಸ್ನೇಹಿತ.", "Ivaru nanna snehita.", "This is my friend.", "ये मेरे दोस्त हैं।") }),
];

const sentences = [
  s("d2s1", "ನನ್ನ ಹೆಸರು ಸುಮಿತ್.", "Nanna hesaru Sumit.", "My name is Sumit.", "मेरा नाम सुमित है।", {
    words: ["Nanna", "hesaru", "Sumit"], wordsKn: ["ನನ್ನ", "ಹೆಸರು", "ಸುಮಿತ್"],
    breakdown: [{ roman: "Nanna", meaning: "my", hi: "मेरा" }, { roman: "hesaru", meaning: "name", hi: "नाम" }],
    note: bi("No word for 'is' needed. Kannada drops it, just like Hindi drops nothing — simpler!", "'है' की ज़रूरत नहीं। कन्नड़ में यह छूट जाता है।"),
  }),
  s("d2s2", "ನಿಮ್ಮ ಹೆಸರು ಏನು?", "Nimma hesaru enu?", "What is your name?", "आपका नाम क्या है?", {
    formality: "polite", words: ["Nimma", "hesaru", "enu?"], wordsKn: ["ನಿಮ್ಮ", "ಹೆಸರು", "ಏನು?"],
    breakdown: [{ roman: "Nimma", meaning: "your", hi: "आपका" }, { roman: "hesaru", meaning: "name", hi: "नाम" }, { roman: "enu", meaning: "what", hi: "क्या" }],
  }),
  s("d2s3", "ನಿನ್ನ ಹೆಸರೇನು?", "Ninna hesarenu?", "What's your name? (casual)", "तुम्हारा नाम क्या है?", {
    formality: "casual", words: ["Ninna", "hesarenu?"], wordsKn: ["ನಿನ್ನ", "ಹೆಸರೇನು?"],
    note: bi("hesaru + enu fuse into 'hesarenu' in fast speech.", "तेज़ बोलने में hesaru + enu मिलकर 'hesarenu' बन जाता है।"),
  }),
  s("d2s4", "ನಾನು ದೆಹಲಿಯಿಂದ ಬಂದಿದ್ದೀನಿ.", "Naanu Delhi-inda bandiddini.", "I am from Delhi.", "मैं दिल्ली से आया हूँ।", {
    words: ["Naanu", "Delhi-inda", "bandiddini"], wordsKn: ["ನಾನು", "ದೆಹಲಿಯಿಂದ", "ಬಂದಿದ್ದೀನಿ"],
    breakdown: [{ roman: "Delhi-inda", meaning: "from Delhi", hi: "दिल्ली से" }, { roman: "bandiddini", meaning: "I have come", hi: "आया हूँ" }],
  }),
  s("d2s5", "ನೀವು ಎಲ್ಲಿಂದ?", "Neevu ellinda?", "Where are you from?", "आप कहाँ से हैं?", {
    formality: "polite", words: ["Neevu", "ellinda?"], wordsKn: ["ನೀವು", "ಎಲ್ಲಿಂದ?"],
  }),
  s("d2s6", "ನಾನು ಬೆಂಗಳೂರಿನಲ್ಲಿ ಇರ್ತೀನಿ.", "Naanu Bengalurinalli irtini.", "I live in Bengaluru.", "मैं बेंगलुरु में रहता हूँ।", {
    words: ["Naanu", "Bengalurinalli", "irtini"], wordsKn: ["ನಾನು", "ಬೆಂಗಳೂರಿನಲ್ಲಿ", "ಇರ್ತೀನಿ"],
    breakdown: [{ roman: "Bengaluru-nalli", meaning: "in Bengaluru", hi: "बेंगलुरु में" }, { roman: "irtini", meaning: "I stay", hi: "रहता हूँ" }],
  }),
  s("d2s7", "ನಿಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿ ಸಂತೋಷ ಆಯ್ತು.", "Nimmannu bheti maadi santosha aaytu.", "Nice to meet you.", "आपसे मिलकर खुशी हुई।", {
    formality: "polite", words: ["Nimmannu", "bheti", "maadi", "santosha", "aaytu"], wordsKn: ["ನಿಮ್ಮನ್ನು", "ಭೇಟಿ", "ಮಾಡಿ", "ಸಂತೋಷ", "ಆಯ್ತು"],
    breakdown: [{ roman: "Nimmannu", meaning: "you (object)", hi: "आपको/आपसे" }, { roman: "bheti maadi", meaning: "having met", hi: "मिलकर" }, { roman: "santosha aaytu", meaning: "happiness happened", hi: "खुशी हुई" }],
  }),
  s("d2s8", "ನಾನು ಇಲ್ಲಿ ಕೆಲಸ ಮಾಡ್ತೀನಿ.", "Naanu illi kelsa maadtini.", "I work here.", "मैं यहाँ काम करता हूँ।", {
    words: ["Naanu", "illi", "kelsa", "maadtini"], wordsKn: ["ನಾನು", "ಇಲ್ಲಿ", "ಕೆಲಸ", "ಮಾಡ್ತೀನಿ"],
  }),
  s("d2s9", "ನಿಮ್ಮ ಊರು ಯಾವುದು?", "Nimma ooru yaavudu?", "Which is your hometown?", "आपका शहर कौन सा है?", {
    formality: "polite", words: ["Nimma", "ooru", "yaavudu?"], wordsKn: ["ನಿಮ್ಮ", "ಊರು", "ಯಾವುದು?"],
  }),
];

export const day02: DayLesson = {
  day: 2, week: 1, type: "lesson", emoji: "👋", minutes: 20,
  title: bi("Introducing yourself", "अपना परिचय"),
  subtitle: bi("Name, hometown, where you live, nice to meet you", "नाम, शहर, कहाँ रहते हैं, मिलकर खुशी हुई"),
  vocab, sentences,
  scriptLetters: ["u", "uu", "e", "ee"],
  concept: {
    title: bi("Nanna, nimma, and glue words", "Nanna, nimma और चिपकने वाले शब्द"),
    intro: bi(
      "Kannada sentences end with the verb, exactly like Hindi. 'Naanu Bengalurinalli irtini' = 'मैं बेंगलुरु में रहता हूँ' word for word.",
      "कन्नड़ वाक्य क्रिया पर खत्म होते हैं, बिल्कुल हिंदी की तरह। 'Naanu Bengalurinalli irtini' = 'मैं बेंगलुरु में रहता हूँ', शब्द-दर-शब्द।",
    ),
    sections: [
      {
        heading: bi("Possessives", "मेरा / आपका"),
        body: bi("Naanu → nanna (my). Neevu → nimma (your, polite). Neenu → ninna (your, casual). That's all you need today.", "Naanu → nanna (मेरा)। Neevu → nimma (आपका)। Neenu → ninna (तुम्हारा)। आज के लिए बस इतना।"),
        bridge: [
          { kn: "ನನ್ನ", roman: "nanna", hi: "मेरा", en: "my" },
          { kn: "ನಿಮ್ಮ", roman: "nimma", hi: "आपका", en: "your (polite)" },
          { kn: "ನಿನ್ನ", roman: "ninna", hi: "तुम्हारा", en: "your (casual)" },
        ],
      },
      {
        heading: bi("Glue words stick to the end", "'से' और 'में' शब्द के पीछे चिपकते हैं"),
        body: bi(
          "Hindi puts 'से' and 'में' after the word as separate words. Kannada glues them on:\nDelhi + inda → Delhi-inda (from Delhi)\nBengaluru + alli → Bengalurinalli (in Bengaluru)\nThe small 'n' or 'y' in between is just to make it flow.",
          "हिंदी में 'से' और 'में' अलग शब्द हैं। कन्नड़ में ये जुड़ जाते हैं:\nDelhi + inda → Delhi-inda (दिल्ली से)\nBengaluru + alli → Bengalurinalli (बेंगलुरु में)\nबीच का 'n' या 'y' बस बोलने में आसानी के लिए है।",
        ),
        examples: [
          ex("ಮುಂಬೈಯಿಂದ", "Mumbai-inda", "from Mumbai", "मुंबई से"),
          ex("ಆಫೀಸ್‌ನಲ್ಲಿ", "Office-nalli", "in the office", "ऑफिस में"),
        ],
      },
      {
        heading: bi("No 'is' needed", "'है' की ज़रूरत नहीं"),
        body: bi("'Nanna hesaru Sumit' — my name Sumit. Kannada happily drops 'is' in simple sentences. Fewer words, same meaning.", "'Nanna hesaru Sumit' — मेरा नाम सुमित। सरल वाक्यों में कन्नड़ 'है' छोड़ देता है। कम शब्द, वही मतलब।"),
      },
    ],
    tip: bi("Say 'Naanu Kannada kalithaa iddini' (I'm learning Kannada) and watch people light up.", "'Naanu Kannada kalithaa iddini' (मैं कन्नड़ सीख रहा हूँ) कहिए और लोगों की मुस्कान देखिए।"),
  },
  conversation: {
    id: "d2c1",
    title: bi("New colleague", "नया सहकर्मी"),
    setting: bi("Office pantry, first day.", "ऑफिस पैंट्री, पहला दिन।"),
    speakers: { A: "Colleague", B: "You" },
    lines: [
      line("A", "ನಮಸ್ಕಾರ! ನನ್ನ ಹೆಸರು ಪ್ರಿಯಾ. ನಿಮ್ಮ ಹೆಸರು ಏನು?", "Namaskara! Nanna hesaru Priya. Nimma hesaru enu?", "Hello! My name is Priya. What's your name?", "नमस्ते! मेरा नाम प्रिया है। आपका नाम क्या है?"),
      line("B", "ನನ್ನ ಹೆಸರು ಸುಮಿತ್.", "Nanna hesaru Sumit.", "My name is Sumit.", "मेरा नाम सुमित है।"),
      line("A", "ನೀವು ಎಲ್ಲಿಂದ?", "Neevu ellinda?", "Where are you from?", "आप कहाँ से हैं?"),
      line("B", "ನಾನು ದೆಹಲಿಯಿಂದ. ಈಗ ಬೆಂಗಳೂರಿನಲ್ಲಿ ಇರ್ತೀನಿ.", "Naanu Delhi-inda. Eega Bengalurinalli irtini.", "I'm from Delhi. Now I live in Bengaluru.", "मैं दिल्ली से हूँ। अब बेंगलुरु में रहता हूँ।"),
      line("A", "ಓಹ್ ಚೆನ್ನಾಗಿದೆ! ಕನ್ನಡ ಬರುತ್ತಾ?", "Oh chennagide! Kannada barutta?", "Oh nice! Do you know Kannada?", "ओह बढ़िया! कन्नड़ आती है?"),
      line("B", "ಸ್ವಲ್ಪ. ಕಲೀತಾ ಇದ್ದೀನಿ.", "Swalpa. Kalithaa iddini.", "A little. I'm learning.", "थोड़ी। सीख रहा हूँ।"),
      line("A", "ಸೂಪರ್! ನಿಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿ ಸಂತೋಷ ಆಯ್ತು.", "Super! Nimmannu bheti maadi santosha aaytu.", "Super! Nice to meet you.", "सुपर! आपसे मिलकर खुशी हुई।"),
    ],
    prompts: [
      {
        afterLine: 0,
        question: bi("Priya asked your name. Reply:", "प्रिया ने आपका नाम पूछा। जवाब दें:"),
        options: [
          { kn: "ನನ್ನ ಹೆಸರು ಸುಮಿತ್.", roman: "Nanna hesaru Sumit.", en: "My name is Sumit.", correct: true },
          { kn: "ನಿಮ್ಮ ಹೆಸರು ಸುಮಿತ್.", roman: "Nimma hesaru Sumit.", en: "Your name is Sumit.", correct: false, feedback: bi("Nimma = your. You need nanna = my.", "Nimma = आपका। यहाँ nanna = मेरा चाहिए।") },
          { kn: "ನಾನು ಎಲ್ಲಿಂದ?", roman: "Naanu ellinda?", en: "Where am I from?", correct: false, feedback: bi("That asks where YOU are from.", "यह पूछता है कि आप कहाँ से हैं।") },
        ],
      },
      {
        afterLine: 2,
        question: bi("She asks where you're from. Reply:", "वह पूछती है आप कहाँ से हैं। जवाब दें:"),
        options: [
          { kn: "ನಾನು ದೆಹಲಿಯಿಂದ.", roman: "Naanu Delhi-inda.", en: "I'm from Delhi.", correct: true },
          { kn: "ನಾನು ದೆಹಲಿಯಲ್ಲಿ.", roman: "Naanu Delhi-yalli.", en: "I'm in Delhi.", correct: false, feedback: bi("-alli = in. You want -inda = from.", "-alli = में। यहाँ -inda = से चाहिए।") },
          { kn: "ದೆಹಲಿ ಎಲ್ಲಿ?", roman: "Delhi elli?", en: "Where is Delhi?", correct: false },
        ],
      },
    ],
  },
  bossQuestion: {
    id: "d2boss", type: "typein", skill: "grammar",
    prompt: bi("Type in Kannada (roman letters): 'I live in Bengaluru.'", "कन्नड़ में टाइप करें (रोमन अक्षरों में): 'मैं बेंगलुरु में रहता हूँ।'"),
    answer: "Naanu Bengalurinalli irtini",
    acceptable: ["Naanu Bengaluralli irtini", "Naanu Bengalurinalli iddini", "Nanu Bengalurinalli irtini", "Naanu Bengaluru-nalli irtini"],
    explanation: bi("Naanu (I) + Bengaluru-nalli (in Bengaluru) + irtini (I stay).", "Naanu (मैं) + Bengaluru-nalli (बेंगलुरु में) + irtini (रहता हूँ)।"),
  },
  dailyPhrase: {
    kn: "ಕನ್ನಡ ಕಲೀತಾ ಇದ್ದೀನಿ", roman: "Kannada kalithaa iddini",
    meaning: bi("I'm learning Kannada", "मैं कन्नड़ सीख रहा हूँ"),
    example: ex("ನಾನು ಕನ್ನಡ ಕಲೀತಾ ಇದ್ದೀನಿ, ನಿಧಾನವಾಗಿ ಹೇಳಿ.", "Naanu Kannada kalithaa iddini, nidhaanavaagi heli.", "I'm learning Kannada, please speak slowly.", "मैं कन्नड़ सीख रहा हूँ, धीरे बोलिए।"),
    mini: [
      line("A", "ಕನ್ನಡ ಬರುತ್ತಾ?", "Kannada barutta?", "Do you know Kannada?", "कन्नड़ आती है?"),
      line("B", "ಕಲೀತಾ ಇದ್ದೀನಿ!", "Kalithaa iddini!", "I'm learning!", "सीख रहा हूँ!"),
    ],
  },
};
