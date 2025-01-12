


const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

// Настройки
const TOKEN = '7774274139:AAF1BTDW0OExZBgOoFXXxpkfx1XYKIZYqQo'; // Замените на токен вашего бота
const ADMIN_ID = '439027763'; // Замените на ID администратора 439027763
const PORT = process.env.PORT || 3000;

// Данные теста 
const questions = [

{
  aspect: 'Понимание',
  question: '1. Для меня как отрицательные, так и положительные эмоции служат источником знания о том, как поступать в жизни.',
  answers: [
      {
          text: 'Полностью нет согласия',
          value: 1
      },
      {
          text: 'В основном нет согласия',
          value: 2
      },
      {
          text: 'Отчасти нет согласия',
          value: 3
      },
      {
          text: 'Отчасти есть согласие',
          value: 4
      },
      {
          text: 'В основном есть согласие',
          value: 5
      },
      {
          text: 'Имею полное согласие',
          value: 6
      }
  ],
},
{
  aspect: 'Понимание',
  question: ' 2. Отрицательные эмоции помогают мне понять, что я должна изменить в своей жизни. ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Управление',
  question: ' 3. Я спокоен/спокойна, когда испытываю давление со стороны ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Понимание',
  question: ' 4. Я способен/способна наблюдать изменение своих чувств ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Мотивация',
  question: ' 5. Когда необходимо, я могу быть спокойной(-ым) и сосредоточенной(-ым), чтобы действовать в соответствии с целями по жизни ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Мотивация',
  question: ' 6. Когда необходимо, я могу вызвать у себя широкий спектр положительных эмоций, таких как: веселье, радость, внутренний подъём и юмор ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Управление',
  question: ' 7. Я слежу за тем, как я себя чувствую ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Управление',
  question: ' 8. После того как что-то расстроило меня, я могу легко совладать со своими чувствами ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Эмпатия',
  question: ' 9. Я способна/способен выслушивать проблемы других людей ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Управление',
  question: ' 10. Я не зацикливаюсь на отрицательных эмоциях ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Эмпатия',
  question: ' 11. Я чувствительна к эмоциональным потребностям других ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Регуляция',
  question: ' 12. Я могу действовать на других людей успокаивающе ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Мотивация',
  question: ' 13. Я могу заставить себя снова и снова встать перед лицом препятствия ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Мотивация',
  question: ' 14. Я стараюсь подходить к жизненным проблемам творчески ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Регуляция',
  question: ' 15. Я адекватно реагирую на настроения, побуждения и желания других людей ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Мотивация',
  question: ' 16. Я могу легко входить в состояние спокойствия, готовности и сосредоточенности ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Понимание',
  question: ' 17. Когда позволяет время, я обращаюсь к своим негативным чувствам и разбираюсь, в чем проблема ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Управление',
  question: ' 18. Я способна/способен быстро успокоиться после неожиданного огорчения ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Понимание',
  question: ' 19. Знание моих истинных чувств важно для поддержания «хорошей формы». ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Эмпатия',
  question: ' 20. Я хорошо понимаю эмоции других людей, даже если они не выражены открыто. ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Эмпатия',
  question: ' 21. Я могу хорошо распознавать эмоции по выражению лица. ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Мотивация',
  question: ' 22. Я могу легко отбросить негативные чувства, когда необходимо действовать. ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Эмпатия',
  question: ' 23. Я хорошо улавливаю знаки в общении, которые указывают на то, в чем другие нуждаются. ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Регуляция',
  question: '  24. Люди считают меня хорошим знатоком переживаний других людей. ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Понимание',
  question: ' 25. Люди, осознающие свои истинные чувства, лучше управляют своей жизнью. ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Регуляция',
  question: ' 26. Я способна/способен улучшить настроение других людей ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Регуляция',
  question: ' 27. Со мной можно посоветоваться по вопросам отношений между людьми ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Эмпатия',
  question: ' 28. Я хорошо настраиваюсь на эмоции других людей ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Регуляция',
  question: ' 29. Я помогаю другим использовать их побуждения для достижения личных целей ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},
{
  aspect: 'Управление',
  question: ' 30. Я могу легко отключиться от переживания неприятностей ',
  answers: [{
          text: ' Полностью нет согласия ',
          value: 1
      },
      {
          text: ' В основном нет согласия ',
          value: 2
      },
      {
          text: ' Отчасти нет согласия ',
          value: 3
      },
      {
          text: ' Отчасти есть согласие ',
          value: 4
      },
      {
          text: ' В основном есть согласие ',
          value: 5
      },
      {
          text: ' Имею полное согласие ',
          value: 6
      },
  ],
},

];



// Хранение результатов
const userResults = {};

// Инициализация бота
const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();

// Установка команд для панели
bot.setMyCommands([
  { command: "/start", description: "Начать тест" },
]);

// Обработка команд /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.chat.username

  userResults[chatId] = { currentQuestion: 0, scores: {}, name};
  bot.sendMessage(chatId, 'Привет! Давайте начнём тест. Ответьте на вопросы.');
  askNextQuestion(chatId);
});

// Функция для отправки следующего вопроса
function askNextQuestion(chatId) {
  const user = userResults[chatId];
  if (user.currentQuestion >= questions.length) {
    sendResults(chatId);
    return;
  }

  const question = questions[user.currentQuestion];
  const answers = question.answers.map((answer) => ({
    text: answer.text,
    callback_data: JSON.stringify({
      value: answer.value,
      aspect: question.aspect,
    }),
  }));

  // Разбиваем кнопки на три строки
  const chunkedAnswers = chunkArray(answers, 1); // По одной кнопке на строку

  const options = {
    reply_markup: {
      inline_keyboard: chunkedAnswers,
    },
  };

  bot.sendMessage(chatId, `${question.question}`, options);
}

// Вспомогательная функция для разбиения массива на части
function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

// Обработка ответов
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = JSON.parse(callbackQuery.data);

  // Сохранение результата
  const user = userResults[chatId];
  if (!user.scores[data.aspect]) {
    user.scores[data.aspect] = 0;
  }
  user.scores[data.aspect] += data.value;

  // Следующий вопрос
  user.currentQuestion += 1;
  askNextQuestion(chatId);
});

// Отправка результатов
function sendResults(chatId) {
  const user = userResults[chatId];
  let resultMessage = `Результаты по аспектам ${chatId} :\n`;

  for (const [aspect, score] of Object.entries(user.scores)) {
    resultMessage += `*${aspect}*: ${score}\n`;
  }


  bot.sendMessage(chatId, 'Спасибо за прохождение теста! Ваши ответы отправлены администратору.');
  bot.sendMessage(ADMIN_ID, resultMessage, { parse_mode: 'Markdown' });
}

// Запуск веб-сервера
app.get('/', (req, res) => {
  res.send('Бот работает!');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});


// const express = require('express');
// const TelegramBot = require('node-telegram-bot-api');

// // Настройки
// const TOKEN = '7774274139:AAF1BTDW0OExZBgOoFXXxpkfx1XYKIZYqQo'; // Замените на токен вашего бота
// const ADMIN_ID = '745312978'; // Замените на ID администратора 439027763
// const PORT = process.env.PORT || 3000;

// // Данные теста
// const questions = [
//   {
//     aspect: 'Здоровье',
//     question: 'Как вы себя чувствуете?',
//     answers: [
//       { text: 'Хорошо', value: 1 },
//       { text: 'Плохо', value: 2 },
//       { text: 'Нормально', value: 3 },
//     ],
//   },
//   {
//     aspect: 'Работа',
//     question: 'Как вы себя чувствуете?',
//     answers: [
//       { text: 'Хорошо', value: 1 },
//       { text: 'Плохо', value: 2 },
//       { text: 'Нормально', value: 3 },
//     ],
//   },
//   {
//     aspect: 'Секс',
//     question: 'Как вы себя чувствуете?',
//     answers: [
//       { text: 'Хорошо', value: 1 },
//       { text: 'Плохо', value: 2 },
//       { text: 'Нормально', value: 3 },
//     ],
//   },
//   {
//     aspect: 'Семья',
//     question: 'Как вы себя чувствуете?',
//     answers: [
//       { text: 'Хорошо', value: 1 },
//       { text: 'Плохо', value: 2 },
//       { text: 'Нормально', value: 3 },
//     ],
//   },
// ];

// // Хранение результатов
// const userResults = {};

// // Инициализация бота
// const bot = new TelegramBot(TOKEN, { polling: true });
// const app = express();

// // Обработка команд /start
// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;
//   const username = msg.from.username || msg.from.first_name || 'Безымянный пользователь';

//   // Инициализация данных пользователя
//   userResults[chatId] = {
//     username,
//     currentQuestion: 0,
//     scores: {},
//   };

//   bot.sendMessage(chatId, `Привет, ${username}! Давайте начнём тест. Ответьте на вопросы.`);
//   askNextQuestion(chatId);
// });

// // Функция для отправки следующего вопроса
// function askNextQuestion(chatId) {
//   const user = userResults[chatId];
//   if (user.currentQuestion >= questions.length) {
//     sendResults(chatId);
//     return;
//   }

//   const question = questions[user.currentQuestion];
//   const options = {
//     reply_markup: {
//       inline_keyboard: [
//         question.answers.map((answer) => ({
//           text: answer.text,
//           callback_data: JSON.stringify({
//             value: answer.value,
//             aspect: question.aspect,
//           }),
//         })),
//       ],
//     },
//   };

//   bot.sendMessage(chatId, `${question.aspect}: ${question.question}`, options);
// }

// // Обработка ответов
// bot.on('callback_query', (callbackQuery) => {
//   const chatId = callbackQuery.message.chat.id;
//   const data = JSON.parse(callbackQuery.data);

//   // Сохранение результата
//   const user = userResults[chatId];
//   if (!user.scores[data.aspect]) {
//     user.scores[data.aspect] = 0;
//   }
//   user.scores[data.aspect] += data.value;

//   // Следующий вопрос
//   user.currentQuestion += 1;
//   askNextQuestion(chatId);
// });

// // Отправка результатов
// function sendResults(chatId) {
//   const user = userResults[chatId];
//   let resultMessage = 'Ваши результаты по аспектам:\n';

//   for (const [aspect, score] of Object.entries(user.scores)) {
//     resultMessage += `*${aspect}*: ${score}\n`;
//   }

//   bot.sendMessage(chatId, 'Спасибо за прохождение теста! Ваши ответы отправлены администратору.');
//   bot.sendMessage(ADMIN_ID, `Результаты теста пользователя ${chatId}:\n${resultMessage}`, { parse_mode: 'Markdown' });
// }

// // Запуск веб-сервера
// app.get('/', (req, res) => {
//   res.send('Бот работает!');
// });

// app.listen(PORT, () => {
//   console.log(`Сервер запущен на порту ${PORT}`);
// });
