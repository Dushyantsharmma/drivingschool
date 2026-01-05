/**
 * Google Apps Script for Raj Ann Raj Driving School Registration Form
 * This script receives form data from the website and stores it in Google Sheets
 *
 * IMPORTANT: You MUST replace the SHEET_ID below with YOUR actual Google Sheet ID
 *
 * HOW TO FIND YOUR SHEET ID:
 * 1. Open your Google Sheet
 * 2. Look at the URL: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
 * 3. Copy the ID part and replace "1S7Y9P-RvgS71w__6gxCKh4dpAvxBff1hdQu3Gc8c3WM" below
 */

// ⚠️ CHANGE THIS TO YOUR GOOGLE SHEET ID ⚠️
const SHEET_ID = "1S7Y9P-RvgS71w__6gxCKh4dpAvxBff1hdQu3Gc8c3WM"; // Replace with your actual Sheet ID
const SHEET_NAME = "Sheet1"; // Set this to the exact tab name you want to write to

function doPost(e) {
  try {
    // Basic guard to avoid null dereference when the request is malformed
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Missing postData in request");
    }

    Logger.log("Request received: " + e.postData.contents);

    // Open the specific spreadsheet by ID and resolve the sheet/tab safely
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create the sheet if it does not exist to avoid null getDataRange
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // If no headers yet, add them once so columns stay consistent
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Mobile Number",
        "Date of Birth",
        "Skill Level",
        "Time Slot",
        "Pickup Location",
      ]);
    }

    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    Logger.log("Parsed data: " + JSON.stringify(data));

    // Extract form fields
    const timestamp = new Date();
    const fullName = data.fullName || "";
    const mobile = data.mobile || "";
    const dateOfBirth = data.dateOfBirth || "";
    const skillLevel = data.skillLevel || "";
    const timeSlot = data.timeSlot || "";
    const pickupLocation = data.pickupLocation || "";

    Logger.log(
      "About to append row: " +
        [
          timestamp,
          fullName,
          mobile,
          dateOfBirth,
          skillLevel,
          timeSlot,
          pickupLocation,
        ]
    );

    // Append the data to the sheet
    sheet.appendRow([
      timestamp,
      fullName,
      mobile,
      dateOfBirth,
      skillLevel,
      timeSlot,
      pickupLocation,
    ]);

    Logger.log("Row appended successfully");

    // Send email notification
    try {
      const emailRecipient = "pushapraj.sugam@gmail.com"; // Raj's email
      const emailSubject = "🚗 New Driving Lesson Enquiry - " + fullName;
      const emailBody =
        "New Student Registration\n\n" +
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
        "📅 Date & Time: " +
        timestamp.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) +
        "\n\n" +
        "👤 Full Name: " +
        fullName +
        "\n" +
        "📱 Mobile: " +
        mobile +
        "\n" +
        "🎂 Date of Birth: " +
        dateOfBirth +
        "\n" +
        "🎯 Skill Level: " +
        skillLevel +
        "\n" +
        "⏰ Preferred Time: " +
        timeSlot +
        "\n" +
        "📍 Pickup Location: " +
        pickupLocation +
        "\n\n" +
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
        "Action Required: Please contact the student as soon as possible.\n\n" +
        "WhatsApp Link: https://wa.me/91" +
        mobile.replace(/\D/g, "").slice(-10) +
        "\n" +
        "Call Link: tel:+" +
        mobile.replace(/\D/g, "") +
        "\n\n" +
        "—\n" +
        "Raj Ann Raj Driving Training School\n" +
        "Automated Registration System";

      // Send the email
      MailApp.sendEmail(emailRecipient, emailSubject, emailBody);
    } catch (emailError) {
      Logger.log("Email error: " + emailError.toString());
      // Continue even if email fails
    }

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Form submitted successfully",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script is working
function testScript() {
  const testData = {
    fullName: "Test User",
    mobile: "+919999999999",
    dateOfBirth: "2000-01-15",
    skillLevel: "beginner",
    timeSlot: "morning",
    pickupLocation: "Mandi",
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData),
    },
  };

  const response = doPost(mockEvent);
  Logger.log(response.getContent());
}
