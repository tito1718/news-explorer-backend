const router = require('express').Router();
const articleRouter = require('./articles');
const auth = require('../middlewares/auth');
const {
  validateSignup,
  validateSignin,
  validateNewsSearch,
} = require('../middlewares/validation');
const { createUser, login, getCurrentUser } = require('../controllers/users');
const { getNews } = require('../controllers/news');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);
router.get('/news', validateNewsSearch, getNews);

router.use(auth);
router.use('/articles', articleRouter);

router.get('/users/me', getCurrentUser);
router.get('/', (req, res) => {
  res.send('NewsExplorer API is connected to MongoDB');
});
router.get('/health', (req, res) => {
  res.send({ status: 'ok' });
});

module.exports = router;
