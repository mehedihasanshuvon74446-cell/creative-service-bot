const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const token = '8734082116:AAF890VWe5XAfJCYtmun8vFiFFdMt8WXmO0'; 
const bot = new TelegramBot(token, {polling: true});

app.get('/', (req, res) => res.send('Creative Service Bot is Live!'));
app.listen(process.env.PORT || 3000);

bot.onText(/\/start/, (msg) => {
    const welcomeMsg = `✨ *আসসালামু আলাইকুম!* ✨\n\n*Creative Service* বটে আপনাকে স্বাগতম। আপনার প্রয়োজনীয় ডিজিটাল সেবাগুলো পেতে নিচের বাটনগুলো ব্যবহার করুন।\n\n━━━━━━━━━━━━━━━━━━━━\n👤 *ইউজার:* ${msg.from.first_name}\n🛡 *স্ট্যাটাস:* অনলাইন`;
    
    bot.sendMessage(msg.chat.id, welcomeMsg, {
        parse_mode: 'Markdown',
        reply_markup: {
            keyboard: [["💎 আমাদের সার্ভিসসমূহ"], ["📱 যোগাযোগ", "💳 পেমেন্ট তথ্য"]],
            resize_keyboard: true
        }
    });
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === "💎 আমাদের সার্ভিসসমূহ") {
        const serviceList = `💎 *আমাদের সকল প্রিমিয়াম সার্ভিসসমূহ:* \n\n` +
            `✅ *এনআইডি:* সার্ভার কপি, স্মার্ট কার্ড PDF, সংশোধন।\n` +
            `✅ *সিম:* বায়োমেট্রিক চেক, কল লিস্ট, SMS লিস্ট।\n` +
            `✅ *মোবাইল ব্যাংকিং:* বিকাশ/নগদ/রকেট পিন ও তথ্য।\n` +
            `✅ *অন্যান্য:* পাসপোর্ট SB কপি, টিন ও সুরক্ষা কার্ড।\n\n` +
            `📝 *অর্ডার করতে:* নিচের বাটন থেকে সরাসরি যোগাযোগ করুন।`;

        bot.sendMessage(chatId, serviceList, {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [{ text: "📩 সরাসরি অর্ডার করুন", url: "https://t.me/smartwaay1" }]
                ]
            }
        });
    }

    if (text === "📱 যোগাযোগ") {
        bot.sendMessage(chatId, `🚀 *আমাদের সাপোর্ট টিম:* \n\n💬 টেলিগ্রাম: @smartwaay1\n📞 হোয়াটসঅ্যাপ: 01608147108\n\nযে কোনো সমস্যায় মেসেজ দিন।`, { parse_mode: 'Markdown' });
    }

    if (text === "💳 পেমেন্ট তথ্য") {
        bot.sendMessage(chatId, `💰 *পেমেন্ট মাধ্যমসমূহ:* \n\n🔸 বিকাশ: 01818374446 (Personal)\n🔸 নগদ: 01818374446 (Personal)\n\n*টাকা পাঠিয়ে লাস্ট ৩ ডিজিট ও স্ক্রিনশট দিন।*`, { parse_mode: 'Markdown' });
    }
});
