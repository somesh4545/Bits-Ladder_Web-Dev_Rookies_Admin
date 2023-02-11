import { TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Card,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import useTitle from "hooks/useTitle";
import ScrollBar from "simplebar-react";
import axios from "utils/axios";

import { useEffect, useState } from "react";
// styled components
const StyledCard = styled(Card)(() => ({
  position: "relative",
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
}));

const ContentWrapper = styled(FlexBox)(() => ({
  top: -20,
  alignItems: "center",
  position: "relative",
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.primary,
}));

const StyledTabList = styled(TabList)(({ theme }) => ({
  [theme.breakpoints.down(780)]: {
    width: "100%",
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-between",
    },
    marginBottom: 20,
  },
  [theme.breakpoints.up("sm")]: {
    "& .MuiTabs-flexContainer": {
      minWidth: 400,
      justifyContent: "space-between",
    },
  },
}));

const StyledTabPanel = styled(TabPanel)(() => ({
  padding: 0,
}));

const commonCSS = {
  minWidth: 120,
  "&:nth-of-type(2)": { minWidth: 170 },
  "&:nth-of-type(3)": { minWidth: 80 },
};

// Styled components
const HeadTableCell = styled(TableCell)(() => ({
  fontSize: 12,
  fontWeight: 600,
  "&:first-of-type": { paddingLeft: 0 },
  "&:last-of-type": { paddingRight: 0 },
}));

const BodyTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  padding: 0,
  paddingLeft: "1rem",
  paddingTop: "0.7rem",
  "&:first-of-type": { paddingLeft: 0 },
  "&:last-of-type": { paddingRight: 0 },
  [theme.breakpoints.down("sm")]: { ...commonCSS },
  [theme.breakpoints.between(960, 1270)]: { ...commonCSS },
}));

const Pairs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPairs();
  }, []);

  const getPairs = () => {
    axios.get("http://localhost:5000/api/v1/admin/pairing").then((response) => {
      const data = response.data.data;
      setData(data);
      console.log(data);
    });
  };

  useTitle("Pairs ");

  return (
    <Box pt={2} pb={4}>
      <ScrollBar>
        <Table>
          <TableHead
            sx={{ borderBottom: "1.5px solid", borderColor: "divider" }}
          >
            <TableRow>
              <HeadTableCell>Pairing ID</HeadTableCell>
              <HeadTableCell>Worker Name</HeadTableCell>
              <HeadTableCell>Owner Name</HeadTableCell>
              <HeadTableCell>Title</HeadTableCell>
              <HeadTableCell>Amount</HeadTableCell>
              <HeadTableCell>Date</HeadTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data
              ? data.map((item, index) => (
                  <TableRow key={index}>
                    <BodyTableCell>{item._id}</BodyTableCell>
                    <BodyTableCell>{item.worker.name}</BodyTableCell>
                    <BodyTableCell>{item.owner.name}</BodyTableCell>
                    <BodyTableCell>{item.post.title}</BodyTableCell>
                    <BodyTableCell>
                      {item.post.winner.quotation_amnt}
                    </BodyTableCell>
                    <BodyTableCell>{item.createdAt}</BodyTableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </ScrollBar>
    </Box>
  );
};

export default Pairs;
