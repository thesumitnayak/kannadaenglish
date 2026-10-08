import type { Achievement } from "./types";
import { bi } from "./helpers";

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-word", emoji: "🌟", title: bi("First Kannada Word", "पहला कन्नड़ शब्द"), description: bi("Learned your very first word.", "आपका पहला शब्द।"), xp: 20 },
  { id: "words-10", emoji: "🔟", title: bi("10 Words Learned", "10 शब्द"), description: bi("Ten words in the bank.", "दस शब्द जमा।"), xp: 30 },
  { id: "words-50", emoji: "📗", title: bi("50 Words", "50 शब्द"), description: bi("Fifty words. You can survive a day.", "पचास शब्द। एक दिन निकाल लोगे।"), xp: 50 },
  { id: "words-100", emoji: "💯", title: bi("100 Words Learned", "100 शब्द"), description: bi("Triple digits!", "तीन अंक!"), xp: 100 },
  { id: "words-250", emoji: "📚", title: bi("250 Words", "250 शब्द"), description: bi("A real vocabulary.", "असली शब्दावली।"), xp: 150 },
  { id: "words-500", emoji: "🏛️", title: bi("500 Words", "500 शब्द"), description: bi("Half a thousand. Wow.", "पाँच सौ। वाह।"), xp: 300 },
  { id: "first-sentence", emoji: "✍️", title: bi("First Sentence", "पहला वाक्य"), description: bi("Built your first Kannada sentence.", "पहला कन्नड़ वाक्य बनाया।"), xp: 30 },
  { id: "first-conversation", emoji: "💬", title: bi("First Conversation", "पहली बातचीत"), description: bi("Finished a full conversation.", "पूरी बातचीत खत्म की।"), xp: 50 },
  { id: "streak-3", emoji: "🔥", title: bi("3-Day Streak", "3 दिन की लय"), description: bi("Three days in a row.", "लगातार तीन दिन।"), xp: 50 },
  { id: "streak-7", emoji: "🔥", title: bi("7-Day Streak", "7 दिन की लय"), description: bi("A full week!", "पूरा हफ़्ता!"), xp: 100 },
  { id: "streak-15", emoji: "🌋", title: bi("15-Day Streak", "15 दिन की लय"), description: bi("Halfway, unbroken.", "आधा रास्ता, बिना रुके।"), xp: 200 },
  { id: "warrior-30", emoji: "⚔️", title: bi("30-Day Warrior", "30 दिन का योद्धा"), description: bi("Completed all 30 days.", "सभी 30 दिन पूरे।"), xp: 500 },
  { id: "foodie", emoji: "🍛", title: bi("Kannada Foodie", "कन्नड़ फ़ूडी"), description: bi("Mastered the food & restaurant lessons.", "खाने और रेस्टोरेंट के पाठ पूरे।"), xp: 75 },
  { id: "auto-survivor", emoji: "🛺", title: bi("Auto Driver Survivor 😂", "ऑटो ड्राइवर सर्वाइवर 😂"), description: bi("Completed the auto lesson and haggled successfully.", "ऑटो पाठ पूरा और मोल-भाव सफल।"), xp: 75 },
  { id: "bengaluru-local", emoji: "😎", title: bi("Bengaluru Local", "बेंगलुरु लोकल"), description: bi("Reached Level 7.", "लेवल 7 पर पहुँचे।"), xp: 300 },
  { id: "perfect-lesson", emoji: "💎", title: bi("Perfect Lesson", "परफ़ेक्ट पाठ"), description: bi("A lesson with zero mistakes.", "बिना गलती का पाठ।"), xp: 100 },
  { id: "no-english", emoji: "🚫", title: bi("No English Challenge", "बिना अंग्रेज़ी"), description: bi("Finished a lesson in Kannada-script mode.", "कन्नड़-लिपि मोड में पाठ पूरा।"), xp: 100 },
  { id: "speaking-champ", emoji: "🎤", title: bi("Speaking Champion", "बोलने का चैंपियन"), description: bi("25 speaking exercises completed.", "25 बोलने के अभ्यास।"), xp: 150 },
  { id: "week-1", emoji: "🎉", title: bi("Week 1 Complete", "हफ्ता 1 पूरा"), description: bi("Survival Kannada unlocked.", "बचाव कन्नड़ अनलॉक।"), xp: 100 },
  { id: "boss-slayer", emoji: "🐉", title: bi("Boss Slayer", "बॉस विजेता"), description: bi("Beat the Week 2 boss battle.", "हफ्ता 2 का बॉस हराया।"), xp: 150 },
  { id: "reviewer", emoji: "🧠", title: bi("Smart Reviewer", "स्मार्ट रिव्यूअर"), description: bi("Completed 5 revision sessions.", "5 दोहराई सत्र पूरे।"), xp: 75 },
  { id: "script-starter", emoji: "ಅ", title: bi("Script Starter", "लिपि शुरुआत"), description: bi("Recognised 10 Kannada letters.", "10 कन्नड़ अक्षर पहचाने।"), xp: 50 },
  { id: "guru-chat", emoji: "🤖", title: bi("Asked the Guru", "गुरु से पूछा"), description: bi("Asked Kannada Guru a question.", "Kannada Guru से सवाल पूछा।"), xp: 20 },
];
