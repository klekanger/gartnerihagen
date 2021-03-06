import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

export default function DocumentLibrary({ title, excerpt, content }) {
  content = [
    {
      fileName: 'Årsmøte 14.5.2020.pdf',
      date: '25.2.2021',
    },
    {
      fileName: 'Møte 14.5.2020.pdf',
      date: '25.2.2021',
    },
    {
      fileName: 'Årsmøte 5.5.2019.pdf',
      date: '5.5.2019',
    },
  ];

  return (
    <Table variant='unstyled' mt={8} mb={16}>
      <Thead>
        <Tr borderBottom='1px solid #333'>
          <Th>Filnavn</Th>
          <Th>Dato</Th>
        </Tr>
      </Thead>
      <Tbody>
        {content.map((element) => (
          <Tr borderBottom='1px solid #ddd'>
            <Td>{element.fileName}</Td>
            <Td>{element.date}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
