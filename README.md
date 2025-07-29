# ttGreatNailsWebsite

This repo now includes a small Node.js backend for handling appointment bookings from `bookAppt.html`.

## Running the server

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the following environment variables:
   - `GOOGLE_APPLICATION_CREDENTIALS` – path to a Google service account JSON key with Calendar permissions.
   - `CALENDAR_ID` – ID of the Google Calendar to insert events into.
   - `PORT` (optional) – port for the server (default `3000`).
3. Start the server:
   ```bash
   npm start
   ```

The booking form will POST to `/api/book`, and successful submissions will create events in your Google Calendar.
