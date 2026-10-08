import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

const vocab = [
  v("hode", "ಹೋದೆ", "Hode", "I went", "मैं गया", { pos: "verb", tags: ["verb", "tense"],
    example: ex("ನಿನ್ನೆ ನಾನು ಮಾಲ್‌ಗೆ ಹೋದೆ.", "Ninne naanu mall-ge hode.", "Yesterday I went to the mall.", "कल मैं मॉल गया।") }),
  v("bande", "ಬಂದೆ", "Bande", "I came", "मैं आया", { pos: "verb", tags: ["verb", "tense"] }),
  v("tinde", "ತಿಂದೆ", "Tinde", "I ate", "मैंने खाया", { pos: "verb", tags: ["verb", "tense"],
    example: ex("ನಾನು ದೋಸೆ ತಿಂದೆ.", "Naanu dose tinde.", "I ate dosa.", "मैंने डोसा खाया।") }),
  v("nodide", "ನೋಡಿದೆ", "Nodide", "I saw", "मैंने देखा", { pos: "verb", tags: ["verb", "tense"],
    example: ex("ನಾನು ಆ ಸಿನಿಮಾ ನೋಡಿದೆ.", "Naanu aa cinema nodide.", "I saw that movie.", "मैंने वह फ़िल्म देखी।") }),
  v("maataadide", "ಮಾತಾಡಿದೆ", "Maataadide", "I spoke", "मैंने बात की", { pos: "verb", tags: ["verb", "tense"] }),
  v("maadide", "ಮಾಡಿದೆ", "Maadide", "I did", "मैंने किया", { pos: "verb", tags: ["verb", "tense"],
    example: ex("ಕೆಲಸ ಮಾಡಿದೆ.", "Kelsa maadide.", "I did the work.", "मैंने काम किया।") }),
  v("kudide", "ಕುಡಿದೆ", "Kudide", "I drank", "मैंने पिया", { pos: "verb", tags: ["verb", "tense"] }),
  v("kotte", "ಕೊಟ್ಟೆ", "Kotte", "I gave", "मैंने दिया", { pos: "verb", tags: ["verb", "tense"] }),
  v("tagonde", "ತಗೊಂಡೆ", "Tagonde", "I took", "मैंने लिया", { pos: "verb", tags: ["verb", "tense"] }),
  v("ninne", "ನಿನ್ನೆ", "Ninne", "Yesterday", "कल (बीता)", { pos: "adverb", tags: ["time"] }),
  v("ivattu", "ಇವತ್ತು", "Ivattu", "Today", "आज", { pos: "adverb", tags: ["time"],
    example: ex("ಇವತ್ತು ರಜೆ.", "Ivattu raje.", "Today is a holiday.", "आज छुट्टी है।") }),
  v("naale", "ನಾಳೆ", "Naale", "Tomorrow", "कल (आने वाला)", { pos: "adverb", tags: ["time"] }),
  v("yaavaga", "ಯಾವಾಗ", "Yaavaga", "When?", "कब", { pos: "question", tags: ["question", "time"],
    example: ex("ಯಾವಾಗ ಬಂದ್ರಿ?", "Yaavaga bandri?", "When did you come?", "आप कब आए?") }),
  v("aaytu", "ಆಯ್ತು", "Aaytu", "Done / It happened / Okay", "हो गया", { pos: "expression", tags: ["basic"],
    context: bi("The all-purpose 'done'. Oota aaytu (ate), kelsa aaytu (work done), late aaytu (got late), 'aaytu' alone = okay, fine.", "हर काम का 'हो गया'। Oota aaytu (खा लिया), kelsa aaytu (काम हो गया), late aaytu (देर हो गई), अकेला 'aaytu' = ठीक है।") }),
  v("modalu", "ಮೊದಲು", "Modalu", "Before / First", "पहले", { pos: "adverb", tags: ["time"] }),
  v("vaara", "ವಾರ", "Vaara", "Week", "हफ़्ता", { pos: "noun", tags: ["time"],
    example: ex("ಹೋದ ವಾರ.", "Hoda vaara.", "Last week.", "पिछले हफ़्ते।") }),
];

const sentences = [
  s("d11s1", "ನಿನ್ನೆ ನಾನು ಮಾಲ್‌ಗೆ ಹೋದೆ.", "Ninne naanu mall-ge hode.", "Yesterday I went to the mall.", "कल मैं मॉल गया।", {
    words: ["Ninne", "naanu", "mall-ge", "hode"], wordsKn: ["ನಿನ್ನೆ", "ನಾನು", "ಮಾಲ್‌ಗೆ", "ಹೋದೆ"],
  }),
  s("d11s2", "ನಾನು ದೋಸೆ ತಿಂದೆ.", "Naanu dose tinde.", "I ate dosa.", "मैंने डोसा खाया।", {
    words: ["Naanu", "dose", "tinde"], wordsKn: ["ನಾನು", "ದೋಸೆ", "ತಿಂದೆ"],
  }),
  s("d11s3", "ಅವರು ಬೆಳಿಗ್ಗೆ ಬಂದ್ರು.", "Avaru belagge bandru.", "They came in the morning.", "वे सुबह आए।", {
    words: ["Avaru", "belagge", "bandru"], wordsKn: ["ಅವರು", "ಬೆಳಿಗ್ಗೆ", "ಬಂದ್ರು"],
  }),
  s("d11s4", "ನೀವು ಯಾವಾಗ ಬಂದ್ರಿ?", "Neevu yaavaga bandri?", "When did you come?", "आप कब आए?", {
    formality: "polite", words: ["Neevu", "yaavaga", "bandri?"], wordsKn: ["ನೀವು", "ಯಾವಾಗ", "ಬಂದ್ರಿ?"],
  }),
  s("d11s5", "ನಾನು ಅವರ ಜೊತೆ ಮಾತಾಡಿದೆ.", "Naanu avara jote maataadide.", "I spoke with them.", "मैंने उनसे बात की।", {
    words: ["Naanu", "avara", "jote", "maataadide"], wordsKn: ["ನಾನು", "ಅವರ", "ಜೊತೆ", "ಮಾತಾಡಿದೆ"],
    breakdown: [{ roman: "avara jote", meaning: "with them", hi: "उनके साथ" }],
  }),
  s("d11s6", "ಕೆಲಸ ಆಯ್ತು.", "Kelsa aaytu.", "The work is done.", "काम हो गया।", {
    words: ["Kelsa", "aaytu"], wordsKn: ["ಕೆಲಸ", "ಆಯ್ತು"],
  }),
  s("d11s7", "ನಾನು ಆ ಸಿನಿಮಾ ನೋಡಿದೆ, ಚೆನ್ನಾಗಿತ್ತು.", "Naanu aa cinema nodide, chennagittu.", "I saw that movie, it was good.", "मैंने वह फ़िल्म देखी, अच्छी थी।", {
    words: ["Naanu", "aa", "cinema", "nodide,", "chennagittu"], wordsKn: ["ನಾನು", "ಆ", "ಸಿನಿಮಾ", "ನೋಡಿದೆ,", "ಚೆನ್ನಾಗಿತ್ತು"],
    note: bi("chennagide (is good) → chennagittu (was good).", "chennagide (अच्छा है) → chennagittu (अच्छा था)।"),
  }),
  s("d11s8", "ಅವಳು ನಿನ್ನೆ ಬರ್ಲಿಲ್ಲ.", "Avalu ninne barlilla.", "She didn't come yesterday.", "वह कल नहीं आई।", {
    words: ["Avalu", "ninne", "barlilla"], wordsKn: ["ಅವಳು", "ನಿನ್ನೆ", "ಬರ್ಲಿಲ್ಲ"],
    note: bi("Past negative = root + lilla, same for everyone: barlilla, hoglilla, maadlilla, tinnlilla.", "भूतकाल नकारात्मक = मूल + lilla, सबके लिए एक जैसा: barlilla, hoglilla, maadlilla।"),
  }),
  s("d11s9", "ಹೋದ ವಾರ ನಾನು ಊರಿಗೆ ಹೋಗಿದ್ದೆ.", "Hoda vaara naanu oorige hogidde.", "Last week I had gone to my hometown.", "पिछले हफ़्ते मैं अपने शहर गया था।", {
    words: ["Hoda", "vaara", "naanu", "oorige", "hogidde"], wordsKn: ["ಹೋದ", "ವಾರ", "ನಾನು", "ಊರಿಗೆ", "ಹೋಗಿದ್ದೆ"],
  }),
  s("d11s10", "ಇವತ್ತು ಬೆಳಿಗ್ಗೆ ಕಾಫಿ ಕುಡಿದೆ.", "Ivattu belagge kaafi kudide.", "I drank coffee this morning.", "आज सुबह कॉफ़ी पी।", {
    words: ["Ivattu", "belagge", "kaafi", "kudide"], wordsKn: ["ಇವತ್ತು", "ಬೆಳಿಗ್ಗೆ", "ಕಾಫಿ", "ಕುಡಿದೆ"],
  }),
];

export const day11: DayLesson = {
  day: 11, week: 2, type: "lesson", emoji: "⏪", minutes: 22,
  title: bi("Past tense", "भूतकाल"),
  subtitle: bi("I went, I ate, I saw, I spoke — and 'aaytu' for everything done", "मैं गया, खाया, देखा, बोला — और हर पूरे काम के लिए 'aaytu'"),
  vocab, sentences,
  scriptLetters: ["tha", "dha", "bha", "sha"],
  concept: {
    title: bi("Talking about yesterday", "कल की बात"),
    intro: bi("Past tense endings are short. For 'I', most verbs just end in -e: hode, bande, tinde, nodide, maadide.", "भूतकाल के अंत छोटे हैं। 'मैं' के लिए ज़्यादातर क्रियाएँ -e पर खत्म होती हैं: hode, bande, tinde, nodide, maadide।"),
    sections: [
      {
        heading: bi("Endings for 'go' (hogu)", "'जाना' (hogu) के अंत"),
        body: bi("naanu hode (I went)\nneenu hode (you went, casual)\nneevu hodri (you went, polite)\navanu hoda (he went)\navalu hodlu (she went)\navaru hodru (they went)\nnaavu hodvi (we went)\nSame endings for banda/bandlu/bandru (came), maadida/maadidlu/maadidru (did).", "naanu hode (मैं गया)\nneenu hode (तुम गए)\nneevu hodri (आप गए)\navanu hoda (वह गया)\navalu hodlu (वह गई)\navaru hodru (वे गए)\nnaavu hodvi (हम गए)\nवही अंत banda/bandlu/bandru (आया), maadida/maadidlu/maadidru (किया) के लिए।"),
        bridge: [
          { kn: "ಹೋದೆ", roman: "hode", hi: "गया", en: "I went" },
          { kn: "ಹೋದ್ರಿ", roman: "hodri", hi: "आप गए", en: "you went (polite)" },
          { kn: "ಹೋದ್ರು", roman: "hodru", hi: "वे गए", en: "they went" },
        ],
      },
      {
        heading: bi("Didn't: -lilla", "नहीं किया: -lilla"),
        body: bi("Good news: the past negative has ONE form for everyone. Root + lilla: barlilla (didn't come), hoglilla (didn't go), maadlilla (didn't do), nodlilla (didn't see), tinnlilla (didn't eat).", "खुशखबरी: भूतकाल का नकारात्मक सबके लिए एक ही रूप। मूल + lilla: barlilla (नहीं आया), hoglilla (नहीं गया), maadlilla (नहीं किया), nodlilla (नहीं देखा)।"),
        examples: [
          ex("ನಾನು ನಿನ್ನೆ ಆಫೀಸ್‌ಗೆ ಹೋಗ್ಲಿಲ್ಲ.", "Naanu ninne office-ge hoglilla.", "I didn't go to office yesterday.", "मैं कल ऑफिस नहीं गया।"),
          ex("ಅವರು ಕಾಲ್ ಮಾಡ್ಲಿಲ್ಲ.", "Avaru call maadlilla.", "They didn't call.", "उन्होंने कॉल नहीं किया।"),
        ],
      },
      {
        heading: bi("Aaytu: the shortcut", "Aaytu: शॉर्टकट"),
        body: bi("Don't know the past form? Use noun + aaytu (happened). Oota aaytu, kelsa aaytu, meeting aaytu, payment aaytu. People use this constantly. Negative: aagilla (not yet done).", "भूतकाल का रूप नहीं पता? संज्ञा + aaytu (हो गया)। Oota aaytu, kelsa aaytu, meeting aaytu, payment aaytu। लोग इसे लगातार बोलते हैं। नकारात्मक: aagilla (अभी नहीं हुआ)।"),
      },
    ],
    tip: bi("Time words do the heavy lifting: ninne (yesterday), hoda vaara (last week), modalu (before). Say the time word first, like Hindi.", "समय-शब्द भारी काम करते हैं: ninne (कल), hoda vaara (पिछले हफ़्ते), modalu (पहले)। हिंदी की तरह समय-शब्द पहले बोलो।"),
  },
  conversation: {
    id: "d11c1",
    title: bi("Monday at work", "ऑफिस में सोमवार"),
    setting: bi("Weekend catch-up with a colleague.", "सहकर्मी से वीकेंड की बातें।"),
    speakers: { A: "Colleague", B: "You" },
    lines: [
      line("A", "ವೀಕೆಂಡ್ ಏನ್ ಮಾಡಿದ್ರಿ?", "Weekend en maadidri?", "What did you do on the weekend?", "वीकेंड पर क्या किया?"),
      line("B", "ಶನಿವಾರ ಮಾಲ್‌ಗೆ ಹೋದೆ, ಸಿನಿಮಾ ನೋಡಿದೆ.", "Shanivaara mall-ge hode, cinema nodide.", "Saturday I went to the mall, saw a movie.", "शनिवार मॉल गया, फ़िल्म देखी।"),
      line("A", "ಯಾವ ಸಿನಿಮಾ? ಚೆನ್ನಾಗಿತ್ತಾ?", "Yaava cinema? Chennagitta?", "Which movie? Was it good?", "कौन सी फ़िल्म? अच्छी थी?"),
      line("B", "ಕನ್ನಡ ಸಿನಿಮಾ. ತುಂಬಾ ಚೆನ್ನಾಗಿತ್ತು, ಆದ್ರೆ ಪೂರ್ತಿ ಅರ್ಥ ಆಗ್ಲಿಲ್ಲ.", "Kannada cinema. Tumba chennagittu, aadre poorti artha aaglilla.", "A Kannada movie. Very good, but I didn't understand everything.", "कन्नड़ फ़िल्म। बहुत अच्छी थी, लेकिन पूरी समझ नहीं आई।"),
      line("A", "ಪರವಾಗಿಲ್ಲ! ಭಾನುವಾರ?", "Parvagilla! Bhaanuvaara?", "No problem! Sunday?", "कोई बात नहीं! रविवार?"),
      line("B", "ಭಾನುವಾರ ಎಲ್ಲೂ ಹೋಗ್ಲಿಲ್ಲ. ಮನೇಲಿ ಇದ್ದೆ.", "Bhaanuvaara ellu hoglilla. Manelli idde.", "Sunday I didn't go anywhere. I was at home.", "रविवार कहीं नहीं गया। घर पर था।"),
    ],
    prompts: [
      {
        afterLine: 0,
        question: bi("Say: Saturday I went to the mall and saw a movie.", "कहें: शनिवार मैं मॉल गया और फ़िल्म देखी।"),
        options: [
          { kn: "ಶನಿವಾರ ಮಾಲ್‌ಗೆ ಹೋದೆ, ಸಿನಿಮಾ ನೋಡಿದೆ.", roman: "Shanivaara mall-ge hode, cinema nodide.", en: "Saturday I went to the mall, saw a movie.", correct: true },
          { kn: "ಶನಿವಾರ ಮಾಲ್‌ಗೆ ಹೋಗ್ತೀನಿ, ಸಿನಿಮಾ ನೋಡ್ತೀನಿ.", roman: "Shanivaara mall-ge hogtini, cinema nodtini.", en: "Saturday I go to the mall, I watch a movie.", correct: false, feedback: bi("That's present tense. Past: hode, nodide.", "यह वर्तमान काल है। भूतकाल: hode, nodide।") },
          { kn: "ಶನಿವಾರ ಮಾಲ್‌ಗೆ ಹೋಗ್ಲಿಲ್ಲ.", roman: "Shanivaara mall-ge hoglilla.", en: "Saturday I didn't go to the mall.", correct: false },
        ],
      },
      {
        afterLine: 4,
        question: bi("Sunday you stayed home. Say you didn't go anywhere:", "रविवार घर पर रहे। कहें कहीं नहीं गए:"),
        options: [
          { kn: "ಎಲ್ಲೂ ಹೋಗ್ಲಿಲ್ಲ, ಮನೇಲಿ ಇದ್ದೆ.", roman: "Ellu hoglilla, manelli idde.", en: "Didn't go anywhere, was at home.", correct: true },
          { kn: "ಎಲ್ಲೂ ಹೋದೆ, ಮನೇಲಿ ಇದ್ದೆ.", roman: "Ellu hode, manelli idde.", en: "Went everywhere, was at home.", correct: false, feedback: bi("Contradiction! 'hoglilla' = didn't go.", "विरोधाभास! 'hoglilla' = नहीं गया।") },
          { kn: "ನಾಳೆ ಹೋಗ್ತೀನಿ.", roman: "Naale hogtini.", en: "I'll go tomorrow.", correct: false },
        ],
      },
    ],
  },
  bossQuestion: {
    id: "d11boss", type: "typein", skill: "grammar",
    prompt: bi("Type in Kannada (roman): 'Yesterday I didn't go to the office.'", "कन्नड़ में टाइप करें (रोमन): 'कल मैं ऑफिस नहीं गया।'"),
    answer: "Ninne naanu office-ge hoglilla",
    acceptable: ["Ninne naanu officege hoglilla", "Ninne naanu office ge hoglilla", "Naanu ninne office-ge hoglilla", "Ninne office-ge hoglilla", "Ninne naanu office-ge hogalilla"],
    explanation: bi("Ninne (yesterday) + naanu (I) + office-ge (to office) + hoglilla (didn't go).", "Ninne (कल) + naanu (मैं) + office-ge (ऑफिस को) + hoglilla (नहीं गया)।"),
  },
  dailyPhrase: {
    kn: "ಆಯ್ತು", roman: "Aaytu",
    meaning: bi("Done / Okay / It's happened", "हो गया / ठीक है"),
    example: ex("ಪೇಮೆಂಟ್ ಆಯ್ತಾ? — ಆಯ್ತು!", "Payment aaytaa? — Aaytu!", "Payment done? — Done!", "पेमेंट हो गया? — हो गया!"),
    mini: [
      line("A", "ಕೆಲಸ ಆಯ್ತಾ?", "Kelsa aaytaa?", "Is the work done?", "काम हो गया?"),
      line("B", "ಆಯ್ತು ಸರ್, ಈಗ ಕಳಿಸ್ತೀನಿ.", "Aaytu sir, eega kalistini.", "Done sir, sending now.", "हो गया सर, अभी भेजता हूँ।"),
    ],
  },
};
