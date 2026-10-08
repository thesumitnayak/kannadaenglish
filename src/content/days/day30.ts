import type { DayLesson } from "../types";
import { s, ex, line, bi } from "../helpers";
import { finalBossConversations } from "./scenarioConvos";

export const day30: DayLesson = {
  day: 30, week: 4, type: "final", emoji: "👑", minutes: 30,
  title: bi("FINAL BOSS: A day in Bengaluru", "फ़ाइनल बॉस: बेंगलुरु में एक दिन"),
  subtitle: bi("Wake up, breakfast, auto, office, shopping, home — all in Kannada", "उठना, नाश्ता, ऑटो, ऑफिस, खरीदारी, घर — सब कन्नड़ में"),
  vocab: [],
  sentences: [
    s("d30s1", "ಇವತ್ತು ಎಲ್ಲಾ ಕಡೆ ಕನ್ನಡ ಮಾತಾಡಿದೆ.", "Ivattu ella kade Kannada maataadide.", "Today I spoke Kannada everywhere.", "आज हर जगह कन्नड़ बोली।", { words: ["Ivattu", "ella", "kade", "Kannada", "maataadide"], wordsKn: ["ಇವತ್ತು", "ಎಲ್ಲಾ", "ಕಡೆ", "ಕನ್ನಡ", "ಮಾತಾಡಿದೆ"] }),
  ],
  reviewDays: Array.from({ length: 29 }, (_, i) => i + 1),
  plan: ["warmup", "listen", "conversation", "build", "translate", "speak", "boss", "result"],
  emphasis: { warmup: 2, listen: 2, build: 1.5, translate: 2 },
  concept: {
    title: bi("The final test", "अंतिम परीक्षा"),
    intro: bi("Six conversations, one full day. At the end you get your Kannada Score across speaking, vocabulary, listening, grammar and conversation, and your certificate.", "छह बातचीत, एक पूरा दिन। अंत में आपको बोलने, शब्दावली, सुनने, व्याकरण और बातचीत में Kannada Score और सर्टिफ़िकेट मिलेगा।"),
    sections: [
      { heading: bi("You've got this", "आप कर लेंगे"), body: bi("Everything in today's test was taught in the last 29 days. Breathe, read the question word, match the tense.", "आज की परीक्षा का सब कुछ पिछले 29 दिनों में सिखाया गया। साँस लो, प्रश्न-शब्द पढ़ो, काल मिलाओ।") },
    ],
    tip: bi("Namaskara, future Bengaluru local. 👑", "Namaskara, भविष्य के बेंगलुरु लोकल। 👑"),
  },
  conversation: finalBossConversations[0],
  extraConversations: finalBossConversations.slice(1),
  bossQuestion: { id: "d30boss", type: "typein", skill: "conversation", prompt: bi("Final question. Type (roman): 'I'm learning Kannada. Please speak slowly.'", "अंतिम सवाल। टाइप करें (रोमन): 'मैं कन्नड़ सीख रहा हूँ। धीरे बोलिए।'"), answer: "Naanu Kannada kalithaa iddini. Nidhaanavaagi heli.", acceptable: ["Naanu Kannada kalita iddini. Nidhaanavaagi heli.", "Kannada kalithaa iddini, nidhaanavaagi heli", "Naanu Kannada kalitiddini. Nidhaanavaagi heli.", "Naanu Kannada kalita iddini nidhaanavaagi heli", "Kannada kalita iddini nidhanavagi heli"], explanation: bi("Day 2's phrase + Day 1's rescue sentence. Full circle.", "Day 2 का वाक्य + Day 1 का बचाव वाक्य। पूरा चक्र।") },
  dailyPhrase: { kn: "ನಾನು ಕನ್ನಡ ಮಾತಾಡ್ತೀನಿ", roman: "Naanu Kannada maataadtini", meaning: bi("I speak Kannada.", "मैं कन्नड़ बोलता हूँ।"), example: ex("ಹೌದು, ನಾನು ಕನ್ನಡ ಮಾತಾಡ್ತೀನಿ!", "Houdu, naanu Kannada maataadtini!", "Yes, I speak Kannada!", "हाँ, मैं कन्नड़ बोलता हूँ!"), mini: [ line("A", "ಕನ್ನಡ ಬರುತ್ತಾ?", "Kannada barutta?", "Do you know Kannada?", "कन्नड़ आती है?"), line("B", "ಬರುತ್ತೆ!", "Barutte!", "I do!", "आती है!") ] },
};
