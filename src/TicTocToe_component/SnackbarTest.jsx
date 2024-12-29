/* import { useState } from 'react';
import { Snackbar, Button } from '@mui/material';

function SnackbarTest() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        console.log("Snackbar opened in minimal test");
    };

    const handleClose = () => {
        setOpen(false);
        console.log("Snackbar closed in minimal test");
    };

    return (
        <div style={{ padding: '50px' }}>
            
            <Snackbar
                open={open}
                onClose={handleClose}
                autoHideDuration={5000}
                message="Test Snackbar"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                ContentProps={{
                    style: {
                        backgroundColor: 'red',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        zIndex: 9999, // Ensure it is on top
                    },
                }}
            />
        </div>
    );
}

export default SnackbarTest;
 */