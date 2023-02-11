import { Box, Grid, useTheme } from "@mui/material";
import SaaSCard from "components/Dashboards/saas/Card";
import RecentWorkers from "components/Dashboards/saas/RecentWorkers";
import useTitle from "hooks/useTitle";
import BucketIcon from "icons/BucketIcon";
import EarningIcon from "icons/EarningIcon";
import WindowsLogoIcon from "icons/WindowsLogoIcon";
import { useEffect, useState } from "react";
import axios from "utils/axios";

const SaaS = () => {
  const theme = useTheme();

  const [cardList, setCardList] = useState([
    {
      price: 0,
      Icon: BucketIcon,
      title: "All Clients",
      color: theme.palette.primary.main,
    },
    {
      price: 0,
      title: "Total Workers",
      Icon: EarningIcon,
      color: theme.palette.primary.purple,
    },
    {
      price: 0,
      Icon: WindowsLogoIcon,
      title: "Total Pairs",
      color: theme.palette.primary.red,
    },
  ]);

  const [recentWorkers, setRecentWorkers] = useState([]);

  useEffect(() => {
    getStats();
    getRecentWorkers();
  }, []);

  const getStats = async () => {
    axios.get("http://localhost:5000/api/v1/admin/stats").then((response) => {
      // const data = response.data;

      setCardList([
        {
          price: response.data.totalClients,
          Icon: BucketIcon,
          title: "All Clients",
          color: theme.palette.primary.main,
        },
        {
          price: response.data.totalWorkers,
          title: "Total Workers",
          Icon: EarningIcon,
          color: theme.palette.primary.purple,
        },
        {
          price: response.data.totalPairs,
          Icon: WindowsLogoIcon,
          title: "Total Pairs",
          color: theme.palette.primary.red,
        },
      ]);
    });
  };

  const getRecentWorkers = () => {
    axios
      .get("http://localhost:5000/api/v1/admin/workers?verified=true&limit=5")
      .then((response) => {
        const data = response.data;
        setRecentWorkers(data.data);
        console.log(response.data.data);
      });
  };

  // change navbar title
  useTitle("Dashboard");

  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {cardList.map((card, index) => (
          <Grid item lg={4} xs={6} key={index}>
            <SaaSCard card={card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} pt={4}>
        <Grid item lg={12} md={12} xs={12}>
          <RecentWorkers data={recentWorkers} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SaaS;
