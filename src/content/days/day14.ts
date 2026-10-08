import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

const vocab = [
  v("manege", "ಮನೆಗೆ", "Manege", "To home", "घर को", { pos: "noun", tags: ["grammar"],
    example: ex("ನಾನು ಮನೆಗೆ ಹೋಗ್ತಿದ್ದೀನಿ.", "Naanu manege hogtiddini.", "I'm going home.", "मैं घर जा रहा हूँ।") }),
  v("hogtiddini", "ಹೋಗ್ತಿದ್ದೀನಿ", "Hogtiddini", "I'm going", "जा रहा हूँ", { pos: "verb", tags: ["verb", "tense"] }),
  v("bartiddini", "ಬರ್ತಿದ್ದೀನಿ", "Bartiddini", "I'm coming", "आ रहा हूँ", { pos: "verb", tags: ["verb", "tense"] }),
  v("kaaytiddini", "ಕಾಯ್ತಿದ್ದೀನಿ", "Kaaytiddini", "I'm waiting", "इंतज़ार कर रहा हूँ", { pos: "verb", tags: ["verb", "tense"],
    example: ex("ನಾನು ಬಸ್‌ಗೆ ಕಾಯ್ತಿದ್ದೀನಿ.", "Naanu bus-ge kaaytiddini.", "I'm waiting for the bus.", "मैं बस का इंतज़ार कर रहा हूँ।") }),
  v("jote", "ಜೊತೆ", "Jote", "With / Together", "साथ", { pos: "postposition", tags: ["grammar"],
    example: ex("ನನ್ನ ಜೊತೆ ಬನ್ನಿ.", "Nanna jote banni.", "Come with me.", "मेरे साथ आइए।") }),
  v("obbane", "ಒಬ್ಬನೇ", "Obbane", "Alone (male)", "अकेला", { pos: "adverb", tags: ["basic"],
    context: bi("Female: obbale (ಒಬ್ಬಳೇ). Polite/plural: obbare.", "स्त्री: obbale (ಒಬ್ಬಳೇ)। आदर/बहुवचन: obbare।") }),
];

const sentences = [
  s("d14s1", "ನಾನು ಮನೆಗೆ ಹೋಗ್ತಿದ್ದೀನಿ.", "Naanu manege hogtiddini.", "I am going home.", "मैं घर जा रहा हूँ।", {
    words: ["Naanu", "manege", "hogtiddini"], wordsKn: ["ನಾನು", "ಮನೆಗೆ", "ಹೋಗ್ತಿದ್ದೀನಿ"],
  }),
  s("d14s2", "ನಾನು ಸ್ನೇಹಿತರ ಜೊತೆ ಬರ್ತಿದ್ದೀನಿ.", "Naanu snehitara jote bartiddini.", "I'm coming with friends.", "मैं दोस्तों के साथ आ रहा हूँ।", {
    words: ["Naanu", "snehitara", "jote", "bartiddini"], wordsKn: ["ನಾನು", "ಸ್ನೇಹಿತರ", "ಜೊತೆ", "ಬರ್ತಿದ್ದೀನಿ"],
  }),
  s("d14s3", "ಒಬ್ಬನೇ ಇದ್ದೀನಿ.", "Obbane iddini.", "I'm alone.", "मैं अकेला हूँ।", { words: ["Obbane", "iddini"], wordsKn: ["ಒಬ್ಬನೇ", "ಇದ್ದೀನಿ"] }),
  s("d14s4", "ಇನ್ನೂ ಹತ್ತು ನಿಮಿಷ ಕಾಯಿರಿ.", "Innu hattu nimisha kaayiri.", "Wait ten more minutes.", "दस मिनट और रुकिए।", {
    formality: "polite", words: ["Innu", "hattu", "nimisha", "kaayiri"], wordsKn: ["ಇನ್ನೂ", "ಹತ್ತು", "ನಿಮಿಷ", "ಕಾಯಿರಿ"],
  }),
];

export const day14: DayLesson = {
  day: 14, week: 2, type: "boss", emoji: "🐉", minutes: 25,
  title: bi("Week 2 Boss Battle", "हफ्ता 2 बॉस बैटल"),
  subtitle: bi("The app speaks Kannada. You answer. Three real conversations.", "ऐप कन्नड़ बोलेगा। आप जवाब देंगे। तीन असली बातचीत।"),
  vocab, sentences,
  plan: ["warmup", "words", "learn", "listen", "conversation", "speak", "translate", "boss", "result"],
  emphasis: { warmup: 2, listen: 1.5, translate: 1.5 },
  concept: {
    title: bi("Boss rules", "बॉस के नियम"),
    intro: bi("You'll hear Kannada questions. Pick the natural reply. Each conversation tests a different week-2 skill: pronouns, verbs, tenses, questions.", "आप कन्नड़ सवाल सुनेंगे। स्वाभाविक जवाब चुनें। हर बातचीत हफ्ता 2 की अलग स्किल जाँचती है: सर्वनाम, क्रिया, काल, सवाल।"),
    sections: [
      {
        heading: bi("Listen for the question word", "प्रश्न-शब्द सुनो"),
        body: bi("Ellige? → answer with a place + -ge. Yaavaga? → answer with a time. Yaaru? → answer with a person. Enu? → answer with a thing. Eshtu? → answer with a number.", "Ellige? → जगह + -ge। Yaavaga? → समय। Yaaru? → व्यक्ति। Enu? → चीज़। Eshtu? → संख्या।"),
      },
      {
        heading: bi("Match the tense", "काल मिलाओ"),
        body: bi("If they ask with -idri / -idra (past), answer in past (-de, -lilla). If they ask with -tira (present/future), answer with -tini.", "अगर -idri / -idra (भूत) से पूछें, भूत में जवाब (-de, -lilla)। अगर -tira (वर्तमान/भविष्य) से पूछें, -tini से जवाब।"),
      },
    ],
    tip: bi("You don't need perfect grammar to win. You need the right verb and the right time word.", "जीतने के लिए पूर्ण व्याकरण नहीं चाहिए। सही क्रिया और सही समय-शब्द चाहिए।"),
  },
  conversation: {
    id: "d14c1",
    title: bi("Boss 1: The curious neighbour", "बॉस 1: जिज्ञासु पड़ोसी"),
    setting: bi("Leaving your building in the evening.", "शाम को बिल्डिंग से निकलते समय।"),
    speakers: { A: "Neighbour", B: "You" },
    lines: [
      line("A", "ಎಲ್ಲಿಗೆ ಹೋಗ್ತಿದ್ದೀರಾ?", "Ellige hogtiddira?", "Where are you going?", "कहाँ जा रहे हैं?"),
      line("B", "ಮನೆಗೆ ಹೋಗ್ತಿದ್ದೀನಿ.", "Manege hogtiddini.", "I'm going home.", "घर जा रहा हूँ।"),
      line("A", "ಒಬ್ಬರೇನಾ? ಯಾರ ಜೊತೆ?", "Obbarena? Yaara jote?", "Alone? With whom?", "अकेले? किसके साथ?"),
      line("B", "ಸ್ನೇಹಿತರ ಜೊತೆ.", "Snehitara jote.", "With friends.", "दोस्तों के साथ।"),
      line("A", "ಯಾವಾಗ ಬರ್ತೀರಾ?", "Yaavaga bartira?", "When will you be back?", "कब आएँगे?"),
      line("B", "ರಾತ್ರಿ ಹತ್ತು ಗಂಟೆಗೆ ಬರ್ತೀನಿ.", "Raatri hattu ghantege bartini.", "I'll be back at ten at night.", "रात दस बजे आऊँगा।"),
    ],
    prompts: [
      {
        afterLine: 0,
        question: bi("'Ellige hogtiddira?' — Tell them you're going home.", "'Ellige hogtiddira?' — बताएँ घर जा रहे हैं।"),
        options: [
          { kn: "ಮನೆಗೆ ಹೋಗ್ತಿದ್ದೀನಿ.", roman: "Manege hogtiddini.", en: "I'm going home.", correct: true },
          { kn: "ಮನೆಯಲ್ಲಿ ಇದ್ದೀನಿ.", roman: "Maneyalli iddini.", en: "I'm at home.", correct: false, feedback: bi("-alli = at. They asked where TO: -ge.", "-alli = में/पर। उन्होंने पूछा कहाँ को: -ge।") },
          { kn: "ಮನೆಯಿಂದ ಬಂದೆ.", roman: "Maneyinda bande.", en: "I came from home.", correct: false, feedback: bi("That's where you came FROM, in the past.", "यह बताता है कहाँ से आए, भूतकाल में।") },
        ],
      },
      {
        afterLine: 2,
        question: bi("'Yaara jote?' (with whom?) — With friends:", "'Yaara jote?' (किसके साथ?) — दोस्तों के साथ:"),
        options: [
          { kn: "ಸ್ನೇಹಿತರ ಜೊತೆ.", roman: "Snehitara jote.", en: "With friends.", correct: true },
          { kn: "ಸ್ನೇಹಿತರು ಯಾರು?", roman: "Snehitaru yaaru?", en: "Who are the friends?", correct: false },
          { kn: "ಒಬ್ಬನೇ ಅಲ್ಲ.", roman: "Obbane alla.", en: "Not alone.", correct: false, feedback: bi("True, but doesn't answer 'with whom'.", "सही, पर 'किसके साथ' का जवाब नहीं।") },
        ],
      },
      {
        afterLine: 4,
        question: bi("'Yaavaga bartira?' — Say: at ten at night.", "'Yaavaga bartira?' — कहें: रात दस बजे।"),
        options: [
          { kn: "ರಾತ್ರಿ ಹತ್ತು ಗಂಟೆಗೆ ಬರ್ತೀನಿ.", roman: "Raatri hattu ghantege bartini.", en: "I'll be back at ten at night.", correct: true },
          { kn: "ರಾತ್ರಿ ಹತ್ತು ಗಂಟೆಗೆ ಬಂದೆ.", roman: "Raatri hattu ghantege bande.", en: "I came at ten at night.", correct: false, feedback: bi("bande = came (past). You'll come = bartini.", "bande = आया (भूत)। आऊँगा = bartini।") },
          { kn: "ಬೆಳಿಗ್ಗೆ ಎರಡು ಗಂಟೆಗೆ.", roman: "Belagge eradu ghantege.", en: "At two in the morning.", correct: false, feedback: bi("Belagge = morning; eradu = 2. Not what you meant!", "Belagge = सुबह; eradu = 2। यह नहीं कहना था!") },
        ],
      },
    ],
  },
  extraConversations: [
    {
      id: "d14c2",
      title: bi("Boss 2: The late colleague", "बॉस 2: देर से आया सहकर्मी"),
      setting: bi("Your teammate pings you after a missed meeting.", "मीटिंग छूटने के बाद टीममेट पूछता है।"),
      speakers: { A: "Teammate", B: "You" },
      lines: [
        line("A", "ನಿನ್ನೆ ಮೀಟಿಂಗ್‌ಗೆ ಯಾಕೆ ಬರ್ಲಿಲ್ಲ?", "Ninne meeting-ge yaake barlilla?", "Why didn't you come to the meeting yesterday?", "कल मीटिंग में क्यों नहीं आए?"),
        line("B", "ಕ್ಷಮಿಸಿ, ನಿನ್ನೆ ನಾನು ಊರಿಗೆ ಹೋಗಿದ್ದೆ.", "Kshamisi, ninne naanu oorige hogidde.", "Sorry, yesterday I had gone to my hometown.", "माफ़ कीजिए, कल मैं अपने शहर गया था।"),
        line("A", "ಓಹ್. ಯಾವಾಗ ಬಂದ್ರಿ?", "Oh. Yaavaga bandri?", "Oh. When did you come back?", "ओह। कब लौटे?"),
        line("B", "ಇವತ್ತು ಬೆಳಿಗ್ಗೆ ಬಂದೆ.", "Ivattu belagge bande.", "I came this morning.", "आज सुबह आया।"),
        line("A", "ಸರಿ. ರಿಪೋರ್ಟ್ ಇವತ್ತು ಆಗುತ್ತಾ?", "Sari. Report ivattu aagutta?", "Okay. Can the report be done today?", "ठीक है। रिपोर्ट आज हो जाएगी?"),
        line("B", "ಇವತ್ತು ಆಗಲ್ಲ, ನಾಳೆ ಖಂಡಿತ ಕಳಿಸ್ತೀನಿ.", "Ivattu aagalla, naale khandita kalistini.", "Not today, I'll definitely send it tomorrow.", "आज नहीं होगा, कल ज़रूर भेजूँगा।"),
      ],
      prompts: [
        {
          afterLine: 0,
          question: bi("Apologise and explain: yesterday you had gone to your hometown.", "माफ़ी माँगकर बताएँ: कल आप अपने शहर गए थे।"),
          options: [
            { kn: "ಕ್ಷಮಿಸಿ, ನಿನ್ನೆ ನಾನು ಊರಿಗೆ ಹೋಗಿದ್ದೆ.", roman: "Kshamisi, ninne naanu oorige hogidde.", en: "Sorry, I had gone to my hometown yesterday.", correct: true },
            { kn: "ಕ್ಷಮಿಸಿ, ನಾಳೆ ನಾನು ಊರಿಗೆ ಹೋಗ್ತೀನಿ.", roman: "Kshamisi, naale naanu oorige hogtini.", en: "Sorry, I'll go to my hometown tomorrow.", correct: false, feedback: bi("They asked about yesterday (ninne). Past: hogidde / hode.", "उन्होंने कल (ninne) के बारे में पूछा। भूत: hogidde / hode।") },
            { kn: "ಊರು ಯಾವುದು?", roman: "Ooru yaavudu?", en: "Which hometown?", correct: false },
          ],
        },
        {
          afterLine: 2,
          question: bi("'Yaavaga bandri?' — This morning:", "'Yaavaga bandri?' — आज सुबह:"),
          options: [
            { kn: "ಇವತ್ತು ಬೆಳಿಗ್ಗೆ ಬಂದೆ.", roman: "Ivattu belagge bande.", en: "I came this morning.", correct: true },
            { kn: "ಇವತ್ತು ಬೆಳಿಗ್ಗೆ ಬರ್ತೀನಿ.", roman: "Ivattu belagge bartini.", en: "I'll come this morning.", correct: false, feedback: bi("You already came — past tense bande.", "आप आ चुके — भूतकाल bande।") },
            { kn: "ನಿನ್ನೆ ರಾತ್ರಿ ಹೋದೆ.", roman: "Ninne raatri hode.", en: "I went last night.", correct: false },
          ],
        },
        {
          afterLine: 4,
          question: bi("Can't today, definitely tomorrow:", "आज नहीं, कल ज़रूर:"),
          options: [
            { kn: "ಇವತ್ತು ಆಗಲ್ಲ, ನಾಳೆ ಖಂಡಿತ ಕಳಿಸ್ತೀನಿ.", roman: "Ivattu aagalla, naale khandita kalistini.", en: "Not today, I'll definitely send tomorrow.", correct: true },
            { kn: "ಇವತ್ತು ಆಗುತ್ತೆ, ನಾಳೆ ಆಗಲ್ಲ.", roman: "Ivattu aagutte, naale aagalla.", en: "Today yes, tomorrow no.", correct: false, feedback: bi("Reversed.", "उल्टा।") },
            { kn: "ನಿನ್ನೆ ಕಳಿಸಿದೆ.", roman: "Ninne kaliside.", en: "I sent it yesterday.", correct: false, feedback: bi("Nice try, but you were out of town!", "अच्छी कोशिश, पर आप शहर से बाहर थे!") },
          ],
        },
      ],
    },
    {
      id: "d14c3",
      title: bi("Boss 3: The shop counter", "बॉस 3: दुकान का काउंटर"),
      setting: bi("Buying water and snacks at a kirana store.", "किराना दुकान पर पानी और स्नैक्स खरीदना।"),
      speakers: { A: "Shopkeeper", B: "You" },
      lines: [
        line("A", "ಏನು ಬೇಕು?", "Enu beku?", "What do you want?", "क्या चाहिए?"),
        line("B", "ಎರಡು ನೀರು ಬಾಟಲ್ ಕೊಡಿ.", "Eradu neeru bottle kodi.", "Give two water bottles.", "दो पानी की बोतल दीजिए।"),
        line("A", "ದೊಡ್ಡದಾ ಚಿಕ್ಕದಾ?", "Doddadaa chikkadaa?", "Big or small?", "बड़ी या छोटी?"),
        line("B", "ದೊಡ್ಡದು.", "Doddadu.", "Big.", "बड़ी।"),
        line("A", "ಬೇರೆ ಏನಾದ್ರೂ ಬೇಕಾ?", "Bere enaadru beka?", "Anything else?", "और कुछ चाहिए?"),
        line("B", "ಇಲ್ಲ, ಸಾಕು. ಎಷ್ಟು ಆಯ್ತು?", "Illa, saaku. Eshtu aaytu?", "No, that's enough. How much is it?", "नहीं, बस। कितना हुआ?"),
        line("A", "ನಲವತ್ತು ರೂಪಾಯಿ.", "Nalavattu rupaayi.", "Forty rupees.", "चालीस रुपये।"),
      ],
      prompts: [
        {
          afterLine: 0,
          question: bi("Ask for two water bottles:", "दो पानी की बोतल माँगें:"),
          options: [
            { kn: "ಎರಡು ನೀರು ಬಾಟಲ್ ಕೊಡಿ.", roman: "Eradu neeru bottle kodi.", en: "Give two water bottles.", correct: true },
            { kn: "ಎರಡು ನೀರು ಬಾಟಲ್ ಬೇಡ.", roman: "Eradu neeru bottle beda.", en: "I don't want two water bottles.", correct: false, feedback: bi("Beda = don't want.", "Beda = नहीं चाहिए।") },
            { kn: "ನೀರು ಎಲ್ಲಿದೆ?", roman: "Neeru ellide?", en: "Where is the water?", correct: false },
          ],
        },
        {
          afterLine: 4,
          question: bi("'Bere enaadru beka?' — Say no, that's enough, and ask the total:", "'Bere enaadru beka?' — नहीं, बस, और कुल पूछें:"),
          options: [
            { kn: "ಇಲ್ಲ, ಸಾಕು. ಎಷ್ಟು ಆಯ್ತು?", roman: "Illa, saaku. Eshtu aaytu?", en: "No, enough. How much is it?", correct: true },
            { kn: "ಹೌದು, ಇನ್ನೂ ಬೇಕು.", roman: "Houdu, innu beku.", en: "Yes, I want more.", correct: false },
            { kn: "ಎಷ್ಟು ಹೊತ್ತು?", roman: "Eshtu hottu?", en: "How long?", correct: false, feedback: bi("Hottu = time. For money, 'Eshtu aaytu?'", "Hottu = समय। पैसों के लिए 'Eshtu aaytu?'") },
          ],
        },
      ],
    },
  ],
  bossQuestion: {
    id: "d14boss", type: "typein", skill: "conversation",
    prompt: bi("The app asks: 'Ellige hogtiddira?' Type your answer: 'I'm going to the office.'", "ऐप पूछता है: 'Ellige hogtiddira?' जवाब टाइप करें: 'मैं ऑफिस जा रहा हूँ।'"),
    answer: "Office-ge hogtiddini",
    acceptable: ["Naanu office-ge hogtiddini", "Officege hogtiddini", "Office ge hogtiddini", "Naanu officege hogtiddini", "Naanu office-ge hogta iddini", "Office-ge hogta iddini"],
    explanation: bi("Office + ge (to) + hogtiddini (I'm going). 'Naanu' is optional — the verb ending already says 'I'.", "Office + ge (को) + hogtiddini (जा रहा हूँ)। 'Naanu' वैकल्पिक है — क्रिया का अंत पहले ही 'मैं' बताता है।"),
  },
  dailyPhrase: {
    kn: "ಬೇರೆ ಏನಾದ್ರೂ ಬೇಕಾ?", roman: "Bere enaadru beka?",
    meaning: bi("Anything else? (you'll hear this at every counter)", "और कुछ चाहिए? (हर काउंटर पर सुनेंगे)"),
    example: ex("ಬೇರೆ ಏನಾದ್ರೂ ಬೇಕಾ? — ಇಲ್ಲ, ಸಾಕು.", "Bere enaadru beka? — Illa, saaku.", "Anything else? — No, that's enough.", "और कुछ चाहिए? — नहीं, बस।"),
    mini: [
      line("A", "ಬೇರೆ ಏನಾದ್ರೂ ಬೇಕಾ?", "Bere enaadru beka?", "Anything else?", "और कुछ?"),
      line("B", "ಒಂದು ನೀರು ಬಾಟಲ್ ಕೊಡಿ, ಅಷ್ಟೇ.", "Ondu neeru bottle kodi, ashte.", "One water bottle, that's all.", "एक पानी की बोतल, बस।"),
    ],
  },
};
