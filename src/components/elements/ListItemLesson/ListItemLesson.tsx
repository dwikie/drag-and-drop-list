import { Collapse } from "@mui/material";
import React from "react";
import { ILesson } from "../../../interfaces/ICurricullum";

export default function ListItemLesson({
  collapsed,
  lessons,
}: {
  collapsed: boolean;
  lessons: ILesson[];
}) {
  return (
    <Collapse in={collapsed || false} timeout="auto" unmountOnExit>
      asdasd
    </Collapse>
  );
}
