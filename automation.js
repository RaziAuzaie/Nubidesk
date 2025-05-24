 const value = await page.evaluate(() => {
  const desc = document.querySelector('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ASPxFormLayout2_txtDescription_I');
  return desc ? desc.value : null;
});
   
   console.log(value);
   
   natural.BayesClassifier.load('../Training/classifier.json', null, function(err, classifier) {
  if (err) throw err;
  const result = classifier.classify('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ASPxFormLayout2_txtDescription_I');
  console.log(`Category: ${result}`);
}); 
