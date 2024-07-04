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

  client.googleWorksheet = client.googleSheet.sheetsByIndex[0];

  console.log(
    `${pc.green("[INFO]")} Connected to google sheet "${
      client.googleSheet?.title
    }"!`
  );
};
