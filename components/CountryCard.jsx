import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/DataContext";
import { Link } from "react-router-dom";
import { Skeleton, Box, Select, MenuItem } from "@mui/material";
import NotFoundImage from "../assets/images/not-found.png";

import { useState, useEffect, useContext } from "react";
import {
  Box,
  Select,
  MenuItem,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const loadingEffect = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", flexGrow: 1 }}>
      {Array.from({ length: 12 }).map((country, index) => (
        <Card
          key={index}
          sx={{
            maxWidth: 300,
            margin: "16px auto",
            boxShadow: 3,
            flexBasis: { xs: "90%", sm: "30%" },
            minWidth: { xs: "80%", sm: "28%" },
          }}
        >
          <Link>
            <Skeleton variant="rectangular" width="100%" height={160} />
            <CardContent>
              <Skeleton variant="text" width="80%" height={30} />
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width="40%" height={20} />
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
};

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
            width: { xs: "100%", md: "max-content" },
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

export default function CountryCard() {
  const { countries, error, searchedCountry } = useContext(DataContext);

  // Initialize states
  const [continentFilter, setContinentFilter] = useState("All");
  const [usableRawData, setUsableRawData] = useState([]);

  useEffect(() => {
    setUsableRawData(countries);
  }, [countries]);

  if (error) return notFound("Error fetching the data.");
  if (usableRawData.length == 0) {
    return loadingEffect();
  }

  const UIFunction = (props) => {
    const providedCountryData = props.data;
    return (
      <div style={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 2,
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ color: "black" }}
          >
            Total Countries: {props.totCountry}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Select
              defaultValue="All"
              size="small"
              sx={{ width: 170 }}
              onChange={(e) => {
                setContinentFilter(e.target.value);
              }}
              value={continentFilter}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Africa">Africa</MenuItem>
              <MenuItem value="Antarctica">Antarctica</MenuItem>
              <MenuItem value="Asia">Asia</MenuItem>
              <MenuItem value="Europe">Europe</MenuItem>
              <MenuItem value="Oceania">Oceania</MenuItem>
              <MenuItem value="North America">North America</MenuItem>
              <MenuItem value="South America">South America</MenuItem>
            </Select>
          </Box>
        </Box>
        <div style={{ display: "flex", flexWrap: "wrap", flexGrow: 1 }}>
          {providedCountryData.map((country, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: 300,
                margin: "16px auto",
                boxShadow: 3,
                flexBasis: { xs: "90%", sm: "30%" },
                minWidth: { xs: "80%", sm: "28%" },
              }}
            >
              <Link
                to={country.name.common.toLowerCase().replaceAll(" ", "-")}
                style={{ textDecoration: "none" }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={
                    country.flags?.png || "https://via.placeholder.com/300x160"
                  }
                  alt={`${country.name.common} flag`}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    sx={{ color: "black" }}
                  >
                    {country.name.common}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Capital: </strong>
                    {country.capital ? country.capital[0] : "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Continent: </strong>
                    {country.continents[0]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Timezone: </strong>
                    {country.timezones[0]}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  // Returns data filtered by search query and continent filter
  const filterData = (data, searchQuery, continentFilter) => {
    let localData = data;

    // continent filter
    if (continentFilter !== "All") {
      localData = localData.filter((val) => {
        return val.continents == continentFilter;
      });
    }

    // search query filter
    if (!(searchQuery===null || searchQuery=="")) {
      localData = localData.filter(val => {
        // return val.name.common.toLowerCase()==searchQuery.toLowerCase()
        return val.name.common.toLowerCase().includes(searchQuery.toLowerCase());
      })
    }

    return [localData,localData.length];
  };

  const usableData = filterData(usableRawData, searchedCountry, continentFilter);

  return <UIFunction data={usableData[0]} totCountry={usableData[1]} />;
}
