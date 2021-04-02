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

interface IDocumentLibrary {
  content: {
    contentful_id: string;
    title?: string;
    file: {
      url: string;
      fileName: string;
    };
    createdAt: string;
    updatedAt: string;
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
      <Tbody>
        {content.map((element) => (
          <Tr
            borderBottom='1px solid #ddd'
            bg='gray.100'
            key={element.contentful_id}
          >
            <Td>
              <Link href={element.file.url} isExternal>
                {element.title}
              </Link>
            </Td>
            <Td>{element.createdAt}</Td>
            <Td hidden={smallScreen}>{element.updatedAt}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
