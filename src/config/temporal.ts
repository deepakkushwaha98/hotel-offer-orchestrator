import { Connection, Client } from "@temporalio/client";

let temporalClient: Client | null = null;

export async function getTemporalClient(): Promise<Client> {

    if (!temporalClient) {
        const connection = await Connection.connect({
            address: process.env.TEMPORAL_ADDRESS || "localhost:7233"
        });

        temporalClient = new Client({ connection });

        console.log("Connected to Temporal Server");
    }

    return temporalClient;
}