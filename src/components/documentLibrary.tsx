import * as React from 'react';
import {
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useBreakpointValue,
} from '@chakra-ui/react';
import { formatDate } from '../utils/formatDate';

interface IDocumentLibrary {
  content: {
    fileName: string;
    title: string;
    url: string;
    sys: {
      id: string;
      firstPublishedAt: string;
      publishedAt: string;
    };
  }[];
}

export default function DocumentLibrary({ content }: IDocumentLibrary) {
  const smallScreen = useBreakpointValue({
    base: true,
    sm: false,
  });

  return (
    <Table variant='unstyled' mt={8} mb={16} size='lg'>
      <Thead bg='#ddd' textColor='black'>
        <Tr>
          <Th>Filnavn</Th>
          <Th>Opprettet</Th>
          <Th hidden={smallScreen}>Oppdatert</Th>
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
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
