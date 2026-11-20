
import { NativeConnection, Worker } from "@temporalio/worker";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";

import * as activities from "./activities/hotel.activities.js";

async function runWorker() {
    // Connect to the Temporal server
    const connection = await NativeConnection.connect({
        address: process.env.TEMPORAL_ADDRESS || "localhost:7233",
    });

    const tsPath = fileURLToPath(
        new URL("./workflows/hotel.workflow.ts", import.meta.url)
    );

    const jsPath = fileURLToPath(
        new URL("./workflows/hotel.workflow.js", import.meta.url)
    );

    const workflowsPath = existsSync(tsPath) ? tsPath : jsPath;

    const worker = await Worker.create({
        connection,
        workflowsPath,
        activities,
        taskQueue: "hotel-task-queue",
    });

    console.log("Temporal Worker started...");

    await worker.run();
}

runWorker().catch((error) => {
    console.error("Worker failed:", error);
    process.exit(1);
});

