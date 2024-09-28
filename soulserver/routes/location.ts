import express from "express";
import { supabase } from "./supa";
import { locationData } from "../.data/location";

const locationRouter = express.Router();

locationRouter.get("/", async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const start = (Number(page) - 1) * Number(limit); 
  const end = start + Number(limit) - 1; 


  const { data, error } = await supabase
    .from("Location")
    .select("id, name, img")
    .range(start, end);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  if (data.length === 0) {
    return res.status(404).json({ message: "Location not found" });
  }
  return res.json(data);
});

locationRouter.get("/postLocation", async (req, res) => {
  try {
    const { confirm } = req.query;

    // If confirm is not true, ask for confirmation
    if (confirm !== "true") {
      return res.status(400).json({
        message: "Please confirm posting by adding ?confirm=true to the URL.",
      });
    }

    for (let item of locationData) {
      const { name } = item;

      const { data: existingLocation, error: checkError } = await supabase
        .from("Location")
        .select("name")
        .eq("name", name)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        // If error isn't "row not found", handle it
        return res.status(500).json({ error: checkError.message });
      }

      if (existingLocation) {
        const { data: updateLocation, error: updateLocationError } =
          await supabase
            .from("Location")
            .update([item])
            .eq("name", existingLocation.name)
            .select("name");

        if (updateLocationError) {
          return res.status(500).json({ error: updateLocationError });
        }

        if (!updateLocation) {
          return res
            .status(404)
            .json({ message: `Location with name '${name}' not found` });
        }
      } else {
        // If no duplicate found, insert the new fatebound data into the database
        const { error: insertError } = await supabase
          .from("Location")
          .insert([item]);

        if (insertError) {
          return res.status(500).json({ error: insertError.message });
        }
      }
    }
    return res
      .status(200)
      .json({ message: "Location data posted successfully." });
  } catch (e) {
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
});

export default locationRouter;
