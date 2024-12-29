import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Tile() {
    const navigate = useNavigate();

    const handleCardClick = (path) => {
        navigate(path);
    };

    return (
        <div style={{ display: "flex", gap: "20px" }}>
            <Card sx={{ width: 150, height: 150, margin: 2, cursor: 'pointer',backgroundColor:"yellow" }} onClick={() => handleCardClick('/quiz')}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Typography align="center" sx={{ marginBottom: "10px" }}>
                        Quiz Game
                    </Typography>
                    <CardMedia>
                        <img src="quiz.jpg" style={{ width: "100px" }} alt="Quiz Game" />
                    </CardMedia>
                </CardContent>
            </Card>
            <Card sx={{ width: 150, height: 150, margin: 2, cursor: 'pointer',backgroundColor:"yellow" }}onClick={() => handleCardClick('/memory')}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Typography align="center" sx={{ marginBottom: "10px" }}>
                        Memory Game
                    </Typography>
                    <CardMedia>
                        <img src="memory.jpg" style={{ width: "100px" }} alt="Memory Game" />
                    </CardMedia>
                </CardContent>
            </Card>
            <Card sx={{ width: 150, height: 150, margin: 2, cursor: 'pointer',backgroundColor:"yellow" }}onClick={() => handleCardClick('/cricket')}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Typography align="center" sx={{ marginBottom: "10px" }}>
                        Cric Score
                    </Typography>
                    <CardMedia>
                        <img src="cricscore.jpg" style={{ width: "100px" }} alt="Cric Score" />
                    </CardMedia>
                </CardContent>
            </Card>
        </div>
    );
}

export default Tile;