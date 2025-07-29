const express = require('express');
const bodyParser = require('body-parser');
const {google} = require('googleapis');
const app = express();

app.use(bodyParser.json());

function getCalendarClient() {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/calendar'],
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS
  });
  return google.calendar({version: 'v3', auth});
}

app.post('/api/book', async (req, res) => {
  const {name, ucontact, uemail, date, time, services, message} = req.body;
  try {
    const calendar = getCalendarClient();
    const start = new Date(`${date}T${time}`);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // default 1h
    const event = {
      summary: `Appointment with ${name}`,
      description: `Services: ${services.join(', ')}\nContact: ${ucontact}\nEmail: ${uemail}\n${message || ''}`,
      start: {dateTime: start.toISOString()},
      end: {dateTime: end.toISOString()}
    };
    await calendar.events.insert({
      calendarId: process.env.CALENDAR_ID,
      resource: event
    });
    res.json({status: 'ok'});
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create event');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
