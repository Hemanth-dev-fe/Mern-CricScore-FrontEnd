import {
  Box,
  Card,
  CardContent,
  Chip,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
function MatchDetails() {
  const teamDetails = useSelector((state) => state.cricScore.teamDetails);
  const totalOvers = useSelector((state) => state.cricScore.totalOvers);
  const target = useSelector((state) => state.cricScore.target);
  const matchStarted = useSelector((state) => state.cricScore.matchStarted);
  const currentInnings = useSelector((state) => state.cricScore.currentInnings);
  const [expand, setExpand] = useState(true);
  const isLongName = teamDetails.some((len) => len.name.length > 15);

  const handleExpandClick = () => {
    setExpand(!expand);
  };
  return (
    <div>
      {matchStarted && (
        <>
          <Card
            sx={{
              width: 355,
              heigth: expand ? "auto" : "45px",
              margin: 1,
              paddingBottom: "10px",
            }}
          >
            <CardContent
              sx={{
                padding: expand ? "16px" : "8px",
                margin: expand ? "2px" : "1px",
                justifyContent: !expand ? "center" : "",
                alignItems: !expand ? "center" : "",
                height: !expand ? "100%" : "",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "2px",
                  margin: "2px",
                }}
              >
                <Typography variant="h6" component="div" align="center">
                  Match Details
                </Typography>
                <IconButton
                  onClick={handleExpandClick}
                  aria-expanded={expand}
                  aria-label="show more"
                >
                  {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              <Collapse in={expand} timeout="auto" unmountOnExit>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isLongName ? "column" : "row",
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 2,
                  }}
                >
                  <Chip
                    label={teamDetails[0].name}
                    sx={{
                      background:
                        "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                      color: "white",
                    }}
                  ></Chip>
                  {isLongName ? (
                    <Typography
                      variant="h6"
                      sx={{ alignSelf: "center", margin: "0 10px" }}
                    >
                      VS
                    </Typography>
                  ) : (
                    <Typography variant="h6" sx={{ margin: "0 10px" }}>
                      VS
                    </Typography>
                  )}
                  <Chip
                    label={teamDetails[1].name}
                    sx={{
                      background:
                        "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                      color: "white",
                    }}
                  ></Chip>
                </Box>

                <Typography variant="h6" align="center" sx={{marginTop:"20px"}}>
                  Total Overs: {totalOvers}
                </Typography>
                {currentInnings > 0 && (
                  <Typography variant="h6" align="center">
                    Target: {target}
                  </Typography>
                )}
              </Collapse>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
export default MatchDetails;
