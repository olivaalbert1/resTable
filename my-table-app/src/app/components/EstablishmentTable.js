// components/ProductTable.js
import { useTable } from 'react-table';
import { useEffect, useState } from 'react';

// ... (código para obtener los datos de la API)

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Price', accessor: 'price' },
  { Header: 'Category', accessor: 'category' },
];

// ... (código para crear la tabla utilizando useTable)