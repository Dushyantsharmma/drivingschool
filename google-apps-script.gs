// ================= CONFIGURATION =================
const SHEET_ID = "1S7Y9P-RvgS71w__6gxCKh4dpAvxBff1hdQu3Gc8c3WM";
const SHEET_NAME = "Sheet1";
const CLIENT_EMAIL = "rajannraj.dts@gmail.com";
const EMAIL_SUBJECT = "🚗 Student Status Update";

// Capacity Limit per Slot
const MAX_CAPACITY = {
  "Morning (8 AM - 11 AM)": 5,
  "Afternoon (12 PM - 4 PM)": 5,
  "Evening (5 PM - 7 PM)": 5,
};

// ================= 1. GET HANDLER (Availability) =================
function doGet(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.openById(SHEET_ID);
    const sheet = doc.getSheetByName(SHEET_NAME);

    let availability = {
      "Morning (8 AM - 11 AM)": true,
      "Afternoon (12 PM - 4 PM)": true,
      "Evening (5 PM - 7 PM)": true,
    };

    if (sheet.getLastRow() > 1) {
      // Fetch Time Slot (Col F) and Timestamp (Col H)
      const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 9).getValues();
      const todayStr = new Date().toDateString();

      let counts = {
        "Morning (8 AM - 11 AM)": 0,
        "Afternoon (12 PM - 4 PM)": 0,
        "Evening (5 PM - 7 PM)": 0,
      };

      data.forEach((row) => {
        if (row[7]) {
          // Check Timestamp exists
          const rowDate = new Date(row[7]);
          if (rowDate.toDateString() === todayStr) {
            const slot = row[5]; // Time Slot
            if (counts[slot] !== undefined) counts[slot]++;
          }
        }
      });

      for (const [slot, count] of Object.entries(counts)) {
        if (count >= MAX_CAPACITY[slot]) availability[slot] = false;
      }
    }

    return response({ status: "success", availability: availability });
  } catch (err) {
    return response({ status: "error", message: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

// ================= 2. POST HANDLER (Strong Logic) =================
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
  } catch (e) {
    return response({ status: "error", message: "Server Busy" });
  }

  try {
    const doc = SpreadsheetApp.openById(SHEET_ID);
    let sheet = doc.getSheetByName(SHEET_NAME);

    // Auto-Create Sheet/Headers
    if (!sheet) sheet = doc.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      const headers = [
        "Full Name",
        "Mobile Number",
        "Gender",
        "Date of Birth",
        "Skill Level",
        "Time Slot",
        "Pickup Location",
        "Timestamp",
        "Status",
      ];
      sheet.appendRow(headers);
      sheet
        .getRange(1, 1, 1, headers.length)
        .setFontWeight("bold")
        .setBackground("#fbbf24");
      sheet.setFrozenRows(1);
    }

    const data = JSON.parse(e.postData.contents);

    // Honeypot (Bot Protection)
    if (data.honeypot)
      return response({ status: "success", action: "bot_blocked" });

    // --- 1. NORMALIZE INPUT DATA ---
    const inputMobile = String(data.mobile || "")
      .replace(/\D/g, "")
      .slice(-10);
    const inputName = toTitleCase(data.fullName);
    const inputGender = data.gender || "Not Specified";
    // Ensure DOB is strict YYYY-MM-DD string for comparison
    const inputDOB = data.dateOfBirth
      ? new Date(data.dateOfBirth).toISOString().split("T")[0]
      : "";

    if (!inputName || inputMobile.length < 10) throw new Error("Invalid Data");

    // --- 2. STRONG DUPLICATE CHECK ---
    const lastRow = sheet.getLastRow();
    let rowIndex = -1;
    let isUpdate = false;
    let updateReason = "New";

    if (lastRow > 1) {
      // Fetch Name(A), Mobile(B), Gender(C), DOB(D) to compare
      // Range: A2:D[lastRow]
      const existingData = sheet.getRange(2, 1, lastRow - 1, 4).getValues();

      for (let i = 0; i < existingData.length; i++) {
        const rowName = String(existingData[i][0]).trim().toLowerCase();
        const rowMobile = String(existingData[i][1])
          .replace(/\D/g, "")
          .slice(-10);

        // Handle Sheet Date Object vs Input String
        let rowDOB = "";
        if (existingData[i][3] instanceof Date) {
          rowDOB = existingData[i][3].toISOString().split("T")[0];
        } else {
          rowDOB = String(existingData[i][3]);
        }

        // CHECK 1: Mobile Match
        if (rowMobile === inputMobile) {
          rowIndex = i + 2;
          isUpdate = true;
          updateReason = "Mobile Match";
          break;
        }

        // CHECK 2: Name + DOB Match (The "Dushyant" Fix)
        // If names match (case-insensitive) AND DOBs match
        if (rowName === inputName.toLowerCase() && rowDOB === inputDOB) {
          rowIndex = i + 2;
          isUpdate = true;
          updateReason = "Name+DOB Match";
          break;
        }
      }
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    const statusLabel = isUpdate ? "Updated" : "New";

    const rowData = [
      inputName, // A
      inputMobile, // B (If Name match, this updates the mobile number!)
      inputGender, // C
      data.dateOfBirth, // D
      data.skillLevel, // E
      data.timeSlot, // F
      data.pickupLocation, // G
      timestamp, // H
      statusLabel, // I
    ];

    // --- 3. WRITE TO SHEET ---
    if (isUpdate) {
      // Spam Prevent: 45s cooldown
      const lastUpdateCell = sheet.getRange(rowIndex, 8).getValue();
      if (lastUpdateCell) {
        const diff = (new Date() - new Date(lastUpdateCell)) / 1000;
        if (diff < 45)
          return response({ status: "success", action: "spam_prevention" });
      }

      sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
      sheet.getRange(rowIndex, 1, 1, rowData.length).setBackground("#e0f2fe"); // Light Blue for Updates
    } else {
      sheet.appendRow(rowData);
    }

    // --- 4. NOTIFICATION ---
    try {
      sendNotification(rowData, isUpdate, updateReason);
    } catch (e) {
      console.log(e);
    }

    return response({
      status: "success",
      action: isUpdate ? "updated" : "created",
    });
  } catch (err) {
    return response({ status: "error", message: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

// ================= HELPERS =================
function toTitleCase(str) {
  return str
    ? str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      )
    : "";
}

function response(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function sendNotification(row, isUpdate, reason) {
  const [name, mobile, gender, dob, skill, time, loc] = row;
  const typeText = isUpdate ? "♻️ UPDATED ENTRY" : "✅ NEW REGISTRATION";
  const color = isUpdate ? "#0284c7" : "#10b981"; // Blue for Update, Green for New

  const replyText = `Hi ${name}, thank you for registering with Raj Ann Raj Driving School! 🚗 We have received your request for the ${time} slot.`;
  const waLink = `https://wa.me/91${mobile}?text=${encodeURIComponent(
    replyText
  )}`;

  const html = `
    <div style="font-family:sans-serif;border:1px solid #ddd;padding:0;border-radius:10px;overflow:hidden;max-width:500px;">
      <div style="background:${color};padding:15px;color:white;text-align:center;">
        <h2 style="margin:0;">${typeText}</h2>
        ${
          isUpdate
            ? `<p style="margin:5px 0 0 0;font-size:12px;opacity:0.9;">Detected via: ${reason}</p>`
            : ""
        }
      </div>
      <div style="padding:20px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#64748b;font-weight:bold;">Name:</td><td>${name}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-weight:bold;">Mobile:</td><td>${mobile}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-weight:bold;">Gender:</td><td>${gender}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-weight:bold;">Slot:</td><td>${time}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-weight:bold;">Location:</td><td>${loc}</td></tr>
        </table>
        <div style="margin-top:25px;text-align:center;">
          <a href="${waLink}" style="background:#25D366;color:white;padding:12px 25px;text-decoration:none;border-radius:50px;font-weight:bold;">
            Reply on WhatsApp 
          </a>
        </div>
      </div>
    </div>
  `;
  MailApp.sendEmail({
    to: CLIENT_EMAIL,
    subject: `${typeText}: ${name}`,
    htmlBody: html,
  });
}