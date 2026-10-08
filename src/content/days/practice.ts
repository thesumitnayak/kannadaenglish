import type { Conversation, DayLesson } from "../types";
import { v, s, ex, line, bi } from "../helpers";
import { day15 } from "./day15";
import { day16 } from "./day16";
import { day17 } from "./day17";
import { week3Conversations } from "./scenarioConvos";

/* ---------- Day 21: real-life challenge ---------- */
export const day21: DayLesson = {
  day: 21, week: 3, type: "boss", emoji: "🏙️", minutes: 25,
  title: bi("Real-life conversation challenge", "असली ज़िंदगी की बातचीत चुनौती"),
  subtitle: bi("Shopkeeper, auto driver, colleague, waiter — back to back", "दुकानदार, ऑटो वाला, सहकर्मी, वेटर — एक के बाद एक"),
  vocab: [
    v("swalpa-help", "ಸ್ವಲ್ಪ ಹೆಲ್ಪ್ ಮಾಡಿ", "Swalpa help maadi", "Please help a bit", "थोड़ी मदद कीजिए", { pos: "phrase", formality: "polite", tags: ["expression"] }),
    v("gottaaglilla", "ಗೊತ್ತಾಗ್ಲಿಲ್ಲ", "Gottaaglilla", "I didn't get it", "समझ नहीं आया", { pos: "phrase", tags: ["basic"] }),
    v("innomme", "ಇನ್ನೊಮ್ಮೆ", "Innomme", "Once more", "एक बार और", { pos: "adverb", tags: ["basic"] }),
  ],
  sentences: [
    ...day15.sentences.slice(0, 3), ...day16.sentences.slice(0, 3), ...day17.sentences.slice(0, 3),
    s("d21s1", "ಕ್ಷಮಿಸಿ, ಗೊತ್ತಾಗ್ಲಿಲ್ಲ. ಇನ್ನೊಮ್ಮೆ ಹೇಳಿ.", "Kshamisi, gottaaglilla. Innomme heli.", "Sorry, I didn't get it. Say it once more.", "माफ़ कीजिए, समझ नहीं आया। एक बार और कहिए।", { formality: "polite", words: ["Kshamisi,", "gottaaglilla.", "Innomme", "heli"], wordsKn: ["ಕ್ಷಮಿಸಿ,", "ಗೊತ್ತಾಗ್ಲಿಲ್ಲ.", "ಇನ್ನೊಮ್ಮೆ", "ಹೇಳಿ"] }),
  ],
  reviewDays: [15, 16, 17, 18, 19, 20],
  plan: ["warmup", "learn", "listen", "conversation", "translate", "speak", "boss", "result"],
  emphasis: { warmup: 2, listen: 1.5 },
  concept: {
    title: bi("Challenge rules", "चुनौती के नियम"),
    intro: bi("Four mini-conversations from Week 3. No new words. Use what you know, and when stuck, use a rescue sentence.", "हफ्ता 3 की चार छोटी बातचीत। कोई नया शब्द नहीं। जो जानते हो उसका इस्तेमाल करो, अटको तो बचाव वाक्य।"),
    sections: [
      { heading: bi("Rescue sentences", "बचाव वाक्य"), body: bi("Gottaaglilla (didn't get it) · Innomme heli (say again) · Nidhaanavaagi heli (slowly) · Kannadadalli idakke enu heltaare? (what's this called in Kannada?)", "Gottaaglilla (समझ नहीं आया) · Innomme heli (फिर कहिए) · Nidhaanavaagi heli (धीरे) · Kannadadalli idakke enu heltaare? (कन्नड़ में इसे क्या कहते हैं?)") },
    ],
    tip: bi("Real conversations are messy. Getting the meaning across is a win.", "असली बातचीत अव्यवस्थित होती है। मतलब पहुँच गया तो जीत।"),
  },
  conversation: week3Conversations[0],
  extraConversations: week3Conversations.slice(1),
  bossQuestion: { id: "d21boss", type: "typein", skill: "conversation", prompt: bi("You didn't understand the shopkeeper. Type (roman): 'Sorry, I didn't get it. Say it slowly.'", "दुकानदार की बात समझ नहीं आई। टाइप करें (रोमन): 'माफ़ कीजिए, समझ नहीं आया। धीरे बोलिए।'"), answer: "Kshamisi, gottaaglilla. Nidhaanavaagi heli.", acceptable: ["Kshamisi gottaaglilla nidhaanavaagi heli", "Kshamisi, artha aagalilla. Nidhaanavaagi heli.", "Kshamisi, gottaglilla, nidhanavagi heli", "Kshamisi, artha aaglilla. Nidhaanavaagi heli"], explanation: bi("Apologise (kshamisi), say you didn't get it (gottaaglilla / artha aagalilla), ask for slow (nidhaanavaagi heli).", "माफ़ी (kshamisi), समझ नहीं आया (gottaaglilla), धीरे (nidhaanavaagi heli)।") },
  dailyPhrase: { kn: "ಇನ್ನೊಮ್ಮೆ ಹೇಳಿ", roman: "Innomme heli", meaning: bi("Please say it once more", "एक बार और कहिए"), example: ex("ಕ್ಷಮಿಸಿ, ಇನ್ನೊಮ್ಮೆ ಹೇಳಿ.", "Kshamisi, innomme heli.", "Sorry, say it once more.", "माफ़ कीजिए, फिर से कहिए।"), mini: [ line("A", "ಎಂಟು ನೂರ ಐವತ್ತು.", "Entu noora aivattu.", "Eight hundred fifty.", "आठ सौ पचास।"), line("B", "ಇನ್ನೊಮ್ಮೆ ಹೇಳಿ?", "Innomme heli?", "Say again?", "फिर से?") ] },
};

/* ---------- Practice-day factory for Days 24–29 ---------- */
function practiceDay(day: number, emoji: string, title: [string, string], subtitle: [string, string], plan: DayLesson["plan"], emphasis: DayLesson["emphasis"], reviewDays: number[], conv: Conversation, extra: Partial<DayLesson> = {}): DayLesson {
  return {
    day, week: 4, type: "lesson", emoji, minutes: 20,
    title: bi(...title), subtitle: bi(...subtitle),
    vocab: [], sentences: [], reviewDays, plan, emphasis,
    concept: {
      title: bi(...title),
      intro: bi(...subtitle),
      sections: [
        { heading: bi("How today works", "आज कैसे चलेगा"), body: bi("Today pulls words and sentences from earlier days, weighted toward the ones you've found hardest. Your weak words show up more.", "आज पिछले दिनों के शब्द और वाक्य आएँगे, कठिन वालों पर ज़्यादा ज़ोर। आपके कमज़ोर शब्द ज़्यादा दिखेंगे।") },
      ],
      tip: bi("Speed matters less than accuracy. Take your time.", "रफ़्तार से ज़्यादा सटीकता मायने रखती है। आराम से करो।"),
    },
    conversation: conv,
    bossQuestion: { id: `d${day}boss`, type: "mcq", skill: "listening", prompt: bi("What does 'Eshtu hottu aagutte?' mean?", "'Eshtu hottu aagutte?' का मतलब?"), options: ["How long will it take?", "How much will it cost?", "How many people?", "Where is it?"], answer: "How long will it take?", explanation: bi("hottu = time/duration. Eshtu aagutte alone = how much will it cost.", "hottu = समय। अकेला eshtu aagutte = कितना होगा (पैसे)।") },
    dailyPhrase: { kn: "ಗೊತ್ತಾಯ್ತು", roman: "Gottaaytu", meaning: bi("Got it!", "समझ गया!"), example: ex("ಓಹ್, ಈಗ ಗೊತ್ತಾಯ್ತು.", "Oh, eega gottaaytu.", "Oh, now I get it.", "ओह, अब समझ गया।"), mini: [ line("A", "ಅರ್ಥ ಆಯ್ತಾ?", "Artha aaytaa?", "Understood?", "समझ आया?"), line("B", "ಗೊತ್ತಾಯ್ತು!", "Gottaaytu!", "Got it!", "समझ गया!") ] },
    ...extra,
  };
}

const ALL_PRIOR = Array.from({ length: 23 }, (_, i) => i + 1);

export const day24 = practiceDay(24, "🎧", ["Listening challenge", "सुनने की चुनौती"], ["Hear short Kannada sentences and choose the meaning.", "छोटे कन्नड़ वाक्य सुनकर मतलब चुनें।"],
  ["warmup", "listen", "conversation", "boss", "result"], { warmup: 1, listen: 4 }, ALL_PRIOR, week3Conversations[1]);
export const day25 = practiceDay(25, "🔁", ["Kannada → English / Hindi", "कन्नड़ → अंग्रेज़ी / हिंदी"], ["Read Kannada, pick the right meaning.", "कन्नड़ पढ़ें, सही मतलब चुनें।"],
  ["warmup", "listen", "translate", "boss", "result"], { warmup: 3, listen: 2, translate: 3 }, ALL_PRIOR, week3Conversations[2], { translateMode: "from-kn" });
export const day26 = practiceDay(26, "✍️", ["English / Hindi → Kannada", "अंग्रेज़ी / हिंदी → कन्नड़"], ["Produce Kannada from English or Hindi prompts.", "अंग्रेज़ी या हिंदी से कन्नड़ बनाएँ।"],
  ["warmup", "translate", "speak", "boss", "result"], { translate: 4 }, ALL_PRIOR, week3Conversations[3]);
export const day27 = practiceDay(27, "🧩", ["Sentence building", "वाक्य बनाना"], ["Arrange scrambled words into natural Kannada.", "उलझे शब्दों को स्वाभाविक कन्नड़ में जमाएँ।"],
  ["warmup", "build", "speak", "boss", "result"], { build: 4 }, ALL_PRIOR, week3Conversations[0]);
export const day28 = practiceDay(28, "🎭", ["Conversation simulation", "बातचीत सिमुलेशन"], ["Several scenarios back to back. You lead.", "कई परिस्थितियाँ लगातार। आप नेतृत्व करें।"],
  ["warmup", "conversation", "speak", "boss", "result"], { warmup: 1 }, ALL_PRIOR, week3Conversations[1], { extraConversations: week3Conversations.slice(2) });
export const day29 = practiceDay(29, "🌊", ["Full Kannada immersion", "पूरी कन्नड़ डुबकी"], ["Exercises lean on Kannada script; hints hidden.", "अभ्यास कन्नड़ लिपि में; संकेत छिपे।"],
  ["warmup", "listen", "build", "translate", "conversation", "boss", "result"], { warmup: 2, listen: 2, build: 1.5, translate: 2 }, ALL_PRIOR, week3Conversations[3], { immersion: true });
