const natural = require('natural');
const classifier = new natural.BayesClassifier();

// Add training data
classifier.addDocument('MDA ePermit system', 'Raodzah');

classifier.addDocument('ASW not in sequence.', 'Amirah');

classifier.addDocument('manifest report for subject BL as it was not found in Dagangnet.', 'Liyana');
classifier.addDocument('SCN.', 'Liyana');

classifier.addDocument('JK69.', 'Razi');
classifier.addDocument('Topup payment prepaid.', 'Razi');






// Train
classifier.train();


classifier.save('classifier.json', function(err, savedClassifier) {
  console.log('Classifier saved!');
});
