import React from 'react';
import { Link, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

export default function DocumentLibrary({ content }) {
  return (
    <Table variant='unstyled' mt={8} mb={16}>
      <Thead>
        <Tr borderBottom='1px solid #333'>
          <Th>Filnavn</Th>
          <Th>Opprettet</Th>
          <Th>Oppdatert</Th>
        </Tr>
      </Thead>
      <Tbody>
        {content.map((element) => (
          <Tr borderBottom='1px solid #ddd' key={element.contentful_id}>
            <Td>
              <Link href={element.file.url} isExternal>
                {element.file.fileName}
              </Link>
            </Td>
            <Td>{element.createdAt}</Td>
            <Td>{element.updatedAt}</Td>
            {element.file.contentful_id}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
