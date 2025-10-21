"use client";

import { Card, CardContent, Typography, Avatar, Stack } from "@mui/material";
import { mockExample } from "../../mocks/user";

type ComponentExampleProps = {
  example?: typeof mockExample;
};

export default function ComponentExample({ example = mockExample }: ComponentExampleProps) {
  return (
    <Card sx={{ maxWidth: 300, margin: "auto", mt: 4, p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={example.avatar} alt={example.name} sx={{ width: 64, height: 64 }} />
        <CardContent sx={{ p: 0 }}>
          <Typography variant="h6">{example.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {example.email}
          </Typography>
        </CardContent>
      </Stack>
    </Card>
  );
}
