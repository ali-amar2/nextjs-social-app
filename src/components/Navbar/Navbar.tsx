"use client";
import React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, MenuItem, Menu } from "@mui/material";
import { AccountCircle, MoreVert as MoreIcon } from "@mui/icons-material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { logout } from "@/store/features/user.slice";

export default function Navbar() {
  const dispatch = useAppDispatch()
  const { token } = useAppSelector((store) => store.userReducer)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const router = useRouter()

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    router.push("/login");
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const currentPath = usePathname();
  const menuId = "primary-search-account-menu";
  let renderMenu = null
  if (token) {
    renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    );
  }

  const mobileMenuId = "primary-search-account-menu-mobile";
  let renderMobileMenu = null
  if (token) {
    renderMobileMenu = (
      <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: "top", horizontal: "right", }} id={mobileMenuId}
        keepMounted transformOrigin={{ vertical: "top", horizontal: "right", }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, maxHeight: "64px", marginBottom: "66px" }}>
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex" }}> <Typography variant="h6" component="div"
          sx={{
            display: "flex",
            fontWeight: "bold",
            fontSize: { xs: "18px", sm: "25px" },
            marginRight: "30px",
            lineHeight: "1",
          }}
        >
          Social App
        </Typography>

          {token &&
            <MenuItem sx={{ padding: "8px", marginRight: "10px" }}>
              <Link className={currentPath === "/" ? "active" : ""} href="/" style={{ color: "white", textDecoration: "none", fontSize: "18px", }}>
                Home
              </Link>
            </MenuItem>}

          {!token &&
            <Box sx={{ display: "flex", marginRight: 0 }}>
              <MenuItem sx={{ padding: "8px" }}>
                <Link className={currentPath === "/login" ? "active" : ""} href="/login" style={{ color: "white", textDecoration: "none", fontSize: "18px", }}>
                  Login
                </Link>
              </MenuItem>
              <MenuItem sx={{ padding: "8px" }}>
                <Link className={currentPath === "/signup" ? "active" : ""} href="/signup" style={{ color: "white", textDecoration: "none", fontSize: "18px", }}>
                  Signup
                </Link>
              </MenuItem></Box>}

          {token && <Box sx={{ flexGrow: 1 }} />}
          {token && <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>}
          {token && <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
