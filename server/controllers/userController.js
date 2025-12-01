// server/controllers/userController.js
import User from '../models/User.js';
export const getAll = async (_req, res) => res.json(await User.find());
export const getById = async (req, res) => {
  const item = await User.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};
export const create = async (req, res) => res.status(201).json(await User.create(req.body));
export const updateById = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
};
export const removeById = async (req, res) => {
  const removed = await User.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
};
export const removeAll = async (_req, res) => res.json(await User.deleteMany({}));
