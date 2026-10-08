import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

const vocab = [
  v("neenu", "ನೀನು", "Neenu", "You (casual)", "तुम", { pos: "pronoun", formality: "casual", tags: ["pronoun"],
    example: ex("ನೀನು ಎಲ್ಲಿದ್ದೀಯಾ?", "Neenu elliddiya?", "Where are you? (casual)", "तुम कहाँ हो?") }),
  v("avanu", "ಅವನು", "Avanu", "He", "वह (पुरुष)", { pos: "pronoun", tags: ["pronoun"],
    example: ex("ಅವನು ನನ್ನ ತಮ್ಮ.", "Avanu nanna thamma.", "He is my younger brother.", "वह मेरा छोटा भाई है।") }),
  v("avalu", "ಅವಳು", "Avalu", "She", "वह (स्त्री)", { pos: "pronoun", tags: ["pronoun"],
    example: ex("ಅವಳು ನನ್ನ ತಂಗಿ.", "Avalu nanna thangi.", "She is my younger sister.", "वह मेरी छोटी बहन है।") }),
  v("avaru", "ಅವರು", "Avaru", "They / He-She (respectful)", "वे", { pos: "pronoun", formality: "polite", tags: ["pronoun"],
    context: bi("Use avaru for any elder or stranger, even for one person. Avanu/avalu for friends and kids.", "किसी भी बड़े या अजनबी के लिए avaru, एक व्यक्ति के लिए भी। दोस्तों/बच्चों के लिए avanu/avalu।"),
    example: ex("ಅವರು ನನ್ನ ಮ್ಯಾನೇಜರ್.", "Avaru nanna manager.", "He/She is my manager.", "वे मेरे मैनेजर हैं।") }),
  v("naavu", "ನಾವು", "Naavu", "We", "हम", { pos: "pronoun", tags: ["pronoun"],
    example: ex("ನಾವು ಹೋಗೋಣ.", "Naavu hogona.", "Let's go.", "हम चलें।") }),
  v("idu", "ಇದು", "Idu", "This (thing)", "यह", { pos: "pronoun", tags: ["pronoun"],
    example: ex("ಇದು ಏನು?", "Idu enu?", "What is this?", "यह क्या है?") }),
  v("adu", "ಅದು", "Adu", "That (thing)", "वह", { pos: "pronoun", tags: ["pronoun"],
    bridge: bi("i- = near (this/here): idu, illi, ivaru. a- = far (that/there): adu, alli, avaru.", "i- = पास (यह/यहाँ): idu, illi, ivaru। a- = दूर (वह/वहाँ): adu, alli, avaru।"),
    example: ex("ಅದು ಬೇಡ, ಇದು ಕೊಡಿ.", "Adu beda, idu kodi.", "Not that, give this.", "वह नहीं, यह दीजिए।") }),
  v("ivanu", "ಇವನು", "Ivanu", "This man / he (near)", "यह (पुरुष)", { pos: "pronoun", tags: ["pronoun"] }),
  v("ivalu", "ಇವಳು", "Ivalu", "This woman / she (near)", "यह (स्त्री)", { pos: "pronoun", tags: ["pronoun"] }),
  v("ninna", "ನಿನ್ನ", "Ninna", "Your (casual)", "तुम्हारा", { pos: "pronoun", formality: "casual", tags: ["pronoun"] }),
  v("avana", "ಅವನ", "Avana", "His", "उसका (पुरुष)", { pos: "pronoun", tags: ["pronoun"],
    example: ex("ಅವನ ಹೆಸರು ರಾಜು.", "Avana hesaru Raju.", "His name is Raju.", "उसका नाम राजू है।") }),
  v("avala", "ಅವಳ", "Avala", "Her", "उसका (स्त्री)", { pos: "pronoun", tags: ["pronoun"] }),
  v("avara", "ಅವರ", "Avara", "Their / his-her (polite)", "उनका", { pos: "pronoun", formality: "polite", tags: ["pronoun"] }),
  v("namma", "ನಮ್ಮ", "Namma", "Our", "हमारा", { pos: "pronoun", tags: ["pronoun"],
    context: bi("'Namma Bengaluru', 'Namma Metro' — you've seen this word everywhere!", "'Namma Bengaluru', 'Namma Metro' — यह शब्द आपने हर जगह देखा है!"),
    example: ex("ನಮ್ಮ ಮನೆ ಇಲ್ಲಿ.", "Namma mane illi.", "Our house is here.", "हमारा घर यहाँ है।") }),
  v("nanage", "ನನಗೆ", "Nanage", "To me", "मुझे", { pos: "pronoun", tags: ["pronoun", "grammar"],
    example: ex("ನನಗೆ ಗೊತ್ತು.", "Nanage gottu.", "I know.", "मुझे पता है।") }),
  v("nimage", "ನಿಮಗೆ", "Nimage", "To you (polite)", "आपको", { pos: "pronoun", formality: "polite", tags: ["pronoun", "grammar"],
    example: ex("ನಿಮಗೆ ಏನು ಬೇಕು?", "Nimage enu beku?", "What do you want?", "आपको क्या चाहिए?") }),
  v("avarige", "ಅವರಿಗೆ", "Avarige", "To them / to him-her (polite)", "उन्हें", { pos: "pronoun", tags: ["pronoun", "grammar"] }),
];

const sentences = [
  s("d8s1", "ನಾನು ಸುಮಿತ್, ಇವರು ನನ್ನ ಸ್ನೇಹಿತ.", "Naanu Sumit, ivaru nanna snehita.", "I'm Sumit, this is my friend.", "मैं सुमित, ये मेरे दोस्त हैं।", {
    words: ["Naanu", "Sumit,", "ivaru", "nanna", "snehita"], wordsKn: ["ನಾನು", "ಸುಮಿತ್,", "ಇವರು", "ನನ್ನ", "ಸ್ನೇಹಿತ"],
  }),
  s("d8s2", "ಅವನು ಯಾರು?", "Avanu yaaru?", "Who is he?", "वह कौन है?", {
    formality: "casual", words: ["Avanu", "yaaru?"], wordsKn: ["ಅವನು", "ಯಾರು?"],
  }),
  s("d8s3", "ಅವರು ಯಾರು?", "Avaru yaaru?", "Who is that (person)?", "वे कौन हैं?", {
    formality: "polite", words: ["Avaru", "yaaru?"], wordsKn: ["ಅವರು", "ಯಾರು?"],
  }),
  s("d8s4", "ಇದು ನನ್ನದು, ಅದು ನಿಮ್ಮದು.", "Idu nannadu, adu nimmadu.", "This is mine, that is yours.", "यह मेरा है, वह आपका है।", {
    words: ["Idu", "nannadu,", "adu", "nimmadu"], wordsKn: ["ಇದು", "ನನ್ನದು,", "ಅದು", "ನಿಮ್ಮದು"],
    note: bi("nanna + du = nannadu (mine). nimma + du = nimmadu (yours).", "nanna + du = nannadu (मेरा वाला)। nimma + du = nimmadu (आपका वाला)।"),
  }),
  s("d8s5", "ನಿಮಗೆ ಏನು ಬೇಕು?", "Nimage enu beku?", "What do you want?", "आपको क्या चाहिए?", {
    formality: "polite", words: ["Nimage", "enu", "beku?"], wordsKn: ["ನಿಮಗೆ", "ಏನು", "ಬೇಕು?"],
  }),
  s("d8s6", "ಅವಳು ನನ್ನ ಅಕ್ಕ.", "Avalu nanna akka.", "She is my elder sister.", "वह मेरी बड़ी बहन है।", {
    words: ["Avalu", "nanna", "akka"], wordsKn: ["ಅವಳು", "ನನ್ನ", "ಅಕ್ಕ"],
  }),
  s("d8s7", "ನಮ್ಮ ಮನೆ ಕೋರಮಂಗಲದಲ್ಲಿ ಇದೆ.", "Namma mane Koramangala-dalli ide.", "Our house is in Koramangala.", "हमारा घर कोरमंगला में है।", {
    words: ["Namma", "mane", "Koramangala-dalli", "ide"], wordsKn: ["ನಮ್ಮ", "ಮನೆ", "ಕೋರಮಂಗಲದಲ್ಲಿ", "ಇದೆ"],
  }),
  s("d8s8", "ಅದು ಏನು?", "Adu enu?", "What is that?", "वह क्या है?", {
    words: ["Adu", "enu?"], wordsKn: ["ಅದು", "ಏನು?"],
  }),
  s("d8s9", "ನಾವು ಸ್ನೇಹಿತರು.", "Naavu snehitaru.", "We are friends.", "हम दोस्त हैं।", {
    words: ["Naavu", "snehitaru"], wordsKn: ["ನಾವು", "ಸ್ನೇಹಿತರು"],
  }),
];

export const day08: DayLesson = {
  day: 8, week: 2, type: "lesson", emoji: "🧑‍🤝‍🧑", minutes: 20,
  title: bi("Pronouns", "सर्वनाम"),
  subtitle: bi("Naanu, neenu, avanu, avalu, avaru — and the i-/a- trick", "Naanu, neenu, avanu, avalu, avaru — और i-/a- की ट्रिक"),
  vocab, sentences,
  scriptLetters: ["la", "va", "sa", "ha"],
  concept: {
    title: bi("The pronoun map", "सर्वनामों का नक्शा"),
    intro: bi("Kannada pronouns look scary in a table but they follow two tiny rules. Learn the rules, not the table.", "कन्नड़ सर्वनाम तालिका में डरावने लगते हैं पर दो छोटे नियमों पर चलते हैं। तालिका नहीं, नियम सीखो।"),
    sections: [
      {
        heading: bi("Rule 1: i- is near, a- is far", "नियम 1: i- पास, a- दूर"),
        body: bi("idu (this) / adu (that). illi (here) / alli (there). ivanu (this guy) / avanu (that guy). ivaru (this person, polite) / avaru (that person, polite). Hindi has यह/वह and यहाँ/वहाँ — same idea.", "idu (यह) / adu (वह)। illi (यहाँ) / alli (वहाँ)। ivanu (यह लड़का) / avanu (वह लड़का)। ivaru (ये) / avaru (वे)। हिंदी में यह/वह और यहाँ/वहाँ — वही सोच।"),
        bridge: [
          { kn: "ಇದು / ಅದು", roman: "idu / adu", hi: "यह / वह", en: "this / that (thing)" },
          { kn: "ಇಲ್ಲಿ / ಅಲ್ಲಿ", roman: "illi / alli", hi: "यहाँ / वहाँ", en: "here / there" },
          { kn: "ಇವರು / ಅವರು", roman: "ivaru / avaru", hi: "ये / वे", en: "this / that person (polite)" },
        ],
      },
      {
        heading: bi("Rule 2: respect = avaru", "नियम 2: आदर = avaru"),
        body: bi("avanu (he) and avalu (she) are for friends, kids, people younger than you. For anyone else — boss, auto driver, parents, strangers — use avaru, even for a single person. When in doubt, avaru.", "avanu (वह) और avalu (वह) दोस्तों, बच्चों, छोटों के लिए। बाकी सबके लिए — बॉस, ऑटो वाला, माता-पिता, अजनबी — avaru, एक व्यक्ति के लिए भी। शक हो तो avaru।"),
      },
      {
        heading: bi("Possessive and 'to' forms", "'का' और 'को' रूप"),
        body: bi("Each pronoun has a 'my/your' form and a 'to me/to you' form:\nnaanu → nanna (my) → nanage (to me)\nneevu → nimma (your) → nimage (to you)\navaru → avara (their) → avarige (to them)\nnaavu → namma (our) → namage (to us)\nThe 'to' form is what you use with beku, gottu, ishta.", "हर सर्वनाम का 'मेरा/आपका' और 'मुझे/आपको' रूप है:\nnaanu → nanna (मेरा) → nanage (मुझे)\nneevu → nimma (आपका) → nimage (आपको)\navaru → avara (उनका) → avarige (उन्हें)\nnaavu → namma (हमारा) → namage (हमें)\n'को' रूप beku, gottu, ishta के साथ लगता है।"),
        examples: [
          ex("ನಿಮಗೆ ಕನ್ನಡ ಗೊತ್ತಾ?", "Nimage Kannada gotta?", "Do you know Kannada?", "आपको कन्नड़ आती है?"),
          ex("ಅವರಿಗೆ ಹಿಂದಿ ಗೊತ್ತಿಲ್ಲ.", "Avarige Hindi gottilla.", "They don't know Hindi.", "उन्हें हिंदी नहीं आती।"),
        ],
      },
    ],
    tip: bi("Don't memorise ivalu/ivanu now. Idu, adu, avaru, nanage and nimage cover 90% of real conversations.", "अभी ivalu/ivanu रटने की ज़रूरत नहीं। Idu, adu, avaru, nanage और nimage से 90% बातचीत चल जाती है।"),
  },
  conversation: {
    id: "d8c1",
    title: bi("Who's who at the party", "पार्टी में कौन कौन है"),
    setting: bi("A colleague's housewarming.", "सहकर्मी का गृह-प्रवेश।"),
    speakers: { A: "Colleague", B: "You" },
    lines: [
      line("A", "ಬನ್ನಿ ಬನ್ನಿ! ಇವರು ನನ್ನ ಅಮ್ಮ.", "Banni banni! Ivaru nanna amma.", "Come, come! This is my mother.", "आइए आइए! ये मेरी माँ हैं।"),
      line("B", "ನಮಸ್ಕಾರ! ನಾನು ಸುಮಿತ್.", "Namaskara! Naanu Sumit.", "Hello! I'm Sumit.", "नमस्ते! मैं सुमित हूँ।"),
      line("A", "ಅವನು ನನ್ನ ತಮ್ಮ, ಅವಳು ಅವನ ಹೆಂಡತಿ.", "Avanu nanna thamma, avalu avana hendati.", "He is my younger brother, she is his wife.", "वह मेरा छोटा भाई है, वह उसकी पत्नी है।"),
      line("B", "ಮತ್ತು ಅವರು ಯಾರು?", "Mattu avaru yaaru?", "And who is that?", "और वे कौन हैं?"),
      line("A", "ಅವರು ನಮ್ಮ ಮನೆ ಓನರ್.", "Avaru namma mane owner.", "That's our house owner.", "वे हमारे मकान मालिक हैं।"),
      line("B", "ಓಹ್! ನಿಮ್ಮ ಮನೆ ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ.", "Oh! Nimma mane tumba chennagide.", "Oh! Your house is very nice.", "ओह! आपका घर बहुत अच्छा है।"),
    ],
    prompts: [
      {
        afterLine: 2,
        question: bi("Ask politely who the older man in the corner is:", "कोने में खड़े बुज़ुर्ग के बारे में विनम्रता से पूछें:"),
        options: [
          { kn: "ಅವರು ಯಾರು?", roman: "Avaru yaaru?", en: "Who is that (person)?", correct: true },
          { kn: "ಅವನು ಯಾರು?", roman: "Avanu yaaru?", en: "Who is he? (casual)", correct: false, feedback: bi("For an elder, use the respectful 'avaru', not 'avanu'.", "बड़े के लिए आदर वाला 'avaru', 'avanu' नहीं।") },
          { kn: "ಅದು ಏನು?", roman: "Adu enu?", en: "What is that?", correct: false, feedback: bi("'Adu enu' is for things, not people!", "'Adu enu' चीज़ों के लिए है, लोगों के लिए नहीं!") },
        ],
      },
      {
        afterLine: 4,
        question: bi("Compliment the house:", "घर की तारीफ़ करें:"),
        options: [
          { kn: "ನಿಮ್ಮ ಮನೆ ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ.", roman: "Nimma mane tumba chennagide.", en: "Your house is very nice.", correct: true },
          { kn: "ನನ್ನ ಮನೆ ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ.", roman: "Nanna mane tumba chennagide.", en: "My house is very nice.", correct: false, feedback: bi("Nanna = my. You want nimma = your.", "Nanna = मेरा। यहाँ nimma = आपका।") },
          { kn: "ನಿಮ್ಮ ಮನೆ ಎಲ್ಲಿದೆ?", roman: "Nimma mane ellide?", en: "Where is your house?", correct: false },
        ],
      },
    ],
  },
  bossQuestion: {
    id: "d8boss", type: "mcq", skill: "grammar",
    prompt: bi("Your manager (a woman) is at her desk. A colleague asks where she is. You say:", "आपकी मैनेजर (महिला) अपनी डेस्क पर हैं। सहकर्मी पूछता है वे कहाँ हैं। आप कहते हैं:"),
    options: ["Avaru alli iddaare", "Avalu alli iddaale", "Adu alli ide", "Avanu alli iddaane"],
    answer: "Avaru alli iddaare",
    explanation: bi("For a manager, use respectful avaru + iddaare. 'Avalu' is grammatically fine but sounds disrespectful for a boss.", "मैनेजर के लिए आदर वाला avaru + iddaare। 'Avalu' व्याकरण में सही है पर बॉस के लिए अपमानजनक लगता है।"),
  },
  dailyPhrase: {
    kn: "ನಿಮಗೆ ಗೊತ್ತಾ?", roman: "Nimage gotta?",
    meaning: bi("Do you know? (ask anyone anything)", "आपको पता है? (किसी से कुछ भी पूछें)"),
    example: ex("ಈ ಜಾಗ ನಿಮಗೆ ಗೊತ್ತಾ?", "Ee jaaga nimage gotta?", "Do you know this place?", "यह जगह आपको पता है?"),
    mini: [
      line("A", "ಮೆಟ್ರೋ ಎಲ್ಲಿದೆ ನಿಮಗೆ ಗೊತ್ತಾ?", "Metro ellide nimage gotta?", "Do you know where the metro is?", "आपको पता है मेट्रो कहाँ है?"),
      line("B", "ಗೊತ್ತು, ಅಲ್ಲಿ ಎಡಕ್ಕೆ.", "Gottu, alli edakke.", "I know, left over there.", "पता है, वहाँ बाएँ।"),
    ],
  },
};
