// SANS alias "@" :
import { upsertCustomer } from "../utils/api";
// AVEC alias "@", si configuré :
/* import { upsertCustomer } from "@/utils/api"; */

async function handleSubmit() {
  await upsertCustomer({
    external_id: "cust_123",
    email: "client@ex.com",
    full_name: "Client Test",
    meta: { source: "site" },
  });
}
