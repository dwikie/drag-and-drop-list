import React from "react";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemProps,
  Typography,
} from "@mui/material";
import { ILesson } from "../../interfaces/ICurricullum";
import {
  DragIndicator,
  FileDownloadOutlined,
  PlaceOutlined,
  Schedule,
  VideocamOutlined,
} from "@mui/icons-material";

interface ILessonList extends ListItemProps {
  lesson: ILesson;
}

export default function LessonList({ lesson, ...rest }: ILessonList) {
  return (
    <Box component="div" paddingLeft="1.5rem">
      <ListItem {...rest} divider>
        <ListItemIcon onClick={(e) => e.stopPropagation()}>
          <DragIndicator fontSize="small" sx={{ alignSelf: "center" }} />
        </ListItemIcon>
        <Box flex="1 1 0" display="inline-flex">
          {lesson.type === "online" ? (
            <VideocamOutlined fontSize="small" sx={{ alignSelf: "center" }} />
          ) : (
            <PlaceOutlined fontSize="small" sx={{ alignSelf: "center" }} />
          )}
          <Box
            marginLeft="1rem"
            flex="1 1 0"
            display="inline-flex"
            flexWrap="wrap"
            columnGap={3}
            rowGap={1}
            justifyContent="space-between"
            alignItems="center">
            <Box
              flex="1 1 0"
              display="inline-flex"
              flexWrap="wrap"
              alignItems="center"
              columnGap={2}>
              <Typography variant="subtitle2">{lesson.name}</Typography>
              {lesson.required && (
                <Typography variant="body2" color="primary">
                  Required
                </Typography>
              )}
              {lesson.previewable && (
                <Typography
                  variant="body2"
                  color={({ palette }) => palette.grey["500"]}>
                  Previewable
                </Typography>
              )}
            </Box>
            <Box
              alignItems="center"
              display="inline-flex"
              rowGap={0.5}
              columnGap={1}
              flexWrap="wrap">
              {lesson.schedule && (
                <Box
                  display="inline-flex"
                  justifyContent="space-between"
                  columnGap={1}
                  alignItems="center">
                  <Schedule fontSize="small" />
                  <Typography variant="body2" width="145px">
                    {new Intl.DateTimeFormat("id-ID", {
                      dateStyle: "long",
                      timeStyle: "short",
                    }).format(new Date(lesson.schedule))}
                  </Typography>
                </Box>
              )}
              {lesson.duration && (
                <Box
                  display="inline-flex"
                  gap={1}
                  alignItems="center"
                  textAlign="center"
                  component="span">
                  <Schedule fontSize="small" />
                  <Typography variant="body2" width="40px">
                    {`${String(Math.floor(lesson.duration / 60)).padStart(
                      2,
                      "0"
                    )}:${String(lesson.duration % 60).padStart(2, "0")}`}
                  </Typography>
                </Box>
              )}
              {lesson.downloadable && (
                <Box
                  display="inline-flex"
                  gap={1}
                  alignItems="center"
                  textAlign="center"
                  component="span">
                  <FileDownloadOutlined fontSize="small" />
                  <Typography variant="body2" width="40px">
                    Downloadable
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </ListItem>
    </Box>
  );
}
