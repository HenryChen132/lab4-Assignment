// server/controllers/contactController.js
import Contact from '../models/Contact.js';

export const getAll = async (req, res) => {
  const items = await Contact.find();
  res.json(items);
};
export const getById = async (req, res) => {
  const item = await Contact.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};
export const create = async (req, res) => {
  const created = await Contact.create(req.body);
  res.status(201).json(created);
};
export const updateById = async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
};
export const removeById = async (req, res) => {
  const removed = await Contact.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
};
export const removeAll = async (_req, res) => {
  await Contact.deleteMany({});
  res.json({ ok: true });
};
