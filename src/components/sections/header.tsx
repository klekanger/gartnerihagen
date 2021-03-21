//
// Main header component
//

import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import {
  Box,
  Flex,
  Text,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from '@chakra-ui/react';
import { AiOutlineMenu, AiOutlineUp } from 'react-icons/ai';
import GartnerihagenLogo from '../../images/gartnerihagen.svg';
import { IdentityContext } from '../../context/identity-context';

interface HeaderProps {
  children: React.ReactNode;
}

interface MenuItemsProps {
  to: string;
  children: string;
  isLast?: boolean;
}

export default function Header(props: HeaderProps) {
  const [showMenuItems, setShowMenuItems] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const { user, netlifyIdentity } = useContext(IdentityContext);
  const toggleMenu = () => setShowMenuItems(!showMenuItems);

  // Hide menu if scrolled more than 15 % of the screen height
  const handleScroll = () => {
    const yPos: number = window.scrollY || 0;
    const scrHeight: number = window.innerHeight || 900;
    yPos > (scrHeight / 100) * 15 ? setHideMenu(true) : setHideMenu(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Hide open hamburger menu items when scrolled down
  useEffect(() => {
    setShowMenuItems(false);
  }, [hideMenu]);

  // Render one menu item
  const MenuItems = (props: MenuItemsProps) => {
    const { children, isLast, to = '/', ...rest } = props;
    return (
      <Text
        variant='light'
        mb={{ base: isLast ? '-14px' : 8, sm: '-14px' }}
        mr={{ base: 0, sm: isLast ? 0 : 8 }}
        fontSize={['md', 'md', 'md', 'xl']}
        display='block'
        onClick={() => setShowMenuItems(false)}
        {...rest}
      >
        <Link
          as={GatsbyLink}
          to={to}
          _hover={{ textDecor: 'none' }}
          _focus={{
            outline: 'none',
            borderBottom: '2px solid #d9edff',
            pb: '5px',
          }}
        >
          {children}
        </Link>
      </Text>
    );
  };

  // Show user name or "Logg inn" on Login button
  const userName = user?.user_metadata.full_name || '';
  const loginButtonText =
    userName !== '' ? userName.slice(0, 6).padEnd(9, '.') : 'Logg inn';

  const loginButton = !user ? (
    <Button
      bg='primaryButton'
      color='black'
      size='md'
      fontSize='sm'
      fontWeight={600}
      rounded='md'
      ml={{ base: '0px', md: '20px', lg: '30px' }}
      mt={{ base: '20px', sm: '0px' }}
      onClick={() => netlifyIdentity.open()}
      _hover={{ bgColor: 'secondaryButton' }}
    >
      {loginButtonText}
    </Button>
  ) : (
    <Menu>
      <MenuButton
        as={Button}
        bg='primaryButton'
        color='black'
        ml={{ base: '0px', md: '20px', lg: '30px' }}
        mt={{ base: '20px', sm: '0px' }}
        _hover={{ bgColor: 'secondaryButton' }}
      >
        {loginButtonText}
      </MenuButton>
      <MenuList bg='secondaryButton' color='dark'>
        <MenuItem
          onClick={() => netlifyIdentity.logout()}
          _hover={{ textDecor: 'none', textColor: 'accent' }}
        >
          Logg ut
        </MenuItem>
        <MenuItem>
          <Link
            as={GatsbyLink}
            to='/min-side'
            _hover={{ textDecor: 'none', textColor: 'accent' }}
          >
            Min side
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      w='100%'
      mt={hideMenu ? '-150' : '0'}
      pt={4}
      pb={5}
      px={[4, 4, 10, 10]}
      {...props}
      bgColor='dark'
      opacity={showMenuItems ? '100%' : '90%'}
      position='fixed'
      zIndex='banner'
      shadow='md'
      transition='margin-top 0.5s'
    >
      <Link as={GatsbyLink} to='/' _focus={{ outline: 'none' }}>
        <Icon
          as={GartnerihagenLogo}
          w={['60vw', '55vw', '35vw', '25vw']}
          h='auto'
          aria-label='Gartnerihagen logo'
          alt='Gartnerihagen logo'
        />
      </Link>

      <Box
        display={{ base: 'block', md: 'none' }}
        color='light'
        onClick={toggleMenu}
      >
        {showMenuItems ? (
          <AiOutlineUp className='menuClose' size='2em' />
        ) : (
          <AiOutlineMenu className='menuOpen' size='2em' />
        )}
      </Box>
      <Box
        display={{
          base: showMenuItems ? 'block' : 'none',
          md: 'block',
        }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Flex
          align={['center', 'center', 'center', 'center']}
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          <MenuItems to='/informasjon'>For beboere</MenuItems>
          <MenuItems to='/blog'>Blogg</MenuItems>
          <MenuItems to='/om-boligsameiet-gartnerihagen'>Om oss</MenuItems>
          <MenuItems to='/styret' isLast>
            Styret
          </MenuItems>

          {loginButton}
        </Flex>
      </Box>
    </Flex>
  );
}
