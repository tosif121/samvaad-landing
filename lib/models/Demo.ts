import mongoose, { Schema, model, models } from 'mongoose';

const DemoSchema = new Schema({
  name:        { type: String, required: true, trim: true },
  email:       { type: String, required: true, trim: true, lowercase: true },
  phone:       { type: String, required: true, trim: true },
  company:     { type: String, trim: true, default: '' },
  useCase:     { type: String, enum: ['sales', 'support', 'collections', 'appointments', 'other'], default: 'sales' },
  callVolume:  { type: String, enum: ['<500', '500-5000', '5000-50000', '50000+'], default: '<500' },
  message:     { type: String, trim: true, default: '' },
  status:      { type: String, enum: ['pending', 'contacted', 'completed'], default: 'pending' },
  createdAt:   { type: Date, default: Date.now },
});

export const Demo = models.Demo || model('Demo', DemoSchema);
