//Ver1.0 - Razi 25.5.2025
//Ver1.1 - update button


const puppeteer = require('puppeteer');


const natural = require('natural');
const classifier = new natural.BayesClassifier();

const config = require('./Credential/config.json');
const user = config.HELPDESK_USER;
const password = config.HELPDESK_PASSWORD;


(async () => {
  // Launch the browser (set headless: false to see the browser UI)
  const browser = await puppeteer.launch({ headless: false, defaultViewport: false });
  const page = await browser.newPage();
  

  // Navigate to a website
await page.goto('https://helpdesk.dagangnet.com/Dnex/Login.aspx');




await page.evaluate(() => document.querySelector('#txtUserID_I').value = '');
await page.type('#txtUserID_I', user, { timeout: 10000 });

// Clear and type the password
await page.evaluate(() => document.querySelector('#txtPassword_I').value = '');
await page.$eval('#txtPassword_I', (el, value) => el.value = value, password);

await page.click('#btnSubmitForm');



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

await page.waitForSelector('[id^="ctl00_MainPane_MainContent_ASPxFormLayout1_gv_DXDataRow"]'); // Wait for the first row to ensure table is loaded
// Dynamically count the number of rows
const rowCount = await page.$$eval('[id^="ctl00_MainPane_MainContent_ASPxFormLayout1_gv_DXDataRow"]', rows => rows.length);
console.log(`Found ${rowCount} rows in the table.`);


 for (let i = 0; i <= rowCount; i++) {
   
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

  return data[11]; // Return the array of cell data, 11 for Status column
 },test);


console.log(rowData); // Output the extracted data
  
  

if (rowData == 'Open') //change this value for Open status 
{  
	  
   await Promise.all([
   
   page.$eval(`#ctl00_MainPane_MainContent_ASPxFormLayout1_gv_cell${i}_20_cmdView`, element => element.click()),
   
   await page.waitForNavigation(),   
   
   
   
   
   
 ]);
	 
   // await page.evaluate(() => document.querySelector('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ucSubCase_gvTask_DXEFL_DXEditor5_I').value = '');
  
   // await page.$eval('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ucSubCase_gvTask_DXEFL_DXEditor5_I', (el, value) => el.value = value, 'Muhammad Fakrurrazi Auzaie Rohizam');
   
   // await page.evaluate(() => document.querySelector('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ucSubCase_gvTask_DXEFL_DXEditor19_I').value = '');
  
   // await page.$eval('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ucSubCase_gvTask_DXEFL_DXEditor19_I', (el, value) => el.value = value, 'In Progress');
   
   // await page.evaluate(() => document.querySelector('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ucSubCase_gvTask_DXEFL_DXEditor21_I').value = '');
  
   // await page.$eval('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ucSubCase_gvTask_DXEFL_DXEditor21_I', (el, value) => el.value = value, 'PIC will check and revert');
  
   // page.$eval('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_T1', element => element.click());
  
	  // page.$eval('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_AT0', element => element.click());
  
    // const iframeContent = await page.evaluate(() => {
        // const iframe = document.querySelector('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_txtRemark_DesignIFrame');
        // if (!iframe) return "No iframe found.";

        // Access iframe content (Assuming same-origin, otherwise won't work)
        // const doc = iframe.contentDocument || iframe.contentWindow.document;
        // return doc ? doc.body.innerText : "Unable to access iframe content.";
    // });
   
   
   // console.log("Extracted Content:", iframeContent);
   
  const value = await page.evaluate(() => {
  const desc = document.querySelector('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ASPxFormLayout2_txtDescription_I');
  return desc ? desc.value : null;
});
   
   console.log(value);
   
   natural.BayesClassifier.load('./Classifier/classifier.json', null, function(err, classifier) {
  if (err) throw err;
  const result = classifier.classify(value);
  console.log(`Assignee: ${result}`);
  
  
  page.$eval('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ucSubCase_gvTask_DXEFL_DXEditor5_I', (el, value) => el.value = value, result);
  
  page.$eval('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ucSubCase_gvTask_DXEFL_DXEditor19_I', (el, value) => el.value = value, 'In Progress');
  
  page.$eval('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ucSubCase_gvTask_DXEFL_DXEditor21_I', (el, value) => el.value = value, 'PIC will check and revert');
  
  // page.click('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_modTabPage_ucSubCase_gvTask_DXEFL_DXCBtn3');
  
  
  page.click('[data-args="[[\'UpdateEdit\'],1]"]');
  console.log("Update Success");

  
}); 
	  
	  
	  

}
  
  
  else
  {
	  console.log('No Open Ticket');
	  //await browser.close();
  } 
  

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



  // console.log(('#ctl00_MainPane_MainContent_splitter_ucCaseInfo_ASPxFormLayout1_lblTicketNo').innertext);
  
    // Take a screenshot and save it

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
