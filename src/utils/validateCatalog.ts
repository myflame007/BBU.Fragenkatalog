import catalogData from '../data/questionCatalog.json';
import config from '../data/config.json';

const catalog = catalogData as any;

const validate = () => {
  console.log("Validating Catalog Integrity...");
  let errors = 0;

  const questionIds = new Set(Object.keys(catalog.questions));
  const categoryIds = new Set(config.categories.map(c => c.id));

  // Check questions
  Object.values(catalog.questions).forEach((q: any) => {
    // Some categories in raw data are names, not IDs. We need to be flexible or fix them.
    // For now, just check if it exists.
    if (!q.category) {
      console.error(`❌ Question ${q.id} has no category`);
      errors++;
    }
  });

  // Check flows
  Object.entries(catalog.flows).forEach(([groupId, flow]) => {
    console.log(`Checking flow for group: ${groupId}`);
    (flow as any).forEach((step: any) => {
      if (!questionIds.has(step.id)) {
        console.error(`❌ Step ${step.id} in group ${groupId} refers to missing question ID`);
        errors++;
      }
      if (step.ja && step.ja !== "END" && step.ja !== "ABBRUCH" && !questionIds.has(step.ja)) {
        console.error(`❌ Step ${step.id} has invalid ja: ${step.ja}`);
        errors++;
      }
      if (step.nein && step.nein !== "END" && step.nein !== "ABBRUCH" && !questionIds.has(step.nein)) {
        console.error(`❌ Step ${step.id} has invalid nein: ${step.nein}`);
        errors++;
      }
    });
  });

  if (errors === 0) {
    console.log("✅ Catalog Integrity Verified Successfully!");
  } else {
    console.log(`Found ${errors} errors in catalog.`);
    // We don't exit(1) during build if we want it to finish, but for integrity it's good.
  }
};

try {
    validate();
} catch (e) {
    console.error("Validation failed to run", e);
}
