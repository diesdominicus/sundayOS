/**
 * sundayOS  ↔  Google Sheets
 *
 * HOW TO INSTALL
 *   1. Open your sundayOS spreadsheet
 *   2. Extensions → Apps Script
 *   3. Select everything in Code.gs and replace it with this file
 *   4. Deploy → Manage deployments → pencil icon → Version: "New version" → Deploy
 *      (Editing the EXISTING deployment keeps the same URL. Creating a brand new
 *       deployment gives a new URL and the app would stop finding it.)
 *
 * WHICH TABS MATTER
 *   Habits       one row per day, one column per habit — edit ticks here
 *   Collections  one row per item — edit, reorder, or delete rows here
 *   _AppSync     machine-readable JSON blob. Ignore it; don't edit by hand.
 *
 * Habits and Collections are two-way: the app rewrites them whenever you change
 * something in the app, and reads them back on load, so edits you make in the
 * spreadsheet show up in the app.
 */

var BLOB_SHEET = '_AppSync';
var BLOB_KEEP  = 20;   // rows of history to retain in _AppSync

// ─────────────────────────────────────────────── GET

function doGet(e) {
  var p = (e && e.parameter) || {};
  var action = p.action || 'read';

  // Proxy a Google Calendar .ics feed (the browser can't fetch it directly)
  if (action === 'cal') {
    if (!p.url) return textOut('');
    try {
      var resp = UrlFetchApp.fetch(p.url, { muteHttpExceptions: true, followRedirects: true });
      if (resp.getResponseCode() !== 200) return textOut('');
      return textOut(resp.getContentText('UTF-8'));
    } catch (err) {
      return textOut('');
    }
  }

  // The human-readable tabs
  if (action === 'tables') {
    return jsonOut({
      Collections: readTable('Collections'),
      Habits:      readTable('Habits')
    });
  }

  // Default: the newest _AppSync blob
  try {
    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(BLOB_SHEET);
    if (!sh || sh.getLastRow() === 0) return jsonOut({});
    return rawJsonOut(sh.getRange(sh.getLastRow(), 1).getValue() || '{}');
  } catch (err) {
    return jsonOut({});
  }
}

// ─────────────────────────────────────────────── POST

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonOut({ ok: false, error: 'bad json' });
  }

  // Replace an entire readable tab, so edits and deletions propagate
  if (body.action === 'table') {
    writeTable(body.name, body.headers || [], body.rows || []);
    return jsonOut({ ok: true });
  }

  // Full-state blob
  if (body.action === 'sync') {
    var sh = getOrCreate(BLOB_SHEET);
    sh.appendRow([JSON.stringify(body.data || {})]);
    trimBlob(sh);
    return jsonOut({ ok: true });
  }

  // Legacy: append a single row to a named tab
  if (body.sheet) {
    var s = getOrCreate(body.sheet);
    if (s.getLastRow() === 0 && body.headers) s.appendRow(body.headers);
    s.appendRow(body.row || []);
    return jsonOut({ ok: true });
  }

  return jsonOut({ ok: false, error: 'unknown action' });
}

// ─────────────────────────────────────────────── tables

/** Read a tab into [{Header: value, ...}, ...] using row 1 as headers. */
function readTable(name) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sh || sh.getLastRow() < 2) return [];

  var values  = sh.getDataRange().getValues();
  var headers = values[0].map(function (h) { return String(h).trim(); });
  var tz      = Session.getScriptTimeZone();
  var out     = [];

  for (var r = 1; r < values.length; r++) {
    var row = values[r];

    // skip fully blank rows so a stray newline doesn't become an item
    var blank = true;
    for (var i = 0; i < row.length; i++) {
      if (row[i] !== '' && row[i] !== null) { blank = false; break; }
    }
    if (blank) continue;

    var obj = {};
    for (var c = 0; c < headers.length; c++) {
      if (!headers[c]) continue;
      var v = row[c];
      // Dates always come back ISO so habit keys round-trip exactly
      obj[headers[c]] = (v instanceof Date)
        ? Utilities.formatDate(v, tz, 'yyyy-MM-dd')
        : String(v).trim();
    }
    out.push(obj);
  }
  return out;
}

/** Replace a tab's contents entirely. */
function writeTable(name, headers, rows) {
  if (!name || !headers.length) return;
  var sh = getOrCreate(name);
  sh.clear();

  var all = [headers].concat(rows).map(function (r) {
    var out = r.slice(0, headers.length);
    while (out.length < headers.length) out.push('');
    return out;
  });

  var rng = sh.getRange(1, 1, all.length, headers.length);
  // Force plain text BEFORE writing, so "Aug 22, 2026" and "2026-08-22" stay
  // strings instead of being coerced into Sheets date values.
  rng.setNumberFormat('@');
  rng.setValues(all);

  sh.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sh.setFrozenRows(1);
  sh.autoResizeColumns(1, headers.length);
}

// ─────────────────────────────────────────────── helpers

function getOrCreate(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

/** Only the newest row is ever read, so don't let history grow forever. */
function trimBlob(sh) {
  var last = sh.getLastRow();
  if (last > BLOB_KEEP * 2) sh.deleteRows(1, last - BLOB_KEEP);
}

function jsonOut(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}

function rawJsonOut(s) {
  return ContentService.createTextOutput(s)
    .setMimeType(ContentService.MimeType.JSON);
}

function textOut(s) {
  return ContentService.createTextOutput(s)
    .setMimeType(ContentService.MimeType.TEXT);
}
