import {
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { HiTrash } from 'react-icons/hi';
import type { IDocumentLibrary } from '../types/interfaces';
import { formatDate } from '../utils/formatDate';

export default function DocumentLibrary({
  content,
  size = 'lg',
  hasDeleteAccess = false,
}: IDocumentLibrary) {
  const smallScreen = useBreakpointValue({
    base: true,
    sm: false,
  });

  return (
    <Table variant='unstyled' mt={8} mb={8} size={size}>
      <Thead bg='#ddd' textColor='black'>
        <Tr>
          <Th>Filnavn</Th>
          <Th>Opprettet</Th>
          <Th hidden={smallScreen}>Oppdatert</Th>
          <Th hidden={!hasDeleteAccess}>Slett</Th>
        </Tr>
      </Thead>
      <Tbody textColor='black'>
        {content.map((element) => (
          <Tr borderBottom='1px solid #ddd' bg='gray.100' key={element.sys.id}>
            <Td>
              <Link href={element.url} isExternal>
                {element.title}
              </Link>
            </Td>
            <Td>{formatDate(element.sys.firstPublishedAt)}</Td>
            <Td hidden={smallScreen}>{formatDate(element.sys.publishedAt)}</Td>
            <Td
              hidden={!hasDeleteAccess}
              textColor={'red.600'}
              _hover={{
                textColor: 'primaryLight',
              }}
            >
              <HiTrash size={20} title='Slett dokument' />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
