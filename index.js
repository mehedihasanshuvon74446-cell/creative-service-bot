const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Creative Service Bot is Live!'));
app.listen(port, () => console.log(`Server running on port ${port}`));

const token = '8734082116:AAF890VWe5XAfJCYtmun8vFiFFdMt8WXmO0'; 
const bot = new TelegramBot(token, {polling: true});

const ADMIN_ID = 1459637770; 

let users = new Set(); 
let reviews = []; 

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    users.add(chatId);

    const welcomeMsg = `✨ *আসসালামু আলাইকুম!* ✨\n\n*Creative Service* বটে আপনাকে স্বাগতম। আপনার প্রয়োজনীয় ডিজিটাল সেবাগুলো পেতে নিচের বাটনগুলো ব্যবহার করুন।\n\n━━━━━━━━━━━━━━━━━━━━\n👤 *ইউজার:* ${msg.from.first_name}\n🛡 *স্ট্যাটাস:* অনলাইন`;
    
    const keyboard = [
        ["💎 আমাদের সার্ভিসসমূহ"], 
        ["💳 পেমেন্ট মাধ্যম", "📱 যোগাযোগ"],
        ["⭐️ রিভিউ দিন", "💬 কাস্টমার রিভিউ"]
    ];

    if (chatId === ADMIN_ID) {
        keyboard.push(["⚙️ অ্যাডমিন প্যানেল"]);
    }

    bot.sendMessage(chatId, welcomeMsg, {
        parse_mode: 'Markdown',
        reply_markup: {
            keyboard: keyboard,
            resize_keyboard: true
        }
    });
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (!text) return;

    if (text === "💎 আমাদের সার্ভিসসমূহ") {
        const serviceList = `💎 *আমাদের সকল প্রিমিয়াম সার্ভিস:* \n\n` +
            `✅ বায়োমেট্রিক (BL, GP, Robi, Teletalk)\n` +
            `✅ এনআইডি টু অল নাম্বার ও লোকেশন\n` +
            `✅ বিকাশ/নগদ/রকেট একাউন্ট ইনফো\n` +
            `✅ IMEI সংক্রান্ত সকল সার্ভিস\n` +
            `✅ বিকাশ ও নগদ পিন রিসেট\n` +
            `✅ একাউন্ট তৈরী (KYC): বিকাশ, নগদ, রকেট\n` +
            `✅ ভূমি উন্নয়ন কর প্রোফাইল সংশোধন\n` +
            `✅ সার্ভার কপি (অফিসিয়াল ও আন-অফিসিয়াল)\n` +
            `✅ কল লিস্ট (৩ মাস ও ৬ মাস)\n` +
            `✅ নাম ঠিকানা দিয়ে আইডি কার্ড বের করা\n` +
            `✅ এনআইডি সংশোধন আবেদন ফরম\n` +
            `✅ হারানো জন্ম নিবন্ধন উত্তোলন\n` +
            `✅ স্মার্ট এনআইডি কার্ড পিডিএফ (S-NID)\n` +
            `✅ টিন সার্টিফিকেট ও জিরো রিটার্ন\n` +
            `✅ পাসপোর্ট (MRP/E-Pass) এসবি কপি ও কুয়েরি\n` +
            `✅ সকল সিমের SMS/মেসেজ লিস্ট\n` +
            `✅ বিকাশ/নগদ/রকেট স্টেটমেন্ট\n` +
            `✅ সুরক্ষা টিকা/ভ্যাকসিনের ক্লোন সার্টিফিকেট\n\n` +
            `📝 *অর্ডার করতে:* নিচের "যোগাযোগ" বাটনে ক্লিক করুন।`;

        bot.sendMessage(chatId, serviceList, { parse_mode: 'Markdown' });
    }

    if (text === "⚙️ অ্যাডমিন প্যানেল" && chatId === ADMIN_ID) {
        bot.sendMessage(chatId, `📊 *অ্যাডমিন ড্যাশবোর্ড*\n\n👥 মোট ইউজার: ${users.size}\n📝 মোট রিভিউ: ${reviews.length}\n\n📢 সবাইকে মেসেজ দিতে লিখুন: /send আপনার মেসেজ`, { parse_mode: 'Markdown' });
    }

    if (text.startsWith('/send') && chatId === ADMIN_ID) {
        const broadcastMsg = text.replace('/send', '').trim();
        if (!broadcastMsg) return bot.sendMessage(chatId, "মেসেজটি লিখুন।");

        let count = 0;
        users.forEach((user) => {
            bot.sendMessage(user, `📢 *নতুন আপডেট:*\n\n${broadcastMsg}`, { parse_mode: 'Markdown' });
            count++;
        });
        bot.sendMessage(chatId, `✅ সফলভাবে ${count} জন ইউজারের কাছে পাঠানো হয়েছে।`);
    }

    if (text === "💳 পেমেন্ট মাধ্যম") {
        bot.sendMessage(chatId, `💰 *পেমেন্ট ডিটেইলস:*\n\n🔸 বিকাশ: 01608147108 (Personal)\n🔸 নগদ: 01608147108 (Personal)\n🔸 রকেট: 01608147108 (Personal)\n\n*টাকা পাঠিয়ে ট্রানজেকশন আইডি বা স্ক্রিনশট দিন।*`, { parse_mode: 'Markdown' });
    }

    if (text === "📱 যোগাযোগ") {
        bot.sendMessage(chatId, `🚀 *যোগাযোগ করুন:* \n\n💬 টেলিগ্রাম: @smartwaay1\n📞 হোয়াটসঅ্যাপ: 01608147108`, { parse_mode: 'Markdown' });
    }

    if (text === "⭐️ রিভিউ দিন") {
        bot.sendMessage(chatId, `আমাদের সার্ভিস সম্পর্কে আপনার মতামত জানাতে লিখুন:\n\n/review আপনার মন্তব্য`);
    }

    if (text.startsWith('/review')) {
        const userReview = text.replace('/review', '').trim();
        if (userReview) {
            reviews.push({ name: msg.from.first_name, text: userReview });
            bot.sendMessage(chatId, `✅ আপনার মূল্যবান রিভিউর জন্য ধন্যবাদ!`);
        }
    }

    if (text === "💬 কাস্টমার রিভিউ") {
        if (reviews.length === 0) return bot.sendMessage(chatId, "এখনো কোনো রিভিউ নেই।");
        let list = `💬 *কাস্টমারদের কিছু মতামত:*\n━━━━━━━━━━━━━━━━\n`;
        reviews.slice(-5).forEach(r => { list += `👤 *${r.name}:* ${r.text}\n\n`; });
        bot.sendMessage(chatId, list, { parse_mode: 'Markdown' });
    }
});
