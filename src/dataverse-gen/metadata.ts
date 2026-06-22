/* eslint-disable*/
import { ava_bbu_bedurfniskategorieMetadata } from "./entities/ava_bbu_Bedurfniskategorie";
import { ava_bbu_beurteilungbesondererbedurfnisseMetadata } from "./entities/ava_bbu_BeurteilungBesondererBedurfnisse";
import { contactMetadata } from "./entities/Contact";

export const Entities = {
  ava_bbu_Bedurfniskategorie: "ava_bbu_bedurfniskategorie",
  ava_bbu_BeurteilungBesondererBedurfnisse: "ava_bbu_beurteilungbesondererbedurfnisse",
  Contact: "contact",
};

// Setup Metadata
// Usage: setMetadataCache(metadataCache);
export const metadataCache = {
  entities: {
    ava_bbu_bedurfniskategorie: ava_bbu_bedurfniskategorieMetadata,
    ava_bbu_beurteilungbesondererbedurfnisse: ava_bbu_beurteilungbesondererbedurfnisseMetadata,
    contact: contactMetadata,
  },
  actions: {
  }
};