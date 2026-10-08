import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

export const day18: DayLesson = {
  day: 18, week: 3, type: "lesson", emoji: "🏢", minutes: 20,
  title: bi("Office conversations", "ऑफिस की बातचीत"),
  subtitle: bi("Meetings, leave, lunch, 'free iddira?' and polite work Kannada", "मीटिंग, छुट्टी, लंच, 'free iddira?' और ऑफिस की विनम्र कन्नड़"),
  vocab: [
    v("free-iddira", "ಫ್ರೀ ಇದ್ದೀರಾ?", "Free iddira?", "Are you free?", "फ़्री हैं?", { pos: "phrase", formality: "polite", tags: ["office"] }),
    v("raje", "ರಜೆ", "Raje", "Leave / Holiday", "छुट्टी", { pos: "noun", tags: ["office"], example: ex("ನಾಳೆ ನಾನು ರಜೆ.", "Naale naanu raje.", "I'm on leave tomorrow.", "कल मेरी छुट्टी है।") }),
    v("meeting", "ಮೀಟಿಂಗ್", "Meeting", "Meeting", "मीटिंग", { pos: "noun", tags: ["office"] }),
    v("kalisi", "ಕಳಿಸಿ", "Kalisi", "Send (polite)", "भेजिए", { pos: "verb", formality: "polite", tags: ["office", "verb"], example: ex("ಮೇಲ್ ಕಳಿಸಿ.", "Mail kalisi.", "Send the mail.", "मेल भेजिए।") }),
    v("sahaaya", "ಸಹಾಯ", "Sahaaya", "Help", "मदद", { pos: "noun", tags: ["office"], example: ex("ಸ್ವಲ್ಪ ಸಹಾಯ ಮಾಡ್ತೀರಾ?", "Swalpa sahaaya maadtira?", "Could you help a bit?", "थोड़ी मदद करेंगे?") }),
    v("kelsa-jaasti", "ಕೆಲಸ ಜಾಸ್ತಿ", "Kelsa jaasti", "Too much work", "काम ज़्यादा", { pos: "phrase", tags: ["office"] }),
    v("mugitu", "ಮುಗೀತು", "Mugitu", "It's finished", "खत्म हो गया", { pos: "verb", tags: ["office"], example: ex("ಕೆಲಸ ಮುಗೀತು.", "Kelsa mugitu.", "Work is finished.", "काम खत्म हो गया।") }),
    v("horadtini", "ಹೊರಡ್ತೀನಿ", "Horadtini", "I'm leaving / heading out", "निकलता हूँ", { pos: "verb", tags: ["office"] }),
    v("artha-aaytu", "ಅರ್ಥ ಆಯ್ತು", "Artha aaytu", "Understood", "समझ गया", { pos: "phrase", tags: ["office", "basic"] }),
    v("nodtini", "ನೋಡ್ತೀನಿ", "Nodtini", "I'll check / I'll see", "देखता हूँ", { pos: "verb", tags: ["office"] }),
  ],
  sentences: [
    s("d18s1", "ಸರ್, ಸ್ವಲ್ಪ ಫ್ರೀ ಇದ್ದೀರಾ?", "Sir, swalpa free iddira?", "Sir, are you free for a bit?", "सर, थोड़ा फ़्री हैं?", { formality: "polite", words: ["Sir,", "swalpa", "free", "iddira?"], wordsKn: ["ಸರ್,", "ಸ್ವಲ್ಪ", "ಫ್ರೀ", "ಇದ್ದೀರಾ?"] }),
    s("d18s2", "ನಾಳೆ ನಾನು ರಜೆ.", "Naale naanu raje.", "I'm on leave tomorrow.", "कल मेरी छुट्टी है।", { words: ["Naale", "naanu", "raje"], wordsKn: ["ನಾಳೆ", "ನಾನು", "ರಜೆ"] }),
    s("d18s3", "ಮೀಟಿಂಗ್ ಎಷ್ಟು ಗಂಟೆಗೆ?", "Meeting eshtu ghantege?", "What time is the meeting?", "मीटिंग कितने बजे है?", { words: ["Meeting", "eshtu", "ghantege?"], wordsKn: ["ಮೀಟಿಂಗ್", "ಎಷ್ಟು", "ಗಂಟೆಗೆ?"] }),
    s("d18s4", "ನಾನು ನೋಡ್ತೀನಿ, ಆಮೇಲೆ ಹೇಳ್ತೀನಿ.", "Naanu nodtini, aamele heltini.", "I'll check and tell you later.", "मैं देखता हूँ, बाद में बताता हूँ।", { words: ["Naanu", "nodtini,", "aamele", "heltini"], wordsKn: ["ನಾನು", "ನೋಡ್ತೀನಿ,", "ಆಮೇಲೆ", "ಹೇಳ್ತೀನಿ"] }),
    s("d18s5", "ಲಂಚ್‌ಗೆ ಹೋಗೋಣ್ವಾ?", "Lunch-ge hogonva?", "Shall we go for lunch?", "लंच पर चलें?", { words: ["Lunch-ge", "hogonva?"], wordsKn: ["ಲಂಚ್‌ಗೆ", "ಹೋಗೋಣ್ವಾ?"] }),
    s("d18s6", "ಮೇಲ್ ಕಳಿಸಿದ್ದೀನಿ, ನೋಡಿ.", "Mail kalisiddini, nodi.", "I've sent the mail, please check.", "मेल भेज दिया है, देखिए।", { words: ["Mail", "kalisiddini,", "nodi"], wordsKn: ["ಮೇಲ್", "ಕಳಿಸಿದ್ದೀನಿ,", "ನೋಡಿ"] }),
    s("d18s7", "ಇವತ್ತು ಕೆಲಸ ಜಾಸ್ತಿ ಇದೆ.", "Ivattu kelsa jaasti ide.", "There's a lot of work today.", "आज काम ज़्यादा है।", { words: ["Ivattu", "kelsa", "jaasti", "ide"], wordsKn: ["ಇವತ್ತು", "ಕೆಲಸ", "ಜಾಸ್ತಿ", "ಇದೆ"] }),
    s("d18s8", "ಸರಿ, ನಾನು ಹೊರಡ್ತೀನಿ. ನಾಳೆ ಸಿಗೋಣ.", "Sari, naanu horadtini. Naale sigona.", "Okay, I'm heading out. See you tomorrow.", "ठीक है, मैं निकलता हूँ। कल मिलते हैं।", { words: ["Sari,", "naanu", "horadtini.", "Naale", "sigona"], wordsKn: ["ಸರಿ,", "ನಾನು", "ಹೊರಡ್ತೀನಿ.", "ನಾಳೆ", "ಸಿಗೋಣ"] }),
    s("d18s9", "ಸ್ವಲ್ಪ ಸಹಾಯ ಮಾಡ್ತೀರಾ?", "Swalpa sahaaya maadtira?", "Could you help me a little?", "थोड़ी मदद करेंगे?", { formality: "polite", words: ["Swalpa", "sahaaya", "maadtira?"], wordsKn: ["ಸ್ವಲ್ಪ", "ಸಹಾಯ", "ಮಾಡ್ತೀರಾ?"] }),
  ],
  concept: {
    title: bi("Work Kannada is mixed Kannada", "ऑफिस की कन्नड़ मिली-जुली कन्नड़ है"),
    intro: bi("Bengaluru offices speak 'Kanglish': English nouns, Kannada grammar. 'Meeting-ge bartira?' 'Mail kalisi.' You already know enough.", "बेंगलुरु के ऑफिस 'Kanglish' बोलते हैं: अंग्रेज़ी संज्ञा, कन्नड़ व्याकरण। 'Meeting-ge bartira?' 'Mail kalisi.' आप पहले से काफ़ी जानते हैं।"),
    sections: [
      { heading: bi("English noun + Kannada ending", "अंग्रेज़ी संज्ञा + कन्नड़ अंत"), body: bi("meeting-ge (to the meeting), office-alli (in office), laptop-alli, client-jote (with the client), deadline-ge munche (before deadline). Use English words freely; glue Kannada on.", "meeting-ge (मीटिंग में), office-alli (ऑफिस में), laptop-alli, client-jote (क्लाइंट के साथ)। अंग्रेज़ी शब्द खुलकर इस्तेमाल करो; कन्नड़ जोड़ो।") },
      { heading: bi("Polite with seniors", "सीनियर्स से विनम्रता"), body: bi("Sir/madam + -ira/-iri forms: 'Free iddira?', 'Nodtira?', 'Heli sir'. With peers your age, 'neenu' forms are fine once they use them first.", "Sir/madam + -ira/-iri रूप: 'Free iddira?', 'Nodtira?', 'Heli sir'। हमउम्र साथियों से 'neenu' रूप तभी जब वे पहले इस्तेमाल करें।"),
        bridge: [ { kn: "ಆಯ್ತು ಸರ್", roman: "Aaytu sir", hi: "ठीक है सर", en: "Okay sir" }, { kn: "ಅರ್ಥ ಆಯ್ತು", roman: "Artha aaytu", hi: "समझ गया", en: "Understood" }, { kn: "ನೋಡ್ತೀನಿ", roman: "Nodtini", hi: "देखता हूँ", en: "I'll check" } ] },
    ],
    tip: bi("End the day with 'Horadtini, naale sigona' — teammates notice.", "दिन का अंत 'Horadtini, naale sigona' से करो — टीम ध्यान देती है।"),
  },
  conversation: {
    id: "d18c1", title: bi("Quick chat with your lead", "लीड से छोटी बात"), setting: bi("At your lead's desk.", "लीड की डेस्क पर।"), speakers: { A: "Lead", B: "You" },
    lines: [
      line("B", "ಸರ್, ಸ್ವಲ್ಪ ಫ್ರೀ ಇದ್ದೀರಾ?", "Sir, swalpa free iddira?", "Sir, are you free for a bit?", "सर, थोड़ा फ़्री हैं?"),
      line("A", "ಹೇಳಿ, ಏನು?", "Heli, enu?", "Tell me, what is it?", "बताइए, क्या है?"),
      line("B", "ನಾಳೆ ನಾನು ರಜೆ. ಆಗುತ್ತಾ?", "Naale naanu raje. Aagutta?", "I need leave tomorrow. Is that okay?", "कल मेरी छुट्टी है। चलेगा?"),
      line("A", "ಆಗುತ್ತೆ. ರಿಪೋರ್ಟ್ ಮುಗೀತಾ?", "Aagutte. Report mugitaa?", "Okay. Is the report finished?", "चलेगा। रिपोर्ट खत्म हुई?"),
      line("B", "ಮುಗೀತು ಸರ್, ಮೇಲ್ ಕಳಿಸಿದ್ದೀನಿ.", "Mugitu sir, mail kalisiddini.", "It's done sir, I've sent the mail.", "हो गई सर, मेल भेज दिया है।"),
      line("A", "ಸೂಪರ್. ಸರಿ, ಎಂಜಾಯ್ ಮಾಡಿ.", "Super. Sari, enjoy maadi.", "Super. Okay, enjoy.", "बढ़िया। ठीक है, एंजॉय कीजिए।"),
    ],
    prompts: [
      { afterLine: 1, question: bi("Ask for leave tomorrow:", "कल की छुट्टी माँगें:"), options: [
        { kn: "ನಾಳೆ ನಾನು ರಜೆ. ಆಗುತ್ತಾ?", roman: "Naale naanu raje. Aagutta?", en: "I need leave tomorrow. Okay?", correct: true },
        { kn: "ನಿನ್ನೆ ನಾನು ರಜೆ.", roman: "Ninne naanu raje.", en: "I was on leave yesterday.", correct: false, feedback: bi("Ninne = yesterday. Naale = tomorrow.", "Ninne = बीता कल। Naale = आने वाला कल।") },
        { kn: "ಲಂಚ್‌ಗೆ ಹೋಗೋಣ್ವಾ?", roman: "Lunch-ge hogonva?", en: "Shall we go for lunch?", correct: false } ] },
      { afterLine: 3, question: bi("Say it's done and the mail is sent:", "कहें काम हो गया और मेल भेज दिया:"), options: [
        { kn: "ಮುಗೀತು ಸರ್, ಮೇಲ್ ಕಳಿಸಿದ್ದೀನಿ.", roman: "Mugitu sir, mail kalisiddini.", en: "Done sir, mail sent.", correct: true },
        { kn: "ಇನ್ನೂ ಆಗಿಲ್ಲ.", roman: "Innu aagilla.", en: "Not done yet.", correct: false, feedback: bi("That means not done — risky before leave!", "इसका मतलब अभी नहीं हुआ — छुट्टी से पहले जोखिम!") },
        { kn: "ಮೇಲ್ ಕಳಿಸಿ.", roman: "Mail kalisi.", en: "Send the mail.", correct: false } ] },
    ],
  },
  bossQuestion: { id: "d18boss", type: "typein", skill: "conversation", prompt: bi("Type (roman): 'I'll check and tell you later.'", "टाइप करें (रोमन): 'मैं देखकर बाद में बताता हूँ।'"), answer: "Naanu nodtini, aamele heltini", acceptable: ["Nodtini, aamele heltini", "Naanu nodtini aamele heltini", "Nodi aamele heltini"], explanation: bi("nodtini (I'll see) + aamele (later) + heltini (I'll tell).", "nodtini (देखता हूँ) + aamele (बाद में) + heltini (बताता हूँ)।") },
  dailyPhrase: { kn: "ಆಯ್ತು ಸರ್", roman: "Aaytu sir", meaning: bi("Okay sir / Will do (the office yes)", "ठीक है सर / कर दूँगा"), example: ex("ಇದು ಇವತ್ತು ಮುಗಿಸಿ. — ಆಯ್ತು ಸರ್.", "Idu ivattu mugisi. — Aaytu sir.", "Finish this today. — Will do, sir.", "यह आज खत्म कीजिए। — ठीक है सर।"), mini: [ line("A", "ಮೇಲ್ ಕಳಿಸಿ.", "Mail kalisi.", "Send the mail.", "मेल भेजिए।"), line("B", "ಆಯ್ತು ಸರ್.", "Aaytu sir.", "Okay sir.", "ठीक है सर।") ] },
};

export const day19: DayLesson = {
  day: 19, week: 3, type: "lesson", emoji: "🤙", minutes: 20,
  title: bi("Talking with friends", "दोस्तों से बात"),
  subtitle: bi("Casual Kannada: neenu, baa, hogona, 'en maga', 'sakkath'", "Casual कन्नड़: neenu, baa, hogona, 'en maga', 'sakkath'"),
  vocab: [
    v("en-samachara", "ಏನ್ ಸಮಾಚಾರ?", "En samaachaara?", "What's up? / What's new?", "क्या हाल-चाल?", { pos: "phrase", formality: "casual", tags: ["friends"] }),
    v("hegiddiya", "ಹೇಗಿದ್ದೀಯಾ?", "Hegiddiya?", "How are you? (casual)", "कैसे हो?", { pos: "phrase", formality: "casual", tags: ["friends"] }),
    v("sakkath", "ಸಖತ್", "Sakkath", "Awesome / Super", "ज़बरदस्त", { pos: "expression", formality: "very-casual", tags: ["friends", "slang"], example: ex("ಸಖತ್ ಆಗಿದೆ!", "Sakkath aagide!", "It's awesome!", "ज़बरदस्त है!") }),
    v("bega-baa", "ಬೇಗ ಬಾ", "Bega baa", "Come fast (casual)", "जल्दी आ", { pos: "phrase", formality: "casual", tags: ["friends"] }),
    v("gottilla-guru", "ಗೊತ್ತಿಲ್ಲ ಗುರು", "Gottilla guru", "No idea, man", "पता नहीं यार", { pos: "phrase", formality: "very-casual", tags: ["friends", "slang"], context: bi("'Guru' = buddy/boss among friends. Very Bengaluru.", "'Guru' = दोस्तों में यार/बॉस। बहुत बेंगलुरु।") }),
    v("bekidre", "ಬೇಕಿದ್ರೆ", "Bekidre", "If you want", "चाहो तो", { pos: "phrase", tags: ["grammar"] }),
    v("tumba-dina", "ತುಂಬಾ ದಿನ ಆಯ್ತು", "Tumba dina aaytu", "It's been a long time", "बहुत दिन हो गए", { pos: "phrase", tags: ["friends"] }),
    v("nanu-ready", "ನಾನು ರೆಡಿ", "Naanu ready", "I'm ready / I'm in", "मैं तैयार", { pos: "phrase", formality: "casual", tags: ["friends"] }),
    v("bidu", "ಬಿಡು", "Bidu", "Leave it / Forget it (casual)", "छोड़ो", { pos: "verb", formality: "casual", tags: ["friends"] }),
    v("yen-guru", "ಏನ್ ಗುರು", "En guru", "What, man? / Hey dude", "क्या यार", { pos: "phrase", formality: "very-casual", tags: ["friends", "slang"] }),
  ],
  sentences: [
    s("d19s1", "ಏನ್ ಸಮಾಚಾರ? ಹೇಗಿದ್ದೀಯಾ?", "En samaachaara? Hegiddiya?", "What's up? How are you?", "क्या हाल है? कैसे हो?", { formality: "casual", words: ["En", "samaachaara?", "Hegiddiya?"], wordsKn: ["ಏನ್", "ಸಮಾಚಾರ?", "ಹೇಗಿದ್ದೀಯಾ?"] }),
    s("d19s2", "ತುಂಬಾ ದಿನ ಆಯ್ತು, ಸಿಗೋಣ.", "Tumba dina aaytu, sigona.", "It's been ages, let's meet.", "बहुत दिन हो गए, मिलते हैं।", { formality: "casual", words: ["Tumba", "dina", "aaytu,", "sigona"], wordsKn: ["ತುಂಬಾ", "ದಿನ", "ಆಯ್ತು,", "ಸಿಗೋಣ"] }),
    s("d19s3", "ಬೇಗ ಬಾ, ನಾವು ಕಾಯ್ತಿದ್ದೀವಿ.", "Bega baa, naavu kaaytiddivi.", "Come fast, we're waiting.", "जल्दी आ, हम इंतज़ार कर रहे हैं।", { formality: "casual", words: ["Bega", "baa,", "naavu", "kaaytiddivi"], wordsKn: ["ಬೇಗ", "ಬಾ,", "ನಾವು", "ಕಾಯ್ತಿದ್ದೀವಿ"] }),
    s("d19s4", "ಸಿನಿಮಾ ಸಖತ್ ಆಗಿತ್ತು!", "Cinema sakkath aagittu!", "The movie was awesome!", "फ़िल्म ज़बरदस्त थी!", { formality: "very-casual", words: ["Cinema", "sakkath", "aagittu!"], wordsKn: ["ಸಿನಿಮಾ", "ಸಖತ್", "ಆಗಿತ್ತು!"] }),
    s("d19s5", "ನೀನು ಬರ್ತೀಯಾ?", "Neenu bartiya?", "Are you coming? (casual)", "तू आएगा?", { formality: "casual", words: ["Neenu", "bartiya?"], wordsKn: ["ನೀನು", "ಬರ್ತೀಯಾ?"] }),
    s("d19s6", "ನಾನು ರೆಡಿ, ಎಲ್ಲಿಗೆ ಹೋಗೋಣ?", "Naanu ready, ellige hogona?", "I'm in, where shall we go?", "मैं तैयार, कहाँ चलें?", { formality: "casual", words: ["Naanu", "ready,", "ellige", "hogona?"], wordsKn: ["ನಾನು", "ರೆಡಿ,", "ಎಲ್ಲಿಗೆ", "ಹೋಗೋಣ?"] }),
    s("d19s7", "ಬಿಡು, ಪರವಾಗಿಲ್ಲ.", "Bidu, parvagilla.", "Forget it, it's fine.", "छोड़ो, कोई बात नहीं।", { formality: "casual", words: ["Bidu,", "parvagilla"], wordsKn: ["ಬಿಡು,", "ಪರವಾಗಿಲ್ಲ"] }),
    s("d19s8", "ಬೇಕಿದ್ರೆ ನನ್ನ ಮನೆಗೆ ಬಾ.", "Bekidre nanna manege baa.", "Come to my place if you want.", "चाहो तो मेरे घर आ जाओ।", { formality: "casual", words: ["Bekidre", "nanna", "manege", "baa"], wordsKn: ["ಬೇಕಿದ್ರೆ", "ನನ್ನ", "ಮನೆಗೆ", "ಬಾ"] }),
  ],
  concept: {
    title: bi("Switching to casual", "Casual में बदलना"),
    intro: bi("With friends, drop the polite -i and -ira endings. 'Banni' becomes 'baa', 'bartira' becomes 'bartiya', 'neevu' becomes 'neenu'.", "दोस्तों के साथ विनम्र -i और -ira हटाओ। 'Banni' → 'baa', 'bartira' → 'bartiya', 'neevu' → 'neenu'।"),
    sections: [
      { heading: bi("Polite → casual map", "विनम्र → casual"), body: bi("banni → baa\nhogi → hogu\nkodi → kodu\nbartira → bartiya\nhegiddira → hegiddiya\nnimma → ninna", "banni → baa\nhogi → hogu\nkodi → kodu\nbartira → bartiya\nhegiddira → hegiddiya\nnimma → ninna"),
        bridge: [ { kn: "ನೀವು → ನೀನು", roman: "neevu → neenu", hi: "आप → तुम/तू", en: "you" }, { kn: "ಬನ್ನಿ → ಬಾ", roman: "banni → baa", hi: "आइए → आ", en: "come" } ] },
      { heading: bi("When to switch", "कब बदलें"), body: bi("Only when the other person uses neenu with you first, or with people clearly younger. Using neenu with a stranger or elder sounds rude. When unsure, stay polite.", "सिर्फ़ तब जब सामने वाला पहले आपसे neenu बोले, या जो साफ़ छोटे हों। अजनबी या बड़े से neenu अपमानजनक लगता है। शक हो तो विनम्र रहो।") },
    ],
    tip: bi("'Sakkath' is the friendliest compliment in Bengaluru. Use it for food, movies, plans.", "'Sakkath' बेंगलुरु की सबसे दोस्ताना तारीफ़ है। खाना, फ़िल्म, प्लान — सबके लिए।"),
  },
  conversation: {
    id: "d19c1", title: bi("Weekend plan with a friend", "दोस्त के साथ वीकेंड प्लान"), setting: bi("Phone call with a close friend.", "करीबी दोस्त से फ़ोन।"), speakers: { A: "Friend", B: "You" },
    lines: [
      line("A", "ಏನ್ ಗುರು, ಏನ್ ಸಮಾಚಾರ?", "En guru, en samaachaara?", "Hey man, what's up?", "क्या यार, क्या हाल?"),
      line("B", "ಏನೂ ಇಲ್ಲ, ಆರಾಮ್. ನೀನು ಹೇಗಿದ್ದೀಯಾ?", "Enu illa, aaraam. Neenu hegiddiya?", "Nothing much, relaxed. How are you?", "कुछ नहीं, आराम। तू कैसा है?"),
      line("A", "ಚೆನ್ನಾಗಿದ್ದೀನಿ. ಸಂಜೆ ಸಿನಿಮಾಗೆ ಹೋಗೋಣ್ವಾ?", "Chennagiddini. Sanje cinemage hogonva?", "Good. Shall we go to a movie this evening?", "बढ़िया। शाम को फ़िल्म चलें?"),
      line("B", "ನಾನು ರೆಡಿ! ಎಷ್ಟು ಗಂಟೆಗೆ?", "Naanu ready! Eshtu ghantege?", "I'm in! What time?", "मैं तैयार! कितने बजे?"),
      line("A", "ಏಳು ಗಂಟೆಗೆ. ಬೇಗ ಬಾ!", "Elu ghantege. Bega baa!", "At seven. Come on time!", "सात बजे। जल्दी आना!"),
      line("B", "ಸರಿ ಗುರು, ಸಿಗೋಣ.", "Sari guru, sigona.", "Okay man, see you.", "ठीक है यार, मिलते हैं।"),
    ],
    prompts: [
      { afterLine: 0, question: bi("Reply casually and ask how they are:", "casual जवाब देकर हाल पूछें:"), options: [
        { kn: "ಏನೂ ಇಲ್ಲ, ಆರಾಮ್. ನೀನು ಹೇಗಿದ್ದೀಯಾ?", roman: "Enu illa, aaraam. Neenu hegiddiya?", en: "Nothing much. How are you?", correct: true },
        { kn: "ನಮಸ್ಕಾರ ಸರ್, ಹೇಗಿದ್ದೀರಾ?", roman: "Namaskara sir, hegiddira?", en: "Hello sir, how are you?", correct: false, feedback: bi("Correct but way too formal for your buddy!", "सही है पर दोस्त के लिए बहुत औपचारिक!") },
        { kn: "ಗೊತ್ತಿಲ್ಲ.", roman: "Gottilla.", en: "Don't know.", correct: false } ] },
      { afterLine: 2, question: bi("You're in. Ask what time:", "आप तैयार हैं। समय पूछें:"), options: [
        { kn: "ನಾನು ರೆಡಿ! ಎಷ್ಟು ಗಂಟೆಗೆ?", roman: "Naanu ready! Eshtu ghantege?", en: "I'm in! What time?", correct: true },
        { kn: "ನಾನು ರೆಡಿ! ಎಷ್ಟು ರೂಪಾಯಿ?", roman: "Naanu ready! Eshtu rupaayi?", en: "I'm in! How many rupees?", correct: false, feedback: bi("Ghante = time; rupaayi = money.", "Ghante = समय; rupaayi = पैसा।") },
        { kn: "ಬಿಡು.", roman: "Bidu.", en: "Forget it.", correct: false } ] },
    ],
  },
  bossQuestion: { id: "d19boss", type: "mcq", skill: "conversation", prompt: bi("Which is NOT okay to say to your landlord's elderly father?", "मकान मालिक के बुज़ुर्ग पिता से क्या कहना ठीक नहीं?"), options: ["Neenu hegiddiya?", "Neevu hegiddira?", "Namaskara, hegiddira?", "Oota aaytaa?"], answer: "Neenu hegiddiya?", explanation: bi("Neenu + -iya is casual. With elders always use neevu + -ira.", "Neenu + -iya casual है। बड़ों से हमेशा neevu + -ira।") },
  dailyPhrase: { kn: "ಸಖತ್", roman: "Sakkath", meaning: bi("Awesome! (casual)", "ज़बरदस्त! (casual)"), example: ex("ಊಟ ಸಖತ್ ಆಗಿತ್ತು ಮಗಾ!", "Oota sakkath aagittu maga!", "The food was awesome, dude!", "खाना ज़बरदस्त था यार!"), mini: [ line("A", "ಹೇಗಿತ್ತು ಪಾರ್ಟಿ?", "Hegittu party?", "How was the party?", "पार्टी कैसी थी?"), line("B", "ಸಖತ್!", "Sakkath!", "Awesome!", "ज़बरदस्त!") ] },
};

export const day20: DayLesson = {
  day: 20, week: 3, type: "lesson", emoji: "☀️", minutes: 20,
  title: bi("Small talk", "छोटी-मोटी बातें"),
  subtitle: bi("Weather, traffic, food, weekends — the topics Bengaluru loves", "मौसम, ट्रैफिक, खाना, वीकेंड — बेंगलुरु के पसंदीदा विषय"),
  vocab: [
    v("male", "ಮಳೆ", "Male", "Rain", "बारिश", { pos: "noun", tags: ["smalltalk"], example: ex("ಇವತ್ತು ಮಳೆ ಬರುತ್ತೆ.", "Ivattu male barutte.", "It'll rain today.", "आज बारिश होगी।") }),
    v("chali", "ಚಳಿ", "Chali", "Cold (weather)", "ठंड", { pos: "noun", tags: ["smalltalk"] }),
    v("bisilu", "ಬಿಸಿಲು", "Bisilu", "Sunshine / Heat", "धूप", { pos: "noun", tags: ["smalltalk"] }),
    v("vaataavarana", "ಹವಾಮಾನ", "Havaamaana", "Weather", "मौसम", { pos: "noun", tags: ["smalltalk"] }),
    v("aaraam", "ಆರಾಮ್", "Aaraam", "Relaxed / Comfortable", "आराम", { pos: "adjective", tags: ["smalltalk"], bridge: bi("Same as Hindi आराम!", "हिंदी 'आराम' जैसा!") }),
    v("hosadu", "ಹೊಸದು", "Hosadu", "New (thing)", "नया वाला", { pos: "noun", tags: ["smalltalk"] }),
    v("ellaa-chennagide", "ಎಲ್ಲಾ ಚೆನ್ನಾಗಿದೆ", "Ella chennagide", "All good", "सब अच्छा है", { pos: "phrase", tags: ["smalltalk"] }),
    v("bejaaru", "ಬೇಜಾರು", "Bejaaru", "Bored / Upset", "बोर / उदास", { pos: "adjective", tags: ["smalltalk"], example: ex("ಬೇಜಾರಾಗಿದೆ.", "Bejaaraagide.", "I'm bored.", "बोर हो रहा हूँ।") }),
    v("khushi", "ಖುಷಿ", "Khushi", "Happy", "खुश", { pos: "adjective", tags: ["smalltalk"], bridge: bi("Same as Hindi खुशी!", "हिंदी 'खुशी' जैसा!") }),
    v("suttaadodu", "ಸುತ್ತಾಡೋದು", "Suttaadodu", "Roaming around", "घूमना", { pos: "verb", tags: ["smalltalk"] }),
  ],
  sentences: [
    s("d20s1", "ಇವತ್ತು ತುಂಬಾ ಚಳಿ ಇದೆ.", "Ivattu tumba chali ide.", "It's very cold today.", "आज बहुत ठंड है।", { words: ["Ivattu", "tumba", "chali", "ide"], wordsKn: ["ಇವತ್ತು", "ತುಂಬಾ", "ಚಳಿ", "ಇದೆ"] }),
    s("d20s2", "ಸಂಜೆ ಮಳೆ ಬರುತ್ತೆ ಅನ್ಸುತ್ತೆ.", "Sanje male barutte ansutte.", "I think it'll rain in the evening.", "लगता है शाम को बारिश होगी।", { words: ["Sanje", "male", "barutte", "ansutte"], wordsKn: ["ಸಂಜೆ", "ಮಳೆ", "ಬರುತ್ತೆ", "ಅನ್ಸುತ್ತೆ"], note: bi("'ansutte' = it seems / I think. Super natural.", "'ansutte' = लगता है। बहुत स्वाभाविक।") }),
    s("d20s3", "ಟ್ರಾಫಿಕ್ ಹೇಗಿತ್ತು?", "Traffic hegittu?", "How was the traffic?", "ट्रैफिक कैसा था?", { words: ["Traffic", "hegittu?"], wordsKn: ["ಟ್ರಾಫಿಕ್", "ಹೇಗಿತ್ತು?"] }),
    s("d20s4", "ಬೆಂಗಳೂರು ಹವಾಮಾನ ಸೂಪರ್.", "Bengaluru havaamaana super.", "Bengaluru weather is super.", "बेंगलुरु का मौसम सुपर है।", { words: ["Bengaluru", "havaamaana", "super"], wordsKn: ["ಬೆಂಗಳೂರು", "ಹವಾಮಾನ", "ಸೂಪರ್"] }),
    s("d20s5", "ವೀಕೆಂಡ್ ಏನ್ ಪ್ಲಾನ್?", "Weekend en plan?", "What's the weekend plan?", "वीकेंड का क्या प्लान है?", { words: ["Weekend", "en", "plan?"], wordsKn: ["ವೀಕೆಂಡ್", "ಏನ್", "ಪ್ಲಾನ್?"] }),
    s("d20s6", "ಮನೇಲಿ ಆರಾಮ್ ಆಗಿ ಇರ್ತೀನಿ.", "Manelli aaraam aagi irtini.", "I'll just relax at home.", "घर पर आराम से रहूँगा।", { words: ["Manelli", "aaraam", "aagi", "irtini"], wordsKn: ["ಮನೇಲಿ", "ಆರಾಮ್", "ಆಗಿ", "ಇರ್ತೀನಿ"] }),
    s("d20s7", "ಮನೇಲಿ ಎಲ್ಲಾ ಚೆನ್ನಾಗಿದ್ದಾರಾ?", "Manelli ella chennagiddaara?", "Is everyone at home well?", "घर पर सब ठीक हैं?", { formality: "polite", words: ["Manelli", "ella", "chennagiddaara?"], wordsKn: ["ಮನೇಲಿ", "ಎಲ್ಲಾ", "ಚೆನ್ನಾಗಿದ್ದಾರಾ?"] }),
    s("d20s8", "ತುಂಬಾ ಖುಷಿ ಆಯ್ತು.", "Tumba khushi aaytu.", "I'm really happy (about it).", "बहुत खुशी हुई।", { words: ["Tumba", "khushi", "aaytu"], wordsKn: ["ತುಂಬಾ", "ಖುಷಿ", "ಆಯ್ತು"] }),
  ],
  concept: {
    title: bi("Keeping a conversation alive", "बातचीत को ज़िंदा रखना"),
    intro: bi("Small talk is 80% reacting. Learn reactions and a few opener topics and you'll hold a five-minute chat.", "छोटी बातें 80% प्रतिक्रिया हैं। प्रतिक्रियाएँ और कुछ विषय सीखो, पाँच मिनट बात कर लोगे।"),
    sections: [
      { heading: bi("Reactions", "प्रतिक्रियाएँ"), body: bi("Houdaa? (really?) · Ayyo! (oh no!) · Super! · Sakkath! · Parvagilla (not bad) · Haudu haudu (yes yes) · Ashtu? (that much?!)", "Houdaa? (सच?) · Ayyo! (अरे नहीं!) · Super! · Sakkath! · Parvagilla (बुरा नहीं) · Haudu haudu (हाँ हाँ) · Ashtu? (इतना?!)") },
      { heading: bi("Openers", "शुरुआत"), body: bi("Weather: 'Ivattu chali/male...'. Traffic: 'Traffic hegittu?'. Food: 'Oota aaytaa?'. Weekend: 'Weekend en plan?'. Family: 'Manelli ella chennagiddaara?'", "मौसम: 'Ivattu chali/male...'। ट्रैफिक: 'Traffic hegittu?'। खाना: 'Oota aaytaa?'। वीकेंड: 'Weekend en plan?'। परिवार: 'Manelli ella chennagiddaara?'"),
        bridge: [ { kn: "ಅಯ್ಯೋ!", roman: "Ayyo!", hi: "अरे बाप रे!", en: "Oh no!" }, { kn: "ಅನ್ಸುತ್ತೆ", roman: "ansutte", hi: "लगता है", en: "it seems / I think" } ] },
    ],
    tip: bi("'Ayyo' is the most Kannada word there is. Use it when someone mentions traffic.", "'Ayyo' सबसे कन्नड़ शब्द है। जब कोई ट्रैफिक की बात करे तो बोलो।"),
  },
  conversation: {
    id: "d20c1", title: bi("Lift small talk", "लिफ़्ट में बातें"), setting: bi("Your neighbour in the apartment lift.", "अपार्टमेंट की लिफ़्ट में पड़ोसी।"), speakers: { A: "Neighbour", B: "You" },
    lines: [
      line("A", "ಇವತ್ತು ತುಂಬಾ ಚಳಿ, ಅಲ್ವಾ?", "Ivattu tumba chali, alva?", "Very cold today, isn't it?", "आज बहुत ठंड है, है ना?"),
      line("B", "ಹೌದು! ಸಂಜೆ ಮಳೆ ಬರುತ್ತೆ ಅನ್ಸುತ್ತೆ.", "Houdu! Sanje male barutte ansutte.", "Yes! I think it'll rain in the evening.", "हाँ! लगता है शाम को बारिश होगी।"),
      line("A", "ಆಫೀಸ್‌ಗಾ? ಟ್ರಾಫಿಕ್ ಹೇಗಿದೆ?", "Office-gaa? Traffic hegide?", "Going to office? How's the traffic?", "ऑफिस? ट्रैफिक कैसा है?"),
      line("B", "ಅಯ್ಯೋ, ಒಂದು ಗಂಟೆ ಆಗುತ್ತೆ!", "Ayyo, ondu ghante aagutte!", "Oh no, it'll take an hour!", "अरे बाप रे, एक घंटा लगेगा!"),
      line("A", "ಹೌದಾ? ವೀಕೆಂಡ್ ಏನ್ ಪ್ಲಾನ್?", "Houdaa? Weekend en plan?", "Really? What's the weekend plan?", "अच्छा? वीकेंड का क्या प्लान?"),
      line("B", "ಮನೇಲಿ ಆರಾಮ್ ಆಗಿ ಇರ್ತೀನಿ.", "Manelli aaraam aagi irtini.", "I'll just relax at home.", "घर पर आराम करूँगा।"),
    ],
    prompts: [
      { afterLine: 0, question: bi("Agree, and guess it'll rain later:", "सहमत होकर कहें शाम को बारिश होगी:"), options: [
        { kn: "ಹೌದು! ಸಂಜೆ ಮಳೆ ಬರುತ್ತೆ ಅನ್ಸುತ್ತೆ.", roman: "Houdu! Sanje male barutte ansutte.", en: "Yes! I think it'll rain this evening.", correct: true },
        { kn: "ಇಲ್ಲ, ತುಂಬಾ ಬಿಸಿಲು.", roman: "Illa, tumba bisilu.", en: "No, very sunny.", correct: false, feedback: bi("Disagreeing about the weather is bold!", "मौसम पर असहमति — हिम्मत वाली बात!") },
        { kn: "ಮಳೆ ಎಲ್ಲಿದೆ?", roman: "Male ellide?", en: "Where is the rain?", correct: false } ] },
      { afterLine: 2, question: bi("React to bad traffic:", "खराब ट्रैफिक पर प्रतिक्रिया:"), options: [
        { kn: "ಅಯ್ಯೋ, ಒಂದು ಗಂಟೆ ಆಗುತ್ತೆ!", roman: "Ayyo, ondu ghante aagutte!", en: "Oh no, it'll take an hour!", correct: true },
        { kn: "ಸಖತ್, ಒಂದು ಗಂಟೆ!", roman: "Sakkath, ondu ghante!", en: "Awesome, one hour!", correct: false, feedback: bi("Nobody is happy about an hour of traffic.", "एक घंटे के ट्रैफिक से कोई खुश नहीं होता।") },
        { kn: "ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ.", roman: "Ille nillisi.", en: "Stop right here.", correct: false } ] },
    ],
  },
  bossQuestion: { id: "d20boss", type: "mcq", skill: "conversation", prompt: bi("Someone says their phone fell in the rain. Best reaction?", "किसी का फ़ोन बारिश में गिर गया। सबसे अच्छी प्रतिक्रिया?"), options: ["Ayyo!", "Sakkath!", "Saaku", "Hogona"], answer: "Ayyo!", explanation: bi("'Ayyo' expresses sympathy or shock.", "'Ayyo' सहानुभूति या झटका दिखाता है।") },
  dailyPhrase: { kn: "ಅಯ್ಯೋ!", roman: "Ayyo!", meaning: bi("Oh no! / Oh my! (sympathy, surprise)", "अरे बाप रे! (सहानुभूति, आश्चर्य)"), example: ex("ಅಯ್ಯೋ, ಮಳೆ ಬಂತು!", "Ayyo, male bantu!", "Oh no, it started raining!", "अरे, बारिश आ गई!"), mini: [ line("A", "ಫೋನ್ ಬಿತ್ತು.", "Phone bittu.", "The phone fell.", "फ़ोन गिर गया।"), line("B", "ಅಯ್ಯೋ! ಏನೂ ಆಗ್ಲಿಲ್ಲ ತಾನೆ?", "Ayyo! Enu aaglilla taane?", "Oh no! Nothing happened, right?", "अरे! कुछ हुआ तो नहीं?") ] },
};
