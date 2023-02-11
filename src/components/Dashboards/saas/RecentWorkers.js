import {
  Card,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { H5 } from "components/Typography";
import ScrollBar from "simplebar-react";

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

const RecentOrders = (props) => {
  return (
    <Card sx={{ padding: "2rem" }}>
      <H5>New Workers</H5>

      <ScrollBar>
        <Table>
          <TableHead
            sx={{ borderBottom: "1.5px solid", borderColor: "divider" }}
          >
            <TableRow>
              <HeadTableCell>Worker ID</HeadTableCell>
              <HeadTableCell>Name</HeadTableCell>
              <HeadTableCell>Aadhar Card</HeadTableCell>
              <HeadTableCell>Date</HeadTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.data
              ? props.data.map((item, index) => (
                  <TableRow key={index}>
                    <BodyTableCell>{item._id}</BodyTableCell>
                    <BodyTableCell>{item.name}</BodyTableCell>
                    <BodyTableCell>
                      <a href={item.aadhar_card_url} target="_blank">
                        {item.aadhar_id}
                      </a>
                    </BodyTableCell>

                    <BodyTableCell>{item.createdAt}</BodyTableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </ScrollBar>
    </Card>
  );
};

const orderList = [
  {
    orderNo: "#JY7685",
    name: "Nike Air max 170",
    image: "/static/products/shoe-1.png",
    price: 654,
    totalOrder: 325,
    totalAmount: "$1,45,660",
  },
  {
    orderNo: "#JY7686",
    name: "Cactus Plant",
    image: "/static/products/bonsai.png",
    price: 654,
    totalOrder: 40,
    totalAmount: "$1,45,420",
  },
  {
    orderNo: "#JY7687",
    name: "Minimal Pot",
    image: "/static/products/airbud.png",
    price: 654,
    totalOrder: 57,
    totalAmount: "$45,660",
  },
  {
    orderNo: "#JY7688",
    name: "Adidas Blaze",
    image: "/static/products/shoe-2.png",
    price: 654,
    totalOrder: 125,
    totalAmount: "$12,660",
  },
];

export default RecentOrders;
