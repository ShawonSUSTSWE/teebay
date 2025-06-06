"use client";

import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { PageRoutes } from "@/lib/utils/routeUtils";
import { logout } from "@/actions/authActions";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/Button/Button";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ mr: 4 }}>
          Teebay
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} href={PageRoutes.home}>
            My Products
          </Button>
          <Button
            color="inherit"
            component={Link}
            href={PageRoutes.productsList}
          >
            All Products
          </Button>
          <Button
            color="inherit"
            component={Link}
            href={PageRoutes.transactions}
          >
            My Transactions
          </Button>
        </Box>
        <CustomButton variant="secondary" onClick={handleLogout}>
          Logout
        </CustomButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
