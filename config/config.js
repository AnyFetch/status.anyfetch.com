module.exports = {
  env: process.env.NODE_ENV || "staging",
  timeout: process.env.TIMEOUT || 1000,
  pollingInterval: process.env.POLLING_INTERVAL || 2000,
  port: process.env.PORT || 8080,
  staging: {
    providers: {
      'gmail': 'https://gmail-staging.anyfetch.com/',
      'office': 'https://outlook-staging.anyfetch.com/',
      'gcontacts': 'https://gcontacts-staging.anyfetch.com',
      'evernote': 'https://evernote-staging.anyfetch.com',
      'trello': 'https://trello-staging.anyfetch.com',
      'dropbox': 'https://dropbox-staging.anyfetch.com',
      'gcalendar': 'https://gcalendar-staging.anyfetch.com',
      'salesforce': 'https://salesforce-staging.anyfetch.com',
      'gdrive': 'https://gdrive-staging.anyfetch.com'
    },
    hydraters: {
      "plaintext": "https://plaintext-staging.anyfetch.com",
      "image": "https://image-staging.anyfetch.com",
      "office": "https://office-staging.anyfetch.com",
      "pdf": "https://pdf-staging.anyfetch.com",
      "pdfocr": "https://pdfocr-staging.anyfetch.com",
      "ocr": "https://ocr-staging.anyfetch.com",
      "iptc": "https://iptc-staging.anyfetch.com",
      "markdown": "https://markdown-staging.anyfetch.com",
      "filecleaner": "https://filecleaner-staging.anyfetch.com",
      "eml": "https://eml-staging.anyfetch.com",
      "embedmail": "https://embedmail-staging.anyfetch.com",
      "ics": "https://ics-staging.anyfetch.com",
      "deduplicator": "https://deduplicator-staging.anyfetch.com",
      "event": "https://event-staging.anyfetch.com"
    }
  },
  production: {
    providers: {
      'gmail': 'https://gmail.anyfetch.com/',
      'office': 'https://outlook.anyfetch.com/',
      'gcontacts': 'https://gcontacts.anyfetch.com',
      'evernote': 'https://evernote.anyfetch.com',
      'trello': 'https://trello.anyfetch.com',
      'dropbox': 'https://dropbox.anyfetch.com',
      'gcalendar': 'https://gcalendar.anyfetch.com',
      'salesforce': 'https://salesforce.anyfetch.com',
      'gdrive': 'https://gdrive.anyfetch.com'
    },
    hydraters: {
      "plaintext": "https://plaintext.anyfetch.com",
      "image": "https://image.anyfetch.com",
      "office": "https://office.anyfetch.com",
      "pdf": "https://pdf.anyfetch.com",
      "pdfocr": "https://pdfocr.anyfetch.com",
      "ocr": "https://ocr.anyfetch.com",
      "iptc": "https://iptc.anyfetch.com",
      "markdown": "https://markdown.anyfetch.com",
      "filecleaner": "https://filecleaner.anyfetch.com",
      "eml": "https://eml.anyfetch.com",
      "embedmail": "https://embedmail.anyfetch.com",
      "ics": "https://ics.anyfetch.com",
      "deduplicator": "https://deduplicator.anyfetch.com",
      "event": "https://event.anyfetch.com"
    }
  }
};
