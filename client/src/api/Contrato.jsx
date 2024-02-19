export const columns = [
    {
      name: 'Numero de Contrato',
      selector: row => row.numberC,
    },
    {
      name: 'Fecha de Creación',
      selector: row => row.createAt,
    },
    {
      name: 'Fecha de Validez',
      selector: row => row.valid,
    },
    {
      name: 'Estado',
      selector: row => row.state
    },
    
  ];
export const data = [
    {
      numberC: 'contrato0001',
      createAt: '2021-10-10',
      valid: '2021-10-10',
      state: 'Pendiente'
  
    },
    {
      numberC: 'contrato0002',
      createAt: '2021-10-10',
      valid: '2021-10-10',
      state: 'Aprobado'
    },
    {
      numberC: 'contrato0003',
      createAt: '2021-10-10',
      valid: '2021-10-10',
      state: 'Pendiente'
    }
  ]
  
  
  