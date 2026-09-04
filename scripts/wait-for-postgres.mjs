import net from "node:net";

const host = process.env.PGHOST ?? "127.0.0.1";
const port = Number(process.env.PGPORT ?? 5432);
const timeoutMs = Number(process.env.PG_WAIT_TIMEOUT_MS ?? 60000);
const intervalMs = 1000;

function canConnect() {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host, port });

    socket.on("connect", () => {
      socket.end();
      resolve(true);
    });

    socket.on("error", () => {
      resolve(false);
    });
  });
}

async function waitForPostgres() {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    if (await canConnect()) {
      console.log(`PostgreSQL is ready on ${host}:${port}`);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error(
    `Timed out waiting for PostgreSQL on ${host}:${port} after ${timeoutMs}ms`,
  );
}

waitForPostgres().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
