import type { DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";

export const day22: DayLesson = {
  day: 22, week: 4, type: "lesson", emoji: "💬", minutes: 20,
  title: bi("Natural Kannada expressions", "स्वाभाविक कन्नड़ अभिव्यक्तियाँ"),
  subtitle: bi("The little phrases that make you sound local", "छोटे वाक्यांश जो आपको लोकल बनाते हैं"),
  vocab: [
    v("alva", "ಅಲ್ವಾ?", "Alva?", "Isn't it? / Right?", "है ना?", { pos: "particle", tags: ["expression"], example: ex("ಚೆನ್ನಾಗಿದೆ, ಅಲ್ವಾ?", "Chennagide, alva?", "It's nice, isn't it?", "अच्छा है, है ना?") }),
    v("haage", "ಹಾಗೇ", "Haage", "Just like that / Just because", "ऐसे ही", { pos: "adverb", tags: ["expression"], example: ex("ಏನಿಲ್ಲ, ಹಾಗೇ ಕಾಲ್ ಮಾಡ್ದೆ.", "Enilla, haage call maadde.", "Nothing, just called.", "कुछ नहीं, ऐसे ही कॉल किया।") }),
    v("nija", "ನಿಜ", "Nija", "True / Really", "सच", { pos: "adjective", tags: ["expression"], example: ex("ನಿಜವಾಗ್ಲೂ?", "Nijavaaglu?", "Really?", "सच में?") }),
    v("yenu-aagalla", "ಏನೂ ಆಗಲ್ಲ", "Enu aagalla", "Nothing will happen / Don't worry", "कुछ नहीं होगा", { pos: "phrase", tags: ["expression"] }),
    v("tension-tagobedi", "ಟೆನ್ಶನ್ ತಗೋಬೇಡಿ", "Tension tagobedi", "Don't take tension", "टेंशन मत लीजिए", { pos: "phrase", formality: "polite", tags: ["expression"] }),
    v("matte", "ಮತ್ತೆ", "Matte", "Again / And then / So...", "फिर", { pos: "adverb", tags: ["expression"], context: bi("'Matte?' alone = 'So, what else?' A classic conversation filler.", "अकेला 'Matte?' = 'और बताओ?' क्लासिक भराव शब्द।") }),
    v("swalpa-adjust", "ಸ್ವಲ್ಪ ಅಡ್ಜಸ್ಟ್ ಮಾಡ್ಕೊಳ್ಳಿ", "Swalpa adjust maadkolli", "Please adjust a little", "थोड़ा एडजस्ट कर लीजिए", { pos: "phrase", formality: "polite", tags: ["expression"], context: bi("Bengaluru's unofficial motto. Used in buses, queues, life.", "बेंगलुरु का अनौपचारिक नारा। बस, कतार, ज़िंदगी में।") }),
    v("hogli-bidi", "ಹೋಗ್ಲಿ ಬಿಡಿ", "Hogli bidi", "Let it go / Never mind", "जाने दीजिए", { pos: "phrase", formality: "polite", tags: ["expression"] }),
    v("gottaytu", "ಗೊತ್ತಾಯ್ತು", "Gottaaytu", "Got it / Came to know", "पता चल गया", { pos: "phrase", tags: ["expression"] }),
    v("banni-oota", "ಊಟ ಮಾಡ್ಕೊಂಡು ಹೋಗಿ", "Oota maadkondu hogi", "Eat before you go", "खाना खाकर जाइए", { pos: "phrase", formality: "polite", tags: ["expression"] }),
    v("bega-baa", "ಬನ್ನಿ ಮತ್ತೆ", "Banni matte", "Come again", "फिर आइए", { pos: "phrase", formality: "polite", tags: ["expression"] }),
    v("hodu", "ಹೋಗಿ ಬನ್ನಿ", "Hogi banni", "Go and come back (goodbye)", "जाकर आइए (अलविदा)", { pos: "phrase", formality: "polite", tags: ["expression"], context: bi("Kannada avoids saying just 'go'. 'Hogi banni' = go and come back. The polite goodbye.", "कन्नड़ में सिर्फ़ 'जाओ' नहीं कहते। 'Hogi banni' = जाकर आइए। विनम्र अलविदा।") }),
  ],
  sentences: [
    s("d22s1", "ಸ್ವಲ್ಪ ಅಡ್ಜಸ್ಟ್ ಮಾಡ್ಕೊಳ್ಳಿ.", "Swalpa adjust maadkolli.", "Please adjust a little.", "थोड़ा एडजस्ट कर लीजिए।", { formality: "polite", words: ["Swalpa", "adjust", "maadkolli"], wordsKn: ["ಸ್ವಲ್ಪ", "ಅಡ್ಜಸ್ಟ್", "ಮಾಡ್ಕೊಳ್ಳಿ"] }),
    s("d22s2", "ಟೆನ್ಶನ್ ತಗೋಬೇಡಿ, ಏನೂ ಆಗಲ್ಲ.", "Tension tagobedi, enu aagalla.", "Don't worry, nothing will happen.", "टेंशन मत लीजिए, कुछ नहीं होगा।", { formality: "polite", words: ["Tension", "tagobedi,", "enu", "aagalla"], wordsKn: ["ಟೆನ್ಶನ್", "ತಗೋಬೇಡಿ,", "ಏನೂ", "ಆಗಲ್ಲ"] }),
    s("d22s3", "ಹೋಗಿ ಬನ್ನಿ!", "Hogi banni!", "Bye, come back soon!", "जाकर आइए!", { formality: "polite", words: ["Hogi", "banni!"], wordsKn: ["ಹೋಗಿ", "ಬನ್ನಿ!"] }),
    s("d22s4", "ಹೋಗ್ಲಿ ಬಿಡಿ, ಪರವಾಗಿಲ್ಲ.", "Hogli bidi, parvagilla.", "Let it go, it's fine.", "जाने दीजिए, कोई बात नहीं।", { formality: "polite", words: ["Hogli", "bidi,", "parvagilla"], wordsKn: ["ಹೋಗ್ಲಿ", "ಬಿಡಿ,", "ಪರವಾಗಿಲ್ಲ"] }),
    s("d22s5", "ಮತ್ತೆ? ಏನ್ ವಿಶೇಷ?", "Matte? En vishesha?", "So? What's special / what's new?", "और? क्या ख़ास?", { words: ["Matte?", "En", "vishesha?"], wordsKn: ["ಮತ್ತೆ?", "ಏನ್", "ವಿಶೇಷ?"] }),
    s("d22s6", "ಊಟ ಮಾಡ್ಕೊಂಡು ಹೋಗಿ.", "Oota maadkondu hogi.", "Have food before you go.", "खाना खाकर जाइए।", { formality: "polite", words: ["Oota", "maadkondu", "hogi"], wordsKn: ["ಊಟ", "ಮಾಡ್ಕೊಂಡು", "ಹೋಗಿ"] }),
    s("d22s7", "ಏನಿಲ್ಲ, ಹಾಗೇ ಕಾಲ್ ಮಾಡ್ದೆ.", "Enilla, haage call maadde.", "Nothing, just called.", "कुछ नहीं, ऐसे ही कॉल किया।", { words: ["Enilla,", "haage", "call", "maadde"], wordsKn: ["ಏನಿಲ್ಲ,", "ಹಾಗೇ", "ಕಾಲ್", "ಮಾಡ್ದೆ"] }),
    s("d22s8", "ಬೆಂಗಳೂರು ಚೆನ್ನಾಗಿದೆ, ಅಲ್ವಾ?", "Bengaluru chennagide, alva?", "Bengaluru is nice, isn't it?", "बेंगलुरु अच्छा है, है ना?", { words: ["Bengaluru", "chennagide,", "alva?"], wordsKn: ["ಬೆಂಗಳೂರು", "ಚೆನ್ನಾಗಿದೆ,", "ಅಲ್ವಾ?"] }),
  ],
  concept: {
    title: bi("Textbook vs real", "किताबी बनाम असली"),
    intro: bi("These phrases are rarely in textbooks, but you'll hear them every hour in Bengaluru.", "ये वाक्यांश किताबों में कम मिलते हैं, पर बेंगलुरु में हर घंटे सुनोगे।"),
    sections: [
      { heading: bi("Goodbyes", "अलविदा"), body: bi("Kannada speakers don't say a bare 'go'. 'Hogi banni' (go and come), 'Sigona' (let's meet), 'Banni matte' (come again). Never just 'hogi' as goodbye.", "कन्नड़ में अकेला 'जाओ' नहीं कहते। 'Hogi banni', 'Sigona', 'Banni matte'। अलविदा में सिर्फ़ 'hogi' कभी नहीं।") },
      { heading: bi("Fillers", "भराव शब्द"), body: bi("alva? (right?), matte? (so...?), haage (just like that), nija (true). Sprinkle them in and you instantly sound natural.", "alva? (है ना?), matte? (और?), haage (ऐसे ही), nija (सच)। इन्हें डालो, तुरंत स्वाभाविक लगोगे।"),
        bridge: [ { kn: "ಅಲ್ವಾ?", roman: "alva?", hi: "है ना?", en: "isn't it?" }, { kn: "ಹಾಗೇ", roman: "haage", hi: "ऐसे ही", en: "just like that" } ] },
    ],
    tip: bi("Next time someone leaves, say 'Hogi banni'. Watch their face.", "अगली बार कोई जाए तो 'Hogi banni' कहो। उनका चेहरा देखो।"),
  },
  conversation: {
    id: "d22c1", title: bi("Leaving a friend's place", "दोस्त के घर से निकलना"), setting: bi("After dinner at a colleague's home.", "सहकर्मी के घर डिनर के बाद।"), speakers: { A: "Host", B: "You" },
    lines: [
      line("B", "ಸರಿ, ನಾನು ಹೊರಡ್ತೀನಿ.", "Sari, naanu horadtini.", "Okay, I'll head out.", "ठीक है, मैं चलता हूँ।"),
      line("A", "ಇಷ್ಟು ಬೇಗ? ಊಟ ಮಾಡ್ಕೊಂಡು ಹೋಗಿ!", "Ishtu bega? Oota maadkondu hogi!", "So soon? Have food before you go!", "इतनी जल्दी? खाना खाकर जाइए!"),
      line("B", "ಊಟ ಆಯ್ತು, ತುಂಬಾ ಚೆನ್ನಾಗಿತ್ತು.", "Oota aaytu, tumba chennagittu.", "I've eaten, it was very good.", "खा लिया, बहुत अच्छा था।"),
      line("A", "ಸರಿ, ಹೋಗಿ ಬನ್ನಿ. ಬನ್ನಿ ಮತ್ತೆ!", "Sari, hogi banni. Banni matte!", "Okay, bye. Come again!", "ठीक है, जाकर आइए। फिर आइए!"),
      line("B", "ಖಂಡಿತ! ಸಿಗೋಣ.", "Khandita! Sigona.", "Definitely! See you.", "ज़रूर! मिलते हैं।"),
    ],
    prompts: [
      { afterLine: 1, question: bi("Say you've eaten and it was great:", "कहें खा लिया और बहुत अच्छा था:"), options: [
        { kn: "ಊಟ ಆಯ್ತು, ತುಂಬಾ ಚೆನ್ನಾಗಿತ್ತು.", roman: "Oota aaytu, tumba chennagittu.", en: "Ate already, it was very good.", correct: true },
        { kn: "ಊಟ ಬೇಡ, ಚೆನ್ನಾಗಿಲ್ಲ.", roman: "Oota beda, chennagilla.", en: "Don't want food, it's not good.", correct: false, feedback: bi("Ouch — that insults the host!", "अरे — यह मेज़बान का अपमान है!") },
        { kn: "ಹೋಗ್ಲಿ ಬಿಡಿ.", roman: "Hogli bidi.", en: "Let it go.", correct: false } ] },
    ],
  },
  bossQuestion: { id: "d22boss", type: "mcq", skill: "conversation", prompt: bi("A guest is leaving your home. The natural goodbye is:", "मेहमान आपके घर से जा रहा है। स्वाभाविक अलविदा:"), options: ["Hogi banni", "Hogi", "Hogbedi", "Hode"], answer: "Hogi banni", explanation: bi("'Hogi' alone sounds like 'get out!'. 'Hogi banni' = go and come back.", "अकेला 'Hogi' 'निकलो!' जैसा लगता है। 'Hogi banni' = जाकर आइए।") },
  dailyPhrase: { kn: "ಸ್ವಲ್ಪ ಅಡ್ಜಸ್ಟ್ ಮಾಡ್ಕೊಳ್ಳಿ", roman: "Swalpa adjust maadkolli", meaning: bi("Please adjust a little (Bengaluru's motto)", "थोड़ा एडजस्ट कर लीजिए (बेंगलुरु का नारा)"), example: ex("ಸೀಟ್ ಇಲ್ಲ, ಸ್ವಲ್ಪ ಅಡ್ಜಸ್ಟ್ ಮಾಡ್ಕೊಳ್ಳಿ.", "Seat illa, swalpa adjust maadkolli.", "No seat, please adjust a bit.", "सीट नहीं है, थोड़ा एडजस्ट कर लीजिए।"), mini: [ line("A", "ಇಲ್ಲಿ ಜಾಗ ಇದೆಯಾ?", "Illi jaaga ideya?", "Is there space here?", "यहाँ जगह है?"), line("B", "ಸ್ವಲ್ಪ ಅಡ್ಜಸ್ಟ್ ಮಾಡ್ಕೊಳ್ಳಿ, ಕೂತ್ಕೊಳ್ಳಿ.", "Swalpa adjust maadkolli, kootkolli.", "Adjust a bit, sit.", "थोड़ा एडजस्ट करके बैठिए।") ] },
};

export const day23: DayLesson = {
  day: 23, week: 4, type: "lesson", emoji: "😎", minutes: 20,
  title: bi("Casual & slang Kannada", "Casual और slang कन्नड़"),
  subtitle: bi("Maga, guru, sakkath, bombat — clearly labelled formal / casual / very casual", "Maga, guru, sakkath, bombat — formal / casual / very casual लेबल के साथ"),
  vocab: [
    v("maga", "ಮಗಾ", "Maga", "Dude / Bro (lit. son)", "यार / भाई", { pos: "expression", formality: "very-casual", tags: ["slang"], context: bi("Only with close friends your age. Never with elders or strangers.", "सिर्फ़ हमउम्र करीबी दोस्तों से। बड़ों या अजनबियों से कभी नहीं।") }),
    v("guru", "ಗುರು", "Guru", "Boss / Buddy", "बॉस / यार", { pos: "expression", formality: "very-casual", tags: ["slang"], context: bi("Friendlier and safer than maga. Shopkeepers and friends use it.", "maga से ज़्यादा सुरक्षित। दुकानदार और दोस्त इस्तेमाल करते हैं।") }),
    v("bombat", "ಬೊಂಬಾಟ್", "Bombat", "Fantastic", "शानदार", { pos: "expression", formality: "very-casual", tags: ["slang"] }),
    v("chindi", "ಚಿಂದಿ", "Chindi", "Amazing / Killer (lit. torn to shreds)", "धमाकेदार", { pos: "expression", formality: "very-casual", tags: ["slang"], example: ex("ಡ್ಯಾನ್ಸ್ ಚಿಂದಿ!", "Dance chindi!", "The dance was killer!", "डांस धमाकेदार!") }),
    v("scene", "ಸೀನ್", "Scene", "Drama / Situation", "सीन / ड्रामा", { pos: "noun", formality: "very-casual", tags: ["slang"], example: ex("ಸೀನ್ ಹಾಕ್ಬೇಡ.", "Scene haakbeda.", "Don't create drama.", "ड्रामा मत कर।") }),
    v("kalla", "ಕಳ್ಳ", "Kalla", "Thief / Rascal (playful)", "चोर / बदमाश", { pos: "noun", formality: "casual", tags: ["slang"], context: bi("Playful between friends; literally 'thief'.", "दोस्तों में मज़ाक में; शाब्दिक अर्थ 'चोर'।") }),
    v("ond-nimsha", "ಒಂದ್ ನಿಮ್ಷ", "Ond nimsha", "One sec", "एक सेकंड", { pos: "phrase", formality: "casual", tags: ["slang"] }),
    v("ok-na", "ಓಕೆ ನಾ?", "Okay-na?", "Okay?", "ठीक है ना?", { pos: "phrase", formality: "casual", tags: ["slang"] }),
    v("hogo", "ಹೋಗೋ", "Hogo", "Get lost / Go on (teasing)", "चल हट", { pos: "expression", formality: "very-casual", tags: ["slang"], context: bi("Teasing only, between close friends. Can sound rude otherwise.", "सिर्फ़ करीबी दोस्तों में मज़ाक। वरना बदतमीज़ी लग सकती है।") }),
    v("yaake-guru", "ಯಾಕ್ ಗುರು?", "Yaak guru?", "Why, man?", "क्यों यार?", { pos: "phrase", formality: "very-casual", tags: ["slang"] }),
  ],
  sentences: [
    s("d23s1", "ಏನ್ ಮಗಾ, ಎಲ್ಲಿದ್ದೀಯಾ?", "En maga, elliddiya?", "Hey dude, where are you?", "क्या यार, कहाँ है?", { formality: "very-casual", words: ["En", "maga,", "elliddiya?"], wordsKn: ["ಏನ್", "ಮಗಾ,", "ಎಲ್ಲಿದ್ದೀಯಾ?"] }),
    s("d23s2", "ಪಾರ್ಟಿ ಬೊಂಬಾಟ್ ಆಗಿತ್ತು!", "Party bombat aagittu!", "The party was fantastic!", "पार्टी शानदार थी!", { formality: "very-casual", words: ["Party", "bombat", "aagittu!"], wordsKn: ["ಪಾರ್ಟಿ", "ಬೊಂಬಾಟ್", "ಆಗಿತ್ತು!"] }),
    s("d23s3", "ಒಂದ್ ನಿಮ್ಷ ಗುರು.", "Ond nimsha guru.", "One sec, buddy.", "एक सेकंड यार।", { formality: "very-casual", words: ["Ond", "nimsha", "guru"], wordsKn: ["ಒಂದ್", "ನಿಮ್ಷ", "ಗುರು"] }),
    s("d23s4", "ಸೀನ್ ಹಾಕ್ಬೇಡ, ಬಾ.", "Scene haakbeda, baa.", "Don't make a scene, come.", "ड्रामा मत कर, आ।", { formality: "very-casual", words: ["Scene", "haakbeda,", "baa"], wordsKn: ["ಸೀನ್", "ಹಾಕ್ಬೇಡ,", "ಬಾ"] }),
    s("d23s5", "ಸಖತ್ ಆಗಿದೆ ಗುರು!", "Sakkath aagide guru!", "It's awesome, man!", "ज़बरदस्त है यार!", { formality: "very-casual", words: ["Sakkath", "aagide", "guru!"], wordsKn: ["ಸಖತ್", "ಆಗಿದೆ", "ಗುರು!"] }),
    s("d23s6", "ನಾಳೆ ಸಿಗೋಣ, ಓಕೆ ನಾ?", "Naale sigona, okay-na?", "See you tomorrow, okay?", "कल मिलते हैं, ठीक है ना?", { formality: "casual", words: ["Naale", "sigona,", "okay-na?"], wordsKn: ["ನಾಳೆ", "ಸಿಗೋಣ,", "ಓಕೆ ನಾ?"] }),
  ],
  concept: {
    title: bi("Three registers", "तीन स्तर"),
    intro: bi("The same idea sounds very different depending on who you're talking to. Every phrase in this app is labelled.", "एक ही बात किससे कह रहे हो उस पर बहुत अलग लगती है। इस ऐप का हर वाक्यांश लेबल किया गया है।"),
    sections: [
      { heading: bi("Same meaning, three levels", "एक मतलब, तीन स्तर"), body: bi("FORMAL / POLITE: 'Neevu hegiddira?' — elders, strangers, work.\nCASUAL: 'Hegiddiya?' — friends, younger people.\nVERY CASUAL: 'En maga, hegiddiya?' — close friends only.", "FORMAL / POLITE: 'Neevu hegiddira?' — बड़े, अजनबी, ऑफिस।\nCASUAL: 'Hegiddiya?' — दोस्त, छोटे।\nVERY CASUAL: 'En maga, hegiddiya?' — सिर्फ़ करीबी दोस्त।"),
        bridge: [ { kn: "ಚೆನ್ನಾಗಿದೆ", roman: "chennagide", hi: "अच्छा है", en: "it's good (any)" }, { kn: "ಸಖತ್", roman: "sakkath", hi: "ज़बरदस्त", en: "awesome (casual)" }, { kn: "ಬೊಂಬಾಟ್ / ಚಿಂದಿ", roman: "bombat / chindi", hi: "धमाकेदार", en: "killer (very casual)" } ] },
      { heading: bi("What we don't teach", "हम क्या नहीं सिखाते"), body: bi("Kannada has plenty of swear words. We don't teach them; you'll recognise them from tone. If someone uses one at you, 'Swalpa respect kodi' (show some respect) is a calm reply.", "कन्नड़ में गालियाँ बहुत हैं। हम नहीं सिखाते; लहजे से पहचान लोगे। कोई आपको गाली दे तो 'Swalpa respect kodi' (थोड़ा सम्मान दीजिए) शांत जवाब है।") },
    ],
    tip: bi("Slang lands best when your basics are solid. One 'sakkath' in a polite sentence is perfect.", "Slang तब अच्छा लगता है जब बेसिक्स पक्के हों। एक विनम्र वाक्य में एक 'sakkath' — बिल्कुल सही।"),
  },
  conversation: {
    id: "d23c1", title: bi("Texting your college buddy", "कॉलेज दोस्त से चैट"), setting: bi("Very casual chat.", "बहुत casual बातचीत।"), speakers: { A: "Buddy", B: "You" },
    lines: [
      line("A", "ಏನ್ ಮಗಾ, ಎಲ್ಲಿದ್ದೀಯಾ?", "En maga, elliddiya?", "Hey dude, where are you?", "क्या यार, कहाँ है?"),
      line("B", "ಮನೇಲಿ ಗುರು. ಯಾಕೆ?", "Manelli guru. Yaake?", "At home, man. Why?", "घर पर यार। क्यों?"),
      line("A", "ಬಾ, ಪಾರ್ಟಿ ಇದೆ. ಸಖತ್ ಆಗಿದೆ!", "Baa, party ide. Sakkath aagide!", "Come, there's a party. It's awesome!", "आ, पार्टी है। ज़बरदस्त है!"),
      line("B", "ಒಂದ್ ನಿಮ್ಷ, ಬರ್ತೀನಿ!", "Ond nimsha, bartini!", "One sec, coming!", "एक सेकंड, आता हूँ!"),
    ],
    prompts: [
      { afterLine: 2, question: bi("Reply very casually that you're coming in a sec:", "बहुत casual जवाब: एक सेकंड, आ रहा हूँ:"), options: [
        { kn: "ಒಂದ್ ನಿಮ್ಷ, ಬರ್ತೀನಿ!", roman: "Ond nimsha, bartini!", en: "One sec, coming!", correct: true },
        { kn: "ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಕಾಯಿರಿ.", roman: "Dayavittu swalpa kaayiri.", en: "Please kindly wait.", correct: false, feedback: bi("Too formal for your buddy — he'll laugh!", "दोस्त के लिए बहुत औपचारिक — वह हँसेगा!") },
        { kn: "ಹೋಗೋ.", roman: "Hogo.", en: "Get lost.", correct: false } ] },
    ],
  },
  bossQuestion: { id: "d23boss", type: "mcq", skill: "conversation", prompt: bi("Which is appropriate to say to your manager about a great presentation?", "मैनेजर की शानदार प्रेज़ेंटेशन पर क्या कहना ठीक है?"), options: ["Tumba chennagittu sir", "Chindi maga!", "Bombat guru!", "Hogo"], answer: "Tumba chennagittu sir", explanation: bi("With a manager, stay polite. 'Chindi maga' is for close friends only.", "मैनेजर के साथ विनम्र रहो। 'Chindi maga' सिर्फ़ करीबी दोस्तों के लिए।") },
  dailyPhrase: { kn: "ಸಖತ್ ಗುರು", roman: "Sakkath guru", meaning: bi("Awesome, man! (very casual)", "ज़बरदस्त यार! (very casual)"), example: ex("ಬಿರಿಯಾನಿ ಸಖತ್ ಗುರು!", "Biryani sakkath guru!", "The biryani is awesome, man!", "बिरयानी ज़बरदस्त है यार!"), mini: [ line("A", "ಹೇಗಿದೆ?", "Hegide?", "How is it?", "कैसा है?"), line("B", "ಸಖತ್ ಗುರು!", "Sakkath guru!", "Awesome, man!", "ज़बरदस्त यार!") ] },
};
