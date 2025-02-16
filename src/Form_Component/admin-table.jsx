import { Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"

function QuizTable()
{
    const [quizdata,setQuizData]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState(1)
        const fetchingData=async(page=1)=>{
            const response=await axios.get(`https://mern-cricscorebackend.onrender.com/quiz/quiz-getData?page=${page}&limit=5`)
            {
                setQuizData(response.data.quizdata)
                setCurrentPage(response.data.currentPage)
                setTotalPage(response.data.totalPages)
                console.log(response.data)
            }
        }
   useEffect(()=>{
    fetchingData(currentPage)
   },[currentPage])
   const handleChangePage=(newPage)=>{
    if(newPage>0 && newPage<=totalPage)
    {
        setCurrentPage(newPage)
    }

   }
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
        <div style={{textAlign:"center",marginTop:"80px"}}>
        <Button disabled={currentPage===1} onClick={()=>handleChangePage(currentPage-1)}>Previous</Button>
        <span>pages {currentPage} of {totalPage}</span>
        <Button disabled={currentPage===totalPage} onClick={()=>handleChangePage(currentPage+1)}>Next</Button>
        
        </div>
        </>
    )
}
export default QuizTable