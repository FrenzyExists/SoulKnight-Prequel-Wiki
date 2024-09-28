import express from "express";
import { supabase } from "./supa";
import { fateboundData } from "../.data/fatebound";

const fateboundRouter = express.Router();

fateboundRouter.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("Fatebound")
    .select("id, name, img");
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  if (data.length === 0) {
    return res.status(404).json({ message: "Fatebound not found" });
  }
  return res.json(data);
});

fateboundRouter.get("/:fateId/equipment", async (req, res) => {
  try {
    const { fateId } = req.params;

    // Step 1: Fetch the Fatebound ID based on the fateName
    const { data: fateboundData, error: fateboundError } = await supabase
      .from("Fatebound")
      .select("id, name")
      .eq("id", fateId)
      .single(); // Get a single result

    if (fateboundError || !fateboundData) {
      return res
        .status(400)
        .json({ error: fateboundError?.message || "Fatebound not found" });
    }

    const fateboundId = fateboundData.id;

    // Step 2: Fetch weapons where any of the three fatebound foreign keys match the fetched fateboundId
    const { data: weaponsData, error: weaponsError } = await supabase
      .from("Weapon")
      .select("*")
      .or(
        `main_fatebound.eq.${fateboundId},secondary_fatebound.eq.${fateboundId},ideal_fatebound.eq.${fateboundId}`
      );

    if (weaponsError) {
      return res.status(400).json({ error: weaponsError.message });
    }

    // Step 3: Fetch armors where any of the three fatebound foreign keys match the fetched fateboundId
    const { data: armorData, error: armorError } = await supabase
      .from("Armor")
      .select("*")
      .or(
        `main_fatebound.eq.${fateboundId},secondary_fatebound.eq.${fateboundId},ideal_fatebound.eq.${fateboundId}`
      );

    if (armorError) {
      return res.status(400).json({ error: armorError.message });
    }

    // Step 4: Combine the weapon and armor data into one response
    const responseData = {
      fatebound: fateId,
      weapons: weaponsData,
      armor: armorData,
    };

    return res.json(responseData);
  } catch (error) {
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// POST route to handle posting data with confirmation
fateboundRouter.get("/postFatebound", async (req, res) => {
  try {
    const { confirm } = req.query; // Extract "confirm" from query params

    // If confirm is not true, ask for confirmation
    if (confirm !== "true") {
      return res
        .status(400)
        .json({
          message: "Please confirm posting by adding ?confirm=true to the URL.",
        });
    }

    // Loop through fateboundData to check for duplicates in the database
    for (let item of fateboundData) {
      const { name } = item;

      // Check if a fatebound with the same name already exists in the database
      const { data: existingFatebound, error: checkError } = await supabase
        .from("Fatebound")
        .select("name")
        .eq("name", name)
        .single(); // Fetch only a single row with the given name

      if (checkError && checkError.code !== "PGRST116") {
        // If error isn't "row not found", handle it
        return res.status(500).json({ error: checkError.message });
      }

      // If the fatebound exists, update said fatebound
      if (existingFatebound) {
        const { data: updateFatebound, error: updateFateboundError } =
          await supabase
            .from("Fatebound")
            .update([item])
            .eq("name", existingFatebound.name)
            .select("name");

        if (updateFateboundError) {
          return res.status(500).json({ error: updateFateboundError });
        }

        if (!updateFatebound) {
          return res
            .status(404)
            .json({ message: `Fatebound with name '${name}' not found` });
        }
      } else {
        // If no duplicate found, insert the new fatebound data into the database
        const { error: insertError } = await supabase
          .from("Fatebound")
          .insert([item]);

        if (insertError) {
          return res.status(500).json({ error: insertError.message });
        }
      }
    }

    // If all data is posted successfully
    return res
      .status(200)
      .json({ message: "Fatebound data posted successfully." });
  } catch (error) {
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
});

fateboundRouter.get("/:id", async (req, res) => {
  const { id } = req.params; // Retrieve the fateName from the route parameter

  const { data, error } = await supabase
    .from("Fatebound")
    .select("name, description, h_description, img, 2_equip_pe, 3_equip_pe")
    .eq("id", id); // Query the database by name

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (data.length === 0) {
    return res.status(404).json({ message: "Fatebound not found" });
  }

  res.json(data[0]); // Send the first matched result
});

export default fateboundRouter;
