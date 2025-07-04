const core = require("@actions/core");
const fs = require("fs/promises");

async function main() {
  const file = core.getInput("file");
  const upload_to = core.getInput("upload_url");
  const regenerate_with = core.getInput("regenerate_url");
  const id_token = await core.getIDToken();

  if (file) {
    if (!upload_to) {
      throw "upload_to must be set if file is set";
    }
    const body = await fs.readFile(file);
    const upload = await fetch(upload_to, {
      method: "POST",
      headers: {
        "openid-token": id_token,
      },
      body: body,
    });
    if (upload.status !== 200) {
      const bytes = await upload.bytes();
      const bytesStr = new TextDecoder().decode(bytes);
      throw `Status was not 200: ${bytesStr}`;
    }
  }

  if (regenerate_with) {
    const regen = await fetch(regenerate_with, {
      method: "POST",
      headers: {
        "openid-token": id_token_a,
      },
    });
    if (regen.status !== 200) {
      const bytes = await resp.bytes();
      const bytesStr = bytes.toLocaleString();
      throw `Status was not 200: ${bytesStr}`;
    }
  }
}

main()
  .then((_) => {})
  .catch((e) => {
    core.setFailed(e);
  });
