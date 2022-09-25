// Home

exports.homePage = (req, res) => {
  res.render('index', {
    title: 'Injetando conteúdos nas views',
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  });
};

exports.handlePost = (req, res) => {
  console.log(req.body);
  res.send('Nova rota de Post!');
};
