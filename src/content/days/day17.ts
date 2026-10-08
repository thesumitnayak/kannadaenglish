import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

const vocab = [
  v("auto", "ಆಟೋ", "Auto", "Auto-rickshaw", "ऑटो", { pos: "noun", tags: ["auto"] }),
  v("meter", "ಮೀಟರ್", "Meter", "Meter", "मीटर", { pos: "noun", tags: ["auto"],
    example: ex("ಮೀಟರ್ ಹಾಕಿ.", "Meter haaki.", "Put the meter on.", "मीटर लगाइए।") }),
  v("haaki", "ಹಾಕಿ", "Haaki", "Put / Turn on (polite)", "लगाइए", { pos: "verb", formality: "polite", tags: ["verb", "auto"] }),
  v("bartira", "ಬರ್ತೀರಾ?", "Bartira?", "Will you come? (to a driver: will you take me?)", "चलेंगे?", { pos: "question", tags: ["auto", "question"],
    example: ex("ಅಣ್ಣ, ಇಂದಿರಾನಗರ ಬರ್ತೀರಾ?", "Anna, Indiranagar bartira?", "Brother, will you go to Indiranagar?", "भैया, इंदिरानगर चलेंगे?") }),
  v("nidhaanavaagi", "ನಿಧಾನವಾಗಿ", "Nidhaanavaagi", "Slowly", "धीरे", { pos: "adverb", tags: ["auto", "basic"],
    example: ex("ನಿಧಾನವಾಗಿ ಹೋಗಿ.", "Nidhaanavaagi hogi.", "Go slowly.", "धीरे चलिए।") }),
  v("u-turn", "ಯು-ಟರ್ನ್", "U-turn", "U-turn", "यू-टर्न", { pos: "noun", tags: ["auto"],
    example: ex("ಇಲ್ಲಿ ಯು-ಟರ್ನ್ ತಗೊಳ್ಳಿ.", "Illi U-turn tagolli.", "Take a U-turn here.", "यहाँ यू-टर्न लीजिए।") }),
  v("sarina", "ಸರಿನಾ?", "Sarina?", "Is that okay?", "ठीक है ना?", { pos: "question", tags: ["question", "auto"],
    example: ex("ಎಂಬತ್ತು ಸರಿನಾ?", "Embattu sarina?", "Is eighty okay?", "अस्सी ठीक है ना?") }),
  v("traffic", "ಟ್ರಾಫಿಕ್", "Traffic", "Traffic", "ट्रैफिक", { pos: "noun", tags: ["auto"],
    example: ex("ತುಂಬಾ ಟ್ರಾಫಿಕ್ ಇದೆ.", "Tumba traffic ide.", "There's a lot of traffic.", "बहुत ट्रैफिक है।") }),
  v("drop", "ಡ್ರಾಪ್ ಮಾಡಿ", "Drop maadi", "Drop me", "छोड़ दीजिए", { pos: "phrase", tags: ["auto"],
    example: ex("ಇಲ್ಲಿ ಡ್ರಾಪ್ ಮಾಡಿ.", "Illi drop maadi.", "Drop me here.", "यहाँ छोड़ दीजिए।") }),
  v("ille", "ಇಲ್ಲೇ", "Ille", "Right here", "यहीं", { pos: "adverb", tags: ["auto", "directions"] }),
  v("aa-kade", "ಆ ಕಡೆ", "Aa kade", "That side", "उस तरफ़", { pos: "phrase", tags: ["directions"],
    example: ex("ಆ ಕಡೆ ಹೋಗಿ.", "Aa kade hogi.", "Go that side.", "उस तरफ़ जाइए।") }),
  v("ee-kade", "ಈ ಕಡೆ", "Ee kade", "This side", "इस तरफ़", { pos: "phrase", tags: ["directions"] }),
  v("hattu", "ಹತ್ತು (ಹತ್ತಿ)", "Hatti", "Get in / Climb (polite)", "चढ़िए / बैठिए", { pos: "verb", tags: ["verb", "auto"],
    context: bi("Also the number 10! Context tells you which.", "संख्या 10 भी! संदर्भ से पता चलता है।"),
    example: ex("ಹತ್ತಿ, ಹೋಗೋಣ.", "Hatti, hogona.", "Get in, let's go.", "बैठिए, चलें।") }),
  v("ilisi", "ಇಳಿಸಿ", "Ilisi", "Drop off / Let down (polite)", "उतारिए", { pos: "verb", formality: "polite", tags: ["verb", "auto"],
    example: ex("ಮುಂದೆ ಇಳಿಸಿ.", "Munde ilisi.", "Drop me ahead.", "आगे उतारिए।") }),
  v("hodarе", "ಹೋಗ್ಬೇಕು", "Hogbeku", "Need to go / Have to go", "जाना है", { pos: "verb", tags: ["verb", "auto"],
    example: ex("ಏರ್‌ಪೋರ್ಟ್‌ಗೆ ಹೋಗ್ಬೇಕು.", "Airport-ge hogbeku.", "I need to go to the airport.", "एयरपोर्ट जाना है।") }),
];

const sentences = [
  s("d17s1", "ಅಣ್ಣ, ಇಂದಿರಾನಗರ ಬರ್ತೀರಾ?", "Anna, Indiranagar bartira?", "Brother, will you go to Indiranagar?", "भैया, इंदिरानगर चलेंगे?", {
    formality: "polite", words: ["Anna,", "Indiranagar", "bartira?"], wordsKn: ["ಅಣ್ಣ,", "ಇಂದಿರಾನಗರ", "ಬರ್ತೀರಾ?"], tags: ["auto"],
  }),
  s("d17s2", "ಮೀಟರ್ ಹಾಕಿ ಅಣ್ಣ.", "Meter haaki anna.", "Put the meter on, brother.", "मीटर लगाइए भैया।", {
    formality: "polite", words: ["Meter", "haaki", "anna"], wordsKn: ["ಮೀಟರ್", "ಹಾಕಿ", "ಅಣ್ಣ"], tags: ["auto"],
  }),
  s("d17s3", "ಎಷ್ಟು ಆಗುತ್ತೆ?", "Eshtu aagutte?", "How much will it be?", "कितना होगा?", { words: ["Eshtu", "aagutte?"], wordsKn: ["ಎಷ್ಟು", "ಆಗುತ್ತೆ?"], tags: ["auto"] }),
  s("d17s4", "ನೂರು ಜಾಸ್ತಿ, ಎಂಬತ್ತು ಸರಿನಾ?", "Nooru jaasti, embattu sarina?", "100 is too much, is 80 okay?", "100 ज़्यादा है, 80 ठीक है ना?", {
    words: ["Nooru", "jaasti,", "embattu", "sarina?"], wordsKn: ["ನೂರು", "ಜಾಸ್ತಿ,", "ಎಂಬತ್ತು", "ಸರಿನಾ?"], tags: ["auto"],
  }),
  s("d17s5", "ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ.", "Ille nillisi.", "Stop right here.", "यहीं रोकिए।", { formality: "polite", words: ["Ille", "nillisi"], wordsKn: ["ಇಲ್ಲೇ", "ನಿಲ್ಲಿಸಿ"], tags: ["auto"] }),
  s("d17s6", "ಸ್ವಲ್ಪ ಮುಂದೆ ಇಳಿಸಿ.", "Swalpa munde ilisi.", "Drop me a little ahead.", "थोड़ा आगे उतारिए।", { formality: "polite", words: ["Swalpa", "munde", "ilisi"], wordsKn: ["ಸ್ವಲ್ಪ", "ಮುಂದೆ", "ಇಳಿಸಿ"], tags: ["auto"] }),
  s("d17s7", "ನಿಧಾನವಾಗಿ ಹೋಗಿ ಅಣ್ಣ.", "Nidhaanavaagi hogi anna.", "Go slowly, brother.", "धीरे चलिए भैया।", { formality: "polite", words: ["Nidhaanavaagi", "hogi", "anna"], wordsKn: ["ನಿಧಾನವಾಗಿ", "ಹೋಗಿ", "ಅಣ್ಣ"], tags: ["auto"] }),
  s("d17s8", "ದಾರಿ ನನಗೆ ಗೊತ್ತು, ನಾನು ಹೇಳ್ತೀನಿ.", "Daari nanage gottu, naanu heltini.", "I know the way, I'll tell you.", "रास्ता मुझे पता है, मैं बताऊँगा।", {
    words: ["Daari", "nanage", "gottu,", "naanu", "heltini"], wordsKn: ["ದಾರಿ", "ನನಗೆ", "ಗೊತ್ತು,", "ನಾನು", "ಹೇಳ್ತೀನಿ"], tags: ["auto"],
  }),
  s("d17s9", "ಚಿಲ್ಲರೆ ಇಲ್ಲ, ಗೂಗಲ್ ಪೇ ಮಾಡ್ಲಾ?", "Chillare illa, Google Pay maadla?", "I don't have change, shall I pay by Google Pay?", "छुट्टे नहीं हैं, गूगल पे करूँ?", {
    words: ["Chillare", "illa,", "Google", "Pay", "maadla?"], wordsKn: ["ಚಿಲ್ಲರೆ", "ಇಲ್ಲ,", "ಗೂಗಲ್", "ಪೇ", "ಮಾಡ್ಲಾ?"], tags: ["auto"],
  }),
  s("d17s10", "ಇಲ್ಲಿ ಯು-ಟರ್ನ್ ತಗೊಳ್ಳಿ.", "Illi U-turn tagolli.", "Take a U-turn here.", "यहाँ यू-टर्न लीजिए।", { formality: "polite", words: ["Illi", "U-turn", "tagolli"], wordsKn: ["ಇಲ್ಲಿ", "ಯು-ಟರ್ನ್", "ತಗೊಳ್ಳಿ"], tags: ["auto"] }),
  s("d17s11", "ತುಂಬಾ ಟ್ರಾಫಿಕ್ ಇದೆ, ಬೇರೆ ದಾರಿ ಇದೆಯಾ?", "Tumba traffic ide, bere daari ideya?", "There's a lot of traffic, is there another route?", "बहुत ट्रैफिक है, दूसरा रास्ता है?", {
    words: ["Tumba", "traffic", "ide,", "bere", "daari", "ideya?"], wordsKn: ["ತುಂಬಾ", "ಟ್ರಾಫಿಕ್", "ಇದೆ,", "ಬೇರೆ", "ದಾರಿ", "ಇದೆಯಾ?"], tags: ["auto"],
  }),
];

export const day17: DayLesson = {
  day: 17, week: 3, type: "lesson", emoji: "🛺", minutes: 20,
  title: bi("Auto & cab", "ऑटो और कैब"),
  subtitle: bi("Meter haaki, eshtu aagutte, ille nillisi — survive any ride", "Meter haaki, eshtu aagutte, ille nillisi — हर सफ़र पार"),
  vocab, sentences,
  concept: {
    title: bi("The auto ride, start to finish", "ऑटो सफ़र, शुरू से अंत तक"),
    intro: bi("Auto drivers are the most Kannada-speaking people you'll meet daily. A few sentences change the whole interaction — and often the price.", "ऑटो वाले रोज़ मिलने वाले सबसे ज़्यादा कन्नड़ बोलने वाले लोग हैं। कुछ वाक्य पूरी बातचीत बदल देते हैं — और अक्सर दाम भी।"),
    sections: [
      {
        heading: bi("1. Hailing", "1. रोकना"),
        body: bi("'Anna, [place] bartira?' If yes: 'Meter haaki' or 'Eshtu aagutte?' If the quote is high: '[number] jaasti, [lower number] sarina?' Then 'Sari, banni' / 'Hatti'.", "'Anna, [जगह] bartira?' हाँ हो तो: 'Meter haaki' या 'Eshtu aagutte?' दाम ज़्यादा हो तो: '[संख्या] jaasti, [कम संख्या] sarina?' फिर 'Sari, banni' / 'Hatti'।"),
      },
      {
        heading: bi("2. Navigating", "2. रास्ता"),
        body: bi("'Daari nanage gottu, naanu heltini' (I know the way). Then your Day 6 kit: neravaagi, edakke, balakke, swalpa munde, U-turn tagolli, signal hattira, aa kade.", "'Daari nanage gottu, naanu heltini' (रास्ता पता है)। फिर Day 6 का किट: neravaagi, edakke, balakke, swalpa munde, U-turn tagolli, signal hattira, aa kade।"),
      },
      {
        heading: bi("3. Stopping and paying", "3. रुकना और भुगतान"),
        body: bi("'Ille nillisi' / 'Illi drop maadi' / 'Swalpa munde ilisi'. Pay: 'Chillare ideya?' or 'Google Pay maadla?' Close with 'Dhanyavaada anna'.", "'Ille nillisi' / 'Illi drop maadi' / 'Swalpa munde ilisi'। भुगतान: 'Chillare ideya?' या 'Google Pay maadla?' 'Dhanyavaada anna' से समाप्त।"),
        bridge: [
          { kn: "ನಿಲ್ಲಿಸಿ", roman: "nillisi", hi: "रोकिए", en: "stop (the vehicle)" },
          { kn: "ಇಳಿಸಿ", roman: "ilisi", hi: "उतारिए", en: "drop me off" },
          { kn: "ಹತ್ತಿ", roman: "hatti", hi: "बैठिए / चढ़िए", en: "get in" },
        ],
      },
    ],
    tip: bi("Say 'Anna' and speak slowly in Kannada, and the 'foreigner price' often disappears. It's not magic; it's respect.", "'Anna' कहो और धीरे कन्नड़ बोलो, 'बाहरी वाला दाम' अक्सर गायब हो जाता है। जादू नहीं, सम्मान है।"),
  },
  conversation: {
    id: "d17c1",
    title: bi("Auto to Indiranagar", "इंदिरानगर का ऑटो"),
    setting: bi("Outside the metro, evening rush.", "मेट्रो के बाहर, शाम की भीड़।"),
    speakers: { A: "Driver", B: "You" },
    lines: [
      line("B", "ಅಣ್ಣ, ಇಂದಿರಾನಗರ ಬರ್ತೀರಾ?", "Anna, Indiranagar bartira?", "Brother, will you go to Indiranagar?", "भैया, इंदिरानगर चलेंगे?"),
      line("A", "ಬರ್ತೀನಿ. ನೂರೈವತ್ತು ಆಗುತ್ತೆ.", "Bartini. Nooraivattu aagutte.", "I'll come. It'll be 150.", "चलूँगा। 150 होगा।"),
      line("B", "ನೂರೈವತ್ತು ಜಾಸ್ತಿ ಅಣ್ಣ. ಮೀಟರ್ ಹಾಕಿ.", "Nooraivattu jaasti anna. Meter haaki.", "150 is too much, brother. Put the meter.", "150 ज़्यादा है भैया। मीटर लगाइए।"),
      line("A", "ಟ್ರಾಫಿಕ್ ಜಾಸ್ತಿ ಸರ್. ನೂರಿಪ್ಪತ್ತು ಕೊಡಿ.", "Traffic jaasti sir. Nooruippattu kodi.", "Lots of traffic, sir. Give 120.", "ट्रैफिक ज़्यादा है सर। 120 दीजिए।"),
      line("B", "ಸರಿ, ನೂರು. ಹೋಗೋಣ.", "Sari, nooru. Hogona.", "Okay, 100. Let's go.", "ठीक है, 100। चलें।"),
      line("A", "ಸರಿ ಹತ್ತಿ. ದಾರಿ ಗೊತ್ತಾ?", "Sari hatti. Daari gotta?", "Okay get in. Do you know the way?", "ठीक है बैठिए। रास्ता पता है?"),
      line("B", "ಗೊತ್ತು, ನಾನು ಹೇಳ್ತೀನಿ. ಸಿಗ್ನಲ್ ಹತ್ತಿರ ಎಡಕ್ಕೆ.", "Gottu, naanu heltini. Signal hattira edakke.", "I know, I'll tell you. Left near the signal.", "पता है, मैं बताऊँगा। सिग्नल के पास बाएँ।"),
      line("B", "ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ. ಗೂಗಲ್ ಪೇ ಮಾಡ್ಲಾ?", "Ille nillisi. Google Pay maadla?", "Stop right here. Shall I pay by Google Pay?", "यहीं रोकिए। गूगल पे करूँ?"),
      line("A", "ಆಗುತ್ತೆ ಸರ್. ಧನ್ಯವಾದ.", "Aagutte sir. Dhanyavaada.", "That works, sir. Thank you.", "ठीक है सर। धन्यवाद।"),
    ],
    prompts: [
      {
        afterLine: 1,
        question: bi("150 is too much. Push back and ask for the meter:", "150 ज़्यादा है। आपत्ति करें और मीटर माँगें:"),
        options: [
          { kn: "ನೂರೈವತ್ತು ಜಾಸ್ತಿ ಅಣ್ಣ. ಮೀಟರ್ ಹಾಕಿ.", roman: "Nooraivattu jaasti anna. Meter haaki.", en: "150 is too much. Put the meter.", correct: true },
          { kn: "ನೂರೈವತ್ತು ಕಡಿಮೆ. ಇನ್ನೂರು ಕೊಡ್ತೀನಿ.", roman: "Nooraivattu kadime. Innooru kodtini.", en: "150 is too little. I'll give 200.", correct: false, feedback: bi("Generous, but wrong direction!", "दरियादिल, पर गलत दिशा!") },
          { kn: "ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ.", roman: "Ille nillisi.", en: "Stop right here.", correct: false, feedback: bi("You haven't even started moving!", "अभी चले भी नहीं!") },
        ],
      },
      {
        afterLine: 3,
        question: bi("He says 120. Settle at 100 and go:", "वह 120 कहता है। 100 पर तय करके चलें:"),
        options: [
          { kn: "ಸರಿ, ನೂರು. ಹೋಗೋಣ.", roman: "Sari, nooru. Hogona.", en: "Okay, 100. Let's go.", correct: true },
          { kn: "ಸರಿ, ನೂರು. ಹೋದೆ.", roman: "Sari, nooru. Hode.", en: "Okay, 100. I went.", correct: false, feedback: bi("Hode = I went (past). Hogona = let's go.", "Hode = गया (भूत)। Hogona = चलें।") },
          { kn: "ನೂರು ಜಾಸ್ತಿ.", roman: "Nooru jaasti.", en: "100 is too much.", correct: false, feedback: bi("He said 120, you want to settle at 100 — accept it!", "उसने 120 कहा, आप 100 चाहते हैं — मान लें!") },
        ],
      },
      {
        afterLine: 7,
        question: bi("You've arrived. Stop here and offer Google Pay:", "पहुँच गए। यहीं रुकवाकर गूगल पे की पेशकश करें:"),
        options: [
          { kn: "ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ. ಗೂಗಲ್ ಪೇ ಮಾಡ್ಲಾ?", roman: "Ille nillisi. Google Pay maadla?", en: "Stop right here. Google Pay?", correct: true },
          { kn: "ಮುಂದೆ ಹೋಗಿ. ಚಿಲ್ಲರೆ ಬೇಡ.", roman: "Munde hogi. Chillare beda.", en: "Go ahead. No change needed.", correct: false },
          { kn: "ಮೀಟರ್ ಹಾಕಿ.", roman: "Meter haaki.", en: "Put the meter.", correct: false, feedback: bi("A bit late for that.", "अब इसके लिए देर हो गई।") },
        ],
      },
    ],
  },
  bossQuestion: {
    id: "d17boss", type: "build", skill: "conversation",
    prompt: bi("Build: 'Brother, 120 is too much, is 100 okay?'", "बनाएँ: 'भैया, 120 ज़्यादा है, 100 ठीक है ना?'"),
    answer: "Anna, nooruippattu jaasti, nooru sarina?",
    words: ["Anna,", "nooruippattu", "jaasti,", "nooru", "sarina?"],
    explanation: bi("Address (anna) + the high number + jaasti + your number + sarina?", "संबोधन (anna) + ज़्यादा संख्या + jaasti + आपकी संख्या + sarina?"),
  },
  dailyPhrase: {
    kn: "ಮೀಟರ್ ಹಾಕಿ", roman: "Meter haaki",
    meaning: bi("Put the meter on (your legal right in Bengaluru)", "मीटर लगाइए (बेंगलुरु में आपका हक़)"),
    example: ex("ಅಣ್ಣ, ಮೀಟರ್ ಹಾಕಿ, ಮೀಟರ್ ಮೇಲೆ ಹತ್ತು ಕೊಡ್ತೀನಿ.", "Anna, meter haaki, meter mele hattu kodtini.", "Brother, put the meter, I'll give 10 over the meter.", "भैया, मीटर लगाइए, मीटर से 10 ऊपर दूँगा।"),
    mini: [
      line("A", "ನೂರು ಆಗುತ್ತೆ.", "Nooru aagutte.", "It'll be 100.", "100 होगा।"),
      line("B", "ಮೀಟರ್ ಹಾಕಿ ಅಣ್ಣ, ಪರವಾಗಿಲ್ಲ.", "Meter haaki anna, parvagilla.", "Put the meter, brother, it's fine.", "मीटर लगाइए भैया, ठीक है।"),
    ],
  },
};
