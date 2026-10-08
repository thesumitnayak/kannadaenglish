import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

const vocab = [
  v("baa", "ಬಾ / ಬನ್ನಿ", "Baa / Banni", "Come", "आओ / आइए", { pos: "verb", tags: ["verb"],
    example: ex("ಬೇಗ ಬನ್ನಿ.", "Bega banni.", "Come quickly.", "जल्दी आइए।") }),
  v("hogu", "ಹೋಗು / ಹೋಗಿ", "Hogu / Hogi", "Go", "जाओ / जाइए", { pos: "verb", tags: ["verb"] }),
  v("tinnu", "ತಿನ್ನು / ತಿನ್ನಿ", "Tinnu / Tinni", "Eat", "खाओ / खाइए", { pos: "verb", tags: ["verb", "food"],
    example: ex("ಸ್ವಲ್ಪ ತಿನ್ನಿ.", "Swalpa tinni.", "Eat a little.", "थोड़ा खाइए।") }),
  v("kudi", "ಕುಡಿ / ಕುಡೀರಿ", "Kudi / Kudeeri", "Drink", "पियो / पीजिए", { pos: "verb", tags: ["verb", "food"],
    example: ex("ನೀರು ಕುಡೀರಿ.", "Neeru kudeeri.", "Drink water.", "पानी पीजिए।") }),
  v("malagu", "ಮಲಗು / ಮಲಗಿ", "Malagu / Malagi", "Sleep", "सोओ / सोइए", { pos: "verb", tags: ["verb"] }),
  v("kootko", "ಕೂತ್ಕೊ / ಕೂತ್ಕೊಳ್ಳಿ", "Kootko / Kootkolli", "Sit", "बैठो / बैठिए", { pos: "verb", tags: ["verb"],
    example: ex("ಇಲ್ಲಿ ಕೂತ್ಕೊಳ್ಳಿ.", "Illi kootkolli.", "Sit here.", "यहाँ बैठिए।") }),
  v("nintko", "ನಿಂತ್ಕೊ / ನಿಂತ್ಕೊಳ್ಳಿ", "Nintko / Nintkolli", "Stand", "खड़े हो / खड़े होइए", { pos: "verb", tags: ["verb"] }),
  v("maataadu", "ಮಾತಾಡು / ಮಾತಾಡಿ", "Maataadu / Maataadi", "Speak / Talk", "बोलो / बोलिए", { pos: "verb", tags: ["verb"],
    example: ex("ಕನ್ನಡದಲ್ಲಿ ಮಾತಾಡಿ.", "Kannadadalli maataadi.", "Speak in Kannada.", "कन्नड़ में बोलिए।") }),
  v("nodu", "ನೋಡು / ನೋಡಿ", "Nodu / Nodi", "See / Look", "देखो / देखिए", { pos: "verb", tags: ["verb"],
    example: ex("ಇದು ನೋಡಿ.", "Idu nodi.", "Look at this.", "यह देखिए।") }),
  v("kodu", "ಕೊಡು / ಕೊಡಿ", "Kodu / Kodi", "Give", "दो / दीजिए", { pos: "verb", tags: ["verb"] }),
  v("tago", "ತಗೊ / ತಗೊಳ್ಳಿ", "Tago / Tagolli", "Take", "लो / लीजिए", { pos: "verb", tags: ["verb"],
    example: ex("ಇದು ತಗೊಳ್ಳಿ.", "Idu tagolli.", "Take this.", "यह लीजिए।") }),
  v("maadu", "ಮಾಡು / ಮಾಡಿ", "Maadu / Maadi", "Do / Make", "करो / कीजिए", { pos: "verb", tags: ["verb"],
    context: bi("The universal helper verb: call maadi, parcel maadi, kelsa maadi, oota maadi.", "सर्वव्यापी सहायक क्रिया: call maadi, parcel maadi, kelsa maadi, oota maadi।") }),
  v("helu", "ಹೇಳು / ಹೇಳಿ", "Helu / Heli", "Say / Tell", "कहो / कहिए", { pos: "verb", tags: ["verb"] }),
  v("kelu", "ಕೇಳು / ಕೇಳಿ", "Kelu / Keli", "Ask / Listen", "पूछो / सुनो", { pos: "verb", tags: ["verb"],
    context: bi("One verb for both 'ask' and 'listen', like Hindi 'सुनना' + 'पूछना' merged.", "'पूछना' और 'सुनना' दोनों के लिए एक क्रिया।") }),
  v("gottu", "ಗೊತ್ತು", "Gottu", "Know (is known)", "पता है", { pos: "verb", tags: ["verb"],
    example: ex("ನನಗೆ ಗೊತ್ತು.", "Nanage gottu.", "I know.", "मुझे पता है।") }),
  v("kaayi", "ಕಾಯಿ / ಕಾಯಿರಿ", "Kaayi / Kaayiri", "Wait", "रुको / रुकिए", { pos: "verb", tags: ["verb"],
    example: ex("ಸ್ವಲ್ಪ ಕಾಯಿರಿ.", "Swalpa kaayiri.", "Wait a bit.", "थोड़ा रुकिए।") }),
  v("beda-verb", "ಬೇಡ / -ಬೇಡಿ", "-beda / -bedi", "Don't (do)", "मत (करो)", { pos: "verb", tags: ["verb", "grammar"],
    bridge: bi("Verb + beda = don't (casual). Verb + bedi = don't (polite). Hogbedi = please don't go.", "क्रिया + beda = मत (casual)। क्रिया + bedi = मत (विनम्र)। Hogbedi = मत जाइए।"),
    example: ex("ಹೋಗ್ಬೇಡಿ.", "Hogbedi.", "Please don't go.", "मत जाइए।") }),
];

const sentences = [
  s("d9s1", "ಇಲ್ಲಿ ಕೂತ್ಕೊಳ್ಳಿ.", "Illi kootkolli.", "Sit here.", "यहाँ बैठिए।", {
    formality: "polite", words: ["Illi", "kootkolli"], wordsKn: ["ಇಲ್ಲಿ", "ಕೂತ್ಕೊಳ್ಳಿ"],
  }),
  s("d9s2", "ಕನ್ನಡದಲ್ಲಿ ಮಾತಾಡಿ.", "Kannadadalli maataadi.", "Speak in Kannada.", "कन्नड़ में बोलिए।", {
    formality: "polite", words: ["Kannadadalli", "maataadi"], wordsKn: ["ಕನ್ನಡದಲ್ಲಿ", "ಮಾತಾಡಿ"],
  }),
  s("d9s3", "ಸ್ವಲ್ಪ ಕಾಯಿರಿ.", "Swalpa kaayiri.", "Please wait a bit.", "थोड़ा रुकिए।", {
    formality: "polite", words: ["Swalpa", "kaayiri"], wordsKn: ["ಸ್ವಲ್ಪ", "ಕಾಯಿರಿ"],
  }),
  s("d9s4", "ಇದು ತಗೊಳ್ಳಿ, ಅದು ಕೊಡಿ.", "Idu tagolli, adu kodi.", "Take this, give that.", "यह लीजिए, वह दीजिए।", {
    formality: "polite", words: ["Idu", "tagolli,", "adu", "kodi"], wordsKn: ["ಇದು", "ತಗೊಳ್ಳಿ,", "ಅದು", "ಕೊಡಿ"],
  }),
  s("d9s5", "ಹೋಗ್ಬೇಡಿ, ಸ್ವಲ್ಪ ಇರಿ.", "Hogbedi, swalpa iri.", "Don't go, stay a bit.", "मत जाइए, थोड़ा रुकिए।", {
    formality: "polite", words: ["Hogbedi,", "swalpa", "iri"], wordsKn: ["ಹೋಗ್ಬೇಡಿ,", "ಸ್ವಲ್ಪ", "ಇರಿ"],
  }),
  s("d9s6", "ನೀರು ಕುಡೀರಿ.", "Neeru kudeeri.", "Drink some water.", "पानी पीजिए।", {
    formality: "polite", words: ["Neeru", "kudeeri"], wordsKn: ["ನೀರು", "ಕುಡೀರಿ"],
  }),
  s("d9s7", "ನನಗೆ ಹೇಳಿ.", "Nanage heli.", "Tell me.", "मुझे बताइए।", {
    formality: "polite", words: ["Nanage", "heli"], wordsKn: ["ನನಗೆ", "ಹೇಳಿ"],
  }),
  s("d9s8", "ಅವರನ್ನು ಕೇಳಿ.", "Avarannu keli.", "Ask them.", "उनसे पूछिए।", {
    formality: "polite", words: ["Avarannu", "keli"], wordsKn: ["ಅವರನ್ನು", "ಕೇಳಿ"],
    note: bi("avaru + annu = avarannu (them, as object). Like Hindi 'उनको/उनसे'.", "avaru + annu = avarannu (उनको)। हिंदी 'उनको/उनसे' जैसा।"),
  }),
  s("d9s9", "ಬೇಗ ಬನ್ನಿ, ಲೇಟ್ ಆಯ್ತು.", "Bega banni, late aaytu.", "Come quickly, it's late.", "जल्दी आइए, देर हो गई।", {
    formality: "polite", words: ["Bega", "banni,", "late", "aaytu"], wordsKn: ["ಬೇಗ", "ಬನ್ನಿ,", "ಲೇಟ್", "ಆಯ್ತು"],
  }),
  s("d9s10", "ನನಗೆ ಗೊತ್ತು, ಅವರಿಗೆ ಗೊತ್ತಿಲ್ಲ.", "Nanage gottu, avarige gottilla.", "I know, they don't.", "मुझे पता है, उन्हें नहीं।", {
    words: ["Nanage", "gottu,", "avarige", "gottilla"], wordsKn: ["ನನಗೆ", "ಗೊತ್ತು,", "ಅವರಿಗೆ", "ಗೊತ್ತಿಲ್ಲ"],
  }),
];

export const day09: DayLesson = {
  day: 9, week: 2, type: "lesson", emoji: "🏃",
  minutes: 22,
  title: bi("Common verbs", "आम क्रियाएँ"),
  subtitle: bi("14 verbs you'll use every single day, casual and polite", "14 क्रियाएँ जो रोज़ काम आएँगी, casual और विनम्र"),
  vocab, sentences,
  scriptLetters: ["kha", "gha", "chha", "jha"],
  concept: {
    title: bi("Verbs: the root and the polite request", "क्रिया: मूल रूप और विनम्र अनुरोध"),
    intro: bi("Every Kannada verb has a short root (the casual command) and a polite form ending in -i. Learn both together.", "हर कन्नड़ क्रिया का एक छोटा मूल (casual आदेश) और -i पर खत्म होने वाला विनम्र रूप है। दोनों साथ सीखो।"),
    sections: [
      {
        heading: bi("Root → polite", "मूल → विनम्र"),
        body: bi("hogu → hogi, kodu → kodi, nodu → nodi, helu → heli, maadu → maadi, kelu → keli. Pattern: change the last 'u' to 'i'. A few are irregular: baa → banni, tago → tagolli, kootko → kootkolli, kudi → kudeeri.", "hogu → hogi, kodu → kodi, nodu → nodi, helu → heli, maadu → maadi, kelu → keli। नियम: आखिरी 'u' को 'i' करो। कुछ अनियमित: baa → banni, tago → tagolli, kootko → kootkolli, kudi → kudeeri।"),
        bridge: [
          { kn: "ಹೋಗು → ಹೋಗಿ", roman: "hogu → hogi", hi: "जा → जाइए", en: "go" },
          { kn: "ಕೊಡು → ಕೊಡಿ", roman: "kodu → kodi", hi: "दे → दीजिए", en: "give" },
          { kn: "ಬಾ → ಬನ್ನಿ", roman: "baa → banni", hi: "आ → आइए", en: "come" },
        ],
      },
      {
        heading: bi("Don't: -beda / -bedi", "मत: -beda / -bedi"),
        body: bi("Root + beda (casual) or + bedi (polite): hogbeda / hogbedi (don't go), maadbedi (don't do), helbedi (don't tell). Note the root often shortens: hogu + bedi → hogbedi.", "मूल + beda (casual) या + bedi (विनम्र): hogbeda / hogbedi (मत जाओ/जाइए), maadbedi (मत कीजिए), helbedi (मत बताइए)। मूल अक्सर छोटा हो जाता है: hogu + bedi → hogbedi।"),
      },
      {
        heading: bi("Maadi: the verb that makes verbs", "Maadi: वह क्रिया जो क्रियाएँ बनाती है"),
        body: bi("English/Hindi word + maadi = instant Kannada verb. Call maadi (call me), parcel maadi (pack it), book maadi, cancel maadi, try maadi. Bengaluru speaks like this all day. Hindi does the same with 'करना'.", "अंग्रेज़ी/हिंदी शब्द + maadi = तुरंत कन्नड़ क्रिया। Call maadi, parcel maadi, book maadi, cancel maadi, try maadi। बेंगलुरु दिन भर ऐसे ही बोलता है। हिंदी 'करना' के साथ वही करती है।"),
        examples: [
          ex("ನನಗೆ ಕಾಲ್ ಮಾಡಿ.", "Nanage call maadi.", "Call me.", "मुझे कॉल कीजिए।"),
          ex("ಪಾರ್ಸೆಲ್ ಮಾಡಿ.", "Parcel maadi.", "Pack it to go.", "पार्सल कर दीजिए।"),
        ],
      },
    ],
    tip: bi("Learn verbs in pairs with an object: 'neeru kudeeri', 'illi kootkolli', 'nanage heli'. Pairs stick; lists don't.", "क्रियाएँ किसी वस्तु के साथ जोड़ी में सीखो: 'neeru kudeeri', 'illi kootkolli', 'nanage heli'। जोड़ियाँ याद रहती हैं, सूचियाँ नहीं।"),
  },
  conversation: {
    id: "d9c1",
    title: bi("Visiting a friend's home", "दोस्त के घर जाना"),
    setting: bi("You arrive; their mother welcomes you.", "आप पहुँचते हैं; उनकी माँ स्वागत करती हैं।"),
    speakers: { A: "Friend's mother", B: "You" },
    lines: [
      line("A", "ಬನ್ನಿ ಬನ್ನಿ, ಒಳಗೆ ಬನ್ನಿ. ಇಲ್ಲಿ ಕೂತ್ಕೊಳ್ಳಿ.", "Banni banni, olage banni. Illi kootkolli.", "Come, come inside. Sit here.", "आइए आइए, अंदर आइए। यहाँ बैठिए।"),
      line("B", "ಧನ್ಯವಾದ ಆಂಟಿ.", "Dhanyavaada aunty.", "Thank you aunty.", "धन्यवाद आंटी।"),
      line("A", "ಕಾಫಿ ಕುಡೀರಿ. ಸ್ವಲ್ಪ ತಿಂಡಿ ತಿನ್ನಿ.", "Kaafi kudeeri. Swalpa tindi tinni.", "Have coffee. Eat some snacks.", "कॉफ़ी पीजिए। थोड़ा नाश्ता कीजिए।"),
      line("B", "ಕಾಫಿ ಸಾಕು ಆಂಟಿ, ತಿಂಡಿ ಬೇಡ.", "Kaafi saaku aunty, tindi beda.", "Coffee is enough aunty, no snacks.", "कॉफ़ी काफ़ी है आंटी, नाश्ता नहीं।"),
      line("A", "ಹಾಗೆ ಹೇಳ್ಬೇಡಿ, ಸ್ವಲ್ಪ ತಗೊಳ್ಳಿ!", "Haage helbedi, swalpa tagolli!", "Don't say that, take a little!", "ऐसा मत कहिए, थोड़ा लीजिए!"),
      line("B", "ಸರಿ ಸರಿ, ಸ್ವಲ್ಪ ಕೊಡಿ.", "Sari sari, swalpa kodi.", "Okay okay, give a little.", "ठीक है, थोड़ा दीजिए।"),
    ],
    prompts: [
      {
        afterLine: 2,
        question: bi("Politely say coffee is enough, no snacks:", "विनम्रता से कहें कॉफ़ी काफ़ी है, नाश्ता नहीं:"),
        options: [
          { kn: "ಕಾಫಿ ಸಾಕು, ತಿಂಡಿ ಬೇಡ.", roman: "Kaafi saaku, tindi beda.", en: "Coffee is enough, no snacks.", correct: true },
          { kn: "ಕಾಫಿ ಬೇಡ, ತಿಂಡಿ ಬೇಕು.", roman: "Kaafi beda, tindi beku.", en: "No coffee, I want snacks.", correct: false, feedback: bi("Opposite! Saaku = enough, beda = don't want.", "उल्टा! Saaku = काफ़ी, beda = नहीं चाहिए।") },
          { kn: "ಕಾಫಿ ಕುಡೀರಿ.", roman: "Kaafi kudeeri.", en: "Drink coffee.", correct: false, feedback: bi("That's an instruction to HER. You want to decline.", "यह उन्हें आदेश है। आपको मना करना है।") },
        ],
      },
      {
        afterLine: 4,
        question: bi("She insists. Give in gracefully:", "वे ज़ोर देती हैं। शालीनता से मान लें:"),
        options: [
          { kn: "ಸರಿ ಸರಿ, ಸ್ವಲ್ಪ ಕೊಡಿ.", roman: "Sari sari, swalpa kodi.", en: "Okay okay, give a little.", correct: true },
          { kn: "ಹೋಗ್ಬೇಡಿ.", roman: "Hogbedi.", en: "Don't go.", correct: false },
          { kn: "ನನಗೆ ಗೊತ್ತಿಲ್ಲ.", roman: "Nanage gottilla.", en: "I don't know.", correct: false },
        ],
      },
    ],
  },
  bossQuestion: {
    id: "d9boss", type: "mcq", skill: "grammar",
    prompt: bi("Your friend is about to leave and you want them to stay. Politely: 'Don't go, sit a bit.'", "दोस्त जाने वाला है, आप रोकना चाहते हैं। विनम्रता से: 'मत जाइए, थोड़ा बैठिए।'"),
    options: ["Hogbedi, swalpa kootkolli", "Hogi, swalpa kootkolli", "Hogbedi, swalpa nintkolli", "Banni, swalpa malagi"],
    answer: "Hogbedi, swalpa kootkolli",
    explanation: bi("Hog + bedi = don't go. Kootkolli = sit (polite). 'Nintkolli' would be 'stand', 'malagi' is 'sleep'.", "Hog + bedi = मत जाइए। Kootkolli = बैठिए। 'Nintkolli' = खड़े होइए, 'malagi' = सोइए।"),
  },
  dailyPhrase: {
    kn: "ಸ್ವಲ್ಪ ಕಾಯಿರಿ", roman: "Swalpa kaayiri",
    meaning: bi("Please wait a moment", "ज़रा रुकिए"),
    example: ex("ಸ್ವಲ್ಪ ಕಾಯಿರಿ, ಈಗ ಬರ್ತೀನಿ.", "Swalpa kaayiri, eega bartini.", "Wait a moment, I'll be right there.", "ज़रा रुकिए, अभी आता हूँ।"),
    mini: [
      line("A", "ಹೊರಡೋಣ್ವಾ?", "Horadonva?", "Shall we leave?", "चलें?"),
      line("B", "ಸ್ವಲ್ಪ ಕಾಯಿರಿ, ಎರಡು ನಿಮಿಷ.", "Swalpa kaayiri, eradu nimisha.", "Wait a bit, two minutes.", "ज़रा रुकिए, दो मिनट।"),
    ],
  },
};
