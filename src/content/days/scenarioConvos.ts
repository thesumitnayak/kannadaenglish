import type { Conversation } from "../types";
import { line, bi } from "../helpers";

/** Reusable real-life conversations used by challenge, practice and final-boss days. */
export const week3Conversations: Conversation[] = [
  {
    id: "rl-shop", title: bi("At the kirana shop", "किराना दुकान पर"), setting: bi("Buying milk and bread.", "दूध और ब्रेड खरीदना।"), speakers: { A: "Shopkeeper", B: "You" },
    lines: [
      line("A", "ಏನು ಬೇಕು ಸರ್?", "Enu beku sir?", "What do you need, sir?", "क्या चाहिए सर?"),
      line("B", "ಒಂದು ಹಾಲು, ಒಂದು ಬ್ರೆಡ್ ಕೊಡಿ.", "Ondu haalu, ondu bread kodi.", "One milk, one bread, please.", "एक दूध, एक ब्रेड दीजिए।"),
      line("A", "ಬೇರೆ ಏನಾದ್ರೂ?", "Bere enaadru?", "Anything else?", "और कुछ?"),
      line("B", "ಇಲ್ಲ, ಅಷ್ಟೇ. ಎಷ್ಟು ಆಯ್ತು?", "Illa, ashte. Eshtu aaytu?", "No, that's all. How much?", "नहीं, बस। कितना हुआ?"),
      line("A", "ಎಂಬತ್ತು ರೂಪಾಯಿ.", "Embattu rupaayi.", "Eighty rupees.", "अस्सी रुपये।"),
      line("B", "ಗೂಗಲ್ ಪೇ ಆಗುತ್ತಾ?", "Google Pay aagutta?", "Does Google Pay work?", "गूगल पे चलेगा?"),
    ],
    prompts: [
      { afterLine: 0, question: bi("Ask for one milk and one bread:", "एक दूध और एक ब्रेड माँगें:"), options: [
        { kn: "ಒಂದು ಹಾಲು, ಒಂದು ಬ್ರೆಡ್ ಕೊಡಿ.", roman: "Ondu haalu, ondu bread kodi.", en: "One milk, one bread please.", correct: true },
        { kn: "ಹಾಲು ಬೇಡ.", roman: "Haalu beda.", en: "No milk.", correct: false },
        { kn: "ನೀರು ಕೊಡಿ.", roman: "Neeru kodi.", en: "Give water.", correct: false, feedback: bi("Neeru = water; haalu = milk.", "Neeru = पानी; haalu = दूध।") } ] },
      { afterLine: 2, question: bi("That's all — ask the total:", "बस इतना — कुल पूछें:"), options: [
        { kn: "ಇಲ್ಲ, ಅಷ್ಟೇ. ಎಷ್ಟು ಆಯ್ತು?", roman: "Illa, ashte. Eshtu aaytu?", en: "No, that's all. How much?", correct: true },
        { kn: "ಹೌದು, ಇನ್ನೂ ಬೇಕು.", roman: "Houdu, innu beku.", en: "Yes, I want more.", correct: false },
        { kn: "ಎಲ್ಲಿದೆ?", roman: "Ellide?", en: "Where is it?", correct: false } ] },
    ],
  },
  {
    id: "rl-directions", title: bi("Asking directions", "रास्ता पूछना"), setting: bi("Looking for the metro station.", "मेट्रो स्टेशन ढूँढना।"), speakers: { A: "You", B: "Passer-by" },
    lines: [
      line("A", "ಕ್ಷಮಿಸಿ, ಮೆಟ್ರೋ ಸ್ಟೇಷನ್ ಎಲ್ಲಿದೆ?", "Kshamisi, metro station ellide?", "Excuse me, where is the metro station?", "माफ़ कीजिए, मेट्रो स्टेशन कहाँ है?"),
      line("B", "ನೇರವಾಗಿ ಹೋಗಿ, ಸಿಗ್ನಲ್ ಹತ್ತಿರ ಬಲಕ್ಕೆ.", "Neravaagi hogi, signal hattira balakke.", "Go straight, right at the signal.", "सीधे जाइए, सिग्नल के पास दाएँ।"),
      line("A", "ಎಷ್ಟು ದೂರ?", "Eshtu doora?", "How far?", "कितना दूर?"),
      line("B", "ತುಂಬಾ ದೂರ ಇಲ್ಲ, ಐದು ನಿಮಿಷ.", "Tumba doora illa, aidu nimisha.", "Not very far, five minutes.", "ज़्यादा दूर नहीं, पाँच मिनट।"),
      line("A", "ಧನ್ಯವಾದ!", "Dhanyavaada!", "Thank you!", "धन्यवाद!"),
    ],
    prompts: [
      { afterLine: 1, question: bi("Ask how far it is:", "पूछें कितना दूर है:"), options: [
        { kn: "ಎಷ್ಟು ದೂರ?", roman: "Eshtu doora?", en: "How far?", correct: true },
        { kn: "ಎಷ್ಟು ಆಯ್ತು?", roman: "Eshtu aaytu?", en: "How much is it?", correct: false, feedback: bi("That's for prices.", "यह दाम के लिए है।") },
        { kn: "ಯಾರು?", roman: "Yaaru?", en: "Who?", correct: false } ] },
    ],
  },
  {
    id: "rl-colleague", title: bi("Colleague at the coffee machine", "कॉफ़ी मशीन पर सहकर्मी"), setting: bi("Office pantry, morning.", "ऑफिस पैंट्री, सुबह।"), speakers: { A: "Colleague", B: "You" },
    lines: [
      line("A", "ಗುಡ್ ಮಾರ್ನಿಂಗ್! ತಿಂಡಿ ಆಯ್ತಾ?", "Good morning! Tindi aaytaa?", "Good morning! Had breakfast?", "गुड मॉर्निंग! नाश्ता हुआ?"),
      line("B", "ಆಯ್ತು. ನಿಮ್ದು?", "Aaytu. Nimdu?", "Yes. Yours?", "हो गया। आपका?"),
      line("A", "ಇನ್ನೂ ಇಲ್ಲ. ಮೀಟಿಂಗ್ ಎಷ್ಟು ಗಂಟೆಗೆ?", "Innu illa. Meeting eshtu ghantege?", "Not yet. What time is the meeting?", "अभी नहीं। मीटिंग कितने बजे?"),
      line("B", "ಹನ್ನೊಂದು ಗಂಟೆಗೆ.", "Hannondu ghantege.", "At eleven.", "ग्यारह बजे।"),
      line("A", "ಸರಿ, ಲಂಚ್‌ಗೆ ಹೋಗೋಣ್ವಾ ಆಮೇಲೆ?", "Sari, lunch-ge hogonva aamele?", "Okay, shall we go for lunch later?", "ठीक है, बाद में लंच चलें?"),
      line("B", "ಖಂಡಿತ!", "Khandita!", "Definitely!", "ज़रूर!"),
    ],
    prompts: [
      { afterLine: 2, question: bi("Meeting is at 11:", "मीटिंग 11 बजे है:"), options: [
        { kn: "ಹನ್ನೊಂದು ಗಂಟೆಗೆ.", roman: "Hannondu ghantege.", en: "At eleven.", correct: true },
        { kn: "ಹನ್ನೆರಡು ಗಂಟೆಗೆ.", roman: "Hanneradu ghantege.", en: "At twelve.", correct: false, feedback: bi("Hanneradu = 12. Hannondu = 11.", "Hanneradu = 12। Hannondu = 11।") },
        { kn: "ಒಂದು ಗಂಟೆ.", roman: "Ondu ghante.", en: "One hour.", correct: false } ] },
      { afterLine: 4, question: bi("Accept the lunch plan enthusiastically:", "लंच का प्लान उत्साह से मानें:"), options: [
        { kn: "ಖಂಡಿತ!", roman: "Khandita!", en: "Definitely!", correct: true },
        { kn: "ಬೇಡ.", roman: "Beda.", en: "Don't want.", correct: false },
        { kn: "ಗೊತ್ತಿಲ್ಲ.", roman: "Gottilla.", en: "Don't know.", correct: false } ] },
    ],
  },
  {
    id: "rl-cab", title: bi("Cab driver call", "कैब ड्राइवर का कॉल"), setting: bi("Your cab driver calls to find you.", "कैब ड्राइवर आपको ढूँढने के लिए कॉल करता है।"), speakers: { A: "Driver", B: "You" },
    lines: [
      line("A", "ಸರ್, ಎಲ್ಲಿದ್ದೀರಾ?", "Sir, elliddira?", "Sir, where are you?", "सर, कहाँ हैं?"),
      line("B", "ನಾನು ಗೇಟ್ ಹತ್ತಿರ ಇದ್ದೀನಿ.", "Naanu gate hattira iddini.", "I'm near the gate.", "मैं गेट के पास हूँ।"),
      line("A", "ಯಾವ ಗೇಟ್? ಮುಂದಿನ ಗೇಟಾ?", "Yaava gate? Mundina gate-aa?", "Which gate? The front gate?", "कौन सा गेट? आगे वाला?"),
      line("B", "ಹೌದು, ಮುಂದಿನ ಗೇಟ್. ಬನ್ನಿ, ಕಾಯ್ತಿದ್ದೀನಿ.", "Houdu, mundina gate. Banni, kaaytiddini.", "Yes, the front gate. Come, I'm waiting.", "हाँ, आगे वाला गेट। आइए, इंतज़ार कर रहा हूँ।"),
      line("A", "ಎರಡು ನಿಮಿಷದಲ್ಲಿ ಬರ್ತೀನಿ.", "Eradu nimishadalli bartini.", "I'll be there in two minutes.", "दो मिनट में आता हूँ।"),
    ],
    prompts: [
      { afterLine: 0, question: bi("Tell him you're near the gate:", "बताएँ आप गेट के पास हैं:"), options: [
        { kn: "ನಾನು ಗೇಟ್ ಹತ್ತಿರ ಇದ್ದೀನಿ.", roman: "Naanu gate hattira iddini.", en: "I'm near the gate.", correct: true },
        { kn: "ನಾನು ಗೇಟ್‌ಗೆ ಹೋದೆ.", roman: "Naanu gate-ge hode.", en: "I went to the gate.", correct: false, feedback: bi("Say where you ARE now: iddini.", "अभी कहाँ हो बताओ: iddini।") },
        { kn: "ಗೇಟ್ ಎಲ್ಲಿದೆ?", roman: "Gate ellide?", en: "Where's the gate?", correct: false } ] },
    ],
  },
];

/** Day 30 final boss: a full day in Bengaluru. */
export const finalBossConversations: Conversation[] = [
  {
    id: "fb-morning", title: bi("1 · Wake up: your flatmate", "1 · सुबह: आपका फ़्लैटमेट"), setting: bi("7 am, kitchen.", "सुबह 7 बजे, रसोई।"), speakers: { A: "Flatmate", B: "You" },
    lines: [
      line("A", "ಗುಡ್ ಮಾರ್ನಿಂಗ್! ಬೇಗ ಎದ್ದೆ?", "Good morning! Bega edde?", "Good morning! Woke up early?", "गुड मॉर्निंग! जल्दी उठ गए?"),
      line("B", "ಹೌದು, ಇವತ್ತು ಆಫೀಸ್‌ಗೆ ಹೋಗ್ಬೇಕು.", "Houdu, ivattu office-ge hogbeku.", "Yes, I have to go to office today.", "हाँ, आज ऑफिस जाना है।"),
      line("A", "ಕಾಫಿ ಬೇಕಾ?", "Kaafi beka?", "Want coffee?", "कॉफ़ी चाहिए?"),
      line("B", "ಬೇಡ, ಹೊರಗೆ ತಿಂಡಿ ತಿಂತೀನಿ.", "Beda, horage tindi tintini.", "No, I'll have breakfast outside.", "नहीं, बाहर नाश्ता करूँगा।"),
    ],
    prompts: [
      { afterLine: 0, question: bi("Yes — you have to go to office today:", "हाँ — आज ऑफिस जाना है:"), options: [
        { kn: "ಹೌದು, ಇವತ್ತು ಆಫೀಸ್‌ಗೆ ಹೋಗ್ಬೇಕು.", roman: "Houdu, ivattu office-ge hogbeku.", en: "Yes, I have to go to office today.", correct: true },
        { kn: "ಹೌದು, ನಿನ್ನೆ ಆಫೀಸ್‌ಗೆ ಹೋದೆ.", roman: "Houdu, ninne office-ge hode.", en: "Yes, I went to office yesterday.", correct: false, feedback: bi("Today = ivattu; hogbeku = have to go.", "आज = ivattu; hogbeku = जाना है।") },
        { kn: "ಇಲ್ಲ, ರಜೆ.", roman: "Illa, raje.", en: "No, holiday.", correct: false } ] },
      { afterLine: 2, question: bi("Decline: you'll eat breakfast outside.", "मना करें: बाहर नाश्ता करेंगे।"), options: [
        { kn: "ಬೇಡ, ಹೊರಗೆ ತಿಂಡಿ ತಿಂತೀನಿ.", roman: "Beda, horage tindi tintini.", en: "No, I'll eat breakfast outside.", correct: true },
        { kn: "ಬೇಕು, ಒಳಗೆ ಮಲಗ್ತೀನಿ.", roman: "Beku, olage malagtini.", en: "Yes, I'll sleep inside.", correct: false },
        { kn: "ಕಾಫಿ ಎಲ್ಲಿದೆ?", roman: "Kaafi ellide?", en: "Where's the coffee?", correct: false } ] },
    ],
  },
  {
    id: "fb-breakfast", title: bi("2 · Breakfast at a darshini", "2 · दर्शिनी में नाश्ता"), setting: bi("Busy counter.", "भीड़ वाला काउंटर।"), speakers: { A: "Counter", B: "You" },
    lines: [
      line("A", "ಏನು ಬೇಕು?", "Enu beku?", "What do you want?", "क्या चाहिए?"),
      line("B", "ಎರಡು ಇಡ್ಲಿ ವಡೆ, ಒಂದು ಕಾಫಿ. ಪಾರ್ಸೆಲ್ ಅಲ್ಲ, ಇಲ್ಲೇ.", "Eradu idli vade, ondu kaafi. Parcel alla, ille.", "Two idli-vada, one coffee. Not parcel, here.", "दो इडली वड़ा, एक कॉफ़ी। पार्सल नहीं, यहीं।"),
      line("A", "ಎಪ್ಪತ್ತೈದು ರೂಪಾಯಿ.", "Eppattaidu rupaayi.", "Seventy-five rupees.", "पचहत्तर रुपये।"),
      line("B", "ಸರಿ. ಚಟ್ನಿ ಸ್ವಲ್ಪ ಜಾಸ್ತಿ ಕೊಡಿ.", "Sari. Chutney swalpa jaasti kodi.", "Okay. A little extra chutney please.", "ठीक है। चटनी थोड़ी ज़्यादा दीजिए।"),
    ],
    prompts: [
      { afterLine: 0, question: bi("Order two idli-vada and a coffee to eat here:", "दो इडली वड़ा और एक कॉफ़ी, यहीं खाने के लिए:"), options: [
        { kn: "ಎರಡು ಇಡ್ಲಿ ವಡೆ, ಒಂದು ಕಾಫಿ. ಇಲ್ಲೇ.", roman: "Eradu idli vade, ondu kaafi. Ille.", en: "Two idli-vada, one coffee. Here.", correct: true },
        { kn: "ಎರಡು ಇಡ್ಲಿ ವಡೆ ಬೇಡ.", roman: "Eradu idli vade beda.", en: "Don't want two idli-vada.", correct: false },
        { kn: "ಒಂದು ಕಾಫಿ ಪಾರ್ಸೆಲ್ ಮಾಡಿ.", roman: "Ondu kaafi parcel maadi.", en: "Pack one coffee.", correct: false } ] },
      { afterLine: 2, question: bi("Ask for a little extra chutney:", "थोड़ी ज़्यादा चटनी माँगें:"), options: [
        { kn: "ಚಟ್ನಿ ಸ್ವಲ್ಪ ಜಾಸ್ತಿ ಕೊಡಿ.", roman: "Chutney swalpa jaasti kodi.", en: "A little extra chutney please.", correct: true },
        { kn: "ಚಟ್ನಿ ಬೇಡ.", roman: "Chutney beda.", en: "No chutney.", correct: false },
        { kn: "ಚಟ್ನಿ ಕಡಿಮೆ.", roman: "Chutney kadime.", en: "Less chutney.", correct: false } ] },
    ],
  },
  {
    id: "fb-auto", title: bi("3 · Auto to office", "3 · ऑफिस का ऑटो"), setting: bi("Hailing an auto outside the darshini.", "दर्शिनी के बाहर ऑटो रोकना।"), speakers: { A: "Driver", B: "You" },
    lines: [
      line("B", "ಅಣ್ಣ, ಕೋರಮಂಗಲ ಬರ್ತೀರಾ?", "Anna, Koramangala bartira?", "Brother, will you go to Koramangala?", "भैया, कोरमंगला चलेंगे?"),
      line("A", "ಇನ್ನೂರು ಆಗುತ್ತೆ.", "Innooru aagutte.", "It'll be 200.", "200 होगा।"),
      line("B", "ಇನ್ನೂರು ಜಾಸ್ತಿ ಅಣ್ಣ. ಮೀಟರ್ ಹಾಕಿ.", "Innooru jaasti anna. Meter haaki.", "200 is too much. Put the meter.", "200 ज़्यादा है भैया। मीटर लगाइए।"),
      line("A", "ಸರಿ ಸರ್, ಹತ್ತಿ.", "Sari sir, hatti.", "Okay sir, get in.", "ठीक है सर, बैठिए।"),
      line("B", "ಸ್ವಲ್ಪ ಮುಂದೆ ಎಡಕ್ಕೆ. ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ.", "Swalpa munde edakke. Ille nillisi.", "A bit ahead, left. Stop right here.", "थोड़ा आगे बाएँ। यहीं रोकिए।"),
    ],
    prompts: [
      { afterLine: 1, question: bi("Push back on 200 and ask for the meter:", "200 पर आपत्ति, मीटर माँगें:"), options: [
        { kn: "ಇನ್ನೂರು ಜಾಸ್ತಿ ಅಣ್ಣ. ಮೀಟರ್ ಹಾಕಿ.", roman: "Innooru jaasti anna. Meter haaki.", en: "200 is too much. Put the meter.", correct: true },
        { kn: "ಸರಿ, ಮುನ್ನೂರು ಕೊಡ್ತೀನಿ.", roman: "Sari, munnooru kodtini.", en: "Okay, I'll give 300.", correct: false, feedback: bi("Munnooru = 300. You just raised it!", "Munnooru = 300। आपने बढ़ा दिया!") },
        { kn: "ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ.", roman: "Ille nillisi.", en: "Stop right here.", correct: false } ] },
      { afterLine: 3, question: bi("Guide him: a bit ahead, left, stop here.", "बताएँ: थोड़ा आगे, बाएँ, यहीं रोकिए।"), options: [
        { kn: "ಸ್ವಲ್ಪ ಮುಂದೆ ಎಡಕ್ಕೆ. ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ.", roman: "Swalpa munde edakke. Ille nillisi.", en: "A bit ahead, left. Stop here.", correct: true },
        { kn: "ಸ್ವಲ್ಪ ಹಿಂದೆ ಬಲಕ್ಕೆ.", roman: "Swalpa hinde balakke.", en: "A bit back, right.", correct: false },
        { kn: "ಯು-ಟರ್ನ್ ತಗೊಳ್ಳಿ.", roman: "U-turn tagolli.", en: "Take a U-turn.", correct: false } ] },
    ],
  },
  {
    id: "fb-office", title: bi("4 · Reach office: colleagues", "4 · ऑफिस: सहकर्मी"), setting: bi("Your team's bay.", "आपकी टीम की जगह।"), speakers: { A: "Colleague", B: "You" },
    lines: [
      line("A", "ಬನ್ನಿ! ಯಾಕೆ ಲೇಟ್?", "Banni! Yaake late?", "Come! Why late?", "आइए! देर क्यों?"),
      line("B", "ತುಂಬಾ ಟ್ರಾಫಿಕ್ ಇತ್ತು.", "Tumba traffic ittu.", "There was a lot of traffic.", "बहुत ट्रैफिक था।"),
      line("A", "ಅಯ್ಯೋ. ಮೀಟಿಂಗ್ ಹತ್ತು ನಿಮಿಷದಲ್ಲಿ.", "Ayyo. Meeting hattu nimishadalli.", "Oh no. Meeting in ten minutes.", "अरे। दस मिनट में मीटिंग।"),
      line("B", "ಸರಿ, ಈಗ ಬರ್ತೀನಿ. ಲ್ಯಾಪ್‌ಟಾಪ್ ತಗೊಂಡು ಬರ್ತೀನಿ.", "Sari, eega bartini. Laptop tagondu bartini.", "Okay, coming now. I'll bring my laptop.", "ठीक है, अभी आता हूँ। लैपटॉप लेकर आता हूँ।"),
    ],
    prompts: [
      { afterLine: 0, question: bi("Explain: there was a lot of traffic.", "समझाएँ: बहुत ट्रैफिक था।"), options: [
        { kn: "ತುಂಬಾ ಟ್ರಾಫಿಕ್ ಇತ್ತು.", roman: "Tumba traffic ittu.", en: "There was a lot of traffic.", correct: true },
        { kn: "ತುಂಬಾ ಟ್ರಾಫಿಕ್ ಇರುತ್ತೆ.", roman: "Tumba traffic irutte.", en: "There will be a lot of traffic.", correct: false, feedback: bi("ittu = was (past). irutte = will be.", "ittu = था। irutte = होगा।") },
        { kn: "ಟ್ರಾಫಿಕ್ ಇಲ್ಲ.", roman: "Traffic illa.", en: "No traffic.", correct: false, feedback: bi("Then why were you late? 😄", "तो देर क्यों हुई? 😄") } ] },
    ],
  },
  {
    id: "fb-buy", title: bi("5 · Buy something on the way home", "5 · घर जाते हुए खरीदारी"), setting: bi("Fruit stall near your apartment.", "अपार्टमेंट के पास फल की ठेली।"), speakers: { A: "Seller", B: "You" },
    lines: [
      line("B", "ಅಕ್ಕ, ಬಾಳೆಹಣ್ಣು ಎಷ್ಟು?", "Akka, baalehannu eshtu?", "Sister, how much are bananas?", "दीदी, केले कितने के?"),
      line("A", "ಡಜನ್ ಅರವತ್ತು.", "Dozen aravattu.", "Sixty a dozen.", "साठ रुपये दर्जन।"),
      line("B", "ಐವತ್ತು ಕೊಡಿ, ಒಂದು ಡಜನ್.", "Aivattu kodi, ondu dozen.", "Give for fifty, one dozen.", "पचास में दीजिए, एक दर्जन।"),
      line("A", "ಸರಿ, ತಗೊಳ್ಳಿ.", "Sari, tagolli.", "Okay, take it.", "ठीक है, लीजिए।"),
    ],
    prompts: [
      { afterLine: 1, question: bi("Bargain to 50 for one dozen:", "एक दर्जन 50 में माँगें:"), options: [
        { kn: "ಐವತ್ತು ಕೊಡಿ, ಒಂದು ಡಜನ್.", roman: "Aivattu kodi, ondu dozen.", en: "Give for 50, one dozen.", correct: true },
        { kn: "ಎಪ್ಪತ್ತು ಕೊಡಿ.", roman: "Eppattu kodi.", en: "Give for 70.", correct: false, feedback: bi("Eppattu = 70 — more than she asked!", "Eppattu = 70 — उनसे भी ज़्यादा!") },
        { kn: "ಬೇಡ, ಹೋಗ್ತೀನಿ.", roman: "Beda, hogtini.", en: "No, I'm leaving.", correct: false } ] },
    ],
  },
  {
    id: "fb-home", title: bi("6 · Back home", "6 · वापस घर"), setting: bi("Your flatmate at night.", "रात को फ़्लैटमेट।"), speakers: { A: "Flatmate", B: "You" },
    lines: [
      line("A", "ಬಂದ್ಯಾ? ದಿನ ಹೇಗಿತ್ತು?", "Bandya? Dina hegittu?", "You're back? How was the day?", "आ गए? दिन कैसा था?"),
      line("B", "ಚೆನ್ನಾಗಿತ್ತು! ಇವತ್ತು ಎಲ್ಲಾ ಕಡೆ ಕನ್ನಡ ಮಾತಾಡಿದೆ.", "Chennagittu! Ivattu ella kade Kannada maataadide.", "It was good! I spoke Kannada everywhere today.", "अच्छा था! आज हर जगह कन्नड़ बोली।"),
      line("A", "ಸಖತ್! ಊಟ ಆಯ್ತಾ?", "Sakkath! Oota aaytaa?", "Awesome! Eaten?", "ज़बरदस्त! खाना हुआ?"),
      line("B", "ಇನ್ನೂ ಇಲ್ಲ. ಒಟ್ಟಿಗೆ ಊಟ ಮಾಡೋಣ.", "Innu illa. Ottige oota maadona.", "Not yet. Let's eat together.", "अभी नहीं। साथ में खाना खाते हैं।"),
    ],
    prompts: [
      { afterLine: 0, question: bi("Say the day was good and you spoke Kannada everywhere:", "कहें दिन अच्छा था और हर जगह कन्नड़ बोली:"), options: [
        { kn: "ಚೆನ್ನಾಗಿತ್ತು! ಇವತ್ತು ಎಲ್ಲಾ ಕಡೆ ಕನ್ನಡ ಮಾತಾಡಿದೆ.", roman: "Chennagittu! Ivattu ella kade Kannada maataadide.", en: "Good! I spoke Kannada everywhere today.", correct: true },
        { kn: "ಚೆನ್ನಾಗಿದೆ! ನಾಳೆ ಕನ್ನಡ ಮಾತಾಡ್ತೀನಿ.", roman: "Chennagide! Naale Kannada maataadtini.", en: "Good! I'll speak Kannada tomorrow.", correct: false, feedback: bi("Today already happened — past tense: chennagittu, maataadide.", "आज हो चुका — भूतकाल: chennagittu, maataadide।") },
        { kn: "ಗೊತ್ತಿಲ್ಲ.", roman: "Gottilla.", en: "Don't know.", correct: false } ] },
      { afterLine: 2, question: bi("Not yet — suggest eating together:", "अभी नहीं — साथ खाने का सुझाव:"), options: [
        { kn: "ಇನ್ನೂ ಇಲ್ಲ. ಒಟ್ಟಿಗೆ ಊಟ ಮಾಡೋಣ.", roman: "Innu illa. Ottige oota maadona.", en: "Not yet. Let's eat together.", correct: true },
        { kn: "ಆಯ್ತು, ಮಲಗ್ತೀನಿ.", roman: "Aaytu, malagtini.", en: "Done, I'll sleep.", correct: false },
        { kn: "ಊಟ ಬೇಡ.", roman: "Oota beda.", en: "No food.", correct: false } ] },
    ],
  },
];
