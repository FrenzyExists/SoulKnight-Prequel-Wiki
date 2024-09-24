import express from "express";
import { supabase } from "./supa";
import { bossData } from "../.data/boss";

const bossRouter = express.Router();

bossRouter.get("/", async (req, res) => {
  const { data, error } = await supabase.from("Boss").select("id, name, img");

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  if (data.length === 0) {
    return res.status(404).json({ message: "Boss not found" });
  }
  return res.json(data);
});


bossRouter.get("/postBoss", async (req, res) => {
  try {
    const { confirm } = req.query;

    if (confirm !== "true") {
      return res.status(400).json({
        message: "Please confirm posting by adding ?confirm=true to the URL.",
      });
    }

    for (let item of bossData) {
      const { name } = item;

      const { data: existingBoss, error: checkError } = await supabase
        .from("Boss")
        .select("name")
        .eq("name", name)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        return res.status(500).json({ error: checkError.message });
      }

      if (existingBoss) {
        const { data: updateBoss, error: updateBossError } =
          await supabase
            .from("Boss")
            .update([item])
            .eq("name", existingBoss.name)
            .select("name");

        if (updateBossError) {
          return res.status(500).json({ error: updateBossError });
        }

        if (!updateBoss) {
          return res
            .status(404)
            .json({ message: `Boss with name '${name}' not found` });
        }
      } else {
        // If no duplicate found, insert the new fatebound data into the database
        const { error: insertError } = await supabase
          .from("Boss")
          .insert([item]);

        if (insertError) {
          return res.status(500).json({ error: insertError.message });
        }
      }
    }
    return res
      .status(200)
      .json({ message: "Boss data posted successfully." });
  } catch (e) {
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
});

export default bossRouter;
