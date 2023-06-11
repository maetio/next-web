import {
  Autocomplete,
  Grid,
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  ThemeProvider,
  useMediaQuery,
  createTheme,
  Stack,
} from "@mui/material";
import { PageHeader } from "../app/components/PageHeader";
import React from "react";
import { purple } from "@mui/material/colors";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { competitionFormInput } from "app/types/competition";
import { AddCircle } from "@mui/icons-material";
import getDesignTokens from "./theme";

export const CreateCompetition: React.FC<{}> = () => {
  const { register, control, handleSubmit } = useForm<competitionFormInput>({
    reValidateMode: "onBlur",
  });
  const onSubmit = (data: competitionFormInput) => {
    console.log(data);
  }
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(prefersDarkMode ? 'dark' : 'light')), [prefersDarkMode]);
  return (
  <ThemeProvider theme={theme}>
    <Box
      m={2}
      alignItems="center"
      flex={"row"}
      sx={{
        height: 1,
        width: 1,
        textAlign: "center",
        padding: "3px",
      }}
    >
   <PageHeader />
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        width={700}
        sx={{
          backgroundColor: '#e7e5e4',
          border: 1,
          borderRadius: 1,
          borderColor: '#e7e5e4'
        }}
>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{}}>
          <FormLabel sx={{color: '#4f46e5', fontWeight: 800}} >Competition Name</FormLabel>
          <TextField
            {...register("competitionName")}
            sx={{ margin: 2 }}
            label="Session Name"
          ></TextField>
          <FormLabel>Sport</FormLabel>
          <Controller
            name={"sport"}
            control={control}
            render={({ field: { onChange, onBlur, value }, formState }) => (
              <Autocomplete
                sx={{ margin: 2 }}
                disablePortal
                options={options}
                onChange={(_, sport) => {
                  onChange(sport?.label);
                  return sport;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Your Sport"
                    label="Select Your Sport"
                  />
                )}
              />
            )}
          />
          <FormLabel>Competition Type</FormLabel>
          <Box
            sx={{backgroundColor: '#e7e5e4'}}>
            <Controller
              name="competitionType"
              defaultValue={""}
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  defaultValue="Pickup"
                  row
                  onChange={(_, compType) => field.onChange(compType)}
                  value={field.value}
                >
                  <FormControlLabel
                    value="Pickup"
                    control={<Radio />}
                    label="Pickup"
                    
                  />
                  <FormControlLabel
                    value="Tournament"
                    control={<Radio />}
                    label="Tournament"
                  />
                  <FormControlLabel
                    value="League"
                    control={<Radio />}
                    label="League"
                  />
                </RadioGroup>
              )}
            />
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormLabel>Start Time</FormLabel>
            <Controller
              name={"startDate"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <DatePicker
                  label="Start Date"
                  onChange={(event) => {
                    onChange(event);
                  }}
                />
              )}
            />
            <Controller
              name={"startTime"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TimePicker
                  label="Start Time"
                  onChange={(event) => {
                    onChange(event);
                  }}
                />
              )}
            />
            <FormLabel>End Time</FormLabel>
            <Controller
              name={"endDate"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <DatePicker
                  label="End Date"
                  onChange={(event) => {
                    onChange(event);
                  }}
                />
              )}
            />
            <Controller
              name={"endTime"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TimePicker
                  label="End Time"
                  onChange={(event) => {
                    onChange(event);
                  }}
                />
              )}
            />
            <TextField
              {...register("location")}
              label="Select Location"
            ></TextField>
          </LocalizationProvider>
          <Button sx={{ margin: 2, backgroundColor: "#4f46e5" }} variant="contained" startIcon={<AddCircle />} type="submit">
            Create Competition
          </Button>
        </FormControl>
      </form>
      </Grid>
    </Box>
  </ThemeProvider>
  );
};

const options = [
  { label: "Paddleball", id: 1 },
  { label: "Basketball", id: 2 },
];
