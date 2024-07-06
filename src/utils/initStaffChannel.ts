import pc from "picocolors";
import { STAFF_CHANNEL_ID } from "./config";
import { ExtendedClient } from "./ExtendedClient";

export const initStaffChannel = async (client: ExtendedClient) => {
  const staffChannel = client.channels.cache.get(STAFF_CHANNEL_ID!);
  if (staffChannel?.type !== 0) {
    throw new Error("Staff channel is not a server text channel");
  } else {
    client.staffChannel = staffChannel;
    console.log(
      `${pc.green("[INFO]")} Staff channel set to: ${client.staffChannel.name}`
    );
  }
};
