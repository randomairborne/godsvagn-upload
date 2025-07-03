const core = require("@actions/core");
const fs = require("fs/promises");

async function main() {
  const file = core.getInput("file", { required: true });
  const upload_to = core.getInput("upload_url", { required: true });
  const id_token = await core.getIDToken();

  const body = await fs.readFile(file);

  const resp = await fetch(upload_to, {
    headers: {
      "openid-token": id_token,
    },
    body: body,
  });
  if (resp.status !== 200) {
    const bytes = await resp.bytes();
    const bytesStr = bytes.toString();
    throw `Status was not 200: ${bytesStr}`;
  }
}

main()
  .then((_) => {})
  .catch((e) => {
    core.setFailed(e);
  });
