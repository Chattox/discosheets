import pc from "picocolors";
import { GUILD_ID, STAFF_CHANNEL_ID } from "./config";
import { ExtendedClient } from "./ExtendedClient";

export const initStaffChannel = async (client: ExtendedClient) => {
  if (!STAFF_CHANNEL_ID) {
    console.log(
      `${pc.yellow(
        "[WARNING]"
      )} Staff channel environment variable not set, bot will not send notification messages on adding new provider`
    );
    return;
  }
  const staffChannel = client.channels.cache.get(STAFF_CHANNEL_ID);
  const staffChannelPermissions = client.guilds.cache
    .get(GUILD_ID!)
    ?.members.me?.permissionsIn(STAFF_CHANNEL_ID)
    .serialize();
  if (staffChannel?.type !== 0) {
    throw new Error("Staff channel is not a server text channel");
  } else if (
    !staffChannelPermissions?.ViewChannel ||
    !staffChannelPermissions.SendMessages
  ) {
    throw new Error(
      "Discosheets does not have correct permissions for staff channel, make sure it has 'View Channel' and 'Send Messages' enabled"
    );
  } else {
    client.staffChannel = staffChannel;
    console.log(
      `${pc.green("[INFO]")} Staff channel set to: ${client.staffChannel.name}`
    );
  }
};
