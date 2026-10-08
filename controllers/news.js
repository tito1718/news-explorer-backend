const NEWS_API_URL = 'https://newsapi.org/v2/everything';

const getNews = async (req, res, next) => {
  try {
    const {
      q,
      from,
      to,
      pageSize = '100',
    } = req.query;

    const parameters = new URLSearchParams({
      q,
      from,
      to,
      pageSize,
      apiKey: process.env.NEWS_API_KEY,
    });

    const response = await fetch(`${NEWS_API_URL}?${parameters.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'News API request failed');
      error.statusCode = response.status;
      throw error;
    }

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNews,
};
