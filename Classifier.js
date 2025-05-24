const natural = require('natural');
const classifier = new natural.BayesClassifier();

// Add training data
classifier.addDocument('MDA ePermit', 'Raodzah Hamidon');
classifier.addDocument('INQUIRY FOR EPCO - FORM E // REFERENCE: KL-2024-E-13-35078', 'Raodzah Hamidon');


classifier.addDocument('ASW not in sequence.', 'Amirah Ibrahim');

classifier.addDocument('migrate user id(admin/user) from UP into Old permit:', 'Muhammad Saufi Maarof');


classifier.addDocument('DOUBLE MANIFEST SAME HBL NO - KA NO 40500636', 'Liyana Maisarah Abdul Aziz');
classifier.addDocument('CHECK MANIFEST NUMBER.', 'Liyana Maisarah Abdul Aziz');
classifier.addDocument('manifest report for subject BL as it was not found in Dagangnet.', 'Liyana Maisarah Abdul Aziz');
classifier.addDocument('SCN.', 'Liyana Maisarah Abdul Aziz');
classifier.addDocument('CHECKING USER ID FOR HBL SUBMITTED.', 'Liyana Maisarah Abdul Aziz');

classifier.addDocument('JK69.', 'Muhammad Fakrurrazi Auzaie Rohizam');
classifier.addDocument('Topup payment prepaid.', 'Muhammad Fakrurrazi Auzaie Rohizam');






// Train
classifier.train();


classifier.save('classifier.json', function(err, savedClassifier) {
  console.log('Classifier saved!');
});
