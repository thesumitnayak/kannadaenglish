import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

const vocab = [
  v("amma", "ಅಮ್ಮ", "Amma", "Mother", "माँ", { pos: "noun", tags: ["people", "family"],
    example: ex("ಅಮ್ಮ ಮನೆಯಲ್ಲಿ ಇದ್ದಾರೆ.", "Amma maneyalli iddaare.", "Mother is at home.", "माँ घर पर हैं।") }),
  v("appa", "ಅಪ್ಪ", "Appa", "Father", "पिता", { pos: "noun", tags: ["people", "family"],
    example: ex("ಅಪ್ಪ ಆಫೀಸ್‌ಗೆ ಹೋಗಿದ್ದಾರೆ.", "Appa office-ge hogiddaare.", "Father has gone to office.", "पिताजी ऑफिस गए हैं।") }),
  v("anna", "ಅಣ್ಣ", "Anna", "Elder brother", "बड़ा भाई", { pos: "noun", tags: ["people", "family", "auto"],
    context: bi("Also how you address any man politely in Bengaluru: auto drivers, shopkeepers, waiters. Instant goodwill.", "बेंगलुरु में किसी भी आदमी को विनम्रता से बुलाने का तरीका: ऑटो वाले, दुकानदार, वेटर। तुरंत अपनापन।"),
    example: ex("ಅಣ್ಣ, ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ.", "Anna, illi nillisi.", "Brother, stop here.", "भैया, यहाँ रोकिए।") }),
  v("akka", "ಅಕ್ಕ", "Akka", "Elder sister", "बड़ी बहन", { pos: "noun", tags: ["people", "family"],
    context: bi("Same trick: a polite way to address any woman a little older than you.", "वही तरकीब: अपने से थोड़ी बड़ी किसी भी महिला को विनम्रता से बुलाने के लिए।"),
    example: ex("ಅಕ್ಕ, ಒಂದು ಟೀ ಕೊಡಿ.", "Akka, ondu tea kodi.", "Sister, give one tea.", "दीदी, एक चाय दीजिए।") }),
  v("thamma", "ತಮ್ಮ", "Thamma", "Younger brother", "छोटा भाई", { pos: "noun", tags: ["people", "family"],
    example: ex("ನನ್ನ ತಮ್ಮ ಕಾಲೇಜ್‌ನಲ್ಲಿ ಇದ್ದಾನೆ.", "Nanna thamma college-nalli iddaane.", "My younger brother is in college.", "मेरा छोटा भाई कॉलेज में है।") }),
  v("thangi", "ತಂಗಿ", "Thangi", "Younger sister", "छोटी बहन", { pos: "noun", tags: ["people", "family"],
    example: ex("ನನಗೆ ಒಬ್ಬ ತಂಗಿ ಇದ್ದಾಳೆ.", "Nanage obba thangi iddaale.", "I have one younger sister.", "मेरी एक छोटी बहन है।") }),
  v("ajja", "ಅಜ್ಜ", "Ajja", "Grandfather", "दादा / नाना", { pos: "noun", tags: ["people", "family"] }),
  v("ajji", "ಅಜ್ಜಿ", "Ajji", "Grandmother", "दादी / नानी", { pos: "noun", tags: ["people", "family"] }),
  v("ganda", "ಗಂಡ", "Ganda", "Husband", "पति", { pos: "noun", tags: ["people", "family"] }),
  v("hendati", "ಹೆಂಡತಿ", "Hendati", "Wife", "पत्नी", { pos: "noun", tags: ["people", "family"] }),
  v("maga", "ಮಗ", "Maga", "Son", "बेटा", { pos: "noun", tags: ["people", "family"],
    context: bi("'Maga' is also very casual slang for 'dude' between close male friends. Don't use it with strangers.", "'Maga' करीबी दोस्तों के बीच 'यार' जैसा बहुत casual slang भी है। अजनबियों से नहीं।") }),
  v("magalu", "ಮಗಳು", "Magalu", "Daughter", "बेटी", { pos: "noun", tags: ["people", "family"] }),
  v("makkalu", "ಮಕ್ಕಳು", "Makkalu", "Children", "बच्चे", { pos: "noun", tags: ["people", "family"],
    example: ex("ಮಕ್ಕಳು ಎಷ್ಟು?", "Makkalu eshtu?", "How many children?", "बच्चे कितने हैं?") }),
  v("kutumba", "ಕುಟುಂಬ", "Kutumba", "Family", "परिवार", { pos: "noun", tags: ["people", "family"],
    context: bi("Spoken Bengaluru often says 'family' in English, or 'mane-avaru' (house people).", "बोलचाल में अक्सर अंग्रेज़ी 'family' या 'mane-avaru' (घर वाले) कहते हैं।") }),
  v("huduga", "ಹುಡುಗ", "Huduga", "Boy", "लड़का", { pos: "noun", tags: ["people"] }),
  v("hudugi", "ಹುಡುಗಿ", "Hudugi", "Girl", "लड़की", { pos: "noun", tags: ["people"] }),
  v("jana", "ಜನ", "Jana", "People", "लोग", { pos: "noun", tags: ["people"],
    example: ex("ತುಂಬಾ ಜನ ಇದ್ದಾರೆ.", "Tumba jana iddaare.", "There are a lot of people.", "बहुत लोग हैं।") }),
  v("ivaru", "ಇವರು", "Ivaru", "This person (polite)", "ये", { pos: "pronoun", formality: "polite", tags: ["pronoun"],
    bridge: bi("Use ivaru to introduce anyone respectfully: 'Ivaru nanna amma'.", "किसी का भी आदर से परिचय देने के लिए ivaru: 'Ivaru nanna amma'।"),
    example: ex("ಇವರು ನನ್ನ ಅಮ್ಮ.", "Ivaru nanna amma.", "This is my mother.", "ये मेरी माँ हैं।") }),
];

const sentences = [
  s("d4s1", "ಇವರು ನನ್ನ ಅಮ್ಮ.", "Ivaru nanna amma.", "This is my mother.", "ये मेरी माँ हैं।", {
    formality: "polite", words: ["Ivaru", "nanna", "amma"], wordsKn: ["ಇವರು", "ನನ್ನ", "ಅಮ್ಮ"],
  }),
  s("d4s2", "ನನಗೆ ಒಬ್ಬ ತಂಗಿ ಇದ್ದಾಳೆ.", "Nanage obba thangi iddaale.", "I have one younger sister.", "मेरी एक छोटी बहन है।", {
    words: ["Nanage", "obba", "thangi", "iddaale"], wordsKn: ["ನನಗೆ", "ಒಬ್ಬ", "ತಂಗಿ", "ಇದ್ದಾಳೆ"],
    breakdown: [{ roman: "Nanage", meaning: "to me", hi: "मुझे/मेरी" }, { roman: "obba", meaning: "one (person)", hi: "एक" }, { roman: "thangi", meaning: "younger sister", hi: "छोटी बहन" }, { roman: "iddaale", meaning: "she is (exists)", hi: "है" }],
    note: bi("'I have' = 'to me ... exists'. Hindi does the same: मेरी एक बहन है.", "'मेरे पास है' = 'मुझे ... है'। हिंदी भी ऐसा ही करती है: मेरी एक बहन है।"),
  }),
  s("d4s3", "ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಯಾರು ಯಾರು ಇದ್ದಾರೆ?", "Nimma maneyalli yaaru yaaru iddaare?", "Who all are in your family?", "आपके घर में कौन-कौन हैं?", {
    formality: "polite", words: ["Nimma", "maneyalli", "yaaru", "yaaru", "iddaare?"], wordsKn: ["ನಿಮ್ಮ", "ಮನೆಯಲ್ಲಿ", "ಯಾರು", "ಯಾರು", "ಇದ್ದಾರೆ?"],
    note: bi("Doubling 'yaaru yaaru' = 'who all', exactly like Hindi 'कौन-कौन'.", "'yaaru yaaru' दोहराना = 'कौन-कौन', बिल्कुल हिंदी जैसा।"),
  }),
  s("d4s4", "ಅಣ್ಣ, ಸ್ವಲ್ಪ ನಿಲ್ಲಿಸಿ.", "Anna, swalpa nillisi.", "Brother, please stop.", "भैया, ज़रा रोकिए।", {
    formality: "polite", words: ["Anna,", "swalpa", "nillisi"], wordsKn: ["ಅಣ್ಣ,", "ಸ್ವಲ್ಪ", "ನಿಲ್ಲಿಸಿ"], tags: ["auto"],
  }),
  s("d4s5", "ಅವರು ನನ್ನ ಸ್ನೇಹಿತರು.", "Avaru nanna snehitaru.", "They are my friends.", "वे मेरे दोस्त हैं।", {
    words: ["Avaru", "nanna", "snehitaru"], wordsKn: ["ಅವರು", "ನನ್ನ", "ಸ್ನೇಹಿತರು"],
  }),
  s("d4s6", "ಅಪ್ಪ ಅಮ್ಮ ಊರಲ್ಲಿ ಇದ್ದಾರೆ.", "Appa amma ooralli iddaare.", "My parents are in my hometown.", "माता-पिता गाँव/शहर में हैं।", {
    words: ["Appa", "amma", "ooralli", "iddaare"], wordsKn: ["ಅಪ್ಪ", "ಅಮ್ಮ", "ಊರಲ್ಲಿ", "ಇದ್ದಾರೆ"],
  }),
  s("d4s7", "ಮಕ್ಕಳು ಹೇಗಿದ್ದಾರೆ?", "Makkalu hegiddaare?", "How are the children?", "बच्चे कैसे हैं?", {
    formality: "polite", words: ["Makkalu", "hegiddaare?"], wordsKn: ["ಮಕ್ಕಳು", "ಹೇಗಿದ್ದಾರೆ?"],
  }),
  s("d4s8", "ಅಕ್ಕ, ಒಂದು ಟೀ ಕೊಡಿ.", "Akka, ondu tea kodi.", "Sister, one tea please.", "दीदी, एक चाय दीजिए।", {
    formality: "polite", words: ["Akka,", "ondu", "tea", "kodi"], wordsKn: ["ಅಕ್ಕ,", "ಒಂದು", "ಟೀ", "ಕೊಡಿ"],
  }),
];

export const day04: DayLesson = {
  day: 4, week: 1, type: "lesson", emoji: "👨‍👩‍👧", minutes: 20,
  title: bi("People & relationships", "लोग और रिश्ते"),
  subtitle: bi("Amma, appa, anna, akka — and the Bengaluru 'anna' trick", "Amma, appa, anna, akka — और बेंगलुरु की 'anna' ट्रिक"),
  vocab, sentences,
  scriptLetters: ["ka", "ga", "cha", "ja"],
  concept: {
    title: bi("Family words are social words", "रिश्तों के शब्द सामाजिक शब्द हैं"),
    intro: bi(
      "In Bengaluru, 'anna' and 'akka' are not just for siblings. They are the warmest way to address strangers. Learn them and the city opens up.",
      "बेंगलुरु में 'anna' और 'akka' सिर्फ भाई-बहन के लिए नहीं हैं। अजनबियों को बुलाने का सबसे अपनापन भरा तरीका है। इन्हें सीखो, शहर खुल जाएगा।",
    ),
    sections: [
      {
        heading: bi("Anna / Akka to strangers", "अजनबियों के लिए Anna / Akka"),
        body: bi(
          "Auto driver → 'Anna'. Shopkeeper aunty → 'Akka' (or 'Amma' if older). Waiter → 'Anna'. Security guard → 'Anna'. It replaces 'bhaiya / didi' from Hindi perfectly.",
          "ऑटो वाला → 'Anna'। दुकान वाली आंटी → 'Akka' (या बड़ी हों तो 'Amma')। वेटर → 'Anna'। गार्ड → 'Anna'। यह हिंदी के 'भैया / दीदी' की जगह बिल्कुल सही बैठता है।",
        ),
        bridge: [
          { kn: "ಅಣ್ಣ", roman: "Anna", hi: "भैया", en: "brother (any man)" },
          { kn: "ಅಕ್ಕ", roman: "Akka", hi: "दीदी", en: "sister (any woman)" },
          { kn: "ಸರ್ / ಮೇಡಂ", roman: "Sir / Madam", hi: "सर / मैडम", en: "at work, formal" },
        ],
      },
      {
        heading: bi("'I have' = 'to me, exists'", "'मेरे पास' = 'मुझे है'"),
        body: bi(
          "Kannada has no verb 'to have'. You say 'Nanage ... ide/iddaare' (to me ... exists).\nNanage obba thangi iddaale = I have a younger sister.\nNanage time illa = I don't have time.\nHindi works the same way (मेरी बहन है, मेरे पास समय नहीं है), so this will feel natural.",
          "कन्नड़ में 'रखना/पास होना' की क्रिया नहीं है। कहते हैं 'Nanage ... ide/iddaare' (मुझे ... है)।\nNanage obba thangi iddaale = मेरी एक छोटी बहन है।\nNanage time illa = मेरे पास समय नहीं है।\nहिंदी भी ऐसे ही चलती है, तो यह आसान लगेगा।",
        ),
      },
      {
        heading: bi("ide / iddaane / iddaale / iddaare", "ide / iddaane / iddaale / iddaare"),
        body: bi(
          "'Is / exists' changes with who:\nide — a thing (neeru ide = there's water)\niddaane — he\niddaale — she\niddaare — they / a respected person\nThis is the only 'is' pattern you need for Week 1.",
          "'है' बदलता है किसके लिए:\nide — चीज़ (neeru ide = पानी है)\niddaane — वह (पुरुष)\niddaale — वह (स्त्री)\niddaare — वे / आदरणीय व्यक्ति\nहफ्ते 1 के लिए बस यही पैटर्न चाहिए।",
        ),
        examples: [
          ex("ಅಮ್ಮ ಮನೆಯಲ್ಲಿ ಇದ್ದಾರೆ.", "Amma maneyalli iddaare.", "Mother is at home.", "माँ घर पर हैं।"),
          ex("ತಮ್ಮ ಇಲ್ಲಿ ಇದ್ದಾನೆ.", "Thamma illi iddaane.", "Younger brother is here.", "छोटा भाई यहाँ है।"),
        ],
      },
    ],
    tip: bi("Careful: ಅಣ್ಣ (anna, with the hard 'ṇ') is brother; ಅನ್ನ (anna, soft 'n') is cooked rice. Context saves you every time.", "ध्यान दें: ಅಣ್ಣ (anna, कड़ा 'ण') = भाई; ಅನ್ನ (anna, नरम 'न') = चावल। संदर्भ से हमेशा समझ आ जाता है।"),
  },
  conversation: {
    id: "d4c1",
    title: bi("Family talk with the house owner", "मकान मालिक से परिवार की बात"),
    setting: bi("Your landlord's wife drops by.", "मकान मालकिन मिलने आई हैं।"),
    speakers: { A: "Landlady", B: "You" },
    lines: [
      line("A", "ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಯಾರು ಯಾರು ಇದ್ದಾರೆ?", "Nimma maneyalli yaaru yaaru iddaare?", "Who all are in your family?", "आपके घर में कौन-कौन हैं?"),
      line("B", "ಅಪ್ಪ, ಅಮ್ಮ, ಒಬ್ಬ ತಂಗಿ.", "Appa, amma, obba thangi.", "Father, mother, one younger sister.", "पिता, माँ, एक छोटी बहन।"),
      line("A", "ಅವರು ಎಲ್ಲಿ ಇದ್ದಾರೆ?", "Avaru elli iddaare?", "Where are they?", "वे कहाँ हैं?"),
      line("B", "ಅವರು ಊರಲ್ಲಿ ಇದ್ದಾರೆ. ನಾನು ಒಬ್ಬನೇ ಇಲ್ಲಿ.", "Avaru ooralli iddaare. Naanu obbane illi.", "They are in my hometown. I'm here alone.", "वे शहर में हैं। मैं यहाँ अकेला हूँ।"),
      line("A", "ಊಟ ಆಯ್ತಾ?", "Oota aaytaa?", "Have you eaten?", "खाना खाया?"),
      line("B", "ಹೌದು ಅಮ್ಮ, ಆಯ್ತು. ಧನ್ಯವಾದ.", "Houdu amma, aaytu. Dhanyavaada.", "Yes amma, done. Thank you.", "हाँ अम्मा, हो गया। धन्यवाद।"),
    ],
    prompts: [
      {
        afterLine: 0,
        question: bi("Tell her: father, mother, one younger sister.", "उन्हें बताएँ: पिता, माँ, एक छोटी बहन।"),
        options: [
          { kn: "ಅಪ್ಪ, ಅಮ್ಮ, ಒಬ್ಬ ತಂಗಿ.", roman: "Appa, amma, obba thangi.", en: "Father, mother, one younger sister.", correct: true },
          { kn: "ಅಪ್ಪ, ಅಮ್ಮ, ಒಬ್ಬ ತಮ್ಮ.", roman: "Appa, amma, obba thamma.", en: "Father, mother, one younger brother.", correct: false, feedback: bi("Thamma = younger brother. Thangi = younger sister.", "Thamma = छोटा भाई। Thangi = छोटी बहन।") },
          { kn: "ಅಜ್ಜ, ಅಜ್ಜಿ.", roman: "Ajja, ajji.", en: "Grandpa, grandma.", correct: false },
        ],
      },
      {
        afterLine: 4,
        question: bi("'Oota aaytaa?' — the classic caring question. Reply yes:", "'Oota aaytaa?' — प्यार भरा क्लासिक सवाल। हाँ कहें:"),
        options: [
          { kn: "ಹೌದು, ಆಯ್ತು.", roman: "Houdu, aaytu.", en: "Yes, done.", correct: true },
          { kn: "ಇಲ್ಲ, ಗೊತ್ತಿಲ್ಲ.", roman: "Illa, gottilla.", en: "No, I don't know.", correct: false, feedback: bi("You'd know if you ate! 'Aaytu' = done.", "खाया है या नहीं, यह तो पता होगा! 'Aaytu' = हो गया।") },
          { kn: "ಇಲ್ಲಿ ಬನ್ನಿ.", roman: "Illi banni.", en: "Come here.", correct: false },
        ],
      },
    ],
  },
  bossQuestion: {
    id: "d4boss", type: "mcq", skill: "conversation",
    prompt: bi("You want to politely get a shopkeeper aunty's attention. What do you call her?", "दुकान वाली आंटी का ध्यान विनम्रता से खींचना है। उन्हें क्या कहकर बुलाएँगे?"),
    options: ["Akka", "Maga", "Thangi", "Huduga"],
    answer: "Akka",
    explanation: bi("Akka (elder sister) is the respectful, warm address for a woman. 'Maga' is slang for close male friends; 'thangi' would sound odd to a stranger.", "Akka (बड़ी बहन) महिला के लिए आदरपूर्ण और अपनापन भरा संबोधन है। 'Maga' करीबी दोस्तों का slang है; 'thangi' अजनबी को अजीब लगेगा।"),
  },
  dailyPhrase: {
    kn: "ಊಟ ಆಯ್ತಾ?", roman: "Oota aaytaa?",
    meaning: bi("Have you eaten? (a warm greeting, not a real question)", "खाना खाया? (प्यार भरा अभिवादन, असली सवाल नहीं)"),
    example: ex("ಊಟ ಆಯ್ತಾ? — ಆಯ್ತು, ನಿಮ್ದು?", "Oota aaytaa? — Aaytu, nimdu?", "Have you eaten? — Yes, and you?", "खाना खाया? — हाँ, आपका?"),
    mini: [
      line("A", "ಊಟ ಆಯ್ತಾ?", "Oota aaytaa?", "Have you eaten?", "खाना खाया?"),
      line("B", "ಆಯ್ತು. ನೀವು?", "Aaytu. Neevu?", "Yes. And you?", "हाँ। आप?"),
    ],
  },
};
