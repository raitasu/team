import React, { useState } from 'react';

import {
  Box,
  Button,
  Img,
  Table,
  TableContainer,
  Tbody,
  Td,
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
      <Button variant="primaryOutline">Good</Button>
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
