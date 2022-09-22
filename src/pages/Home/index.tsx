import React, { useState } from 'react';

import {
  Box,
  Button,
  ButtonGroup,
  Img,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import {
  MdAdd,
  MdRadioButtonUnchecked,
  MdOutlineCheckCircleOutline,
  MdOutlineCancel,
  MdOutlineArrowUpward,
  MdOutlineArrowDownward
} from 'react-icons/md';

import defaultAvatar from '../../widgets/Header/assets/defaultAvatar.png';

export const Home = () => {
  const [sortUp, setSortUp] = useState(false);
  const [sortDown, setSortDown] = useState(false);
  return (
    <Box>
      Home
      <ButtonGroup
        display="flex"
        justifyContent="space-around"
        marginBottom="20px"
      >
        <Button variant="main">main</Button>
        <Button
          variant="main"
          disabled
        >
          main disabled
        </Button>
        <Button
          variant="main"
          leftIcon={<MdAdd size="26px" />}
        >
          main plus
        </Button>
        <Button
          variant="main"
          leftIcon={<MdAdd size="26px" />}
          disabled
        >
          main plus disabled
        </Button>
      </ButtonGroup>
      <ButtonGroup
        display="flex"
        justifyContent="space-around"
        marginBottom="20px"
      >
        <Button variant="secondary">secondary</Button>
        <Button
          variant="secondary"
          _hover={{
            border: 'none'
          }}
          disabled
        >
          secondary disabled
        </Button>
        <Button
          variant="secondary"
          color="brand.accentRed"
          _hover={{
            color: 'brand.ghostGray',
            border: 'none'
          }}
          leftIcon={<MdAdd size="26px" />}
        >
          secondary plus
        </Button>
        <Button
          variant="secondary"
          _hover={{
            border: 'none'
          }}
          leftIcon={<MdAdd size="26px" />}
          disabled
        >
          secondary plus disabled
        </Button>
      </ButtonGroup>
      <ButtonGroup
        marginBottom="40px"
        display="flex"
        justifyContent="space-around"
      >
        <Button
          variant="secondaryOutline"
          leftIcon={<MdAdd size="26px" />}
        >
          secondaryOutline
        </Button>
        <Button
          variant="secondaryOutline"
          leftIcon={<MdAdd size="26px" />}
          disabled
        >
          secondaryOutline disabled
        </Button>
        <Button>default</Button>
        <Button disabled>default disabled</Button>
      </ButtonGroup>
      <hr />
      <Stack
        marginTop="40px"
        marginBottom="40px"
        direction="column"
        spacing={5}
        width="320px"
      >
        <Textarea placeholder="Hello" />
        <Textarea
          placeholder="Hello"
          isInvalid
        />
        <Textarea
          placeholder="Hello"
          disabled
        />
      </Stack>
      <hr />
      <TableContainer
        marginTop="40px"
        marginBottom="40px"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Status</Th>
              <Th>
                <Box
                  display="flex"
                  alignItems="center"
                >
                  Name
                  <Box
                    display="flex"
                    flexDirection="column"
                    marginLeft="9px"
                  >
                    <MdOutlineArrowUpward
                      size="10px"
                      color={sortUp ? '#EF4523' : ''}
                      onClick={() => {
                        setSortUp(!sortUp);
                        setSortDown(false);
                      }}
                    />
                    <MdOutlineArrowDownward
                      size="10px"
                      color={sortDown ? '#EF4523' : ''}
                      onClick={() => {
                        setSortDown(!sortDown);
                        setSortUp(false);
                      }}
                    />
                  </Box>
                </Box>
              </Th>
              <Th>
                <Box
                  display="flex"
                  alignItems="center"
                >
                  Position
                  <Box
                    display="flex"
                    flexDirection="column"
                    marginLeft="9px"
                  >
                    <MdOutlineArrowUpward
                      size="10px"
                      color={sortUp ? '#EF4523' : ''}
                      onClick={() => {
                        setSortUp(!sortUp);
                        setSortDown(false);
                      }}
                    />
                    <MdOutlineArrowDownward
                      size="10px"
                      color={sortDown ? '#EF4523' : ''}
                      onClick={() => {
                        setSortDown(!sortDown);
                        setSortUp(false);
                      }}
                    />
                  </Box>
                </Box>
              </Th>
              <Th>
                <Box
                  display="flex"
                  alignItems="center"
                >
                  Location
                  <Box
                    display="flex"
                    flexDirection="column"
                    marginLeft="9px"
                  >
                    <MdOutlineArrowUpward
                      size="10px"
                      color={sortUp ? '#EF4523' : ''}
                      onClick={() => {
                        setSortUp(!sortUp);
                        setSortDown(false);
                      }}
                    />
                    <MdOutlineArrowDownward
                      size="10px"
                      color={sortDown ? '#EF4523' : ''}
                      onClick={() => {
                        setSortDown(!sortDown);
                        setSortUp(false);
                      }}
                    />
                  </Box>
                </Box>
              </Th>
              <Th>
                <Box
                  display="flex"
                  alignItems="center"
                >
                  Date of birth
                  <Box
                    display="flex"
                    flexDirection="column"
                    marginLeft="9px"
                  >
                    <MdOutlineArrowUpward
                      size="10px"
                      color={sortUp ? '#EF4523' : ''}
                      onClick={() => {
                        setSortUp(!sortUp);
                        setSortDown(false);
                      }}
                    />
                    <MdOutlineArrowDownward
                      size="10px"
                      color={sortDown ? '#EF4523' : ''}
                      onClick={() => {
                        setSortDown(!sortDown);
                        setSortUp(false);
                      }}
                    />
                  </Box>
                </Box>
              </Th>
              <Th>
                <Box
                  display="flex"
                  alignItems="center"
                >
                  Current projects
                  <Box
                    display="flex"
                    flexDirection="column"
                    marginLeft="9px"
                  >
                    <MdOutlineArrowUpward
                      size="10px"
                      color={sortUp ? '#EF4523' : ''}
                      onClick={() => {
                        setSortUp(!sortUp);
                        setSortDown(false);
                      }}
                    />
                    <MdOutlineArrowDownward
                      size="10px"
                      color={sortDown ? '#EF4523' : ''}
                      onClick={() => {
                        setSortDown(!sortDown);
                        setSortUp(false);
                      }}
                    />
                  </Box>
                </Box>
              </Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Box color="brand.accentYellow">
                  <MdRadioButtonUnchecked size="26px" />
                </Box>
              </Td>
              <Td>
                <Box
                  display="flex"
                  alignItems="center"
                  color="brand.headline"
                  fontWeight="500"
                >
                  <Img
                    marginRight="8px"
                    src={defaultAvatar}
                    borderRadius="50%"
                    width="32px"
                    height="32px"
                  />
                  Aleksandr Mishchenko
                </Box>
              </Td>
              <Td>PM</Td>
              <Td>Minsk, Belarus</Td>
              <Td>September 10, 1985</Td>
              <Td>
                <Box color="brand.lightGray">No current projects</Box>
              </Td>
              <Td>
                <Button
                  variant="secondaryOutline"
                  leftIcon={<MdAdd size="26px" />}
                >
                  CV
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Box color="brand.accentGreen">
                  <MdOutlineCheckCircleOutline size="26px" />
                </Box>
              </Td>
              <Td>
                <Box
                  display="flex"
                  alignItems="center"
                  color="brand.headline"
                  fontWeight="500"
                >
                  <Img
                    marginRight="8px"
                    src={defaultAvatar}
                    borderRadius="50%"
                    width="32px"
                    height="32px"
                  />
                  Aleksandra Dobysh
                </Box>
              </Td>
              <Td>Chief Swimming Instructor</Td>
              <Td>Minsk, Belarus</Td>
              <Td>November 24, 1995</Td>
              <Td>CEO</Td>
              <Td>
                <Button
                  variant="secondaryOutline"
                  leftIcon={<MdAdd size="26px" />}
                >
                  CV
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Box color="brand.accentRed">
                  <MdOutlineCancel size="26px" />
                </Box>
              </Td>

              <Td>
                {' '}
                <Box
                  display="flex"
                  alignItems="center"
                  color="brand.headline"
                  fontWeight="500"
                >
                  <Img
                    marginRight="8px"
                    src={defaultAvatar}
                    borderRadius="50%"
                    width="32px"
                    height="32px"
                  />
                  Alik Krynitsky
                </Box>
              </Td>
              <Td>Team Lead/Senior Software Developer</Td>
              <Td>Minsk, Belarus</Td>
              <Td>January 21, 1984</Td>
              <Td>
                <Box color="brand.lightGray">No current projects</Box>
              </Td>
              <Td>
                <Button
                  variant="secondaryOutline"
                  leftIcon={<MdAdd size="26px" />}
                >
                  CV
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
