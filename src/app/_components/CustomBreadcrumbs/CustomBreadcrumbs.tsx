"use client";
import { Breadcrumbs, Typography, Link as LinkMui } from "@mui/material";
import Link from "next/link";
import { Colors } from "@/_styles/variables/colors";

export interface BreadcrumbsType {
  breadcrumps: CustomBreadcrumbType[];
}

export interface CustomBreadcrumbType {
  text: string;
  href: string;
}

export function CustomBreadcrumbs({ breadcrumps }: BreadcrumbsType) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumps.map((breadcrump, index) =>
        breadcrumps.length == 1 || index == breadcrumps.length - 1 ? (
          <Typography
            key={index}
            fontSize={index == 0 ? 24 : 16}
            color={Colors.brand4}
          >
            {breadcrump.text}
          </Typography>
        ) : (
          <LinkMui
            key={index}
            fontSize={index == 0 ? 24 : 16}
            component={Link}
            underline="hover"
            href={breadcrump.href}
          >
            {breadcrump.text}
          </LinkMui>
        )
      )}
    </Breadcrumbs>
  );
}
