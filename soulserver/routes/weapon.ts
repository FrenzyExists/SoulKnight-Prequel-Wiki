import express from "express";
import { supabase } from "./supa";
import { weaponData } from "../.data/weapon";

const weaponRouter = express.Router();

weaponRouter.get("/", async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const start = (Number(page) - 1) * Number(limit); 
  const end = start + Number(limit) - 1; 

  const { data, error } = await supabase
    .from("Weapon")
    .select("id, name, img")
    .range(start, end);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  if (data.length === 0) {
    return res.status(404).json({ message: "Weapon not found" });
  }
  return res.json(data);
});

weaponRouter.get("/postWeapon", async (req, res) => {
  try {
    const { confirm } = req.query;

    // If confirm is not true, ask for confirmation
    if (confirm !== "true") {
      return res.status(400).json({
        message: "Please confirm posting by adding ?confirm=true to the URL.",
      });
    }

    for (let item of weaponData) {
      const { name } = item;

      const { data: existingWeapon, error: checkError } = await supabase
        .from("Weapon")
        .select("name")
        .eq("name", name)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        // If error isn't "row not found", handle it
        return res.status(500).json({ error: checkError.message });
      }

      if (existingWeapon) {
        const { data: updateWeapon, error: updateWeaponError } =
          await supabase
            .from("Weapon")
            .update([item])
            .eq("name", existingWeapon.name)
            .select("name");

        if (updateWeaponError) {
          return res.status(500).json({ error: updateWeaponError });
        }

        if (!updateWeapon) {
          return res
            .status(404)
            .json({ message: `Weapon with name '${name}' not found` });
        }
      } else {
        // If no duplicate found, insert the new fatebound data into the database
        const { error: insertError } = await supabase
          .from("Weapon")
          .insert([item]);

        if (insertError) {
          return res.status(500).json({ error: insertError.message });
        }
      }
    }
    return res
      .status(200)
      .json({ message: "Weapon data posted successfully." });
  } catch (e) {
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
});

export default weaponRouter;
