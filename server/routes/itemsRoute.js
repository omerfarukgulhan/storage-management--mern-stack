import express from "express";
import { Item } from "../models/itemModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await Item.find({});
    return res
      .status(200)
      .json({ status: "Success", count: items.length, data: { items } });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    return res.status(200).json({ status: "Success", data: { item } });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.name || !req.body.quantity) {
      return res.status(400).send({
        message: "Send all required fields: name, quantity",
      });
    }
    const newItem = {
      name: req.body.name,
      quantity: req.body.quantity,
      description: req.body.description || "",
    };

    const item = await Item.create(newItem);

    return res.status(201).json({ status: "Success", data: { item } });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.name || !req.body.quantity) {
      return res.status(400).send({
        message: "Send all required fields: name, quantity",
      });
    }
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body);

    if (!item) {
      res.status(404).send({ message: "Item not found" });
    }

    return res.status(200).json({ status: "Success", data: { item } });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      res.status(404).send({ message: "Item not found" });
    }

    return res.status(200).json({ status: "Success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
