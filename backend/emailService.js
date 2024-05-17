const mailgun = require('mailgun-js');
const DOMAIN = 'sandbox8d6e54ca28384235920ab2ddd276f359.mailgun.org';
const mg = mailgun({ apiKey: '2af23558839b7b2c308a0b47de09e6d9-32a0fef1-eb4ef487', domain: DOMAIN });

const sendEmail = (to, subject, html) => {
  const data = {
    from: 'Excited User <mailgun@your-domain.com>',
    to,
    subject,
    html
  };

  return mg.messages().send(data);
};

module.exports = sendEmail;
