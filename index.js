const express = require('express');
const app = express();
const ejs = require('ejs');
const port = 3000;
var html_to_pdf = require('html-pdf-node');

app.get('/', (req, res) => {
    const data = {
        filename: 'hello'
    }
    ejs.renderFile('./example.ejs', { hello: 'Hello Data' },  {}, function(err, str){
        if (err) {
            console.log(err.message);
            return res.status(500).json({message: 'Something went wrong while templating data'})
        }
        let options = { format: 'A4' };
        let file = { content: str };
        html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
            res.set('Content-disposition', 'attachment; filename=' + data.filename + '.pdf' );
            return res.status(200).send(pdfBuffer);
        });
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});