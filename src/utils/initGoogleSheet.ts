import pc from "picocolors";
import {
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_SPREADSHEET_ID,
} from "./config";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

import { ExtendedClient } from "./ExtendedClient";

export const initGoogleSheet = async (client: ExtendedClient) => {
  const serviceAccountAuth = new JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheet = new GoogleSpreadsheet(
    GOOGLE_SPREADSHEET_ID!,
    serviceAccountAuth
  );

  client.googleSheet = sheet;
  await client.googleSheet.loadInfo();
  console.log(
    `${pc.green("[INFO]")} Connected to google sheet "${
      client.googleSheet?.title
    }"!`
  );

  client.googleWorksheet = client.googleSheet.sheetsByIndex[0];
  await client.googleWorksheet.loadHeaderRow();
  const headers = ["name", "practice", "location", "comments"];
  if (
    !headers.every((header) =>
      client.googleWorksheet?.headerValues.includes(header)
    )
  ) {
    throw new Error(
      "Missing headers in google worksheet, make sure the top row contains 'name', 'practice', 'location', and 'comments'"
    );
  }

  console.log(
    `${pc.green("[INFO]")} Connected to worksheet "${
      client.googleWorksheet.title
    }"`
  );
};
