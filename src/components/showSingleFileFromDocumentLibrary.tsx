import {
  Box,
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
import { HiOutlinePencilAlt } from 'react-icons/hi';
import type { ShowSingleFileFromDocumentLibraryProps } from '../types/interfaces';
import { formatDate } from '../utils/formatDate';

export default function showSingleFileFromDocumentLibrary({
  file,
  size = 'lg',
}: ShowSingleFileFromDocumentLibraryProps) {
  const smallScreen = useBreakpointValue({
    base: true,
    sm: false,
  });

  return (
    <Table variant='unstyled' mt={8} mb={16} size={size}>
      <Thead bg='#ddd' textColor='black'>
        <Tr>
          <Th>Filnavn</Th>
          <Th>Opprettet</Th>
          <Th hidden={smallScreen}>Oppdatert</Th>
          <Th>Endre</Th>
        </Tr>
      </Thead>
      <Tbody textColor='black'>
        <Tr borderBottom='1px solid #ddd' bg='gray.100' key={file?.sys?.id}>
          <Td w='40%'>
            <Link href={file?.url} isExternal>
              {file?.title}
            </Link>
          </Td>
          <Td>{formatDate(file?.sys?.firstPublishedAt)}</Td>
          <Td hidden={smallScreen}>{formatDate(file?.sys?.publishedAt)}</Td>
          <Td
            _hover={{
              textColor: 'primaryLight',
            }}
          >
            <Box w='min-content'>
              <HiOutlinePencilAlt size={20} title='Endre dokument' />
            </Box>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
}
