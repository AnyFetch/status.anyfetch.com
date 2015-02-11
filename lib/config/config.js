module.exports = {
  "env": "production",
  "timeout": 1000,
  "pollingInterval": 2000,
  "port": process.env.PORT || 8080
  "productionUrls": [
    ['gmail' , 'https://gmail.anyfetch.com/'],
    ['office' , 'https://outlook.anyfetch.com/'],
    ['gcontacts', 'https://gcontacts.anyfetch.com'],
    ['evernote', 'https://evernote.anyfetch.com'],
    ['trello', 'https://trello.anyfetch.com'],
    ['dropbox', 'https://dropbox.anyfetch.com'],
    ['gcalendar', 'https://gcalendar.anyfetch.com'],
    ['salesforce', 'https://salesforce.anyfetch.com'],
    ['gdrive', 'https://gdrive.anyfetch.com']
  ],
  "stagingUrls": [
    ['gmail' , 'https://gmail-staging.anyfetch.com/'],
    ['office' , 'https://outlook-staging.anyfetch.com/'],
    ['gcontacts', 'https://gcontacts-staging.anyfetch.com'],
    ['evernote', 'https://evernote-staging.anyfetch.com'],
    ['trello', 'https://trello-staging.anyfetch.com'],
    ['dropbox', 'https://dropbox-staging.anyfetch.com'],
    ['gcalendar', 'https://gcalendar-staging.anyfetch.com'],
    ['salesforce', 'https://salesforce-staging.anyfetch.com'],
    ['gdrive', 'https://gdrive-staging.anyfetch.com']
  ]
};
