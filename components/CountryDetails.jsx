import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Skeleton,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { DataContext } from "../contexts/DataContext";
import NotFoundImage from "../assets/images/not-found.png";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const notFound = (text) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: 4,
        flexGrow: 1,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          padding: 2,
          maxWidth: 600,
          boxShadow: "none",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "max-content",
            height: 180,
            objectFit: "contain",
          }}
          image={NotFoundImage}
          alt="Not Found"
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {text}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please try searching again or check for any spelling mistakes.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

const loadingEffect = () => {
  return (
    <Box sx={{ padding: 4, display: "flex", flexGrow: 1 }}>
      <Box sx={{ width: "100%" }}>
        <Skeleton variant="text" width="60%" height={60} sx={{ mx: "auto" }} />
        <Skeleton
          variant="rectangular"
          width={400}
          height={300}
          sx={{ mx: "auto" }}
        />

        {/* Country Details */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            mb: 4,
            mt: 4,
            backgroundColor: "#C0C0C0",
            borderRadius: "4px",
            p: 2,
          }}
        >
          <Box sx={{ width: "50%" }}>
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} variant="text" height={30} sx={{ mb: 1 }} />
              ))}
          </Box>

          <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} variant="text" height={30} sx={{ mb: 1 }} />
              ))}
          </Box>
        </Box>

        {/* Border Countries */}
        <Box>
          <Typography variant="body1">
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", flexWrap: "wrap" }}
            >
              <Skeleton variant="text" width="30%" />
              <Skeleton variant="text" width="60%" />
            </Stack>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default function CountryDetails() {
  const { countries, loading, error, searchedCountry } =
    useContext(DataContext);
  const params = useParams();
  const countryNameFromParams = params.country.replaceAll("-", " ");
  const navigate = useNavigate();

  if (loading) return loadingEffect();
  if (error) return <p>Error: {error}</p>;
  if (!countries || countries.length === 0)
    return <p>No countries available.</p>;

  const country = countries.filter((info) => {
    if (searchedCountry === null || searchedCountry === "")
      return info.name.common.toLowerCase() == countryNameFromParams;
    else return info.name.common.toLowerCase() == searchedCountry.toLowerCase();
  });

  if (country.length === 0) {
    return notFound("Searched 'Country' data is not available");
  }

  const fedLanguages = () => {
    if (country[0].languages) {
      const languages = Object.entries(country[0].languages);
  
      const formatLanguages = languages
        .map(([code, name]) => `${name} (${code})`)
        .join(", ");
      return formatLanguages;
    }
  };

  function ClickableChips(countryName) {
    console.info("You clicked the Chip.", countryName);
  }

  const borderCountriesData = (cca3) => {
    const data = countries.filter((val) => {
      return val.cca3 === cca3;
    });

    const name = data[0].name.common;
    const param = name.toLowerCase().replaceAll(" ", "-");
    return [name, param];
  };

  return (
    <Box sx={{ padding: 4, display: "flex", flexGrow: 1,flexDirection:"column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          padding: 2,
          gap: 2, // Gap between children for spacing
        }}
      >
        {/* Back Button */}
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{
            alignSelf: { xs: "stretch", sm: "auto" }, // Full width on mobile, auto on larger screens
          }}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
          {country[0].name.common}
        </Typography>
        <CardMedia
          component="img"
          image={country[0].flags.svg}
          alt={`${country[0].name.common} flag`}
          sx={{
            objectFit: "fill",
            maxWidth: "400px",
            margin: "auto",
            border: "1px solid black",
          }}
        />

        {/* Flag and details section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            mb: 4,
            mt: 4,
            backgroundColor: "#C0C0C0",
            borderRadius: "4px",
            p: 2,
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "50%" }, pl: 1, pr: 1 }}>
            <Typography variant="body1">
              <strong>Capital:</strong>{" "}
              {country[0].capital ? country[0].capital[0] : ""}
            </Typography>
            <Typography variant="body1">
              <strong>Official Name:</strong> {country[0].name.official}
            </Typography>
            <Typography variant="body1">
              <strong>Population:</strong>{" "}
              {country[0].population.toLocaleString("en-In")}
            </Typography>
            <Typography variant="body1">
              <strong>Region:</strong> {country[0].region}
            </Typography>
            <Typography variant="body1">
              <strong>Subregion:</strong> {country[0].subregion}
            </Typography>
            <Typography variant="body1">
              <strong>Timezones:</strong> {country[0].timezones[0]}
            </Typography>
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "50%" }, pl: 1, pr: 1 }}>
            <Typography variant="body1">
              <strong>Continents:</strong> {country[0].continents[0]}
            </Typography>
            <Typography variant="body1">
              <strong>Languages:</strong> {fedLanguages()}
            </Typography>
            <Typography variant="body1">
              <strong>Vehicle Driving Side:</strong>{" "}
              {country[0].car.side[0].toUpperCase() +
                country[0].car.side.slice(1)}
            </Typography>
            <Typography variant="body1">
              <strong>TLD:</strong> {country[0].tld[0]}
            </Typography>
            <Typography variant="body1">
              <strong>UN Member:</strong>{" "}
              {country[0].unMember.toString() ? "Yes" : "No"}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="body1" sx={{ display: "inline" }}>
            <strong>Border Countries: </strong>
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", flexWrap: "wrap", display: "inline" }}
          >
            {country[0].borders
              ? country[0].borders.map((d, i) => {
                  const [name, param] = borderCountriesData(d);

                  return (
                    <Chip
                      key={param}
                      label={name}
                      variant="outlined"
                      onClick={() => {
                        navigate(`../${param}`);
                      }}
                      style={{ margin: "2px 4px" }}
                    />
                  );
                })
              : " No borders found."}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}