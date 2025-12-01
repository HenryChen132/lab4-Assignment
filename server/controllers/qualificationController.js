// server/controllers/qualificationController.js
import Qualification from '../models/Qualification.js';
export const getAll = async (_req, res) => res.json(await Qualification.find());
export const getById = async (req, res) => {
  const item = await Qualification.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};
export const create = async (req, res) => res.status(201).json(await Qualification.create(req.body));
export const updateById = async (req, res) => {
  const updated = await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
};
export const removeById = async (req, res) => {
  const removed = await Qualification.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
};
export const removeAll = async (_req, res) => res.json(await Qualification.deleteMany({}));
