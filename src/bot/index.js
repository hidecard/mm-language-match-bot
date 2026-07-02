const { Telegraf, Markup } = require('telegraf');
const db = require('../db');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const ADMIN_ID = process.env.ADMIN_ID;

bot.start(async (ctx) => {
  const welcomeMsg = `Welcome to MM Language Match Bot! 🗣️\n\nစကားပြောဖော်ရှာဖွေဖို့အတွက် အောက်က Mini App ကို သုံးပေးပါဗျာ။`;
  await ctx.reply(welcomeMsg, Markup.inlineKeyboard([
    [Markup.button.webApp('Open Mini App', process.env.WEBAPP_URL)]
  ]));
});

// Handle Screenshot for Premium Upgrade
bot.on('photo', async (ctx) => {
  const userId = ctx.from.id;
  const username = ctx.from.username || 'Unknown';
  
  await ctx.reply('ကျေးဇူးတင်ပါတယ်ဗျာ။ သင်ပို့လိုက်တဲ့ Screenshot ကို Admin ဆီ ပို့ပေးထားပါတယ်။ ခွင့်ပြုချက်ရတာနဲ့ Premium ဖြစ်သွားပါလိမ့်မယ်။');
  
  // Forward to Admin
  await bot.telegram.sendPhoto(ADMIN_ID, ctx.message.photo[ctx.message.photo.length - 1].file_id, {
    caption: `Premium Upgrade Request from @${username} (${userId})`,
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Approve ✅', callback_data: `approve_${userId}` }, { text: 'Reject ❌', callback_data: `reject_${userId}` }]
      ]
    }
  });
});

// Admin Actions
bot.action(/approve_(\d+)/, async (ctx) => {
  const userId = ctx.match[1];
  try {
    await db.execute({
      sql: 'UPDATE users SET is_premium = TRUE WHERE telegram_id = ?',
      args: [userId]
    });
    await bot.telegram.sendMessage(userId, '🎉 ဂုဏ်ယူပါတယ်! သင့်အကောင့် Premium ဖြစ်သွားပါပြီ။ အကန့်အသတ်မရှိ Match ရှာနိုင်ပါပြီ။');
    await ctx.editMessageCaption(`Approved ✅ for User ${userId}`);
  } catch (err) {
    console.error(err);
  }
});

bot.action(/reject_(\d+)/, async (ctx) => {
  const userId = ctx.match[1];
  await bot.telegram.sendMessage(userId, 'တောင်းပန်ပါတယ်ဗျာ။ သင့်ရဲ့ Premium Request ကို ပယ်ချလိုက်ပါတယ်။ လိုအပ်တာရှိရင် Admin ကို ဆက်သွယ်ပါ။');
  await ctx.editMessageCaption(`Rejected ❌ for User ${userId}`);
});

// Export the bot for webhook
module.exports = bot;

// Run only if executed directly (not required)
if (require.main === module) {
  bot.launch();
  console.log('Bot is running in long-polling mode...');
}
