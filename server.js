


const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

// Настройки
const TOKEN = "7774274139:AAF1BTDW0OExZBgOoFXXxpkfx1XYKIZYqQo"; // Замените на токен вашего бота
const ADMIN_ID = "745312978"; // Замените на ID администратора
const PORT = process.env.PORT || 3000;

// Данные теста 
const questions = [
  {
    aspect: "Здоровье",
    question: "Как вы себя чувствуете?",
    answers: [
      { text: "Хорошо", value: 1 },
      { text: "Плохо", value: 2 },
      { text: "Нормально", value: 3 },
    ],
  },
  {
    aspect: "Работа",
    question: "Как вы себя чувствуете?",
    answers: [
      { text: "Хорошо", value: 1 },
      { text: "Плохо", value: 2 },
      { text: "Нормально", value: 3 },
    ],
  },
  {
    aspect: "Секс",
    question: "Как вы себя чувствуете?",
    answers: [
      { text: "Хорошо", value: 1 },
      { text: "Плохо", value: 2 },
      { text: "Нормально", value: 3 },
    ],
  },
  {
    aspect: "Семья",
    question: "Как вы себя чувствуете?",
    answers: [
      { text: "Хорошо", value: 1 },
      { text: "Плохо", value: 2 },
      { text: "Нормально", value: 3 },
    ],
  },
];

// Хранение результатов
const userResults = {};

// Инициализация бота
const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || msg.from.first_name || "Безымянный пользователь";

  // Инициализация данных пользователя
  userResults[chatId] = {
    username,
    currentQuestion: 0,
    scores: {},
  };

  const options = {
    reply_markup: {
      keyboard: [[{ text: "/start" }]], // Панель с командой /start
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  };

  bot.sendMessage(chatId, `Привет, ${username}! Нажмите /start, чтобы начать тест.`, options);
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
  const options = {
    reply_markup: {
      inline_keyboard: [
        question.answers.map((answer) => ({
          text: answer.text,
          callback_data: JSON.stringify({
            value: answer.value,
            aspect: question.aspect,
          }),
        })),
      ],
    },
  };

  bot.sendMessage(chatId, `${question.aspect}: ${question.question}`, options);
}

// Обработка ответов
bot.on("callback_query", (callbackQuery) => {
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
  let resultMessage = "Ваши результаты по аспектам:\n";

  for (const [aspect, score] of Object.entries(user.scores)) {
    resultMessage += `*${aspect}*: ${score}\n`;
  }

  bot.sendMessage(chatId, "Спасибо за прохождение теста! Ваши ответы отправлены администратору.");
  bot.sendMessage(ADMIN_ID, `Результаты теста пользователя ${user.username}:\n${resultMessage}`, { parse_mode: "Markdown" });
}

// Запуск веб-сервера
app.get("/", (req, res) => {
  res.send("Бот работает!");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
