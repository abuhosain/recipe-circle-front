"use client";

import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { ThemeSwitch } from "./theme-switch";
import NavbarDropdown from "./NavbarDropdown";

import { useUser } from "@/src/context/user.provider";
import { siteConfig } from "@/src/config/site";
import recipLogo from "@/src/assets/recipe-circle.png";

export const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <NextUINavbar
      className="bg-background/70 dark:bg-background/80 backdrop-blur-lg border-b border-divider shadow-sm"
      maxWidth="xl"
      position="sticky"
    >
      {/* Left: Logo and Brand */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
        <NavbarBrand as="li" className="gap-4 max-w-fit">
          <NextLink className="flex items-center gap-2" href="/">
            <Image
              alt="Site logo"
              className="rounded-full shadow-md"
              height={45}
              src={recipLogo}
              width={45}
            />
          </NextLink>
        </NavbarBrand>
        {/* Navigation Items */}
        <ul className="hidden lg:flex gap-6 ml-4">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  "text-md font-medium transition-all",
                  "hover:text-primary hover:underline",
                  isActive(item.href) && "text-primary font-semibold ",
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Right: User Actions */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        {user?.email ? (
          <NavbarItem>
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <NavbarItem className="flex gap-3">
            <Button
              as={Link}
              className="font-semibold px-4 py-2 rounded-lg"
              color="primary"
              href="/login"
              variant="flat"
            >
              Log In
            </Button>
            <Button
              as={Link}
              className="font-semibold px-4 py-2 rounded-lg"
              color="primary"
              href="/register"
              variant="solid"
            >
              Sign Up
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Mobile Menu Toggle */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="pt-6 pb-6 gap-4 bg-background/90 backdrop-blur-md">
        {siteConfig.navMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className={clsx(
                "w-full text-lg font-medium transition-all",
                "hover:text-primary",
                isActive(item.href) && "text-primary font-semibold",
              )}
              color="foreground"
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        {user?.email ? (
          <NavbarMenuItem>
            <NavbarDropdown />
          </NavbarMenuItem>
        ) : (
          <>
            <NavbarMenuItem>
              <Button
                as={Link}
                className="w-full font-semibold px-4 py-2 rounded-lg"
                color="primary"
                href="/login"
                variant="flat"
              >
                Log In
              </Button>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button
                as={Link}
                className="w-full font-semibold px-4 py-2 rounded-lg"
                color="primary"
                href="/register"
                variant="solid"
              >
                Sign Up
              </Button>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </NextUINavbar>
  );
};
