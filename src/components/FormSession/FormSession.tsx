import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  FormHelperText,
  TextField,
  Box,
  Alert,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { id, enUS } from "date-fns/locale";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ILesson } from "../../interfaces/ICurricullum";
import React from "react";
import { Add } from "@mui/icons-material";
import { useEventCtx } from "../../contexts/EventCtx";

interface IFormSession {
  sessionId: string;
  closeDrawer: () => void;
}

export default function FormSession({ sessionId, closeDrawer }: IFormSession) {
  const [schedule, setSchedule] = React.useState<null | Date>(null);
  const [error, setError] = React.useState<string>("");
  const eventCtx = useEventCtx();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Lesson name's is required."),
    schedule: Yup.date()
      .transform((value, origin) => {
        if (origin === null) return undefined;
        return value;
      })
      .required("Lesson schedule's is required.")
      .typeError("Please enter a valid date format."),
    duration: Yup.number()
      .required("Lesson duration's is required.")
      .positive("Lesson duration's must be a positive number."),
    type: Yup.string().required("Lesson type's is required"),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      duration: undefined,
      name: "",
      previewable: false,
      required: false,
      schedule: null,
      type: undefined,
    } as ILesson,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await eventCtx.addLesson(sessionId, values);
        closeDrawer();
      } catch (err) {
        setError(String(err));
        throw new Error(String(err));
      }
    },
  });

  return (
    <Box display="flex" flexDirection="column" rowGap={3}>
      {error && (
        <Alert severity="error" color="error">
          {error}
        </Alert>
      )}
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "1.25rem",
        }}
        autoComplete="off">
        <FormControl>
          <TextField
            variant="outlined"
            name="name"
            label="Lesson Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </FormControl>
        <Grid container spacing={2.5}>
          <Grid item sm={8} xs={12}>
            <FormControl fullWidth>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={
                  navigator.language === "id" || navigator.language === "id-ID"
                    ? id
                    : enUS
                }>
                <DateTimePicker
                  disablePast
                  label="Schedule"
                  value={schedule}
                  onChange={(value) => {
                    formik.setValues(
                      { ...formik.values, schedule: value },
                      true
                    );
                    setSchedule(value);
                  }}
                  inputFormat="dd/MM/yyyy, HH:mm"
                  mask="__/__/____, __:__"
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      name="schedule"
                      error={
                        formik.touched.schedule &&
                        Boolean(formik.errors.schedule)
                      }
                      helperText={
                        formik.touched.schedule && formik.errors.schedule
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item sm={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                name="duration"
                label="Duration (minute)"
                type="number"
                inputProps={{
                  pattern: "^[1-9]+[0-9]*$",
                }}
                value={formik.values.duration || ""}
                onChange={formik.handleChange}
                error={
                  formik.touched.duration && Boolean(formik.errors.duration)
                }
                helperText={formik.touched.duration && formik.errors.duration}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <RadioGroup row name="type" onChange={formik.handleChange}>
            <FormControlLabel
              value="online"
              control={<Radio checked={formik.values.type === "online"} />}
              label="Online"
            />
            <FormControlLabel
              value="onsite"
              control={<Radio checked={formik.values.type === "onsite"} />}
              label="Onsite"
            />
          </RadioGroup>
          {formik.touched.type && Boolean(formik.errors.type) && (
            <FormHelperText error>{formik.errors.type}</FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.required}
                onChange={formik.handleChange}
                name="required"
              />
            }
            label="Required"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.previewable}
                onChange={formik.handleChange}
                name="previewable"
              />
            }
            label="Previewable"
          />
        </FormControl>
        <Button
          startIcon={<Add />}
          style={{
            alignSelf: "flex-end",
          }}
          variant="contained"
          type="submit">
          Add Lesson
        </Button>
      </form>
    </Box>
  );
}
