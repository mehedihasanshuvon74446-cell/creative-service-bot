const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Smart Way Bot is running!'));
app.listen(port, () => console.log(`Server running on port ${port}`));

const token = '8734082116:AAF890VWe5XAfJCYtmun8vFiFFdMt8WXmO0'; 
const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/start/, (msg) => {
    const welcomeMsg = `আসসালামু আলাইকুম।\nআপনার সেবার জন্য অপেক্ষায় আছি।\n\nআমাদের সকল সার্ভিস দেখতে নিচের "আমাদের সার্ভিসসমূহ" বাটনে ক্লিক করুন।`;
    
    bot.sendMessage(msg.chat.id, welcomeMsg, {
        reply_markup: {
            keyboard: [["আমাদের সার্ভিসসমূহ"], ["যোগাযোগ"]],
            resize_keyboard: true
        }
    });
});
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === "আমাদের সার্ভিসসমূহ") {
        const serviceList = `আমাদের সার্ভিসসমূহ:

✅ বায়োমেট্রিক (BL, GP, Robi/Airtel, Teletalk)
✅ এনআইডি টু অল নাম্বার ও নাম্বার টু লোকেশন
✅ বিকাশ/নগদ/রকেট (পারসোনাল/এজেন্ট/মার্চেন্ট) ইনফরমেশন
✅ IMEI সংক্রান্ত সকল সার্ভিস
✅ বিকাশ ও নগদ পিন রিসেট
✅ একাউন্ট তৈরী (KYC): বিকাশ, নগদ, রকেট
✅ ভূমি উন্নয়ন কর প্রোফাইল সংশোধন
✅ সার্ভার কপি (অফিসিয়াল ও আন-অফিসিয়াল)
✅ কল লিস্ট (৩ মাস ও ৬ মাস)
✅ নাম ঠিকানা দিয়ে আইডি কার্ড বের করা
✅ এনআইডি সংশোধন আবেদন ফরম
✅ হারানো জন্ম নিবন্ধন উত্তোলন
✅ স্মার্ট এনআইডি কার্ড পিডিএফ (S-NID)
✅ টিন সার্টিফিকেট ও জিরো রিটার্ন অর্ডার
✅ পাসপোর্ট (MRP & E-Passport) এসবি কপি ও কুয়েরি
✅ সকল সিমের SMS/মেসেজ লিস্ট
✅ বিকাশ/নগদ/রকেট স্টেটমেন্ট অর্ডার
✅ সুরক্ষা টিকা/ভ্যাকসিনের ক্লোন সার্টিফিকেট

আপনার কাঙ্ক্ষিত সার্ভিসটির নাম লিখে মেসেজ দিন।`;

        bot.sendMessage(chatId, serviceList);
    }

    if (text === "যোগাযোগ") {
        const contactInfo = `আমাদের সাথে সরাসরি যোগাযোগ করতে নিচের লিংকে ক্লিক করুন:
        
📱 টেলিগ্রাম অ্যাডমিন: https://t.me/smartwaay1
💬 হোয়াটসঅ্যাপ: https://wa.me/8801608147108

আপনার যেকোনো প্রশ্ন বা অর্ডারের জন্য আমাদের মেসেজ দিন।`;

        bot.sendMessage(chatId, contactInfo);
    }
});
