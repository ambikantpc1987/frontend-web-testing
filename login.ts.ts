import { test, expect, chromium } from '@playwright/test';
//test.setTimeout(120000); // ✅ Allow 2 minutes for slow navigation


// Phoenix  Login URL
const PHOENIX_URL = 'https://phoenix-qa.aakash.ac.in/#/auth';

// Phoenix Credentials
const PHOENIX_USER_ID = 'aesl-a14128';       
const PHOENIX_PASSWORD = 'Aadi@2021';     

test('Login to Phoenix with valid credentials', async () => {
  test.setTimeout(120000); // ✅ Allow 2 minutes for slow navigation
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(PHOENIX_URL);
  await page.waitForTimeout(5000);  // Adjust as needed
  // Fill User ID and Password
  await page.fill('input[placeholder="User ID"]', PHOENIX_USER_ID);
  await page.fill('input[placeholder="Password"]', PHOENIX_PASSWORD);
 
 await page.click('button:has-text("Login")');

  // Wait for dashboard page to load
await page.waitForURL('https://phoenix-qa.aakash.ac.in/#/admin/dashboard', { timeout: 120000 });
console.log("✅ Logged in and dashboard loaded");

// 🔹 Search bar typing
const searchBox = page.locator('input[placeholder="Search"]');
await searchBox.waitFor({ state: 'visible', timeout: 60000 });
await searchBox.click();
await searchBox.type('search batch', { delay: 100 });
await page.waitForTimeout(1000);

// 🔹 Click “Manage” from sidebar
const manageMenu = page.locator('a span.nav-link-text', { hasText: 'Manage' }).first();
await manageMenu.waitFor({ state: 'visible', timeout: 60000 });
await manageMenu.click();
console.log("✅ Clicked Manage");

// 🔹 Click “Student Batches” from sidebar
const studentBatches = page.locator('span.sidenav-normal', { hasText: 'Student Batches' }).first();
await studentBatches.waitFor({ state: 'visible', timeout: 60000 });
await studentBatches.click();
console.log("✅ Clicked Student Batches");

// 🔹 Click “Batch Management”
const batchManagement = page.locator('span.sidenav-normal', { hasText: 'Batch Management' }).first();
await batchManagement.waitFor({ state: 'visible', timeout: 60000 });
await batchManagement.click();
console.log("✅ Clicked Batch Management");

// 🔹 Click “Search Batch”
const searchBatch = page.locator('span.sidenav-normal', { hasText: 'Search Batch' }).first();
await searchBatch.waitFor({ state: 'visible', timeout: 60000 });
await searchBatch.click({ force: true });
console.log("✅ Clicked Search Batch");

// 🔹 Wait for Search Batch page
await page.waitForURL('https://phoenix-qa.aakash.ac.in/?#/admin/edp/searchBatch', { timeout: 120000, waitUntil: 'commit' });
await expect(page).toHaveURL(/.*searchBatch/);
console.log("✅ Navigated to Search Batch page");

await browser.close();
});









































 //Base URL 
 const BASE_URL = 'https://crystal-stage.aakash.ac.in/login?redirect=/dashboard/classes'; 
 //Credentials 
 const VALID_EMAIL = 'vivek.hans@aesl.in'; 
 const VALID_PASSWORD = '123456';
 const INVALID_EMAIL = 'invalid.user@aesl.in'; 
 const INVALID_PASSWORD = 'Ambika@123'; 
 const INVALID_EMAIL2 = ' '; 
 const INVALID_PASSWORD2 = ' '; 
  
  
  // ========================= // Negative Test Cases // ========================= 
  test('Login fails with invalid email', async () => { const browser = await chromium.launch({ headless: false });
   const context = await browser.newContext(); 
   const page = await context.newPage(); 
   await page.goto(BASE_URL); 
   await page.fill('input[name="email"]', INVALID_EMAIL); 
   await page.fill('input[name="password"]', VALID_PASSWORD); 
   await page.click('button[type="submit"]'); 
   
   // Assertion: Check error message or still on login page await expect(page).toHaveURL(/.*\/login/); 
   // You can also check for an error toast/message if present 
   //await expect(page.locator('.error-message')).toHaveText('Invalid credentials'); 
   await page.waitForTimeout(5000); // Wait for 5 seconds 
   await browser.close(); }); 

   test('Login fails with invalid password', async () => { const browser = await chromium.launch({ headless: false }); 
   const context = await browser.newContext(); 
   const page = await context.newPage(); 
   await page.goto(BASE_URL); 
   await page.fill('input[name="email"]', VALID_EMAIL); 
   await page.fill('input[name="password"]', INVALID_PASSWORD); 
   await page.click('button[type="submit"]'); 
   await expect(page).toHaveURL(/.*\/login/); 
   await page.waitForTimeout(5000); // Wait for 5 seconds 
   await browser.close(); }); 

   test('Login fails with blank credentials', async () => { const browser = await chromium.launch({ headless: false }); 
   const context = await browser.newContext(); 
   const page = await context.newPage();
   await page.goto(BASE_URL); 
   await page.fill('input[name="email"]', INVALID_EMAIL2); 
   await page.fill('input[name="password"]', INVALID_PASSWORD2); 
    await page.click('button[type="submit"]'); 
    // Expecting validation errors or still on login page 
    await expect(page).toHaveURL(/.*\/login/); 
    // Optionally validate field error messages 
    // await expect(page.locator('text=Email is required')).toBeVisible(); 
    // await expect(page.locator('text=Password is required')).toBeVisible(); 
    await page.waitForTimeout(5000);// Wait for 5 seconds 
    await browser.close(); }); 
     
     // ========================= // Positive Test Case // ========================= 
     test('Login to Crystal app with valid credentials', async () => {
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();
      
        await page.goto(BASE_URL);
        await page.fill('input[name="email"]', VALID_EMAIL);
        await page.fill('input[name="password"]', VALID_PASSWORD);
        await page.click('button[type="submit"]');
        await page.waitForURL('**/dashboard/classes');
        await expect(page).toHaveURL(/.*\/dashboard\/classes/);
        await page.waitForTimeout(5000);
      

        // Define the batch name you're looking for
  const targetBatch = 'IC006-3Y82-2025-105388';

  // Wait for the table to load
       await page.waitForSelector('table'); // Adjust selector if needed

  // Find the row containing the batch name
  const rowLocator = page.locator(`table tr:has-text("${targetBatch}")`);

  // Ensure the row exists
       await expect(rowLocator).toHaveCount(1);

        // Click the Faculty link/button in that row 
  const facultyLink = rowLocator.locator('text=Faculty');
  await facultyLink.click();

        // Save authentication state
        await context.storageState({ path: 'storageState.json' });
      
        // ------------Navigate to Guests tab--------------------------//

        const guestsTab = page.locator('a[href="/dashboard/guests"]');
        await expect (guestsTab).toBeVisible();
        await guestsTab.click();
        await page.waitForTimeout(5000);
        //const guestTabClass = await guestsTab.getAttribute('class');
        //if (!guestTabClass?.includes('active')) {
          await guestsTab.click();
        //}
      
        // -----------Navigate to Leads tab--------------------------//

        const leadsTab = page.locator('a[href="/dashboard/leads"]');
        await expect(leadsTab).toBeVisible();
        await leadsTab.click();
        await page.waitForTimeout(5000);
        await browser.close();});