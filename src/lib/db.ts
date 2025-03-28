import { db, ref, set, get, child } from "@/lib/firebase";

export const updateSelection = async (
  userId: string,
  name: string,
  newItem: string,
) => {
  const userRef = ref(db, `selections/${userId}`);

  // Get existing selection
  const snapshot = await get(child(ref(db), `selections/${userId}`));
  const existingData = snapshot.exists() ? snapshot.val().items : [];

  // Update with new selection
  set(userRef, { name, items: [...existingData, newItem] });
};
