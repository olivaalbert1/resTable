import connectToDatabase from './connect';
import Establishment from '../../models/establishmentsModel';

export default async function handler(req, res) {
  await connectToDatabase();

  const { page = 1, pageSize = 10, sort, filter } = req.query;

  // Construir la consulta a MongoDB con filtros y ordenamiento
  const query = {};
  // ... (implementar lógica de filtrado y ordenamiento)

  const establishments = await Establishment.find(query)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort(sort);

  res.json(establishments);
}