const puppeteer = require('puppeteer');

const natural = require('natural');

// natural.BayesClassifier.load('../Training/classifier.json', null, function(err, classifier) {
  // if (err) throw err;
  // const result = classifier.classify('Create a marketing strategy');
  // console.log(`Category: ${result}`);
// });


(async () => {
  // Launch the browser (set headless: false to see the browser UI)
  const browser = await puppeteer.launch({ headless: false, defaultViewport: false });
  const page = await browser.newPage();
  

  // Navigate to a website
await page.goto('https://helpdesk.dagangnet.com/Dnex/Login.aspx');




await page.evaluate(() => document.querySelector('#txtUserID_I').value = '');
await page.type('#txtUserID_I', 'fakrurrazi@dnex.com.my', { timeout: 10000 });

// Clear and type the password
await page.evaluate(() => document.querySelector('#txtPassword_I').value = '');
await page.$eval('#txtPassword_I', (el, value) => el.value = value, 'P@ssw0rd');

await page.click('#btnSubmitForm');

  // Take a screenshot and save it


await page.waitForNavigation();
console.log('Logged in successfully!');




  try {
    await page.goto('https://helpdesk.dagangnet.com/Dnex/Inbound/SearchTask.aspx');
    console.log('Task Page!');
  } catch (error) {
    console.error('Navigation failed:', error);
  }
  
// page.waitForNavigation()

const element = await page.$('#ctl00_MainPane_MainContent_ASPxFormLayout1_gv_cell0_20_cmdView');


//await Promise.all([

await page.waitForSelector('#ctl00_MainPane_MainContent_ASPxFormLayout1_gv_DXDataRow0');


 for (let i = 0; i <= 2; i++) {
   
	//console.log(`#ctl00_MainPane_MainContent_ASPxFormLayout1_gv_DXDataRow${i}`);

const test =   `#ctl00_MainPane_MainContent_ASPxFormLayout1_gv_DXDataRow${i}`;
  
    // Extract data from the rows
const rowData = await page.evaluate((selector) => {
	
	
	
  
	
  const row = document.querySelector(selector);
  const cells = row.querySelectorAll('td'); // Get all <td> elements inside the <tr>
  const data = [];

  // Iterate over each <td> and extract its text content
  cells.forEach(cell => {
    data.push(cell.textContent.trim()); // Trim whitespace and add to the data array
  });

  return data[1]; // Return the array of cell data, change it to 11 for Status
 },test);


console.log(rowData); // Output the extracted data
  
  

if (rowData == '202504260002'){  //change this value for Open status 
	  
   await Promise.all([
   
   page.$eval(`#ctl00_MainPane_MainContent_ASPxFormLayout1_gv_cell${i}_20_cmdView`, element => element.click()),
   
   await page.waitForNavigation(),   
   
   
   
   
   
 ]);
	  
	  
  }else{
	  console.log('not 202504260002	');
  } 
  
   // await page.evaluate(() => document.querySelector('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ucSubCase_gvTask_DXEFL_DXEditor5_I').value = '');
  
   // await page.$eval('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ucSubCase_gvTask_DXEFL_DXEditor5_I', (el, value) => el.value = value, 'Muhammad Fakrurrazi Auzaie Rohizam');
   
   // await page.evaluate(() => document.querySelector('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ucSubCase_gvTask_DXEFL_DXEditor19_I').value = '');
  
   // await page.$eval('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ucSubCase_gvTask_DXEFL_DXEditor19_I', (el, value) => el.value = value, 'In Progress');
   
   // await page.evaluate(() => document.querySelector('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ucSubCase_gvTask_DXEFL_DXEditor21_I').value = '');
  
   // await page.$eval('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ucSubCase_gvTask_DXEFL_DXEditor21_I', (el, value) => el.value = value, 'PIC will check and revert');
  
   page.$eval('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_T1', element => element.click());
  
    const iframeContent = await page.evaluate(() => {
        const iframe = document.querySelector('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_txtRemark_DesignIFrame');
        if (!iframe) return "No iframe found.";

        // Access iframe content (Assuming same-origin, otherwise won't work)
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        return doc ? doc.body.innerText : "Unable to access iframe content.";
    });
   
   
   console.log("Extracted Content:", iframeContent);
   
   natural.BayesClassifier.load('../Training/classifier.json', null, function(err, classifier) {
  if (err) throw err;
  const result = classifier.classify(iframeContent);
  console.log(`Category: ${result}`);
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



  // console.log(('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_lblTicketNo').innertext);
  
  
   await page.screenshot({ path: 'example.png' });

	console.log('SUCCESS');
 }


   


//await Promise.all([
//  page.$eval('#ctl00_MainPane_MainContent_ASPxFormLayout1_gv_cell0_20_cmdView', element =>
//    element.click()
//  ),
//  await page.waitForNavigation(),
//]);



  // Close the browser
  //await browser.close();
})();