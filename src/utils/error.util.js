module.exports = {
    handleError: (res, error) => {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    },
  };
  