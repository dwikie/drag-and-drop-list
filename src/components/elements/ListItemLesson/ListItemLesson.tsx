import { Collapse } from "@mui/material";
import React from "react";
import { IEventLesson } from "../../../interfaces/IEventLesson";

export default function ListItemLesson({
  collapsed,
  lessons,
}: {
  collapsed: boolean;
  lessons: IEventLesson[];
}) {
  return (
    <Collapse in={collapsed || false} timeout="auto" unmountOnExit>
      asdasd
    </Collapse>
  );
}
