import mongoose from 'mongoose';

const establishmentsSchema = new mongoose.Schema({
  name: String,
  price: Number,
  address: String,
});

const Establishments = mongoose.models.Establishment || mongoose.model('Establishment', EstablishmentSchema);

export default Establishment;