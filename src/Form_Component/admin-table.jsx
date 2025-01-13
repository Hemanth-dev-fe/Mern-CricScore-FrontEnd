import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"

function QuizTable()
{
    const [quizdata,setQuizData]=useState([])
    useEffect(()=>{
        axios.get("https://mern-cricscorebackend.onrender.com/quiz/quiz-getData")
        .then(response => {
            console.log('Server response:', response.data); // Log the response data
            setQuizData(response.data);
          })
          .catch(error => console.error('Error fetching quiz data:', error));
          }, []);
        
   
    return(
        <>
        <Card sx={{backgroundColor:"lightseagreen"}}>
           <Typography sx={{textAlign:"center",padding:"10px",fontSize:"30px"}}> Quiz-Score</Typography>
            <CardContent>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>UserName</TableCell>
                                <TableCell>E-Mail</TableCell>
                                <TableCell>Score</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            Array.isArray(quizdata)?(
                                <>
                                {
                                    quizdata.map((quizdata1,i)=>{
                                        return <TableRow key={i}>
                                                 <TableCell>{quizdata1.name}</TableCell>
                                                 <TableCell>{quizdata1.email}</TableCell>
                                                 <TableCell>{quizdata1.score}</TableCell>
                                                 <TableCell>{quizdata1.date}</TableCell>
                                        </TableRow>
                                    })
                                }
                                </>
                            ):(
                                <>
                                <TableRow>
                                    <TableCell colSpan="2">no data Available</TableCell>
                                </TableRow>
                                </>
                            )
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
        </>
    )
}
export default QuizTable